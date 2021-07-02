import React, { Component } from 'react';
import * as d3 from "d3";

class StackedBar extends Component {
    state = {}

    componentDidMount() {
        this.drawStackedBar()
        // var svg = d3.selectAll("svg#svgcontainer").append("circle").attr("cx", 20).attr("cy", 20).attr("r", 20).style("fill", "blue");
    }

    drawStackedBar() {
        // set the dimensions and margins of the graph
        var margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = 60 - margin.left - margin.right,
            height = 70 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.selectAll("svg#svgcontainer")
            // .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Parse the Data
        d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv").then(function (data) {

            // List of subgroups = header of the csv files = soil condition here
            var subgroups = data.columns.slice(1)

            // List of groups = species here = value of the first column called group -> I show them on the X axis
            var groups = d3.map(data, function (d) { return (d.group) }).keys()

            // Add X axis
            var x = d3.scaleBand()
                .domain(groups)
                .range([0, width])
                .padding([0.2])
            // svg.append("g")
            //     .attr("transform", "translate(0," + height + ")")
            //     .call(d3.axisBottom(x).tickSizeOuter(0));

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, 60])
                .range([height, 0]);
            // svg.append("g")
            //     .call(d3.axisLeft(y));

            // color palette = one color per subgroup
            var color = d3.scaleOrdinal()
                .domain(subgroups)
                .range(['#d8e2dc', '#fae1dd', '#fec5bb'])

            //stack the data? --> stack per subgroup
            var stackedData = d3.stack()
                .keys(subgroups)
                (data)

            // Show the bars
            svg.append("g")
                .selectAll("g")
                // Enter in the stack data = loop key per key = group per group
                .data(stackedData)
                .enter().append("g")
                .attr("fill", function (d) { return color(d.key); })
                .selectAll("rect")
                // enter a second time = loop subgroup per subgroup to add all rectangles
                .data(function (d) { return d; })
                .enter().append("rect")
                .attr("x", function (d) { return x(d.data.group); })
                .attr("y", function (d) { return y(d[1]); })
                .attr("height", function (d) { return y(d[0]) - y(d[1]); })
                .attr("width", x.bandwidth())
        })
    }

    render() {
        return (
            // <div id="svgcontainer"></div>
            <svg id="svgcontainer" >
            </svg>
        )
    }
}

export default StackedBar;