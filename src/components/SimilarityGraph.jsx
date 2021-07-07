import React, { Component } from 'react';
import * as d3 from "d3";
import graph from '../graph_data'

class SimilarityGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            graph: graph[0]
        }
    }

    componentDidMount() {
        console.log(this.state.graph)
        this.drawSimilarityGraph();
    }

    drawSimilarityGraph() {

        var margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = 300 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
        // create svg
        var svg = d3
            .select("svg#similarity_graph")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // d3.json(this.state.graph)
        // .then(function (data) {
        console.log('nodes', this.state.graph.nodes);
        console.log('links', this.state.graph.links);
        var nodes = this.state.graph.nodes,
            links = this.state.graph.links;

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
            .force("charge", d3.forceManyBody().strength(d => {
                // console.log(d)
                return 10
            })) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
            .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
            .force("collision", d3.forceCollide(d => { // This prevents collision between nodes
                // console.log('d in collision', d)
                return rScale(d.value)
            }))
            // .force("size", [width / 2, height])
            .on("tick", ticked);

        function ticked() {
            link
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            node
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
        }

        function drag(simulation) {
            function dragstarted(d) {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }

            function dragended(d) {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            return d3
                .drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }

        var node = svg
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", d => rScale(d.value))
            // .attr("r", 8)
            .style("fill", (d) => colorScale(d.group))
            .on("mouseover", (d) => {
                // console.log(d.id)
                // svg.select(this).style("fill", "orange");
                svg
                    .selectAll("circle")
                    .filter(
                        (node) => node.id === d.id
                    )
                    .classed("highlightNode", true);

                tooltip.transition().duration(200).style("opacity", 0.7);
                tooltip
                    .html(
                        `id: ${d.id}<br/>value: ${d.value}`
                    )
                    .style("left", d3.event.pageX + 20 + "px")
                    .style("top", d3.event.pageY + 20 + "px");
            })
            .on("mousemove", () => {
                tooltip
                    .style("left", d3.event.pageX + 20 + "px")
                    .style("top", d3.event.pageY + 20 + "px");
            })
            .on("mouseout", () => {
                svg.selectAll(".highlightNode").classed("highlightNode", false);
                tooltip
                    .style("opacity", 0)
            })
            .call(drag(simulation));
        // })
    }

    render() {
        return (
            <div id="rightview" style={{ overflow: true }}>
                <svg id="similarity_graph" width="300" height="600" />
            </div>
        );
    }
}

export default SimilarityGraph;