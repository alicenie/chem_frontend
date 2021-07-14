import React, { Component } from 'react';
import * as d3 from "d3";
import graph from '../graph_data'

class DetailView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Height: this.props.height,
            Width: this.props.width,
            network: graph[0],
            heatmap: graph[1],

            node_pos: [],
            heat_pos: []

        }
    }

    componentDidMount() {
        this.drawBoundary();

        this.drawNetwork();
        this.drawHeatmap();
    }

    componentDidUpdate() {
        this.drawPaths();
    }

    drawBoundary() {
        var svg = d3.select("#detail")
            .append("svg")
            .attr("id", "detail_svg")
            .attr("width", this.state.Width + 20)
            .attr("height", this.state.Height)
            .append("g")
            .attr("transform", "translate(20,0)")

        for (var i = 0; i < 3; i++) {
            svg.append("rect")
                .attr("x", i * (this.state.Width / 3 - 5))
                .attr("y", 0)
                .attr("height", this.state.Height - 40)
                .attr("width", this.state.Width / 3 - 10)
                .style("stroke", "#ced4da")
                .style("fill", "none")
                .style("stroke-width", "2px");
        }
    }

    drawNetwork() {
        console.log("draw network")
        var node_pos = []
        var margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = this.state.Width / 3 - 10 - margin.left - margin.right,
            height = this.state.Height - 40 - margin.top - margin.bottom;

        var svg = d3
            .select("svg#detail_svg")
            .append("g")
            .attr("transform", "translate(20,0)");

        // d3.json(this.state.network)
        // .then(function (data) {
        console.log('nodes', this.state.network.nodes);
        console.log('links', this.state.network.links);
        var nodes = this.state.network.nodes,
            links = this.state.network.links;

        // node color scale
        var colorScale = d3
            .scaleLinear()
            .domain([1, 2, 3, 4, 5])
            .range(["#ffdab9", "#fbc4ab", "#f8ad9d", "#f4978e", "#f08080"])

        // node r scale
        var rScale = d3.scaleLinear().domain([1, 10]).range([10, 20])

        // set tooltips
        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // construct network
        var link = svg
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
        // .attr("stroke", "lightgrey")
        // .attr("stroke-width", function (d) { return Math.sqrt(d.value); });
        // .attr("marker-end", "url(#arrowhead)");


        var simulation = d3
            .forceSimulation(nodes) // Force algorithm is applied to data.nodes
            .force(
                "link",
                d3
                    .forceLink() // This force provides links between nodes
                    .id(function (d) {
                        return d.id;
                    }) // This provide the id of a node
                    .distance(d => {
                        // console.log("link d", d)
                        return d.value * 30
                    }) // This is the link distance based on nodes similarity
                    .links(links) // and this the list of links
            )
            .force("charge", d3.forceManyBody().strength(50)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
            .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
            .force("collision", d3.forceCollide(d => { // This prevents collision between nodes
                // console.log('d in collision', d)
                return rScale(d.value)
            }))
            .stop()

        // make the simulation run without drawing anything
        for (var i = 0; i < 300; ++i) simulation.tick();
        // console.log("simulation end")
        console.log(nodes)
        node_pos = nodes.map(d => { return { id: d.id, x: d.x, y: d.y } })
        console.log(node_pos)
        this.setState({ node_pos })

        // draw it manually using the x and y created by simulation
        var node = svg
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("class", "network")
            .attr("r", d => rScale(d.value))
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .style("fill", (d) => colorScale(d.group))
            .on("mouseover", (d) => {
                // console.log(d.id)

                // tooltip
                tooltip.transition().duration(200).style("opacity", 0.7);
                tooltip
                    .html(
                        `id: ${d.id}<br/>value: ${d.value}`
                    )
                    .style("left", d3.event.pageX + 20 + "px")
                    .style("top", d3.event.pageY + 20 + "px");

                // highlight
                d3.selectAll("rect.heatmap")
                    .filter((node) => node.id == d.id)
                    .style("stroke", "orange")
                    .style("stroke-width", 3)
                // .classed("highlightRect", true);

                d3.selectAll("rect.heatmap")
                    .filter((node) => node.id != d.id)
                    .style("opacity", 0.5)

                d3.selectAll("circle.network")
                    .filter((node) => node.id == d.id)
                    .style("stroke", "orange")
                    .style("stroke-width", 3)

                d3.selectAll("circle.network")
                    .filter((node) => node.id != d.id)
                    .style("opacity", 0.5)

                d3.selectAll("path#" + d.id)
                    .style("opacity", 1)
            })
            .on("mousemove", (d) => {
                tooltip
                    .style("left", d3.event.pageX + 20 + "px")
                    .style("top", d3.event.pageY + 20 + "px");
            })
            .on("mouseout", (d) => {
                tooltip.transition().duration(200).style("opacity", 0);

                d3.selectAll("rect.heatmap")
                    .style("stroke-width", 2)
                    .style("stroke", "#adb5bd")
                    .style("opacity", 1)

                d3.selectAll("circle.network")
                    .style("stroke-width", 0)
                    .style("opacity", 1)

                d3.selectAll("path#" + d.id)
                    .style("opacity", 0.3)
            })
        // .call(drag(simulation));

        // this.setState({ node_pos })
    }

    drawHeatmap() {
        console.log("draw heatmap")
        var margin = { top: 10, right: 10, bottom: 10, left: 10 },
            width = this.state.Width / 3 - 10 - margin.left - margin.right,
            height = this.state.Height - 40 - margin.top - margin.bottom;

        var svg = d3
            .select("svg#detail_svg")
            .append("g")
            .attr("transform", "translate(" + (20 + this.state.Width / 3 - 5 + margin.left) + "," + margin.top + ")");

        console.log("heatmap", this.state.heatmap)
        var data = this.state.heatmap;

        // x scale
        var xDomain = ["a", "b", "c", "d", "e", "f", "g"],
            xRange = [0, width];
        var xScale = d3.scaleBand().domain(xDomain).range(xRange)

        // y scale
        var yDomain = [],
            yRange = [0, height];
        data.forEach(d => {
            if (!yDomain.includes(d.id)) yDomain.push(d.id)
        })
        var yScale = d3.scaleBand().domain(yDomain).range(yRange)

        // store positions for path
        var heat_pos = []
        yDomain.forEach(d => {
            heat_pos.push({
                id: d,
                x: (20 + this.state.Width / 3 - 5 + margin.left),
                y: yScale(d) + margin.top + 1 / 2 * yScale.bandwidth()
            })
        })
        this.setState({ heat_pos })

        // color scale
        var colorScale = d3
            .scaleSequential()
            .interpolator(d3.interpolateOranges)
            .domain([1, 8]);

        // set tooltips
        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // construct heatmap
        svg.selectAll()
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "heatmap")
            .attr("x", (d) => xScale(d.attr))
            .attr("y", (d) => yScale(d.id))
            .attr("width", xScale.bandwidth())
            .attr("height", yScale.bandwidth())
            .style("fill", (d) => {
                return colorScale(d.value);
            })
            .style("stroke-width", 2)
            .style("stroke", "#adb5bd")
            .on("mouseover", (d) => {
                // tooltip
                tooltip.transition().duration(200).style("opacity", 0.7);
                tooltip
                    .html(
                        `id: ${d.id}<br/>  ${d.attr}: ${d.value}`
                    )
                    .style("left", d3.event.pageX + 20 + "px")
                    .style("top", d3.event.pageY + 20 + "px");

                // highlight
                d3.selectAll("rect.heatmap")
                    .filter((node) => node.id == d.id)
                    .style("stroke", "orange")
                    .style("stroke-width", 3)
                    .classed("highlightRect", true);

                d3.selectAll("rect.heatmap")
                    .filter((node) => node.id != d.id)
                    .style("opacity", 0.5)

                d3.selectAll("circle.network")
                    .filter((node) => node.id == d.id)
                    .style("stroke", "orange")
                    .style("stroke-width", 3)

                d3.selectAll("circle.network")
                    .filter((node) => node.id != d.id)
                    .style("opacity", 0.5)

                d3.selectAll("path#" + d.id)
                    .style("opacity", 1)

            })
            .on("mousemove", (d) => {
                tooltip
                    .style("left", d3.event.pageX + 20 + "px")
                    .style("top", d3.event.pageY + 20 + "px");
            })
            .on("mouseout", (d) => {
                tooltip.transition().duration(200).style("opacity", 0);

                d3.selectAll("rect.heatmap")
                    .style("stroke-width", 2)
                    .style("stroke", "#adb5bd")
                    .style("opacity", 1)

                d3.selectAll("circle.network")
                    .style("stroke-width", 0)
                    .style("opacity", 1)

                d3.selectAll("path#" + d.id)
                    .style("opacity", 0.3)
            })

    }

    drawPaths() {

        console.log("node_pos", this.state.node_pos)
        console.log("heat_pos", this.state.heat_pos)

        const { node_pos, heat_pos } = this.state;

        if (node_pos[0]) {
            heat_pos.forEach(d => {
                var path = d3.path()
                var startNode = node_pos.find(node => node.id == d.id)
                path.moveTo(startNode.x + 20, startNode.y)
                path.lineTo(d.x, d.y)
                path.closePath();
                d3.select("svg#detail_svg")
                    .append("path")
                    .attr("d", path)
                    .attr("stroke-width", 2)
                    .attr("stroke", "#adb5bd")
                    .style("opacity", 0.3)
                    .attr("id", d.id)
                    .lower()
            })
        }
    }

    render() {
        return (
            <div className="row" id="detail">
                {/* <div className="col-4" id="medicinical">
                    medicinical
                </div>
                <div className="col-4" id="pharmacology">
                    pharmacology
                </div>
                <div className="col-4" id="clinical">
                    clinical
                </div> */}
            </div>
        );
    }
}

export default DetailView;