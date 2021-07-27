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
            marginL: 6,
            marginR: 12,
        }
    }

    componentDidMount() {
        console.log("component did mount ")
        this.drawLegend("legend")
        this.drawUpperAxis("upper-axis")
    }

    componentDidUpdate() {
        console.log("component did update")

        this.state.targetList.forEach(d => {
            // console.log(d)
            this.drawHeatSquare(`heatsquare-${d.id}`, d.heatsquaredata)
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

        // left legend
        const colorLegend1 = ["rgba(254, 217, 183,0.2)", "rgba(254, 217, 183,0.6)", "rgba(254, 217, 183,1)"]
        svg.selectAll("rect#color").data(colorLegend1).enter().append("rect").attr("x", (d, i) => i * 25).attr("y", -5)
            .attr("width", 20).attr("height", 15).attr("fill", "white")
        svg.selectAll("rect#color").data(colorLegend1).enter()
            .append("rect").attr("x", (d, i) => i * 25).attr("y", -5).attr("width", 20).attr("height", 15).attr("fill", d => d).attr("stroke", "lightgrey");

        const colorLegend2 = ["rgba(0, 129, 167,0.2)", "rgba(0, 129, 167,0.6)", "rgba(0, 129, 167,1)"]
        svg.selectAll("rect#color").data(colorLegend2).enter()
            .append("rect").attr("x", (d, i) => 100 + i * 25).attr("y", -5).attr("width", 20).attr("height", 15).attr("fill", "white")
        svg.selectAll("rect#color").data(colorLegend2).enter()
            .append("rect").attr("x", (d, i) => 100 + i * 25).attr("y", -5).attr("width", 20).attr("height", 15).attr("fill", d => d).attr("stroke", "lightgrey")

        const colorLegend3 = ["rgba(0, 175, 185,0.2)", "rgba(0, 175, 185,0.6)", "rgba(0, 175, 185,1)"]
        svg.selectAll("rect#color").data(colorLegend3).enter()
            .append("rect").attr("x", (d, i) => 200 + i * 25).attr("y", -5).attr("width", 20).attr("height", 15).attr("fill", "white")
        svg.selectAll("rect#color").data(colorLegend3).enter()
            .append("rect").attr("x", (d, i) => 200 + i * 25).attr("y", -5).attr("width", 20).attr("height", 15).attr("fill", d => d).attr("stroke", "lightgrey")

        // const squareLegend = ["10", "15", "20"]
        // svg.selectAll("rect#square").data(squareLegend).enter()
        //     .append("rect").attr("x", (d, i) => 100 + i * 25).attr("y", d => 2 - 1 / 2 * d)
        //     .attr("width", d => d).attr("height", d => d)
        //     .attr("fill", "white")
        //     .style("stroke-width", 1)
        //     .style("stroke", "#adb5bd")
    }

    drawUpperAxis(container) {
        const { marginL, marginR } = this.state;
        const width = this.state.heatWidth - marginL - marginR

        d3.select("#" + container).selectAll("svg").remove()
        var svg = d3.select("#" + container).append("svg")
            .attr("width", width + marginL)
            .attr("height", "38px")
            .append("g")
            .attr("transform", "translate(" + marginL + ",10)");


        // axis
        const domain = ["IC50", "Ki", "Kd", "Selectivity", "IC50 ", "Ki ", "Kd ", "EC50", "Selectivity ", "hERG", "Solubility", "ED50", "t(1/2)", "AUC", "Bioavail", "Solubility ", "Adverse-I", "Adverse-II", "Adverse-III"]
        var xScale = d3.scaleBand()
            .domain(domain)
            .range([0, width - 5]);

        var xAxis = svg.append("g")
            .attr("transform", "translate(0,10)").call(d3.axisTop(xScale))
            .call(g => {
                g.select(".domain").remove();
                g.selectAll("line").remove();
            })
            .selectAll("text")
            .attr("transform", "translate(-10,20), rotate(-30)")
            .attr("text-anchor", "start")
    }

    drawHeatSquare(container, data) {
        const { marginL, marginR } = this.state;
        const width = this.state.heatWidth - marginL - marginR, height = (this.state.Height) / 3;
        console.log("heat data", data)

        d3.select(`#${container}`).selectAll("svg").remove()
        var svg = d3
            .select(`#${container}`).append("svg")
            .attr("width", width + marginL)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + marginL + ",0)")

        ////////////////////////////////////
        //////////// med chem //////////////
        ////////////////////////////////////
        var svg1 = svg.append("g"), width1 = (width - 10) / 19 * 4, data1 = data.filter((d, i) => i < 4);
        console.log("data1", data1)

        // x scale
        var xDomain = []
        data1.forEach(element => {
            xDomain.push(element.label)
        });
        var xScale = d3.scaleBand().domain(xDomain).range([0, width1]);

        // color scale
        // var colorScale = d3
        //     .scaleSequential()
        //     .interpolator(d3.interpolateGreens)
        //     .domain([0, 10]);
        var colorScale = d3.scaleLinear().domain([0, 10]).range(["rgba(254, 217, 183,0.2)", "rgba(254, 217, 183,1)"])

        // square scale
        var squareScale = d3.scaleLinear().domain([0, 10]).range([0, 0.8 * xScale.bandwidth()])

        // draw heat
        svg1
            .selectAll()
            .data(data1)
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

        // draw line
        for (var i = 0; i < data1.length; i++) {
            var lineData = data1[i].line,
                x = xScale(data1[i].label),
                y = 0;

            var xLineScale = d3
                .scaleLinear()
                .range([x, x + xScale.bandwidth() - 14])
                .domain(d3.extent(lineData, (d) => d.value));

            var yLineScale = d3
                .scaleLinear()
                .range([height - 10, 0])
                .domain([0, 15]); // fixed?

            var line = d3
                .line()
                .x((d) => xLineScale(d.value))
                .y((d) => yLineScale(d.pub))
                .curve(d3.curveMonotoneX);

            svg1
                .append("path")
                .datum(lineData)
                .attr("class", "overview-line")
                .attr("d", line)
                .style("fill", "none")
                .attr("stroke", "#6c757d")
                .attr("stroke-width", 1)
                .attr("transform", "translate(7,0)")
                .style("opacity", 0.7);

            svg1.selectAll()
                .data(lineData)
                .enter()
                .append("circle")
                .attr("cx", (d) => xLineScale(d.value) + 7)
                .attr("cy", (d) => yLineScale(d.pub))
                .attr("r", 1.5)
                .style("fill", "#6c757d")
                .style("opacity", 0.7)

            var min = d3.min(lineData.map(d => d.value)), max = d3.max(lineData.map(d => d.value));
            svg1.append("text").attr("x", x + 5).attr("y", height - 5).text(min).attr("class", "overview-line-text").style("font-size", 10);
            svg1.append("text").attr("x", x + xScale.bandwidth() - 15).attr("y", height - 5).text(max).attr("class", "overview-line-text").style("font-size", 10);
        }

        ////////////////////////////////////
        ////////// pharmocology ////////////
        ////////////////////////////////////
        var svg2 = svg.append("g").attr("transform", "translate(" + ((width - 10) / 19 * 4 + 5) + ",0)");
        var width2 = (width - 10) / 19 * 12, data2 = data.filter((d, i) => i >= 4 && i < 16);
        console.log("data2", data2)

        // x scale
        var xDomain = []
        data2.forEach(element => {
            xDomain.push(element.label)
        });
        var xScale = d3.scaleBand().domain(xDomain).range([0, width2]);

        // color scale
        // var colorScale = d3
        //     .scaleSequential()
        //     .interpolator(d3.interpolateBlues)
        //     .domain([0, 10]);
        var colorScale = d3.scaleLinear().domain([0, 10]).range(["rgba(0, 129, 167,0.2)", "rgba(0, 129, 167,1)"])


        // square scale
        var squareScale = d3.scaleLinear().domain([0, 10]).range([0, 0.8 * xScale.bandwidth()])

        // draw heat
        svg2
            .selectAll()
            .data(data2)
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

        // draw line
        for (var i = 0; i < data2.length; i++) {
            var lineData = data2[i].line,
                x = xScale(data2[i].label),
                y = 0;

            var xLineScale = d3
                .scaleLinear()
                .range([x, x + xScale.bandwidth() - 14])
                .domain(d3.extent(lineData, (d) => d.value));

            var yLineScale = d3
                .scaleLinear()
                .range([height - 10, 0])
                .domain([0, 15]); // fixed?

            var line = d3
                .line()
                .x((d) => xLineScale(d.value))
                .y((d) => yLineScale(d.pub))
                .curve(d3.curveMonotoneX);

            svg2
                .append("path")
                .datum(lineData)
                .attr("class", "overview-line")
                .attr("d", line)
                .style("fill", "none")
                .attr("stroke", "#6c757d")
                .attr("stroke-width", 1)
                .attr("transform", "translate(7,0)")
                .style("opacity", 0.7);

            svg2.selectAll()
                .data(lineData)
                .enter()
                .append("circle")
                .attr("cx", (d) => xLineScale(d.value) + 7)
                .attr("cy", (d) => yLineScale(d.pub))
                .attr("r", 1.5)
                .style("fill", "#6c757d")
                .style("opacity", 0.7)

            var min = d3.min(lineData.map(d => d.value)), max = d3.max(lineData.map(d => d.value));
            svg2.append("text").attr("x", x + 5).attr("y", height - 5).text(min).attr("class", "overview-line-text").style("font-size", 10);
            svg2.append("text").attr("x", x + xScale.bandwidth() - 15).attr("y", height - 5).text(max).attr("class", "overview-line-text").style("font-size", 10);
        }

        ////////////////////////////////////
        ////////// Pharmaceutics ///////////
        ////////////////////////////////////
        var svg3 = svg.append("g").attr("transform", "translate(" + ((width - 10) / 19 * 16 + 10) + ",0)");
        var width2 = (width - 10) / 19 * 3, data3 = data.filter((d, i) => i >= 16);
        console.log("data3", data3)

        // x scale
        var xDomain = []
        data3.forEach(element => {
            xDomain.push(element.label)
        });
        var xScale = d3.scaleBand().domain(xDomain).range([0, width2]);

        // color scale
        // var colorScale = d3
        //     .scaleSequential()
        //     .interpolator(d3.interpolateGreens)
        //     .domain([0, 10]);
        var colorScale = d3.scaleLinear().domain([0, 10]).range(["rgba(0, 175, 185,0.2)", "rgba(0, 175, 185,1)"])

        // square scale
        var squareScale = d3.scaleLinear().domain([0, 10]).range([0, 0.8 * xScale.bandwidth()])

        // draw heat
        svg3
            .selectAll()
            .data(data3)
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

        // draw line
        for (var i = 0; i < data3.length; i++) {
            var lineData = data3[i].line,
                x = xScale(data3[i].label),
                y = 0;

            var xLineScale = d3
                .scaleLinear()
                .range([x, x + xScale.bandwidth() - 14])
                .domain(d3.extent(lineData, (d) => d.value));

            var yLineScale = d3
                .scaleLinear()
                .range([height - 10, 0])
                .domain([0, 15]); // fixed?

            var line = d3
                .line()
                .x((d) => xLineScale(d.value))
                .y((d) => yLineScale(d.pub))
                .curve(d3.curveMonotoneX);

            svg3
                .append("path")
                .datum(lineData)
                .attr("class", "overview-line")
                .attr("d", line)
                .style("fill", "none")
                .attr("stroke", "#6c757d")
                .attr("stroke-width", 1)
                .attr("transform", "translate(7,0)")
                .style("opacity", 0.7);

            svg3.selectAll()
                .data(lineData)
                .enter()
                .append("circle")
                .attr("cx", (d) => xLineScale(d.value) + 7)
                .attr("cy", (d) => yLineScale(d.pub))
                .attr("r", 1.5)
                .style("fill", "#6c757d")
                .style("opacity", 0.7)

            var min = d3.min(lineData.map(d => d.value)), max = d3.max(lineData.map(d => d.value));
            svg3.append("text").attr("x", x + 5).attr("y", height - 5).text(min).attr("class", "overview-line-text").style("font-size", 10);
            svg3.append("text").attr("x", x + xScale.bandwidth() - 15).attr("y", height - 5).text(max).attr("class", "overview-line-text").style("font-size", 10);
        }

        // draw square
        // svg.selectAll()
        //     .data(data)
        //     .enter()
        //     .append("rect")
        //     .attr("x", (d) => {
        //         // console.log("x:", xScale(d.label) + 0.5 * (xScale.bandwidth() - squareScale(d.svalue)))
        //         return xScale(d.label) + 0.5 * (xScale.bandwidth() - squareScale(d.svalue))
        //     })
        //     .attr("y", d => 0.5 * (height - squareScale(d.svalue)))
        //     .attr("width", d => squareScale(d.svalue))
        //     .attr("height", d => squareScale(d.svalue))
        //     .attr("fill", "white")
        //     .style("stroke-width", 1)
        //     .style("stroke", "#adb5bd");

    }




    render() {
        return (
            <div>
                <div className="row" style={{ backgroundColor: "#e9ecef", margin: "5px", height: "24px" }}  >
                    <div className="col-3 pl-1">
                        <p>Overview</p>
                    </div>
                    <div className="col-5"></div>
                    <div className="col-4" id="legend">
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