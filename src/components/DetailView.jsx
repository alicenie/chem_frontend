import React, { Component } from 'react';
import * as d3 from "d3";
// import * as d3 from "https://cdn.skypack.dev/d3@7";
import graph from '../graph_data'

class DetailView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Height: this.props.height - 30,
            Width: this.props.width,
            marginL: 30,
            marginR: 30,
            medchemWidth: (this.props.width - 30 - 30) / 14 * 3,
            vitroWidth: (this.props.width - 30 - 30) / 14 * 3,
            vivoWidth: (this.props.width - 30 - 30) / 14 * 2,
        }
    }

    componentDidMount() {
        this.drawBoundary();
        this.drawLowerAxis('lower-axis')
    }

    componentDidUpdate() {
        console.log("DetailView did update")
        this.drawWhole();
    }

    drawBoundary() {
        var svg = d3.select("#detail")
            .append("svg")
            .attr("id", "detail_svg")
            .attr("width", this.state.Width + 20)
            .attr("height", this.state.Height)
            .append("g")
            .attr("transform", "translate(20,0)")

        // for (var i = 0; i < 3; i++) {
        svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", this.state.Height - 40)
            .attr("width", 20 + this.state.medchemWidth)
            .style("stroke", "#ced4da")
            .style("fill", "none")
            .style("stroke-width", "2px")
            .lower();
        // }

        svg.append("rect")
            .attr("x", 25 + this.state.medchemWidth)
            .attr("y", 0)
            .attr("height", this.state.Height - 40)
            .attr("width", this.state.vitroWidth)
            .style("stroke", "#ced4da")
            .style("fill", "none")
            .style("stroke-width", "2px");

        svg.append("rect")
            .attr("x", 30 + this.state.medchemWidth + this.state.vitroWidth)
            .attr("y", 0)
            .attr("height", this.state.Height - 40)
            .attr("width", this.state.vivoWidth)
            .style("stroke", "#ced4da")
            .style("fill", "none")
            .style("stroke-width", "2px");
    }

    drawLowerAxis(container) {
        const { marginL, marginR } = this.state;
        const width = this.state.Width - marginL - marginR

        d3.select("#" + container).selectAll("svg").remove()
        var svg = d3.select("#" + container).append("svg")
            .attr("width", width + marginL)
            .attr("height", "30px")
            .append("g")
            .attr("transform", "translate(" + marginL + ",0)");

        // medicinical chemistry
        const medchemWidth = width / 14 * 3
        svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", medchemWidth)
            .attr("height", 20)
            .style("fill", "#cce3de")
            .style("opacity", 0.5)
            .attr("rx", 5)
            .attr("ry", 5)
            .style("stroke-width", 2)
            .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", 1 / 2 * medchemWidth)
            .attr("y", 14)
            .attr("text-anchor", "middle")
            .text("Medicinical Chemistry")
            .style("fill", "black")
            .style("font-size", 13);

        // Vitro
        const vitroX = medchemWidth, vitroWidth = width / 14 * 3
        svg.append("rect")
            .attr("x", vitroX)
            .attr("y", 0)
            .attr("width", vitroWidth)
            .attr("height", 20)
            .style("fill", "#ecf8f8")
            .style("opacity", 0.5)
            .attr("rx", 5)
            .attr("ry", 5)
            .style("stroke-width", 2)
            .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", vitroX + 1 / 2 * vitroWidth)
            .attr("y", 14)
            .attr("text-anchor", "middle")
            .text("Vitro")
            .style("fill", "black")
            .style("font-size", 13);;

        // Vivo
        const vivoX = vitroX + vitroWidth, vivoWidth = width / 14 * 2
        svg.append("rect")
            .attr("x", vivoX)
            .attr("y", 0)
            .attr("width", vivoWidth)
            .attr("height", 20)
            .style("fill", "#ecf8f8")
            .style("opacity", 0.5)
            .attr("rx", 5)
            .attr("ry", 5)
            .style("stroke-width", 2)
            .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", vivoX + 1 / 2 * vivoWidth)
            .attr("y", 14)
            .attr("text-anchor", "middle")
            .text("Vivo")
            .style("fill", "black")
            .style("font-size", 13);

        // Pharmocology
        svg.append("text")
            .attr("x", 1 / 2 * (vitroX + 1 / 2 * vitroWidth + vivoX + 1 / 2 * vivoWidth))
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .text("Pharmocology")
            .style("font-size", 13)

        // Ph I
        const ph1X = vivoX + vivoWidth, ph1Width = width / 14 * 2
        svg.append("rect")
            .attr("x", ph1X)
            .attr("y", 0)
            .attr("width", ph1Width)
            .attr("height", 20)
            .style("fill", "#fff8e8")
            .style("opacity", 0.5)
            .attr("rx", 5)
            .attr("ry", 5)
            .style("stroke-width", 2)
            .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", ph1X + 1 / 2 * ph1Width)
            .attr("y", 14)
            .attr("text-anchor", "middle")
            .text("I")
            .style("fill", "black")
            .style("font-size", 13);

        // Ph II
        const ph2X = ph1X + ph1Width, ph2Width = width / 14 * 2
        svg.append("rect")
            .attr("x", ph2X)
            .attr("y", 0)
            .attr("width", ph2Width)
            .attr("height", 20)
            .style("fill", "#fff8e8")
            .style("opacity", 0.5)
            .attr("rx", 5)
            .attr("ry", 5)
            .style("stroke-width", 2)
            .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", ph2X + 1 / 2 * ph2Width)
            .attr("y", 14)
            .attr("text-anchor", "middle")
            .text("II")
            .style("fill", "black")
            .style("font-size", 13);

        // Ph III
        const ph3X = ph2X + ph2Width, ph3Width = width / 14 * 2
        svg.append("rect")
            .attr("x", ph3X)
            .attr("y", 0)
            .attr("width", ph3Width)
            .attr("height", 20)
            .style("fill", "#fff8e8")
            .style("opacity", 0.5)
            .attr("rx", 5)
            .attr("ry", 5)
            .style("stroke-width", 2)
            .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", ph3X + 1 / 2 * ph3Width)
            .attr("y", 14)
            .attr("text-anchor", "middle")
            .text("III")
            .style("fill", "black").style("font-size", 13);

        // Pharmaceutics
        svg.append("text")
            .attr("x", ph2X + 1 / 2 * ph2Width)
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .text("Pharmaceutics")
            .style("font-size", 13);

    }

    drawWhole() {
        // clear svg
        d3.selectAll(".network").remove()
        d3.selectAll('.detail_path').remove()
        d3.selectAll(".heatmap").remove()
        var vitro_heat_pos = this.drawVitroHeatmap(), node_pos = this.drawNetwork(), vivo_heat_pos = this.drawVivoHeatmap();
        this.drawPaths(vitro_heat_pos, vivo_heat_pos, node_pos)
    }

    drawNetwork() {
        if (this.props.detaildata[0]) {

            console.log("draw network")
            var node_pos = []
            var margin = { top: 0, right: 0, bottom: 0, left: 0 },
                width = this.state.medchemWidth + 20 - margin.left - margin.right,
                height = this.state.Height / 2 - 40 - margin.top - margin.bottom;

            var svg = d3
                .select("svg#detail_svg")
                .append("g")
                .attr("transform", "translate(20,0)");

            // d3.json(this.props.detaildata[0])
            // .then(function (data) {
            // console.log('nodes', this.props.detaildata[0].nodes);
            // console.log('links', this.props.detaildata[0].links);
            var nodes = this.props.detaildata[0].nodes,
                links = this.props.detaildata[0].links;

            // node color scale
            var colorScale = d3
                .scaleLinear()
                .domain([1, 2, 3, 4, 5])
                .range(["#ffdab9", "#fbc4ab", "#f8ad9d", "#f4978e", "#f08080"])

            // node r scale
            var rScale = d3.scaleLinear().domain([1, 10]).range([5, 15])

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
                            return d.value * 20
                        }) // This is the link distance based on nodes similarity
                        .links(links) // and this the list of links
                )
                .force("charge", d3.forceManyBody().strength(10)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
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
            // this.setState({ node_pos })

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
                .on("mouseover", function (event, d) {
                    // console.log(d.id)

                    // tooltip
                    tooltip.transition().duration(200).style("opacity", 0.7);
                    tooltip
                        .html(
                            `id: ${d.id}<br/>value: ${d.value}`
                        )
                        .style("left", event.pageX + 20 + "px")
                        .style("top", event.pageY + 20 + "px");

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
                        .attr("opacity", 1)
                        .attr("stroke-width", 2)
                })
                .on("mousemove", (event, d) => {
                    tooltip
                        .style("left", event.pageX + 20 + "px")
                        .style("top", event.pageY + 20 + "px");
                })
                .on("mouseout", (event, d) => {
                    tooltip.transition().duration(200).style("opacity", 0);

                    d3.selectAll("rect.heatmap")
                        .style("stroke-width", 2)
                        .style("stroke", "#adb5bd")
                        .style("opacity", 1)

                    d3.selectAll("circle.network")
                        .style("stroke-width", 0)
                        .style("opacity", 1)

                    d3.selectAll("path#" + d.id)
                        .attr("opacity", 0.3)
                        .attr("stroke-width", 1)
                })
            // .call(drag(simulation));

            // this.setState({ node_pos })
        }
        return node_pos
    }

    drawVitroHeatmap() {
        if (this.props.detaildata[1]) {

            console.log("draw vitro heatmap")
            var margin = { top: 10, right: 10, bottom: 10, left: 10 },
                width = this.state.vitroWidth - margin.left - margin.right,
                height = this.state.Height - 40 - margin.top - margin.bottom;

            var svg = d3
                .select("svg#detail_svg")
                .append("g")
                .attr("transform", "translate(" + (20 + 25 + this.state.medchemWidth + margin.left) + "," + margin.top + ")");

            console.log("heatmap", this.props.detaildata[1])
            var data = this.props.detaildata[1];

            // x scale
            var xDomain = ["a", "b", "c", "d", "e", "f", "g"],
                xRange = [0, width];
            var xScale = d3.scaleBand().domain(xDomain).range(xRange)

            // y scale (to make a square)
            var yDomain = [];
            data.forEach(d => {
                if (!yDomain.includes(d.id)) yDomain.push(d.id)
            })
            var yRange = [0, yDomain.length * xScale.bandwidth()]
            var yScale = d3.scaleBand().domain(yDomain).range(yRange)

            // store positions for path
            var vitro_heat_pos = []
            yDomain.forEach(d => {
                vitro_heat_pos.push({
                    id: d,
                    x_in: (20 + 25 + this.state.medchemWidth + margin.left),
                    x_out: (20 + 25 + this.state.medchemWidth + margin.left) + xDomain.length * xScale.bandwidth(),
                    y: yScale(d) + margin.top + 1 / 2 * yScale.bandwidth()
                })
            })
            // this.setState({ vitro_heat_pos })

            // color scale
            // var colorScale = d3
            //     .scaleSequential()
            //     .interpolator(d3.interpolateOranges)
            //     .domain([1, 8]);

            var colorScale = d3.scaleOrdinal()
                .domain([0, 1, 2, 3, 4, 5, 6])
                .range(["white", "#fdf8e1", "#fcefb4", "#fae588", "#f9dc5c", "#ffc617", "#ffc000"])

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
                .attr("y", (d, i) => {
                    return yScale(d.id)
                })
                .attr("width", xScale.bandwidth())
                .attr("height", xScale.bandwidth())
                .style("fill", (d) => {
                    return colorScale(d.value);
                })
                .style("stroke-width", 2)
                .style("stroke", "#adb5bd")
                .on("mouseover", (event, d) => {
                    // tooltip
                    tooltip.transition().duration(200).style("opacity", 0.7);
                    tooltip
                        .html(
                            `id: ${d.id}<br/>  ${d.attr}: ${d.value}`
                        )
                        .style("left", event.pageX + 20 + "px")
                        .style("top", event.pageY + 20 + "px");

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
                        .attr("opacity", 1)
                        .attr("stroke-width", 2)

                })
                .on("mousemove", (event, d) => {
                    tooltip
                        .style("left", event.pageX + 20 + "px")
                        .style("top", event.pageY + 20 + "px");
                })
                .on("mouseout", (event, d) => {
                    tooltip.transition().duration(200).style("opacity", 0);

                    d3.selectAll("rect.heatmap")
                        .style("stroke-width", 2)
                        .style("stroke", "#adb5bd")
                        .style("opacity", 1)

                    d3.selectAll("circle.network")
                        .style("stroke-width", 0)
                        .style("opacity", 1)

                    d3.selectAll("path#" + d.id)
                        .attr("opacity", 0.3)
                        .attr("stroke-width", 1)
                })
        }
        return vitro_heat_pos
    }

    drawVivoHeatmap() {
        if (this.props.detaildata[2]) {

            console.log("draw vivo heatmap")
            var margin = { top: 10, right: 10, bottom: 10, left: 10 },
                width = this.state.vivoWidth - margin.left - margin.right,
                height = this.state.Height - 40 - margin.top - margin.bottom;

            var svg = d3
                .select("svg#detail_svg")
                .append("g")
                .attr("transform", "translate(" + (20 + 30 + this.state.medchemWidth + this.state.vitroWidth + margin.left) + "," + margin.top + ")");

            console.log("heatmap", this.props.detaildata[2])
            var data = this.props.detaildata[2];

            // x scale
            var xDomain = ["a", "b", "c", "d", "e"],
                xRange = [0, width];
            var xScale = d3.scaleBand().domain(xDomain).range(xRange)

            // y scale (to make a square)
            var yDomain = [];
            data.forEach(d => {
                if (!yDomain.includes(d.id)) yDomain.push(d.id)
            })
            var yRange = [0, yDomain.length * xScale.bandwidth()]
            var yScale = d3.scaleBand().domain(yDomain).range(yRange)

            // store positions for path
            var vivo_heat_pos = []
            yDomain.forEach(d => {
                vivo_heat_pos.push({
                    id: d,
                    x: (20 + 30 + this.state.medchemWidth + this.state.vitroWidth + margin.left),
                    y: yScale(d) + margin.top + 1 / 2 * yScale.bandwidth()
                })
            })
            // this.setState({ vivo_heat_pos })

            // color scale
            // var colorScale = d3
            //     .scaleSequential()
            //     .interpolator(d3.interpolateOranges)
            //     .domain([0, 8]);
            var colorScale = d3.scaleOrdinal()
                .domain([0, 1, 2, 3, 4, 5, 6])
                .range(["white", "#ffe3e0", "#fbc3bc", "#f7a399", "#f38375", "#ef6351", "#c32f27"])

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
                .attr("y", (d, i) => {
                    return yScale(d.id)
                })
                .attr("width", xScale.bandwidth())
                .attr("height", xScale.bandwidth())
                .style("fill", (d) => {
                    return colorScale(d.value);
                })
                .style("stroke-width", 2)
                .style("stroke", "#adb5bd")
                .on("mouseover", (event, d) => {
                    // tooltip
                    tooltip.transition().duration(200).style("opacity", 0.7);
                    tooltip
                        .html(
                            `id: ${d.id}<br/>  ${d.attr}: ${d.value}`
                        )
                        .style("left", event.pageX + 20 + "px")
                        .style("top", event.pageY + 20 + "px");

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
                        .attr("opacity", 1)
                        .attr("stroke-width", 2)

                })
                .on("mousemove", (event, d) => {
                    tooltip
                        .style("left", event.pageX + 20 + "px")
                        .style("top", event.pageY + 20 + "px");
                })
                .on("mouseout", (event, d) => {
                    tooltip.transition().duration(200).style("opacity", 0);

                    d3.selectAll("rect.heatmap")
                        .style("stroke-width", 2)
                        .style("stroke", "#adb5bd")
                        .style("opacity", 1)

                    d3.selectAll("circle.network")
                        .style("stroke-width", 0)
                        .style("opacity", 1)

                    console.log(d)
                    d3.selectAll("path#" + d.id)
                        .attr("opacity", 0.3)
                        .attr("stroke-width", 1)
                })
        }
        return vivo_heat_pos
    }

    drawPaths(vitro_heat_pos, vivo_heat_pos, node_pos) {
        if (vitro_heat_pos && vivo_heat_pos && node_pos) {
            console.log("vitro", vitro_heat_pos)
            console.log("vivo", vivo_heat_pos)


            // draw path between vitro and network
            if (node_pos[0]) {
                vitro_heat_pos.forEach(d => {
                    // var path = d3.path()
                    var curve = d3.line().curve(d3.curveBumpX)
                    var startNode = node_pos.find(node => node.id == d.id)
                    // path.moveTo(startNode.x + 20, startNode.y)
                    // path.lineTo(d.x_in, d.y)
                    // path.closePath();
                    var points = [[startNode.x + 20, startNode.y], [d.x_in, d.y]]
                    d3.select("svg#detail_svg")
                        .append("path")
                        .attr("class", "detail_path")
                        .attr("d", curve(points))
                        .attr("stroke-width", 1)
                        .attr("stroke", "#adb5bd")
                        .attr("opacity", 0.3)
                        .attr("fill", "none")
                        .attr("id", d.id)
                        .lower()
                })
            }

            // draw path between vivo and vitro
            if (vitro_heat_pos[0]) {
                vivo_heat_pos.forEach(d => {
                    // var path = d3.path()
                    var curve = d3.line().curve(d3.curveBumpX)
                    var startNode = vitro_heat_pos.find(node => node.id == d.id)
                    // path.moveTo(startNode.x_out, startNode.y)
                    // path.lineTo(d.x, d.y)
                    // path.closePath();
                    var points = [[startNode.x_out, startNode.y], [d.x, d.y]]
                    d3.select("svg#detail_svg")
                        .append("path")
                        .attr("class", "detail_path")
                        .attr("d", curve(points))
                        .attr("stroke-width", 1)
                        .attr("stroke", "#adb5bd")
                        .attr("opacity", 0.3)
                        .attr("fill", "none")
                        .attr("id", d.id)
                        .lower()
                })
            }

        }
    }

    render() {
        return (
            <div>
                <div id="lower-axis" />

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
            </div>
        );
    }
}

export default DetailView;