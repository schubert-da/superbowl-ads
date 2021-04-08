# superbowl-ads
D3.js visualisation of Super Bowl Ads by different brands.

- **annot.js**:
Code for annotations used alongside the venn circle labels provided by venn.js. Done using Susie Lu's [d3-annotation](https://github.com/susielu/d3-annotation) package.

- **heatmap.js**: Used to create the heatmap for distribution of categories.

- **main.js**: Contains code to generate the interactive venn diagrams and loads pregenerated SVG content.

- **venn.js**: Modified version of Ben Frederickson's [venn.js](https://github.com/benfred/venn.js/). Edited so that additional g elements added to the SVG(in my case d3-annotations) wouldn't break the sortAreas() function.
And some hard-coding shenanigans modifying the default colour palette.

- **index.html**: Main page for the project.

- **images/...** : SVGs created from drawBrandVenn() in main.js + annotated in Figma.
