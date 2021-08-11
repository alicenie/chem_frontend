import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import * as d3 from "d3";
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import AddColumn from './AddColumn';

const domains = [
    { text: "IC50_MC", label: "IC50", unit: "nM", area: 1, index: 1, remark: "the less the better" },
    { text: "Ki_MC", label: "Ki", unit: "nM", area: 1, index: 2, remark: "the less the better" },
    { text: "Kd_MC", label: "Kd", unit: "nM", area: 1, index: 3, remark: "the less the better" },
    { text: "Selectivity_MC", label: "Selectivity", unit: "fold", area: 1, index: 4, remark: "the more the better" },
    { text: "IC50_Ph", label: "IC50", unit: "nM", area: 2, index: 5, remark: "the less the better" },
    { text: "Ki_Ph", label: "Ki", unit: "nM", area: 2, index: 6, remark: "the less the better" },
    { text: "Kd_Ph", label: "Kd", unit: "nM", area: 2, index: 7, remark: "the less the better" },
    { text: "EC50_Ph", label: "EC50", unit: "nM", area: 2, index: 8, remark: "the less the better" },
    { text: "Selectivity_Ph", label: "Selectivity", unit: "fold", area: 2, index: 9, remark: "the more the better" },
    { text: "hERG_Ph", label: "hERG", unit: "nM", area: 2, index: 10, remark: "the more the better" },
    { text: "solubility_Ph", label: "Solubility", unit: "µg/mL", area: 2, index: 11, remark: "the more the better" },
    { text: "ED50_Cl", label: "ED50", unit: "µg/animal", area: 2, index: 12, remark: "the more the better" },
    { text: "thalf_Cl", label: "t 1/2", unit: "h", area: 2, index: 13, remark: "depend on indication" },
    { text: "AUC_Cl", label: "AUC", unit: "ng•h/mL", area: 2, index: 14, remark: "the more the better" },
    { text: "bio_Cl", label: "Bioavailability", unit: "%", area: 2, index: 15, remark: "the more the better" },
    { text: "solubility_Cl", label: "Solubility", unit: "µg/mL", area: 2, index: 16, remark: "the more the better" },
    { text: "adverse_1", label: "Adverse Effects-I", unit: "%", area: 3, index: 17, remark: "the less the better" },
    { text: "adverse_2", label: "Adverse Effects-II", unit: "%", area: 3, index: 18, remark: "the less the better" },
    { text: "adverse_3", label: "Adverse Effects-III", unit: "%", area: 3, index: 19, remark: "the less the better" },
]

