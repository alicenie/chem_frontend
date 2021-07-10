import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import * as d3 from "d3";
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

class HeatSquare extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lineHeight: this.props.height / 4 - 20,
            heatWidth: this.props.width / 12 * 10,
            targetList: this.props.value,
            marginL: 30,
            marginR: 50,
        }
    }

    componentDidMount() {
        console.log("component did mount ")
    }

    componentDidUpdate() {
        console.log("component did update")
        this.drawHeatAxis("heat-axis")
        this.state.targetList.forEach(d => {
            // console.log(d)
            this.drawHeatSquare(`heatsquare-${d.id}`, d.heatsquaredata)
        })
    }

    drawHeatSquare(container, data) {
        const { marginL, marginR } = this.state;
        const width = this.state.heatWidth - marginL - marginR, height = this.state.lineHeight;
        // console.log("height", height)
        var svg = d3
            .selectAll(`svg#${container}`)
            .attr("width", width + marginL)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + marginL + ",0)")

        // x scale
        var xDomain = []
        data.forEach(element => {
            xDomain.push(element.label)
        });
        var xScale = d3.scaleBand().domain(xDomain).range([0, width]);

        // color scale
        var colorScale = d3
            .scaleSequential()
            .interpolator(d3.interpolateBlues)
            .domain([0, 10]);

        // square scale
        var squareScale = d3.scaleLinear().domain([0, 10]).range([0, 0.8 * xScale.bandwidth()])

        svg
            .selectAll()
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d) => {
                // console.log("x:", xScale(d.label))
                return xScale(d.label)
            })
            .attr("y", "0")
            .attr("width", xScale.bandwidth())
            .attr("height", height)
            .attr("fill", (d) => colorScale(d.hvalue))
            .style("opacity", 0.8)
            .style("stroke-width", 2)
            .style("stroke", "#ced4da");

        svg.selectAll()
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d) => {
                // console.log("x:", xScale(d.label) + 0.5 * (xScale.bandwidth() - squareScale(d.svalue)))
                return xScale(d.label) + 0.5 * (xScale.bandwidth() - squareScale(d.svalue))
            })
            .attr("y", d => 0.5 * (height - squareScale(d.svalue)))
            .attr("width", d => squareScale(d.svalue))
            .attr("height", d => squareScale(d.svalue))
            .attr("fill", "white")
            .style("stroke-width", 1)
            .style("stroke", "#adb5bd");;

    }

    drawHeatAxis(container) {
        const { marginL, marginR } = this.state;
        const width = this.state.heatWidth - marginL - marginR

        d3.select("#" + container).selectAll("svg").remove()
        var svg = d3.select("#" + container).append("svg")
            .attr("width", width + marginL)
            .attr("height", "50px")
            .append("g")
            .attr("transform", "translate(" + marginL + ",10)");

        // medical chemistry
        const medchemWidth = width / 15 * 3
        svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", medchemWidth)
            .attr("height", 30)
            .style("fill", "#cce3de")
            .style("opacity", 0.5)
            .attr("rx", 5)
            .attr("ry", 5)
            .style("stroke-width", 2)
            .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", 1 / 2 * medchemWidth)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .text("Medical Chemistry")
            .style("fill", "black");

        // Vitro
        const vitroX = medchemWidth, vitroWidth = width / 15 * 4
        svg.append("rect")
            .attr("x", vitroX)
            .attr("y", 0)
            .attr("width", vitroWidth)
            .attr("height", 30)
            .style("fill", "#ecf8f8")
            .style("opacity", 0.5)
            .attr("rx", 5)
            .attr("ry", 5)
            .style("stroke-width", 2)
            .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", vitroX + 1 / 2 * vitroWidth)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .text("Vitro")
            .style("fill", "black");

        // Vivo
        const vivoX = vitroX + vitroWidth, vivoWidth = width / 15 * 2
        svg.append("rect")
            .attr("x", vivoX)
            .attr("y", 0)
            .attr("width", vivoWidth)
            .attr("height", 30)
            .style("fill", "#ecf8f8")
            .style("opacity", 0.5)
            .attr("rx", 5)
            .attr("ry", 5)
            .style("stroke-width", 2)
            .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", vivoX + 1 / 2 * vivoWidth)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .text("Vivo")
            .style("fill", "black");

        // Pharmocology
        svg.append("text")
            .attr("x", 1 / 2 * (vitroX + 1 / 2 * vitroWidth + vivoX + 1 / 2 * vivoWidth))
            .attr("y", 35)
            .attr("text-anchor", "middle")
            .text("Pharmocology")
            .style("font-size", 15)

        // Ph I
        const ph1X = vivoX + vivoWidth, ph1Width = width / 15 * 2
        svg.append("rect")
            .attr("x", ph1X)
            .attr("y", 0)
            .attr("width", ph1Width)
            .attr("height", 30)
            .style("fill", "#fff8e8")
            .style("opacity", 0.5)
            .attr("rx", 5)
            .attr("ry", 5)
            .style("stroke-width", 2)
            .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", ph1X + 1 / 2 * ph1Width)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .text("I")
            .style("fill", "black");

        // Ph II
        const ph2X = ph1X + ph1Width, ph2Width = width / 15 * 2
        svg.append("rect")
            .attr("x", ph2X)
            .attr("y", 0)
            .attr("width", ph2Width)
            .attr("height", 30)
            .style("fill", "#fff8e8")
            .style("opacity", 0.5)
            .attr("rx", 5)
            .attr("ry", 5)
            .style("stroke-width", 2)
            .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", ph2X + 1 / 2 * ph2Width)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .text("II")
            .style("fill", "black");

        // Ph III
        const ph3X = ph2X + ph2Width, ph3Width = width / 15 * 2
        svg.append("rect")
            .attr("x", ph3X)
            .attr("y", 0)
            .attr("width", ph3Width)
            .attr("height", 30)
            .style("fill", "#fff8e8")
            .style("opacity", 0.5)
            .attr("rx", 5)
            .attr("ry", 5)
            .style("stroke-width", 2)
            .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", ph3X + 1 / 2 * ph3Width)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .text("III")
            .style("fill", "black");

        // Pharmaceutics
        svg.append("text")
            .attr("x", ph2X + 1 / 2 * ph2Width)
            .attr("y", 35)
            .attr("text-anchor", "middle")
            .text("Pharmaceutics")
            .style("font-size", 15)

    }

    render() {
        return (
            <div>

                <br />
                <ScrollSyncPane>
                    <div style={{ height: this.props.height - 110, overflow: "auto" }}>
                        {this.props.value.map((i, index) => {
                            // console.log("index", index)
                            return (
                                <svg id={`heatsquare-${i.id}`}></svg>
                            )
                        })
                        }
                    </div >
                </ScrollSyncPane>

                <div id="heat-axis" />
            </div>
        )
    }
}

export default HeatSquare;