// note on hovering "?" button
d3.select(".btn")
    .on("mouseenter", () => {
        var [mouseX, mouseY] = [event.pageX, event.pageY]

        d3.select(".note-info")
            .style("left", (mouseX - 600) + "px")
            .style("top", mouseY + "px")
            .transition()
            .duration(500)
            .style("opacity", "1")
    })
    .on("mouseleave", () => {
        d3.select(".note-info")
            .style("opacity", "0")
    })

d3.csv("data/sets.csv",

    function(data) {
        return {
            sets: data.sets.split(" and "),
            figure: +data.figure,
            label: data.label,
            size: +data.size,
            brand: data.brand,
            total: +data.total
        }
    },

    function(data) {

        data = data.sort(d => d.total)
        data = data.filter(d => d.size != 0)

        var colorMap = {
            "celebrity": "rgb(211, 188, 141)",
            "danger": "rgb(168, 0, 28)",
            "funny": "rgb(1, 51, 105)",
            "use_sex": "grey",
            "patriotic": "rgb(25, 129, 67)",
            "animals": "rgb(255, 182, 18)",
        }

        // load large Venns and their annotations
        drawBrandVenn("All brands")

        drawBrandVenn("Bud Light")
        d3.select(".Bud-venn > svg")
            .append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotationsBudLight)

        drawBrandVenn("Budweiser")
        d3.select(".Budweiser-venn > svg")
            .append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotationsBudweiser)

        drawBrandVenn("NFL")
        d3.select(".NFL-venn > svg")
            .append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotationsNFL)

        // load pre-generated SVGs
        d3.xml("images/Toyota.svg", (data) => {
            d3.select(".Toyota-venn-div").node().append(data.documentElement)
        })
        d3.xml("images/Hyundai.svg", (data) => {
            d3.select(".Hyundai-venn-div").node().append(data.documentElement)
        })
        d3.xml("images/Kia.svg", (data) => {
            d3.select(".Kia-venn-div").node().append(data.documentElement)
        })
        d3.xml("images/Doritos.svg", (data) => {
            d3.select(".Doritos-venn-div").node().append(data.documentElement)
        })
        d3.xml("images/Pepsi.svg", (data) => {
            d3.select(".Pepsi-venn-div").node().append(data.documentElement)
        })
        d3.xml("images/Coca-Cola.svg", (data) => {
            d3.select(".Coca-Cola-venn-div").node().append(data.documentElement)
        })
        d3.xml("images/E-Trade.svg", (data) => {
            d3.select(".E-Trade-venn-div").node().append(data.documentElement)
        })

        // Helper fn to draw large Venns
        function drawBrandVenn(brand) {
            brand_data = data.filter(d => d.brand == brand)

            brand_key = brand.split(" ")[0]

            d3.select(`#container .${brand_key}-venn-div`).append("div").html(`<div class="venn-title"><h2> ${brand}</h2> <h3>${brand_data[0].total} commercials</h3></div>`).style("margin", "auto")
            d3.select(`#container .${brand_key}-venn-div`).append("div").attr("class", brand_key + "-venn").style("margin", "auto")

            var chart = venn.VennDiagram()
                .width(650)
                .height(400)

            var div = {}
            var div = d3.select("." + brand_key + "-venn").datum(brand_data).call(chart);

            div.select("svg")
                .style("overflow", "visible")

            div.selectAll(".venn-circle path")
                .style("fill-opacity", .6)
                .style("stroke-width", 2)
                .style("stroke", "white")
                .style("stroke-opacity", 1)
                .style("stroke", "fff");

            function createTooltipText(d) {
                var header = `<span class="tooltip-header"> ${d.size} commercials</span> <hr> <span class="tooltip-text-title"> Were classified as </span>`
                var categories = d.label.split(" and ")
                var ul = ""

                categories.forEach((category) => {
                    var color = colorMap[category]
                    ul = ul + `<li class="tooltip-text" style="color: ${color}"> ${category} </li>`;
                })

                return header + "<ul>" + ul + "</ul>"
            }

            // Venn tooltip
            d3.select("." + brand_key + "-venn").append("div")
                .attr("class", "venntooltip");

            div.selectAll("g")
                .on("mouseover", function(d, i) {

                    var tooltip = d3.select("." + brand_key + "-venn").select(".venntooltip")

                    // Sort all the areas relative to the current item
                    venn.sortAreas(div, d);

                    // Display a tooltip with the current size
                    tooltip.style("opacity", 1);
                    tooltip.html(createTooltipText(d));

                    // Highlight the current path
                    var selection = d3.select(this).transition("tooltip").duration(400);
                    selection.select("path")
                        .style("stroke-opacity", 1)
                        .style("stroke", "#222")
                        .style("stroke-width", 2);
                })
                .on("mousemove", function() {

                    var tooltip = d3.select("." + brand_key + "-venn").select(".venntooltip")
                    var [mouseX, mouseY] = [event.pageX, event.pageY]

                    tooltip
                        .style("left", mouseX + "px")
                        .style("top", mouseY + "px")
                })
                .on("mouseout", function(d, i) {

                    var tooltip = d3.select("." + brand_key + "-venn").select(".venntooltip")

                    tooltip.style("opacity", 0);

                    var selection = d3.select(this).transition("tooltip").duration(400);
                    selection.select("path")
                        .style("stroke-width", 2)
                        .style("stroke-opacity", 1)
                        .style("stroke", "white")
                });

            // Styling venns
            d3.selectAll(".venn-intersection text")
                .style("display", "none")
                .style("color", "#222")

            d3.selectAll(".venn-circle text")
                .style("fill", "#222")
                .style("font-size", "14px")
        }
    })