class HeatSquare extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Height: this.props.height - 75,
            heatWidth: this.props.width,
            targetList: this.props.value,
            marginL: 6,
            marginR: 12,
            removedAttr: [],
            test: [],
            curAttr: domains
        }
    }

    componentDidMount() {
        console.log("component did mount ")
        this.drawLegend("legend")

    }

    componentDidUpdate() {
        console.log("overview component did update")

        this.drawUpperAxis("upper-axis")

        if (this.props.value.length) d3.selectAll("svg#upper-axis").style("opacity", 1);
        else d3.selectAll("svg#upper-axis").style("opacity", 0);

        // get xscale for each col
        let line_domains = {};
        let without_log = ["adverse_1", "adverse_2", "adverse_3", "bio_Cl"];
        this.props.value.forEach(d => {
            if (Object.keys(line_domains).length === 0)
                Object.keys(d.metrics_distribution).forEach(key => {
                    line_domains[key] = [...d.metrics_distribution[key].map(d => {
                        if (key === "thalf_Cl") return d
                        d = Math.floor(Math.log10(d))
                        // return d + d % 2
                        return d
                    })];
                })
            else
                Object.keys(d.metrics_distribution).forEach(key => {
                    line_domains[key] = line_domains[key].concat(d.metrics_distribution[key].map(d => {
                        if (key === "thalf_Cl") return Math.floor(d)
                        d = Math.floor(Math.log10(d))
                        return d
                    }));
                })
        })
        without_log.forEach(key => line_domains[key] = [0, 100])
        console.log("line_domains", line_domains)

        this.props.value.forEach(d => {
            // console.log(d)
            // if (Object.keys(d).indexOf("metrics_paper_count" > -1)) 
            this.drawHeatSquare(`heatsquare-${d.id}`, d["metrics_paper_count"], d["metrics_distribution"], line_domains)
            // else this.drawHeatSquare(`heatsquare-${d.id}`, d.heatsquaredata)
        })
    }

    drawLegend(container) {
        const { marginL, marginR } = this.state;
        const width = this.state.heatWidth - marginL - marginR

        d3.select("#" + container).selectAll("svg").remove()
        var svg = d3.select("#" + container).append("svg")
            .attr("width", width + marginL)
            .attr("height", "40px")
            .append("g")
            .attr("transform", "translate(20 ,4)");

        svg.append("text")
            .text("number of publication:")
            .attr("x", -20)
            .attr("y", 12)
            .attr("font-size", 12);


        const colors = [["#FDEBEB", "#E78A8A"], ["#DAEAF0", "#76B7CB"], ["#E5E5F8", "#AEAED3"]],
            text = [120, 120, 520];
        colors.forEach((color, i) => {
            var linearGradient = svg.append("defs").append("linearGradient")
                .attr("id", `linear-gradient-${i}`);

            linearGradient
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "100%")
                .attr("y2", "0%");

            //Set the color for the start (0%)
            linearGradient.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", colors[i][0]);

            //Set the color for the end (100%)
            linearGradient.append("stop")
                .attr("offset", "100%")
                .attr("stop-color", colors[i][1]);

            // svg.append("rect")
            //     .attr("width", 40)
            //     .attr("height", 16)
            //     .style("fill", "white")
            //     .attr("x", 115 + i * 80)
            //     .attr("y", 0);
            svg.append("rect")
                .attr("width", 40)
                .attr("height", 16)
                .style("fill", `url(#linear-gradient-${i})`)
                .attr("x", 115 + i * 80)
                .attr("y", 0)
            // .attr("stroke-width", 0.5)
            // .attr("stroke", "#adb5bd");

            // text
            svg.append("text")
                .attr("x", 105 + i * 80)
                .attr("y", 12)
                .text("0")
                .style("font-size", 12)

            svg.append("text")
                .attr("x", 155 + i * 80)
                .attr("y", 12)
                .text(text[i])
                .style("font-size", 12)
        })
    }

    drawUpperAxis(container) {
        const { marginL, marginR } = this.state;
        const width = this.state.heatWidth - marginL - marginR

        d3.select("#" + container).selectAll("svg").remove()
        d3.selectAll("#upper-axis-tooltip").style("display", "none")
        var svg = d3.select("#" + container).append("svg")
            .attr("width", width + marginL)
            .attr("height", "26px")
            .attr("id", "upper-axis")
            .style("opacity", 0)
            .append("g")
            .attr("transform", "translate(" + marginL + ",20) ");

        // set tooltips
        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .attr("id", "upper-axis-tooltip")
            .style("opacity", 0.9)
            .style("display", "none");

        var num_attr = this.state.curAttr.length
        var num_character = 5 + (19 - num_attr);
        var num_character_unit = 3 + (19 - num_attr);

        /////// med chem ////////
        var svg1 = svg.append("g"), attr1 = this.state.curAttr.filter((d) => d.area === 1);
        var width1 = (width - 10) / num_attr * attr1.length;
        // x scale
        var xDomain1 = [];
        attr1.forEach(element => {
            xDomain1.push(element.text)
        });
        var xScale1 = d3.scaleBand().domain(xDomain1).range([0, width1]);
        svg1
            .selectAll()
            .data(attr1)
            .enter()
            .append("text")
            .text(d => {
                let attr = d.label;
                if (attr.length > num_character) return attr.substr(0, num_character) + ".."
                else return attr
            })
            .attr("x", (d) => {
                return xScale1(d.text) + xScale1.bandwidth() / 2
            })
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .style("font-size", 10)
            .style("cursor", "default")
            .on("mouseover", (event, d) => {
                // if (d.label.length > num_character) {
                tooltip.transition().duration(200).style("display", "block");
                tooltip
                    .html(
                        `<span class="overview-hover">${d.label} (${d.remark})</span>`
                    )
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
                // }
            })
            .on("mousemove", (event, d) => {
                tooltip
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
            })
            .on("mouseout", (event, d) => {
                tooltip.transition().duration(200).style("display", "none");
            })

        // svg1
        //     .selectAll()
        //     .data(attr1)
        //     .enter()
        //     .append("text")
        //     .text(d => {
        //         let unit = d.unit;
        //         if (unit.length > num_character_unit) return "(" + unit.substr(0, num_character_unit) + "..)"
        //         else return "(" + unit + ")"
        //     })
        //     .attr("x", (d) => {
        //         return xScale1(d.text) + xScale1.bandwidth() / 2
        //     })
        //     .attr("y", 11)
        //     .attr("text-anchor", "middle")
        //     .style("font-size", 10)
        //     .style("cursor", "default")
        //     .on("mouseover", (event, d) => {
        //         if (d.unit.length > num_character_unit) {
        //             tooltip.transition().duration(200).style("display", "block");
        //             tooltip
        //                 .html(
        //                     `<span class="overview-hover">${d.unit}</span>`
        //                 )
        //                 .style("left", event.pageX + 10 + "px")
        //                 .style("top", event.pageY + 10 + "px");
        //         }
        //     })
        //     .on("mousemove", (event, d) => {
        //         tooltip
        //             .style("left", event.pageX + 10 + "px")
        //             .style("top", event.pageY + 10 + "px");
        //     })
        //     .on("mouseout", (event, d) => {
        //         tooltip.transition().duration(200).style("display", "none");
        //     })

        svg1
            .selectAll("path#cross")
            .data(attr1)
            .enter()
            .append("g")
            .attr("transform", d => "translate(" + (xScale1(d.text) + xScale1.bandwidth() - 5) + ",-3), rotate(45)")
            .append("path")
            .attr("d", d3.symbol().type(d3.symbolCross).size(40)())
            .style("fill", "#c1c1c1")
            .style("stroke-width", 1)
            .style("cursor", "pointer")
            .on("click", (event, attr) => {
                console.log("attr click", attr)
                this.handleRemoveAttr(attr)
            })
            .on("mouseover", (event, d) => {
                tooltip.transition().duration(200).style("display", "block");
                tooltip
                    .html(
                        `<span class="overview-hover">remove column</span>`
                    )
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
            })
            .on("mousemove", (event, d) => {
                tooltip
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
            })
            .on("mouseout", (event, d) => {
                tooltip.transition().duration(200).style("display", "none");
            })


        /////// ph ////////
        var svg2 = svg.append("g").attr("transform", "translate(" + (width1 + 5) + ",0)");
        var attr2 = this.state.curAttr.filter((d) => d.area === 2);
        var width2 = (width - 10) / num_attr * attr2.length;
        // x scale
        var xDomain2 = [];
        attr2.forEach(element => {
            xDomain2.push(element.text)
        });
        var xScale2 = d3.scaleBand().domain(xDomain2).range([0, width2]);
        svg2
            .selectAll()
            .data(attr2)
            .enter()
            .append("text")
            .text(d => {
                let attr = d.label;
                if (attr.length > num_character) return attr.substr(0, num_character) + ".."
                else return attr
            })
            .attr("x", (d) => {
                return xScale2(d.text) + xScale2.bandwidth() / 2
            })
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .style("font-size", 10)
            .style("cursor", "default")
            .on("click", (event, attr) => {
                console.log("attr click", attr)
                this.handleRemoveAttr(attr)
            })
            .on("mouseover", (event, d) => {
                // if (d.label.length > num_character) {
                tooltip.transition().duration(200).style("display", "block");
                tooltip
                    .html(
                        `<span class="overview-hover">${d.label} (${d.remark})</span>`
                    )
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
                // }
            })
            .on("mousemove", (event, d) => {
                tooltip
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
            })
            .on("mouseout", (event, d) => {
                tooltip.transition().duration(200).style("display", "none");
            })

        // svg2
        //     .selectAll()
        //     .data(attr2)
        //     .enter()
        //     .append("text")
        //     .text(d => {
        //         let unit = d.unit;
        //         if (unit.length > num_character_unit) return "(" + unit.substr(0, num_character_unit) + "..)"
        //         else return "(" + unit + ")"
        //     })
        //     .attr("x", (d) => {
        //         return xScale2(d.text) + xScale2.bandwidth() / 2
        //     })
        //     .attr("y", 11)
        //     .attr("text-anchor", "middle")
        //     .style("font-size", 10)
        //     .style("cursor", "default")
        //     .on("mouseover", (event, d) => {
        //         if (d.unit.length > num_character_unit) {
        //             tooltip.transition().duration(200).style("display", "block");
        //             tooltip
        //                 .html(
        //                     `<span class="overview-hover">${d.unit}</span>`
        //                 )
        //                 .style("left", event.pageX + 10 + "px")
        //                 .style("top", event.pageY + 10 + "px");
        //         }
        //     })
        //     .on("mousemove", (event, d) => {
        //         tooltip
        //             .style("left", event.pageX + 10 + "px")
        //             .style("top", event.pageY + 10 + "px");
        //     })
        //     .on("mouseout", (event, d) => {
        //         tooltip.transition().duration(200).style("display", "none");
        //     })

        svg2
            .selectAll("path#cross")
            .data(attr2)
            .enter()
            .append("g")
            .attr("transform", d => "translate(" + (xScale2(d.text) + xScale2.bandwidth() - 5) + ",-3), rotate(45)")
            .append("path")
            .attr("d", d3.symbol().type(d3.symbolCross).size(40)())
            .style("fill", "#c1c1c1")
            .style("stroke-width", 1)
            .style("cursor", "pointer")
            .on("click", (event, attr) => {
                console.log("attr click", attr)
                this.handleRemoveAttr(attr)
            })
            .on("mouseover", (event, d) => {
                tooltip.transition().duration(200).style("display", "block");
                tooltip
                    .html(
                        `<span class="overview-hover">remove column</span>`
                    )
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
            })
            .on("mousemove", (event, d) => {
                tooltip
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
            })
            .on("mouseout", (event, d) => {
                tooltip.transition().duration(200).style("display", "none");
            })

        /////// 3 ////////
        var svg3 = svg.append("g").attr("transform", "translate(" + (width1 + width2 + 10) + ",0)");
        var attr3 = this.state.curAttr.filter((d) => d.area === 3);
        var width3 = (width - 10) / num_attr * attr3.length;
        // x scale
        var xDomain3 = [];
        attr3.forEach(element => {
            xDomain3.push(element.text)
        });
        var xScale3 = d3.scaleBand().domain(xDomain3).range([0, width3]);
        svg3
            .selectAll()
            .data(attr3)
            .enter()
            .append("text")
            .text(d => {
                let attr = d.label;
                if (attr.length > num_character) return attr.substr(0, num_character) + ".."
                else return attr
            })
            .attr("x", (d) => {
                return xScale3(d.text) + xScale3.bandwidth() / 2
            })
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .style("font-size", 10)
            .style("cursor", "default")
            .on("click", (event, attr) => {
                console.log("attr click", attr)
                this.handleRemoveAttr(attr)
            })
            .on("mouseover", (event, d) => {
                // if (d.label.length > num_character) {
                tooltip.transition().duration(200).style("display", "block");
                tooltip
                    .html(
                        `<span class="overview-hover">${d.label} (${d.remark})</span>`
                    )
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
                // }
            })
            .on("mousemove", (event, d) => {
                tooltip
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
            })
            .on("mouseout", (event, d) => {
                tooltip.transition().duration(200).style("display", "none");
            })

        // svg3
        //     .selectAll()
        //     .data(attr3)
        //     .enter()
        //     .append("text")
        //     .text(d => {
        //         let unit = d.unit;
        //         if (unit.length > num_character_unit) return "(" + unit.substr(0, num_character_unit) + "..)"
        //         else return "(" + unit + ")"
        //     })
        //     .attr("x", (d) => {
        //         return xScale3(d.text) + xScale3.bandwidth() / 2
        //     })
        //     .attr("y", 11)
        //     .attr("text-anchor", "middle")
        //     .style("font-size", 10)
        //     .style("cursor", "default")
        //     .on("mouseover", (event, d) => {
        //         if (d.unit.length > num_character_unit) {
        //             tooltip.transition().duration(200).style("display", "block");
        //             tooltip
        //                 .html(
        //                     `<span class="overview-hover">${d.unit}</span>`
        //                 )
        //                 .style("left", event.pageX + 10 + "px")
        //                 .style("top", event.pageY + 10 + "px");
        //         }
        //     })
        //     .on("mousemove", (event, d) => {
        //         tooltip
        //             .style("left", event.pageX + 10 + "px")
        //             .style("top", event.pageY + 10 + "px");
        //     })
        //     .on("mouseout", (event, d) => {
        //         tooltip.transition().duration(200).style("display", "none");
        //     })

        svg3
            .selectAll("path#cross")
            .data(attr3)
            .enter()
            .append("g")
            .attr("transform", d => "translate(" + (xScale3(d.text) + xScale3.bandwidth() - 5) + ",-3), rotate(45)")
            .append("path")
            .attr("d", d3.symbol().type(d3.symbolCross).size(40)())
            .style("fill", "#c1c1c1")
            .style("stroke-width", 1)
            .style("cursor", "pointer")
            .on("click", (event, attr) => {
                console.log("attr click", attr)
                this.handleRemoveAttr(attr)
            })
            .on("mouseover", (event, d) => {
                tooltip.transition().duration(200).style("display", "block");
                tooltip
                    .html(
                        `<span class="overview-hover">remove column</span>`
                    )
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
            })
            .on("mousemove", (event, d) => {
                tooltip
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
            })
            .on("mouseout", (event, d) => {
                tooltip.transition().duration(200).style("display", "none");
            })
    }

    drawHeatSquare(container, count = null, distribution = null, line_domains = {}) {
        var curAttrText = this.state.curAttr.map(d => d.text);
        var lineColor = "#8a8a8a"
        let data = [];
        let without_log = ["adverse_1", "adverse_2", "adverse_3", "bio_Cl"];
        // handle real data
        if (count !== null && distribution !== null) {
            let temp_line = {}
            for (const [key, line_array] of Object.entries(distribution)) {
                if (curAttrText.indexOf(key) > -1) {
                    let counts = {} // { value: pub }
                    let extent = d3.extent(line_array)
                    line_array.forEach(d => {
                        if (key === "thalf_Cl") {
                            if (extent.indexOf(d) === -1)
                                d = Math.floor((d - extent[0]) / 5) * 5 + extent[0]
                            else d = d
                        }
                        else if (key === "bio_Cl") {
                            if (extent.indexOf(d) === -1)
                                d = Math.floor((d - extent[0]) / 10) * 10 + extent[0]
                            else d = d
                        }
                        else if (without_log.indexOf(key) === -1) {
                            d = Math.floor(Math.log10(d))
                            // d = d + d % 2
                        }
                        else {
                            if (extent.indexOf(d) === -1)
                                d = Math.floor((d - extent[0]) * 10) * 10 + Math.floor(extent[0] * 100)
                            else d = Math.floor(d * 100)
                        }
                        counts[d] = counts[d] ? counts[d] + 1 : 1;
                    })
                    let line = []; // [{value,pub}]
                    Object.keys(counts).forEach(d => line.push({ value: parseFloat(d), pub: counts[d] }))
                    line.sort((a, b) => a.value - b.value)
                    temp_line[key] = line; // already log
                    // console.log("LIne", line)
                }
            }

            for (const [key, value] of Object.entries(count)) {
                if (curAttrText.indexOf(key) > -1) {
                    data.push({
                        label: key,
                        hvalue: value,
                        line: temp_line[key],
                        area: this.state.curAttr.filter(d => d.text === key)[0].area,
                        unit: this.state.curAttr.filter(d => d.text === key)[0].unit,
                        tooltip_label: this.state.curAttr.filter(d => d.text === key)[0].label
                    })
                }
            }
            console.log("overview data", data)
        }

        const { marginL, marginR } = this.state;
        const width = this.state.heatWidth - marginL - marginR, height = (this.state.Height) / 3;
        console.log("heat data", data)

        var num_attr = data.length;

        d3.select(`#${container}`).selectAll("svg").remove()
        var svg = d3
            .select(`#${container}`).append("svg")
            .attr("width", width + marginL)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + marginL + ",0)")

        // set tooltips
        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .attr("id", "upper-axis-tooltip")
            .style("opacity", 0.9)
            .style("display", "none");

        ////////////////////////////////////
        //////////// med chem //////////////
        ////////////////////////////////////
        var svg1 = svg.append("g"), data1 = data.filter((d) => d.area === 1);
        var width1 = (width - 10) / num_attr * data1.length;
        console.log("data1", data1)

        // x scale
        var xDomain1 = []
        data1.forEach(element => {
            xDomain1.push(element.label)
        });
        var xScale1 = d3.scaleBand().domain(xDomain1).range([0, width1]);

        // color scale
        // var colorScale = d3
        //     .scaleSequential()
        //     .interpolator(d3.interpolateGreens)
        //     .domain([0, 10]);
        // var colorScale = d3.scaleLinear().domain([0, 10]).range(["rgba(240, 128, 128,0.2)", "rgba(240, 128, 128,1)"])
        // var colorScale = d3.scaleOrdinal().domain([0, 10]).range(["#F3C8C8", "#EBA9A0", "#EB9489", "#E78276", "#D86E63"])
        // var colorScale = d3.scaleOrdinal().domain([0, 10]).range(["#FDEBEB", "#F8DADA", "#F2CACA", "#EDBABA", "#E2A7A7", "#DD9696"])  // light red
        var colorScale = d3.scaleQuantize().domain([0, 120]).range(["#FDEBEB", "#F8DADA", "#F2BFBF", "#F2B1B1", "#F09C9C", "#E78A8A"])  // brighter red

        // square scale
        var squareScale = d3.scaleLinear().domain([0, 10]).range([0, 0.8 * xScale1.bandwidth()])

        // draw heat
        svg1
            .selectAll()
            .data(data1)
            .enter()
            .append("rect")
            .attr("x", (d) => {
                // console.log("x:", xScale1(d.label))
                return xScale1(d.label)
            })
            .attr("y", "0")
            .attr("width", xScale1.bandwidth())
            .attr("height", height)
            .attr("fill", (d) => d.hvalue === 0 ? "white" : colorScale(d.hvalue))
            .style("opacity", 0.8)
            .style("stroke-width", 1)
            .style("stroke", "white");

        // add number of publication
        svg1
            .selectAll()
            .data(data1)
            .enter()
            .append("text")
            .text(d => "num:" + d.hvalue)
            .attr("x", (d) => {
                return xScale1(d.label) + xScale1.bandwidth() - 29
            })
            .attr("y", "10")
            .attr("fill", "black")
            .attr("font-size", 7)

        // draw line
        for (var i = 0; i < data1.length; i++) {
            let lineData = data1[i].line,
                unit = data1[i].unit,
                tooltip_label = data1[i].tooltip_label,
                x = xScale1(data1[i].label),
                y = 0;
            // console.log("lineData", lineData)
            if (lineData.length) {
                let xLineScale = d3
                    .scaleLinear()
                    .range([x, x + xScale1.bandwidth() - 14])
                    // .domain([0, 12])
                    .domain(d3.extent(line_domains[data1[i].label]))
                // .map(d => Math.log(d))))
                // .domain(d3.extent(lineData, (d) => d.value));

                let yLineScale = d3
                    .scaleLinear()
                    .range([height - 10, 0])
                    .domain([0, 40]); // fixed?

                let line = d3
                    .line()
                    .x((d) => xLineScale(d.value))
                    // .x((d) => xLineScale(Math.log(d.value)))
                    .y((d) => yLineScale(d.pub))
                // .curve(d3.curveMonotoneX);

                svg1
                    .append("path")
                    .datum(lineData)
                    .attr("class", "overview-line")
                    .attr("d", line)
                    .style("fill", "none")
                    .attr("stroke", lineColor)
                    // .attr("stroke", "white")
                    .attr("stroke-width", 1)
                    .attr("transform", "translate(7,0)")
                    .style("opacity", 0.7);

                let min = d3.min(lineData.map(d => d.value)), max = d3.max(lineData.map(d => d.value));
                svg1.selectAll()
                    // .data(lineData.filter(d => d.value === min || d.value === max))
                    .data(lineData)
                    .enter()
                    .append("circle")
                    // .attr("cx", (d) => xLineScale(Math.log(d.value)) + 7)
                    .attr("cx", (d) => xLineScale(d.value) + 7)
                    .attr("cy", (d) => yLineScale(d.pub))
                    .attr("r", 2)
                    .style("fill", lineColor)
                    // .style("fill", "white")
                    .style("opacity", 0.7)
                    .on("mouseover", (event, d) => {
                        tooltip.transition().duration(200).style("display", "block");
                        tooltip
                            .html(
                                `<span class="overview-hover">log ${tooltip_label}: </span><span class="overview-hover">${d.value} ${unit}</span><br/>
                            <span class="overview-hover">number of publication: </span><span class="overview-hover">${d.pub}</span><br/>`
                            )
                            .style("left", event.pageX + 10 + "px")
                            .style("top", event.pageY + 10 + "px");
                    })
                    .on("mousemove", (event, d) => {
                        tooltip
                            .style("left", event.pageX + 10 + "px")
                            .style("top", event.pageY + 10 + "px");
                    })
                    .on("mouseout", (event, d) => {
                        tooltip.transition().duration(200).style("display", "none");
                    })

                // svg1.append("text").attr("x", xLineScale(Math.log(min)) + 5).attr("y", height - 5).text(Math.floor(Math.log(min))).attr("class", "overview-line-text").style("font-size", 7).style("fill", lineColor).attr("text-anchor", "middle");
                // svg1.append("text").attr("x", xLineScale(Math.log(max)) + 5).attr("y", height - 5).text(Math.floor(Math.log(max))).attr("class", "overview-line-text").style("font-size", 7).attr("text-anchor", "middle");
                svg1.append("text").attr("x", xLineScale(min) + 7).attr("y", height - 5).text(Math.floor(min)).attr("class", "overview-line-text").style("font-size", 7).style("fill", lineColor).attr("text-anchor", "middle").attr("cursor", "default");
                svg1.append("text").attr("x", xLineScale(max) + 7).attr("y", height - 5).text(Math.floor(max)).attr("class", "overview-line-text").style("font-size", 7).attr("text-anchor", "middle").attr("cursor", "default");
            }
        }

        ////////////////////////////////////
        ////////// pharmocology ////////////
        ////////////////////////////////////
        var svg2 = svg.append("g").attr("transform", "translate(" + (width1 + 5) + ",0)");
        var data2 = data.filter((d) => d.area === 2);
        var width2 = (width - 10) / num_attr * data2.length;
        console.log("data2", data2)

        // x scale
        var xDomain2 = []
        data2.forEach(element => {
            xDomain2.push(element.label)
        });
        var xScale2 = d3.scaleBand().domain(xDomain2).range([0, width2]);

        // color scale
        // var colorScale = d3
        //     .scaleSequential()
        //     .interpolator(d3.interpolateBlues)
        //     .domain([0, 10]);
        // var colorScale = d3.scaleLinear().domain([0, 10]).range(["rgba(0, 129, 167,0.2)", "rgba(0, 129, 167,1)"])
        // var colorScale = d3.scaleOrdinal().domain([0, 10]).range(["#B8D7F0", "#93BCDD", "#71A2CB", "#518BBC", "#3575AB"]) // fade blue
        // var colorScale = d3.scaleOrdinal().domain([0, 10]).range(["#9BC7D7", "#7AAEC1", "#5896AD", "#41849C", "#2B6E86"]) // dark blue
        // var colorScale = d3.scaleOrdinal().domain([0, 10]).range(["#CFF0FC", "#B4DDEB", "#9FD0E1", "#83BED3", "#70B4CD", "#5DA8C3"])  // light blue
        var colorScale = d3.scaleQuantize().domain([0, 120]).range(["#DEEDF3", "#C6DFE7", "#B0D4DF", "#96C7D7", "#7DBCD0", "#6EAFC4"])  // light fade blue


        // square scale
        var squareScale = d3.scaleLinear().domain([0, 10]).range([0, 0.8 * xScale2.bandwidth()])

        // draw heat
        svg2
            .selectAll()
            .data(data2)
            .enter()
            .append("rect")
            .attr("x", (d) => {
                // console.log("x:", xScale2(d.label))
                return xScale2(d.label)
            })
            .attr("y", "0")
            .attr("width", xScale2.bandwidth())
            .attr("height", height)
            .attr("fill", (d) => d.hvalue === 0 ? "white" : colorScale(d.hvalue))
            .style("opacity", 0.8)
            .style("stroke-width", 1)
            .style("stroke", "white");

        // add number of publication
        svg2
            .selectAll()
            .data(data2)
            .enter()
            .append("text")
            .text(d => "num:" + d.hvalue)
            // .style("fill", "white")
            .attr("x", (d) => {
                return xScale2(d.label) + xScale2.bandwidth() - 29
            })
            .attr("y", "10")
            .attr("fill", "black")
            .attr("font-size", 7)

        // draw line
        for (var i = 0; i < data2.length; i++) {
            let lineData = data2[i].line,
                unit = data2[i].unit,
                tooltip_label = data2[i].tooltip_label,
                x = xScale2(data2[i].label),
                y = 0;
            if (lineData.length) {
                let xLineScale = d3
                    .scaleLinear()
                    .range([x, x + xScale2.bandwidth() - 14])
                    // .domain(d3.extent(lineData, (d) => d.value));
                    // .domain([0, 12])
                    // .domain(d3.extent(line_domains[data2[i].label].map(d => Math.log(d))))
                    .domain(d3.extent(line_domains[data2[i].label]))

                let yLineScale = d3
                    .scaleLinear()
                    .range([height - 10, 0])
                    .domain([0, 40]); // fixed?

                let line = d3
                    .line()
                    // .x((d) => xLineScale(Math.log(d.value)))
                    .x((d) => xLineScale(d.value))
                    .y((d) => yLineScale(d.pub))
                // .curve(d3.curveMonotoneX);

                svg2
                    .append("path")
                    .datum(lineData)
                    .attr("class", "overview-line")
                    .attr("d", line)
                    .style("fill", "none")
                    .attr("stroke", lineColor)
                    // .attr("stroke", "white")
                    .attr("stroke-width", 1)
                    .attr("transform", "translate(7,0)")
                    .style("opacity", 0.7);

                let min = d3.min(lineData.map(d => d.value)), max = d3.max(lineData.map(d => d.value));
                svg2.selectAll()
                    // .data(lineData.filter(d => d.value === min || d.value === max))
                    .data(lineData)
                    .enter()
                    .append("circle")
                    // .attr("cx", (d) => xLineScale(Math.log(d.value)) + 7)
                    .attr("cx", (d) => xLineScale(d.value) + 7)
                    .attr("cy", (d) => yLineScale(d.pub))
                    .attr("r", 2)
                    .style("fill", lineColor)
                    // .attr("fill", "white")
                    .style("opacity", 0.7)
                    .on("mouseover", (event, d) => {
                        tooltip.transition().duration(200).style("display", "block");
                        tooltip
                            .html(
                                `<span class="overview-hover">${(tooltip_label === "t 1/2" || tooltip_label === "Bioavailability") ? "" : "log"} ${tooltip_label}: </span><span class="overview-hover">${d.value} ${unit}</span><br/>
                            <span class="overview-hover">number of publication: </span><span class="overview-hover">${d.pub}</span><br/>`
                            )
                            .style("left", event.pageX + 10 + "px")
                            .style("top", event.pageY + 10 + "px");
                    })
                    .on("mousemove", (event, d) => {
                        tooltip
                            .style("left", event.pageX + 10 + "px")
                            .style("top", event.pageY + 10 + "px");
                    })
                    .on("mouseout", (event, d) => {
                        tooltip.transition().duration(200).style("display", "none");
                    })

                // svg2.append("text").attr("x", xLineScale(Math.log(min)) + 5).attr("y", height - 5).text(Math.floor(Math.log(min))).attr("class", "overview-line-text").style("font-size", 7).style("fill", lineColor)
                //     // .style("fill", "white")
                //     .attr("text-anchor", "middle");
                // svg2.append("text").attr("x", xLineScale(Math.log(max)) + 5).attr("y", height - 5).text(Math.floor(Math.log(max))).attr("class", "overview-line-text").style("font-size", 7).attr("text-anchor", "middle")
                // .style("fill", "white");
                svg2.append("text").attr("x", xLineScale(min) + 7).attr("y", height - 5).text(min).attr("class", "overview-line-text").style("font-size", 7).style("fill", lineColor)
                    // .style("fill", "white")
                    .attr("text-anchor", "middle").attr("cursor", "default");
                svg2.append("text").attr("x", xLineScale(max) + 7).attr("y", height - 5).text(max).attr("class", "overview-line-text").style("font-size", 7).attr("text-anchor", "middle").attr("cursor", "default")

            }
        }

        ////////////////////////////////////
        ////////// Pharmaceutics ///////////
        ////////////////////////////////////
        var svg3 = svg.append("g").attr("transform", "translate(" + (width1 + width2 + 10) + ",0)");
        var data3 = data.filter((d) => d.area === 3);
        var width3 = (width - 10) / num_attr * data3.length;
        console.log("data3", data3)

        // x scale
        var xDomain3 = []
        data3.forEach(element => {
            xDomain3.push(element.label)
        });
        var xScale3 = d3.scaleBand().domain(xDomain3).range([0, width3]);

        // color scale
        // var colorScale = d3
        //     .scaleSequential()
        //     .interpolator(d3.interpolateGreens)
        //     .domain([0, 10]);
        // var colorScale = d3.scaleLinear().domain([0, 10]).range(["rgba(209, 179, 196,0.2)", "rgba(209, 179, 196,1)"])
        // var colorScale = d3.scaleOrdinal().domain([0, 10]).range(["#BFE9D5", "#9FD3BB", "#7CC1A0", "#60AD88", "#43906B"])  // green
        // var colorScale = d3.scaleOrdinal().domain([0, 10]).range(["#E7E5F8", "#DAD6F3", "#C7C1ED", "#BBB5E6", "#AFA8E1"])  // purple
        var colorScale = d3.scaleQuantize().domain([0, 520]).range(["#E5E5F8", "#DADAF2", "#D3D3EB", "#C7C7E2", "#BCBCDC", "#AEAED3"])  // light purple


        // square scale
        var squareScale = d3.scaleLinear().domain([0, 10]).range([0, 0.8 * xScale3.bandwidth()])

        // draw heat
        svg3
            .selectAll()
            .data(data3)
            .enter()
            .append("rect")
            .attr("x", (d) => {
                // console.log("x:", xScale3(d.label))
                return xScale3(d.label)
            })
            .attr("y", "0")
            .attr("width", xScale3.bandwidth())
            .attr("height", height)
            .attr("fill", (d) => d.hvalue === 0 ? "white" : colorScale(d.hvalue))
            .style("opacity", 0.8)
            .style("stroke-width", 1)
            .style("stroke", "white");

        // add number of publication
        svg3
            .selectAll()
            .data(data3)
            .enter()
            .append("text")
            .text(d => "num:" + d.hvalue)
            .attr("x", (d) => {
                return xScale3(d.label) + xScale3.bandwidth() - 29
            })
            .attr("y", "10")
            .attr("fill", "black")
            .attr("font-size", 7)

        // draw line
        for (var i = 0; i < data3.length; i++) {
            let lineData = data3[i].line,
                unit = data3[i].unit,
                tooltip_label = data3[i].tooltip_label,
                x = xScale3(data3[i].label),
                y = 0;

            if (lineData.length) {
                let xLineScale = d3
                    .scaleLinear()
                    .range([x, x + xScale3.bandwidth() - 14])
                    // .domain(d3.extent(lineData, (d) => d.value));
                    // .domain([2, 10])
                    // .domain(d3.extent(line_domains[data3[i].label].map(d => Math.log(d))))
                    .domain(d3.extent(line_domains[data3[i].label]))

                let yLineScale = d3
                    .scaleLinear()
                    .range([height - 10, 0])
                    .domain([0, 40]); // fixed?

                let line = d3
                    .line()
                    // .x((d) => xLineScale(Math.log(d.value)))
                    .x((d) => xLineScale(d.value))
                    .y((d) => yLineScale(d.pub))
                // .curve(d3.curveMonotoneX);

                svg3
                    .append("path")
                    .datum(lineData)
                    .attr("class", "overview-line")
                    .attr("d", line)
                    .style("fill", "none")
                    .attr("stroke", lineColor)
                    .attr("stroke-width", 1)
                    .attr("transform", "translate(7,0)")
                    .style("opacity", 0.7);

                let min = d3.min(lineData.map(d => d.value)), max = d3.max(lineData.map(d => d.value));
                svg3.selectAll()
                    // .data(lineData.filter(d => d.value === min || d.value === max))
                    .data(lineData)
                    .enter()
                    .append("circle")
                    // .attr("cx", (d) => xLineScale(Math.log(d.value)) + 7)
                    .attr("cx", (d) => xLineScale(d.value) + 7)
                    .attr("cy", (d) => yLineScale(d.pub))
                    .attr("r", 2)
                    .style("fill", lineColor)
                    .style("opacity", 0.7)
                    .on("mouseover", (event, d) => {
                        tooltip.transition().duration(200).style("display", "block");
                        tooltip
                            .html(
                                `<span class="overview-hover">${tooltip_label}: </span><span class="overview-hover">${d.value.toFixed(2)} ${unit}</span><br/>
                            <span class="overview-hover">number of study: </span><span class="overview-hover">${d.pub}</span><br/>`
                            )
                            .style("left", event.pageX + 10 + "px")
                            .style("top", event.pageY + 10 + "px");
                    })
                    .on("mousemove", (event, d) => {
                        tooltip
                            .style("left", event.pageX + 10 + "px")
                            .style("top", event.pageY + 10 + "px");
                    })
                    .on("mouseout", (event, d) => {
                        tooltip.transition().duration(200).style("display", "none");
                    })

                // svg3.append("text").attr("x", xLineScale(Math.log(min)) + 5).attr("y", height - 5).text(Math.floor(Math.log(min))).attr("class", "overview-line-text").style("font-size", 7).style("fill", lineColor).attr("text-anchor", "middle");
                // svg3.append("text").attr("x", xLineScale(Math.log(max)) + 5).attr("y", height - 5).text(Math.floor(Math.log(max))).attr("class", "overview-line-text").style("font-size", 7).attr("text-anchor", "middle");
                svg3.append("text").attr("x", xLineScale(min) + 7).attr("y", height - 5).text(Math.floor(min)).attr("class", "overview-line-text").style("font-size", 7).style("fill", lineColor).attr("text-anchor", "middle").attr("cursor", "default");
                svg3.append("text").attr("x", xLineScale(max) + 7).attr("y", height - 5).text(Math.floor(max)).attr("class", "overview-line-text").style("font-size", 7).attr("text-anchor", "middle").attr("cursor", "default");
            }
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

    handleAddAttr = (attr) => {
        let removedAttr = this.state.removedAttr;
        this.setState({ removedAttr: removedAttr.filter(d => d.text !== attr.text) });

        let curAttr = this.state.curAttr;
        curAttr.push(attr)
        curAttr.sort((a, b) => a.index - b.index)
        this.setState({ curAttr });
    }

    handleRemoveAttr = (attr) => {
        let curAttr = this.state.curAttr;
        this.setState({ curAttr: curAttr.filter(d => d.text !== attr.text) });

        let removedAttr = this.state.removedAttr;
        removedAttr.push(attr)
        removedAttr.sort((a, b) => a.index - b.index)
        this.setState({ removedAttr });

    }

    render() {
        return (
            <div>
                <div className="row" style={{ backgroundColor: "#e9ecef", margin: "5px", height: "24px", marginBottom: 0 }}  >
                    <div className="col-7 pl-1">
                        <span>Overview</span>
                        <span style={{ fontSize: 12 }}> (x axis--drug compound property, y axis--number of publication)</span>
                    </div>
                    <div className="col-5" id="legend">
                    </div>
                </div>
                <div className="row justify-content-end" style={{ height: 15, marginTop: 0, marginBottom: 0, paddingLeft: 20 }}>
                    <div className="col-3 " style={{ justifySelf: "end", paddingLeft: 50 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#c1c1c1" class="bi bi-plus-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        <AddColumn handleAddAttr={this.handleAddAttr} options={this.state.removedAttr} />
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