// set the dimensions and margin_heatmaps of the graph
var margin_heatmap = { top: 30, right: 30, bottom: 40, left: 60 },
    width_heatmap = 600 - margin_heatmap.left - margin_heatmap.right,
    height_heatmap = 470 - margin_heatmap.top - margin_heatmap.bottom;

// append the svg object to the body of the page
var svg = d3.select("#heatmap")
    .append("svg")
    .attr("width", width_heatmap + margin_heatmap.left + margin_heatmap.right)
    .attr("height", height_heatmap + margin_heatmap.top + margin_heatmap.bottom)
    .append("g")
    .attr("transform", "translate(" + (margin_heatmap.left + 20) + "," + (margin_heatmap.top + 40) + ")");

// Build color scale
var myColor = d3.scaleLinear()
    .range(["white", "#013369"])
    .domain([0, 1])

//Read the data
d3.csv("data/sets.csv",
    function(data) {
        return {
            label: data.label,
            brand: data.brand,
            value: data.size,
            total: data.total
        }
    },

    function(data) {
        // get only the elements with a single category
        data = data.filter(d => !(d.label).includes("and"))

        data = data.sort((a, b) => a.total - b.total)

        var myGroups = Array.from(new Set(data.map(d => d.label)))
        var myVars = Array.from(new Set(data.map(d => d.brand)))

        var mouseover_heatmap = function(d) {

            d3.select(this).style("stroke", "#222")
            d3.selectAll("g.heatmap-cell text")
                .transition().duration(100)
                .style("opacity", current => current.brand == d.brand ? 1 : 0)
        }

        var mouseleave_heatmap = function(d) {
            d3.select(this).style("stroke", "none")
            d3.selectAll("g.heatmap-cell text")
                .style("opacity", 0)
        }

        var x = d3.scaleBand()
            .range([0, width_heatmap])
            .domain(myGroups)
            .padding(0.01);

        svg.append("g")
            .attr("class", "heatmap-xAxis")
            .attr("transform", "translate(0,0)")
            .call(d3.axisTop(x))

        var y = d3.scaleBand()
            .range([height_heatmap, 0])
            .domain(myVars)
            .padding(0.01);

        svg.append("g")
            .attr("class", "heatmap-yAxis")
            .call(d3.axisLeft(y));

        svg.selectAll()
            .data(data, function(d) { return d.label + ':' + d.brand; })
            .enter()
            .append("g")
            .attr("class", "heatmap-cell")
            .attr("transform", (d) => `translate(${x(d.label)}, ${y(d.brand)})`)

        svg.selectAll("g.heatmap-cell")
            .append("rect")
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth() - 3)
            .style("fill", function(d) { return myColor(d.value / d.total) })
            .on("mouseover", mouseover_heatmap)
            .on("mouseleave", mouseleave_heatmap)

        svg.selectAll("g.heatmap-cell")
            .append("text")
            .text(d => d.value)
            .attr("x", x.bandwidth() / 2)
            .attr("y", y.bandwidth() / 2 + 5)
            .style("fill", d => d.value / d.total < 0.7 ? "#222" : "#eee")
            .style("text-anchor", "middle")
            .style("opacity", 0)
            .style("pointer-events", "none")

        d3.selectAll(".heatmap-xAxis text")
            .style("font-size", "18px")
            .style("font-family", "Arsenal")
            .attr("dy", "3")

        d3.selectAll(".heatmap-yAxis text")
            .style("font-size", "18px")
            .style("font-family", "Arsenal")
            .attr("dx", "3")

        svg.append("g")
            .attr("class", "legendLinear")
            .attr("transform", "translate(0,-58)");

        var legendLinear = d3.legendColor()
            .labelFormat(d3.format(".0%"))
            .labelOffset(4)
            .shapeWidth(30)
            .cells(5)
            .orient('horizontal')
            .ascending(true)
            .scale(myColor);

        svg.select(".legendLinear")
            .call(legendLinear);
    })