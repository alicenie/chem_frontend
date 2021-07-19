import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import * as d3 from "d3";
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

class HeatSquare extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Height: this.props.height - 75,
            heatWidth: this.props.width,
            targetList: this.props.value,
            marginL: 10,
            marginR: 20,
        }
    }

    componentDidMount() {
        console.log("component did mount ")
        this.drawLegend("legend")
        this.drawUpperAxis("upper-axis")
        // this.drawLowerAxis("lower-axis")
    }

    componentDidUpdate() {
        console.log("component did update")

        this.state.targetList.forEach(d => {
            // console.log(d)
            this.drawHeatSquare(`heatsquare-${d.id}`, d.heatsquaredata)
        })
    }

    drawLegend(container) {
        const { marginL, marginR } = this.state;
        const width = this.state.heatWidth - marginL - marginR

        d3.select("#" + container).selectAll("svg").remove()
        var svg = d3.select("#" + container).append("svg")
            .attr("width", width + marginL)
            .attr("height", "80px")
            .append("g")
            .attr("transform", "translate(0 ,10)");

        // legend
        const colorLegend = ["#a9d6e5", "#468faf", "#01497c"]
        svg.selectAll("rect#color").data(colorLegend).enter()
            .append("rect").attr("x", (d, i) => i * 25).attr("y", -5).attr("width", 20).attr("height", 15).attr("fill", d => d)

        const squareLegend = ["10", "15", "20"]
        svg.selectAll("rect#square").data(squareLegend).enter()
            .append("rect").attr("x", (d, i) => 100 + i * 25).attr("y", d => 2 - 1 / 2 * d)
            .attr("width", d => d).attr("height", d => d)
            .attr("fill", "white")
            .style("stroke-width", 1)
            .style("stroke", "#adb5bd")
    }

    drawUpperAxis(container) {
        const { marginL, marginR } = this.state;
        const width = this.state.heatWidth - marginL - marginR

        d3.select("#" + container).selectAll("svg").remove()
        var svg = d3.select("#" + container).append("svg")
            .attr("width", width + marginL)
            .attr("height", "25px")
            .append("g")
            .attr("transform", "translate(" + marginL + ",10)");


        // axis
        const domain = ["IC50", "IG-m", "Kd-m", "Selectivity", "IC50-v", "IG-v", "Kd-v", "EC50", "Selectivity-v", "hERG", "solubility", "ED50", "Pharmacokinetic", "solubility-3"]
        var xScale = d3.scaleBand()
            .domain(domain)
            .range([0, width - 5]);

        var xAxis = svg.append("g")
            .attr("transform", "translate(0,10)").call(d3.axisTop(xScale))
            .call(g => {
                g.select(".domain").remove();
                g.selectAll("line").remove();
            });
    }

    drawHeatSquare(container, data) {
        const { marginL, marginR } = this.state;
        const width = this.state.heatWidth - marginL - marginR, height = (this.state.Height) / 3;
        // console.log("height", height)
        d3.select(`#${container}`).selectAll("svg").remove()
        var svg = d3
            .select(`#${container}`).append("svg")
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
            .style("stroke", "#adb5bd");

    }

    // drawLowerAxis(container) {
    //     const { marginL, marginR } = this.state;
    //     const width = this.state.heatWidth - marginL - marginR

    //     d3.select("#" + container).selectAll("svg").remove()
    //     var svg = d3.select("#" + container).append("svg")
    //         .attr("width", width + marginL)
    //         .attr("height", "40px")
    //         .append("g")
    //         .attr("transform", "translate(" + marginL + ",10)");

    //     // medicinical chemistry
    //     const medchemWidth = width / 15 * 3
    //     svg.append("rect")
    //         .attr("x", 0)
    //         .attr("y", 0)
    //         .attr("width", medchemWidth)
    //         .attr("height", 20)
    //         .style("fill", "#cce3de")
    //         .style("opacity", 0.5)
    //         .attr("rx", 5)
    //         .attr("ry", 5)
    //         .style("stroke-width", 2)
    //         .style("stroke", "#ced4da")
    //     svg.append("text")
    //         .attr("x", 1 / 2 * medchemWidth)
    //         .attr("y", 14)
    //         .attr("text-anchor", "middle")
    //         .text("Medicinical Chemistry")
    //         .style("fill", "black")
    //         .style("font-size", 13);

    //     // Vitro
    //     const vitroX = medchemWidth, vitroWidth = width / 15 * 4
    //     svg.append("rect")
    //         .attr("x", vitroX)
    //         .attr("y", 0)
    //         .attr("width", vitroWidth)
    //         .attr("height", 20)
    //         .style("fill", "#ecf8f8")
    //         .style("opacity", 0.5)
    //         .attr("rx", 5)
    //         .attr("ry", 5)
    //         .style("stroke-width", 2)
    //         .style("stroke", "#ced4da")
    //     svg.append("text")
    //         .attr("x", vitroX + 1 / 2 * vitroWidth)
    //         .attr("y", 14)
    //         .attr("text-anchor", "middle")
    //         .text("Vitro")
    //         .style("fill", "black")
    //         .style("font-size", 13);;

    //     // Vivo
    //     const vivoX = vitroX + vitroWidth, vivoWidth = width / 15 * 2
    //     svg.append("rect")
    //         .attr("x", vivoX)
    //         .attr("y", 0)
    //         .attr("width", vivoWidth)
    //         .attr("height", 20)
    //         .style("fill", "#ecf8f8")
    //         .style("opacity", 0.5)
    //         .attr("rx", 5)
    //         .attr("ry", 5)
    //         .style("stroke-width", 2)
    //         .style("stroke", "#ced4da")
    //     svg.append("text")
    //         .attr("x", vivoX + 1 / 2 * vivoWidth)
    //         .attr("y", 14)
    //         .attr("text-anchor", "middle")
    //         .text("Vivo")
    //         .style("fill", "black")
    //         .style("font-size", 13);

    //     // Pharmocology
    //     svg.append("text")
    //         .attr("x", 1 / 2 * (vitroX + 1 / 2 * vitroWidth + vivoX + 1 / 2 * vivoWidth))
    //         .attr("y", 25)
    //         .attr("text-anchor", "middle")
    //         .text("Pharmocology")
    //         .style("font-size", 13)

    //     // Ph I
    //     const ph1X = vivoX + vivoWidth, ph1Width = width / 15 * 2
    //     svg.append("rect")
    //         .attr("x", ph1X)
    //         .attr("y", 0)
    //         .attr("width", ph1Width)
    //         .attr("height", 20)
    //         .style("fill", "#fff8e8")
    //         .style("opacity", 0.5)
    //         .attr("rx", 5)
    //         .attr("ry", 5)
    //         .style("stroke-width", 2)
    //         .style("stroke", "#ced4da")
    //     svg.append("text")
    //         .attr("x", ph1X + 1 / 2 * ph1Width)
    //         .attr("y", 14)
    //         .attr("text-anchor", "middle")
    //         .text("I")
    //         .style("fill", "black")
    //         .style("font-size", 13);

    //     // Ph II
    //     const ph2X = ph1X + ph1Width, ph2Width = width / 15 * 2
    //     svg.append("rect")
    //         .attr("x", ph2X)
    //         .attr("y", 0)
    //         .attr("width", ph2Width)
    //         .attr("height", 20)
    //         .style("fill", "#fff8e8")
    //         .style("opacity", 0.5)
    //         .attr("rx", 5)
    //         .attr("ry", 5)
    //         .style("stroke-width", 2)
    //         .style("stroke", "#ced4da")
    //     svg.append("text")
    //         .attr("x", ph2X + 1 / 2 * ph2Width)
    //         .attr("y", 14)
    //         .attr("text-anchor", "middle")
    //         .text("II")
    //         .style("fill", "black")
    //         .style("font-size", 13);

    //     // Ph III
    //     const ph3X = ph2X + ph2Width, ph3Width = width / 15 * 2
    //     svg.append("rect")
    //         .attr("x", ph3X)
    //         .attr("y", 0)
    //         .attr("width", ph3Width)
    //         .attr("height", 20)
    //         .style("fill", "#fff8e8")
    //         .style("opacity", 0.5)
    //         .attr("rx", 5)
    //         .attr("ry", 5)
    //         .style("stroke-width", 2)
    //         .style("stroke", "#ced4da")
    //     svg.append("text")
    //         .attr("x", ph3X + 1 / 2 * ph3Width)
    //         .attr("y", 14)
    //         .attr("text-anchor", "middle")
    //         .text("III")
    //         .style("fill", "black").style("font-size", 13);

    //     // Pharmaceutics
    //     svg.append("text")
    //         .attr("x", ph2X + 1 / 2 * ph2Width)
    //         .attr("y", 25)
    //         .attr("text-anchor", "middle")
    //         .text("Pharmaceutics")
    //         .style("font-size", 13);

    // }

    render() {
        return (
            <div>
                <div className="row" style={{ backgroundColor: "#e9ecef", margin: "5px", height: "24px" }}  >
                    <div className="col-3 pl-1">
                        <p>Overview</p>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-3" id="legend">
                    </div>
                </div>
                <div id="upper-axis"></div>
                <ScrollSyncPane>
                    <div style={{ height: this.state.Height, overflow: "auto" }}>
                        {this.props.value.map((i, index) => {
                            // console.log("index", index)
                            return (
                                <div id={`heatsquare-${i.id}`}></div>
                            )
                        })
                        }
                    </div >
                </ScrollSyncPane>
                {/* <div id="lower-axis" /> */}
            </div>
        )
    }
}

export default HeatSquare;