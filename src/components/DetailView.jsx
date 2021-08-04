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
            marginL: 0,
            marginR: 0,
            medchemWidth: (this.props.width - 30 - 30) / 7 * 2.1,
            vitroWidth: (this.props.width - 30 - 30) / 7 * 1.1,
            vivoWidth: (this.props.width - 30 - 30) / 7 * 1.1,
            sankeyWidth: (this.props.width - 30 - 30) / 7 * 2.7,
            vitroSort: { attr: null, acsending: null },
            vivoSort: { attr: null, acsending: null },
            heatSquareLength: ((this.props.width - 30 - 30) / 7 * 2.2 - 40) / 14,
            test: true,
        }
    }

    componentDidMount() {
        this.drawBoundary();
        this.drawAxis('axis');
        // this.drawVitroAxis();
        // this.drawVivoAxis();
        this.drawVitroSort();
        this.drawVivoSort();
        // this.drawWhole(true);
    }

    componentDidUpdate(prevProps) {
        if (this.state.test === true) this.setState({ test: false })
        console.log("test", this.state.test)
        console.log("prevProps", prevProps.label);
        console.log("curprops", this.props.label)
        console.log("DetailView did update")
        var initial = (prevProps.label === this.props.label) ? false : true;
        console.log(initial);
        this.drawWhole(initial);

        // hide/show axis
        if (this.props.detaildata[0]) d3.selectAll("g.sort").style("opacity", 1);
        else d3.selectAll("g.sort").style("opacity", 0);
    }

    drawBoundary() {
        var svg = d3.select("#detail")
            .append("svg")
            .attr("id", "detail_svg")
            .attr("width", this.state.Width + 20)
            .attr("height", 850)
            .append("g")
            .attr("transform", "translate(8,0)")

        // for (var i = 0; i < 3; i++) {
        svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", 800)
            .attr("width", 20 + this.state.medchemWidth)
            .style("stroke", "#ced4da")
            .style("fill", "none")
            .style("stroke-width", "2px")
            .attr("rx", 5)
            .attr("ry", 5)
            .lower();
        // }

        svg.append("rect")
            .attr("x", 25 + this.state.medchemWidth)
            .attr("y", 0)
            .attr("height", 800)
            .attr("width", this.state.vitroWidth + this.state.vivoWidth + 5)
            .style("stroke", "#ced4da")
            .style("fill", "none")
            .style("stroke-width", "2px")
            .attr("rx", 5)
            .attr("ry", 5);

        // svg.append("rect")
        //     .attr("x", 30 + this.state.medchemWidth + this.state.vitroWidth)
        //     .attr("y", 0)
        //     .attr("height", 800)
        //     .attr("width", this.state.vivoWidth)
        //     .style("stroke", "#ced4da")
        //     .style("fill", "none")
        //     .style("stroke-width", "2px");

        svg.append("rect")
            .attr("x", 35 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth)
            .attr("y", 0)
            .attr("height", 800)
            .attr("width", this.state.sankeyWidth)
            .style("stroke", "#ced4da")
            .style("fill", "none")
            .style("stroke-width", "2px")
            .attr("rx", 5)
            .attr("ry", 5);
    }

    // drawAxis(container) {
    //     const { marginL, marginR } = this.state;
    //     const width = this.state.Width - marginL - marginR, rectheight = 25

    //     d3.select("#" + container).selectAll("svg").remove()
    //     var svg = d3.select("#" + container).append("svg")
    //         .attr("width", width + marginL)
    //         .attr("height", "30px")
    //         .append("g")
    //         .attr("transform", "translate(" + marginL + ",0)");

    //     // medicinal chemistry
    //     const medchemWidth = width / 14 * 3
    //     svg.append("rect")
    //         .attr("x", 0)
    //         .attr("y", 0)
    //         .attr("width", 20 + this.state.medchemWidth)
    //         .attr("height", rectheight)
    //         .style("fill", "#edeec9")
    //         .style("opacity", 0.5)
    //         .attr("rx", 5)
    //         .attr("ry", 5)
    //         .style("stroke-width", 2)
    //         .style("stroke", "#ced4da")
    //     svg.append("text")
    //         .attr("x", 1 / 2 * this.state.medchemWidth)
    //         .attr("y", 25)
    //         .attr("text-anchor", "middle")
    //         .text("Medicinal Chemistry")
    //         .style("fill", "black")
    //         .style("font-size", 13);

    //     // Vitro
    //     const vitroX = 20 + this.state.medchemWidth, vitroWidth = width / 14 * 3
    //     svg.append("rect")
    //         .attr("x", vitroX)
    //         .attr("y", 0)
    //         .attr("width", this.state.vitroWidth)
    //         .attr("height", rectheight)
    //         .style("fill", "#ecf8f8")
    //         .style("opacity", 0.5)
    //         .attr("rx", 5)
    //         .attr("ry", 5)
    //         .style("stroke-width", 2)
    //         .style("stroke", "#ced4da")
    //     svg.append("text")
    //         .attr("x", vitroX + 1 / 2 * this.state.vitroWidth)
    //         .attr("y", 10)
    //         .attr("text-anchor", "middle")
    //         .text("Vitro")
    //         .style("fill", "black")
    //         .style("font-size", 13);

    //     // Vivo
    //     const vivoX = vitroX + this.state.vitroWidth, vivoWidth = width / 14 * 2
    //     svg.append("rect")
    //         .attr("x", vivoX)
    //         .attr("y", 0)
    //         .attr("width", this.state.vivoWidth)
    //         .attr("height", rectheight)
    //         .style("fill", "#ecf8f8")
    //         .style("opacity", 0.5)
    //         .attr("rx", 5)
    //         .attr("ry", 5)
    //         .style("stroke-width", 2)
    //         .style("stroke", "#ced4da")
    //     svg.append("text")
    //         .attr("x", vivoX + 1 / 2 * this.state.vivoWidth)
    //         .attr("y", 10)
    //         .attr("text-anchor", "middle")
    //         .text("Vivo")
    //         .style("fill", "black")
    //         .style("font-size", 13);

    //     // Pharmocology
    //     svg.append("text")
    //         .attr("x", 1 / 2 * (vitroX + 1 / 2 * this.state.vitroWidth + vivoX + 1 / 2 * this.state.vivoWidth))
    //         .attr("y", 25)
    //         .attr("text-anchor", "middle")
    //         .text("Pharmocology")
    //         .style("font-size", 13)

    //     // Ph I
    //     const ph1X = vivoX + this.state.vivoWidth, phWidth = this.state.sankeyWidth / 3;
    //     svg.append("rect")
    //         .attr("x", ph1X)
    //         .attr("y", 0)
    //         .attr("width", this.state.sankeyWidth / 3)
    //         .attr("height", rectheight)
    //         .style("fill", "#fff8e8")
    //         .style("opacity", 0.5)
    //         .attr("rx", 5)
    //         .attr("ry", 5)
    //         .style("stroke-width", 2)
    //         .style("stroke", "#ced4da")
    //     svg.append("text")
    //         .attr("x", ph1X + 1 / 2 * phWidth + 5)
    //         .attr("y", 10)
    //         .attr("text-anchor", "middle")
    //         .text("I")
    //         .style("fill", "black")
    //         .style("font-size", 13);

    //     // Ph II
    //     const ph2X = ph1X + phWidth
    //     svg.append("rect")
    //         .attr("x", ph2X)
    //         .attr("y", 0)
    //         .attr("width", phWidth)
    //         .attr("height", rectheight)
    //         .style("fill", "#fff8e8")
    //         .style("opacity", 0.5)
    //         .attr("rx", 5)
    //         .attr("ry", 5)
    //         .style("stroke-width", 2)
    //         .style("stroke", "#ced4da")
    //     svg.append("text")
    //         .attr("x", ph2X + 1 / 2 * phWidth + 5)
    //         .attr("y", 10)
    //         .attr("text-anchor", "middle")
    //         .text("II")
    //         .style("fill", "black")
    //         .style("font-size", 13);

    //     // Ph III
    //     const ph3X = ph2X + phWidth;
    //     svg.append("rect")
    //         .attr("x", ph3X)
    //         .attr("y", 0)
    //         .attr("width", phWidth)
    //         .attr("height", rectheight)
    //         .style("fill", "#fff8e8")
    //         .style("opacity", 0.5)
    //         .attr("rx", 5)
    //         .attr("ry", 5)
    //         .style("stroke-width", 2)
    //         .style("stroke", "#ced4da")
    //     svg.append("text")
    //         .attr("x", ph3X + 1 / 2 * phWidth + 5)
    //         .attr("y", 10)
    //         .attr("text-anchor", "middle")
    //         .text("III")
    //         .style("fill", "black").style("font-size", 13);

    //     // Pharmaceutics
    //     svg.append("text")
    //         .attr("x", ph2X + 1 / 2 * phWidth)
    //         .attr("y", 25)
    //         .attr("text-anchor", "middle")
    //         .text("Pharmaceutics")
    //         .style("font-size", 13);

    //     // line
    //     svg
    //         .append('defs')
    //         .append('marker')
    //         .attr('id', 'arrow')
    //         .attr('viewBox', [0, 0, 6, 6])
    //         .attr('refX', 3)
    //         .attr('refY', 3)
    //         .attr('markerWidth', 6)
    //         .attr('markerHeight', 6)
    //         .attr('orient', 'auto-start-reverse')
    //         .append('path')
    //         .attr('d', d3.line()([[0, 0], [0, 6], [6, 3]]))
    //         .attr('stroke', 'black');

    //     svg.append("line")
    //         .style("stroke", "black")
    //         .style("stroke-width", 2)
    //         .attr("x1", -5)
    //         .attr("y1", 14)
    //         .attr("x2", 20 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + this.state.sankeyWidth)
    //         .attr("y2", 14)
    //         .attr('marker-end', 'url(#arrow)')

    //     svg.append("line")
    //         .style("stroke", "black")
    //         .style("stroke-width", 2)
    //         .attr("x1", 20 + this.state.medchemWidth + 1 / 2 * this.state.vitroWidth)
    //         .attr("y1", 10)
    //         .attr("x2", 20 + this.state.medchemWidth + 1 / 2 * this.state.vitroWidth)
    //         .attr("y2", 18)
    //     svg.append("line")
    //         .style("stroke", "black")
    //         .style("stroke-width", 2)
    //         .attr("x1", 20 + this.state.medchemWidth + this.state.vitroWidth + 1 / 2 * this.state.vivoWidth)
    //         .attr("y1", 10)
    //         .attr("x2", 20 + this.state.medchemWidth + this.state.vitroWidth + 1 / 2 * this.state.vivoWidth)
    //         .attr("y2", 18)

    //     svg.append("line")
    //         .style("stroke", "black")
    //         .style("stroke-width", 2)
    //         .attr("x1", 20 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + 1 / 6 * this.state.sankeyWidth)
    //         .attr("y1", 10)
    //         .attr("x2", 20 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + 1 / 6 * this.state.sankeyWidth)
    //         .attr("y2", 18)
    //     svg.append("line")
    //         .style("stroke", "black")
    //         .style("stroke-width", 2)
    //         .attr("x1", 20 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + 3 / 6 * this.state.sankeyWidth)
    //         .attr("y1", 10)
    //         .attr("x2", 20 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + 3 / 6 * this.state.sankeyWidth)
    //         .attr("y2", 18)
    //     svg.append("line")
    //         .style("stroke", "black")
    //         .style("stroke-width", 2)
    //         .attr("x1", 20 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + 5 / 6 * this.state.sankeyWidth)
    //         .attr("y1", 10)
    //         .attr("x2", 20 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + 5 / 6 * this.state.sankeyWidth)
    //         .attr("y2", 18)
    // }

    drawAxis(container) {
        const { marginL, marginR } = this.state;
        const width = this.state.Width - marginL - marginR, rectheight = 25

        d3.select("#" + container).selectAll("svg").remove()
        var svg = d3.select("#" + container).append("svg")
            .attr("width", width + marginL)
            .attr("height", "30px")
            .append("g")
            .attr("transform", "translate(8,0)");

        // medicinal chemistry
        const medchemWidth = width / 14 * 3
        svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 20 + this.state.medchemWidth)
            .attr("height", 13)
            .style("fill", "rgb(240, 113, 103,0.8)")
        svg.append("rect")
            .attr("x", 0)
            .attr("y", 13)
            .attr("width", 20 + this.state.medchemWidth)
            .attr("height", 13)
            .style("fill", "rgb(240, 113, 103,0.6)")
        // .style("opacity", 0.5)
        // .attr("rx", 5)
        // .attr("ry", 5)
        // .style("stroke-width", 2)
        // .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", 10 + 1 / 2 * this.state.medchemWidth)
            .attr("y", 10)
            .attr("text-anchor", "middle")
            .text("Medicinal Chemistry")
            .style("fill", "white")
            .style("font-size", 13);
        svg.append("text")
            .attr("x", 10 + 1 / 4 * this.state.medchemWidth)
            .attr("y", 24)
            .attr("text-anchor", "middle")
            .text("Design")
            .style("fill", "white")
            .style("font-size", 13);
        svg.append("text")
            .attr("x", 10 + 3 / 4 * this.state.medchemWidth)
            .attr("y", 24)
            .attr("text-anchor", "middle")
            .text("Synthesis")
            .style("fill", "white")
            .style("font-size", 13);

        // Vitro
        const vitroX = 25 + this.state.medchemWidth
        // svg.append("rect")
        //     .attr("x", vitroX)
        //     .attr("y", 0)
        //     .attr("width", this.state.vitroWidth + this.state.vivoWidth + 5)
        //     .attr("height", rectheight)
        //     .style("fill", "rgba(0, 129, 167,0.1)")
        //     // .style("opacity", 0.5)
        //     .attr("rx", 5)
        //     .attr("ry", 5)
        //     .style("stroke-width", 2)
        //     .style("stroke", "#ced4da")
        svg.append("rect")
            .attr("x", vitroX)
            .attr("y", 0)
            .attr("width", this.state.vitroWidth + this.state.vivoWidth + 5)
            .attr("height", 13)
            .style("fill", "rgb(0, 129, 167,0.8)")
        svg.append("rect")
            .attr("x", vitroX)
            .attr("y", 13)
            .attr("width", (this.state.vitroWidth + this.state.vivoWidth + 5))
            .attr("height", 13)
            .style("fill", "rgb(0, 129, 167,0.6)")
        svg.append("text")
            .attr("x", vitroX + 1 / 2 * this.state.vitroWidth)
            .attr("y", 24)
            .attr("text-anchor", "middle")
            .text("Vitro")
            .style("fill", "white")
            .style("font-size", 13);

        // Vivo
        const vivoX = vitroX + this.state.vitroWidth
        // svg.append("rect")
        //     .attr("x", vivoX)
        //     .attr("y", 0)
        //     .attr("width", this.state.vivoWidth)
        //     .attr("height", rectheight)
        //     .style("fill", "#ecf8f8")
        //     .style("opacity", 0.5)
        //     .attr("rx", 5)
        //     .attr("ry", 5)
        //     .style("stroke-width", 2)
        //     .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", vivoX + 1 / 2 * this.state.vivoWidth)
            .attr("y", 24)
            .attr("text-anchor", "middle")
            .text("Vivo")
            .style("fill", "white")
            .style("font-size", 13);

        // Pharmocology
        svg.append("text")
            .attr("x", 1 / 2 * (vitroX + 1 / 2 * this.state.vitroWidth + vivoX + 1 / 2 * this.state.vivoWidth))
            .attr("y", 10)
            .attr("text-anchor", "middle")
            .text("Pharmocology")
            .style("fill", "white")
            .style("font-size", 13)

        // Ph I
        const ph1X = 35 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth, phWidth = this.state.sankeyWidth / 3;
        svg.append("rect")
            .attr("x", ph1X)
            .attr("y", 0)
            .attr("width", this.state.sankeyWidth)
            .attr("height", 13)
            .style("fill", "rgba(209, 179, 196)")
        svg.append("rect")
            .attr("x", ph1X)
            .attr("y", 13)
            .attr("width", this.state.sankeyWidth)
            .attr("height", 13)
            .style("fill", "rgba(209, 179, 196,0.8)")
        // .style("opacity", 0.5)
        // .attr("rx", 5)
        // .attr("ry", 5)
        // .style("stroke-width", 2)
        // .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", ph1X + 1 / 2 * phWidth)
            .attr("y", 24)
            .attr("text-anchor", "middle")
            .text("I")
            .style("fill", "white")
            .style("font-size", 13);

        // Ph II
        const ph2X = ph1X + phWidth
        // svg.append("rect")
        //     .attr("x", ph2X)
        //     .attr("y", 0)
        //     .attr("width", phWidth)
        //     .attr("height", rectheight)
        //     .style("fill", "#fff8e8")
        //     .style("opacity", 0.5)
        //     .attr("rx", 5)
        //     .attr("ry", 5)
        //     .style("stroke-width", 2)
        //     .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", ph2X + 1 / 2 * phWidth)
            .attr("y", 24)
            .attr("text-anchor", "middle")
            .text("II")
            .style("fill", "white")
            .style("font-size", 13);

        // Ph III
        const ph3X = ph2X + phWidth;
        // svg.append("rect")
        //     .attr("x", ph3X)
        //     .attr("y", 0)
        //     .attr("width", phWidth)
        //     .attr("height", rectheight)
        //     .style("fill", "#fff8e8")
        //     .style("opacity", 0.5)
        //     .attr("rx", 5)
        //     .attr("ry", 5)
        //     .style("stroke-width", 2)
        //     .style("stroke", "#ced4da")
        svg.append("text")
            .attr("x", ph3X + 1 / 2 * phWidth)
            .attr("y", 24)
            .attr("text-anchor", "middle")
            .text("III")
            .style("fill", "white").style("font-size", 13);

        // Pharmaceutics
        svg.append("text")
            .attr("x", ph2X + 1 / 2 * phWidth)
            .attr("y", 10)
            .attr("text-anchor", "middle")
            .text("Pharmaceutics")
            .style("font-size", 13)
            .style("fill", "white");

        // line
        svg
            .append('defs')
            .append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', [0, 0, 6, 6])
            .attr('refX', 3)
            .attr('refY', 3)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto-start-reverse')
            .append('path')
            .attr('d', d3.line()([[0, 0], [0, 6], [6, 3]]))
            .style("fill", "#343a40");

        svg.append("line")
            .style("stroke", "white")
            .style("stroke-width", 0.5)
            .attr("x1", 0)
            .attr("y1", 13)
            .attr("x2", 30 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + this.state.sankeyWidth + 5)
            .attr("y2", 12)

        svg.append("line")
            .style("stroke", "white")
            .style("stroke-width", 0.5)
            .attr("x1", 10 + 1 / 2 * this.state.medchemWidth)
            .attr("y1", 13)
            .attr("x2", 10 + 1 / 2 * this.state.medchemWidth)
            .attr("y2", 26)
        svg.append("line")
            .style("stroke", "white")
            .style("stroke-width", 0.5)
            .attr("x1", 20 + this.state.medchemWidth + this.state.vitroWidth)
            .attr("y1", 12)
            .attr("x2", 20 + this.state.medchemWidth + this.state.vitroWidth)
            .attr("y2", 25)
        svg.append("line")
            .style("stroke", "white")
            .style("stroke-width", 0.5)
            .attr("x1", 30 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + 1 / 3 * this.state.sankeyWidth)
            .attr("y1", 12)
            .attr("x2", 30 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + 1 / 3 * this.state.sankeyWidth)
            .attr("y2", 25)
        svg.append("line")
            .style("stroke", "white")
            .style("stroke-width", 0.5)
            .attr("x1", 30 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + 2 / 3 * this.state.sankeyWidth)
            .attr("y1", 12)
            .attr("x2", 30 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + 2 / 3 * this.state.sankeyWidth)
            .attr("y2", 25)

        svg.append("line")
            .style("stroke", "#343a40")
            .style("stroke-width", 2)
            .attr("x1", 20 + this.state.medchemWidth - 20)
            .attr("y1", 12)
            .attr("x2", 20 + this.state.medchemWidth + 20)
            .attr("y2", 12)
            .attr('marker-end', 'url(#arrow)')

        svg.append("line")
            .style("stroke", "#343a40")
            .style("stroke-width", 2)
            .attr("x1", 30 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth - 20)
            .attr("y1", 12)
            .attr("x2", 30 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + 20)
            .attr("y2", 12)
            .attr('marker-end', 'url(#arrow)')
    }

    drawWhole(initial) {
        // clear svg
        d3.selectAll("g.network").remove()
        d3.selectAll("g.network-arc").remove()
        d3.selectAll('.detail_path').remove()
        d3.selectAll(".heatmap").remove()
        d3.selectAll(".sankey").remove()
        d3.selectAll(".sankey-border").remove()
        var { node_pos, initial_sort } = this.drawNetwork(initial);
        var { vitroHeatData, vivoHeatData, sankeyData } = this.handleData(); // handle sankey should be here
        var vitro_heat_pos = this.drawVitroHeatmap(vitroHeatData, this.state.vitroSort, initial_sort);
        var vivo_heat_pos = this.drawVivoHeatmap(vivoHeatData, this.state.vivoSort, initial_sort);
        var sankey_pos = this.drawSankeyChart(sankeyData, initial_sort);
        // var sankey_pos = [];
        this.drawPaths(vitro_heat_pos, vivo_heat_pos, node_pos, sankey_pos)
    }

    handleData() {
        var vitroHeatData = [], vivoHeatData = []  // [{id, attr, value}]
            , sankeyData = []; // [{name:id, data:{p1,p2,p3,...}}]
        if (this.props.value) {

            this.props.value.drug_molecule_paper.forEach(paper => {
                // console.log("paper", paper)

                // get sankey data and check empty
                let sankey_empty = true;
                if (Object.keys(paper.clinical_statistics).length) {
                    sankeyData.push({ name: paper.id, data: paper.clinical_statistics })
                    sankey_empty = false;
                }
                // console.log("sankeyData", sankeyData)

                let vitro_raw = paper.pharm_metrics_vitro, vivo_raw = paper.pharm_metrics_vivo;
                // check if empty
                let vivo_empty = true, vitro_empty = true;
                Object.values(vivo_raw).forEach(d => {
                    if (d) vivo_empty = false;
                })
                Object.values(vitro_raw).forEach(d => {
                    if (d) vitro_empty = false;
                })

                if (sankey_empty) {
                    if (vivo_empty) {
                        // vitro not empty => only add vitro data
                        if (!vitro_empty) {
                            for (const [key, value] of Object.entries(vitro_raw)) {
                                vitroHeatData.push({ id: paper.id, attr: key, value: value === 0 ? Math.floor(Math.random() * 10) : value })
                            }
                        }
                    }
                    else {
                        // sankey empty, vivo not empty => add both data
                        for (const [key, value] of Object.entries(vitro_raw)) {
                            vitroHeatData.push({ id: paper.id, attr: key, value: value === 0 ? Math.floor(Math.random() * 10) : value })
                        }
                        for (const [key, value] of Object.entries(vivo_raw)) {
                            vivoHeatData.push({ id: paper.id, attr: key, value: value === 0 ? Math.floor(Math.random() * 10) : value })
                        }
                    }
                } else {
                    // sankey not empty => add all
                    for (const [key, value] of Object.entries(vitro_raw)) {
                        vitroHeatData.push({ id: paper.id, attr: key, value: value === 0 ? Math.floor(Math.random() * 100) : value })
                    }
                    for (const [key, value] of Object.entries(vivo_raw)) {
                        vivoHeatData.push({ id: paper.id, attr: key, value: value === 0 ? Math.floor(Math.random() * 100) : value })
                    }
                }
            })
        }
        // console.log("vitroHeatData", vitroHeatData)
        // console.log("vivoHeatData", vivoHeatData)
        return { vitroHeatData, vivoHeatData, sankeyData }
    }

    handleClick = (id) => {

        console.log("class", d3.selectAll("rect.heatmap")
            .filter((node) => node.id == id)
            .attr("class"))
        d3.selectAll("rect.heatmap")
            .filter((node) => node.id == id)
            .classed("rect-click", true)

        // d3.selectAll("rect.rect-click")
        //     .filter((node) => node.id == id)
        //     .classed("rect-click", false)
    }

    handleHighlight = (id) => {
        // highlight
        d3.selectAll("rect.heatmap")
            .filter((node) => node.id == id)
            .style("stroke", "orange")
            .style("stroke-width", 3)

        d3.selectAll("rect.heatmap")
            .filter((node) => node.id != id)
            .style("opacity", 0.5)

        d3.selectAll("rect.sankey")
            .filter((node) => node.id != id)
            .style("opacity", 0.5)

        d3.selectAll("rect.sankey-border")
            .filter((node) => node.id == id)
            .style("opacity", 1)
            .style("stroke", "orange")
            .style("stroke-width", 3)

        d3.selectAll("rect.sankey-border")
            .filter((node) => node.id != id)
            .style("opacity", 0.5)

        d3.selectAll("circle.network-hover-border")
            .filter((node) => node.id == id)
            .style("opacity", 1)

        d3.selectAll("circle.network")
            .filter((node) => node.id != id)
            .style("opacity", 0.5)

        d3.selectAll("g.network-arc")
            .style("opacity", 0.5)

        d3.selectAll(`g#network-arc-${id}`)
            .style("opacity", 1)

        d3.selectAll("path#detailpath-" + id.toString())
            .attr("opacity", 1)
            .attr("stroke-width", 2)

        d3.selectAll("text.sankey").filter((t) => t.id != id)
            .style("opacity", 0.5)
    }

    handleUndoHighlight = (id) => {
        d3.selectAll("rect.heatmap")
            .style("stroke-width", 2)
            .style("stroke", "#e9ecef")
            .style("opacity", 1)
        // .style("transform", "scale(1)")

        d3.selectAll("rect.sankey")
            .style("opacity", 1)

        d3.selectAll("rect.sankey-border")
            .style("opacity", 1)
            .style("stroke-width", 2)
            .style("stroke", "#adb5bd")

        d3.selectAll("circle.network-hover-border")
            .filter((node) => node.id == id)
            .style("opacity", 0)

        d3.selectAll("circle.network")
            .style("opacity", 1)

        d3.selectAll("g.network-arc")
            .style("opacity", 1)

        d3.selectAll("path#detailpath-" + id.toString())
            .attr("opacity", 0.5)
            .attr("stroke-width", 1)

        d3.selectAll("text.sankey").filter((t) => t.id != id)
            .style("opacity", 1)
    }

    drawNetwork(initial) {
        // if (this.props.detaildata[0]) {
        if (this.props.value) {
            var component = this;
            console.log("networkData", this.state.networkData)
            // var nodes = this.props.value.drug_molecule_paper.map(d => { let node = { ...d }; node["id"] = node.id; return node }),
            var nodes = this.props.value.drug_molecule_paper,
                links = this.props.value.medicinal_chemistry_similarity;

            console.log("draw network")

            var node_pos = []
            var margin = { top: 80, right: 0, bottom: 0, left: 0 },
                width = this.state.medchemWidth + 20 - margin.left - margin.right,
                height = this.state.Height - 40 - margin.top - margin.bottom;

            var svg = d3
                .select("svg#detail_svg")
                .append("g")
                .attr("class", "network")
                .attr("width", width)
                .attr("height", height)
                .attr("transform", "translate(10," + margin.top + ")");

            // d3.json(this.props.detaildata[0])
            // .then(function (data) {
            // console.log('nodes', this.props.detaildata[0].nodes);
            // console.log('links', this.props.detaildata[0].links);
            // var nodes = this.props.detaildata[0].nodes,
            //     links = this.props.detaildata[0].links;

            // node color scale
            var colorScale = d3
                .scaleLinear()
                .domain([1, 5])
                .range(["rgba(240, 113, 103,0.1)", "rgba(240, 113, 103,1)"])
            // .range(["#f1dca7", "#ffcb69", "#e8ac65", "#d08c60", "#b58463"])
            // .range(["#f7b267", "#f79d65", "#f4845f", "#f27059", "#f25c54"])
            // .range(["#edeec9", "#dde7c7", "#bfd8bd", "#98c9a3", "#77bfa3"])
            // .range(["#ffdab9", "#fbc4ab", "#f8ad9d", "#f4978e", "#f08080"]) // pink

            // node r scale
            var radius = 8;
            var rScale = d3.scaleLinear().domain([1, 10]).range([3, radius])

            // draw legend
            var circle_legend_svg = d3
                .select("svg#detail_svg")
                .append("g")
                .attr("class", "network")
                .attr("transform", "translate(10,20)");

            var text = circle_legend_svg.append("text").attr("y", -15);
            var legend_text = "the number of,proposed drug,compound";
            text.selectAll("tspan.text")
                .data(legend_text.split(","))
                .enter()
                .append("tspan")
                .attr("class", "network")
                .text(d => d)
                .attr("x", 45)
                .attr("dy", 12)
                .style("font-size", 12)
                .style("text-anchor", "middle")

            var circle_legend = [1, 5, 10], circle_cx = [0, rScale(1) + rScale(5) + 5, rScale(1) + 2 * rScale(5) + 10 + rScale(10)]
            circle_legend_svg.selectAll().data(circle_legend).enter().append("circle")
                .attr("r", d => rScale(d))
                .attr("cx", (d, i) => 100 + circle_cx[i])
                .attr("cy", -2)
                .style("fill", "#f4978e")
                .attr("class", "network")

            circle_legend_svg.append("text")
                .attr("x", 100 + circle_cx[0])
                .attr("y", 20)
                .style("font-size", "12px")
                .attr("class", "network")
                .attr("text-anchor", "middle")
                .text("0")

            circle_legend_svg.append("text")
                .attr("x", 100 + circle_cx[2])
                .attr("y", 20)
                .style("font-size", "12px")
                .attr("class", "network")
                .attr("text-anchor", "middle")
                .text("10")

            // set tooltips
            var tooltip = d3
                .select("body")
                .append("div")
                .attr("class", "tooltip")
                .style('display', 'none')
                .style("opacity", 0.9)
                .on('mouseover', () => {
                    tooltip.transition().duration(0).style("display", "block");
                })
                .on("mouseout", () => {
                    tooltip.style("display", "none")
                });

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
                            return d.value * 500
                        }) // This is the link distance based on nodes similarity
                        .links(links) // and this the list of links
                )
                .force("charge", d3.forceManyBody().strength(0)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
                .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
                .force("collision", d3.forceCollide(d => { // This prevents collision between nodes
                    // console.log('d in collision', d)
                    // return rScale(d.value)
                    return radius + 3
                }))
                .stop()

            // make the simulation run without drawing anything
            if (initial)
                for (var i = 0; i < 300; ++i) simulation.tick();
            // } else {
            // for (var i = 0; i < 1; ++i) simulation.tick();
            // }

            // console.log("simulation end")
            console.log("nodes", nodes)
            node_pos = nodes.map(d => { return { id: d.id, x: d.x, y: d.y + margin.top } })
            console.log(node_pos)
            // this.setState({ node_pos })

            // draw nodes manually using the x and y created by simulation
            var node = svg
                .selectAll()
                .data(nodes)
                .enter()
                .append("circle")
                .attr("class", "network")
                // .attr("r", d => rScale(d.value))
                .attr("r", d => rScale(Math.floor(Math.random() * 10)))
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                // .style("stroke", (d) => colorScale(d.group))
                // .style("stroke-width", 4)
                .style("fill", (d) => "#f4978e")
            // .on("mouseover", function (event, d) {
            //     // console.log(d.id)

            //     // tooltip
            //     tooltip.transition().duration(200);
            //     tooltip
            //         .html(() => {
            //             var author = ""
            //             d.paper_author.forEach(d => author += (d.split(' ')[0][0] + '. ' + d.split(' ')[1] + ", "))

            //             var metrics = ""
            //             for (const [key, value] of Object.entries(d.medicinal_chemistry_metrics)) {
            //                 if (value) metrics += `<span>${key}: ${value}</span><br/>`
            //             }
            //             return `<div class="network-tooltip" style="padding:2px;width:360px">
            //             <div class="row">
            //             <div class="col-3" style="margin:2px">
            //             <img src='${d.paper_abstract_image}' width=80/>
            //             ${metrics}
            //             </div>

            //             <div class="col-7" style="margin-left:3px;padding:0">
            //             <span class="tooltip-title">${d.paper_title} (${d.paper_year})</span><br/>
            //             <span class="tooltip-author">${author}</span><br/><br/>
            //             <span class="tooltip-label">Doi:</span><a href=${'http://doi.org/' + d.doi} target="_blank" class="tooltip-doi">${d.doi}</a><br/>
            //             <span class="tooltip-label">Cited:</span>${d.paper_cited}<br/>
            //             <span class="tooltip-label">Journal:</span>${d.paper_journal}<br/>

            //             </div>
            //             </div>
            //             <span class="tooltip-label">Institution:</span>${d.paper_institution}<br/>
            //             </div>
            //             `}
            //         )
            //         .style("left", event.pageX - 360 + "px")
            //         .style("top", event.pageY - 160 + "px")
            //         .style("display", "block")
            //     // .on("mouseout", () => {
            //     // console.log("tooltip mouseout")
            //     // tooltip.transition().duration(200).style("opacity", 0);
            //     // });

            //     // highlight
            //     d3.selectAll("rect.heatmap")
            //         .filter((node) => node.id == d.id)
            //         .style("stroke", "orange")
            //         .style("stroke-width", 3)
            //     // .classed("highlightRect", true);

            //     d3.selectAll("rect.heatmap")
            //         .filter((node) => node.id != d.id)
            //         .style("opacity", 0.5)

            //     d3.selectAll("rect.sankey")
            //         .filter((node) => node.id != d.id)
            //         .style("opacity", 0.5)

            //     d3.selectAll("rect.sankey-border")
            //         .filter((node) => node.id == d.id)
            //         .style("opacity", 1)
            //         .style("stroke", "orange")
            //         .style("stroke-width", 3)

            //     d3.selectAll("rect.sankey-border")
            //         .filter((node) => node.id != d.id)
            //         .style("opacity", 0.5)

            //     d3.selectAll("circle.network")
            //         .filter((node) => node.id == d.id)
            //         .style("stroke", "orange")
            //         .style("stroke-width", 3)

            //     d3.selectAll("circle.network")
            //         .filter((node) => node.id != d.id)
            //         .style("opacity", 0.5)

            //     d3.selectAll("path#" + d.id)
            //         .attr("opacity", 1)
            //         .attr("stroke-width", 2)

            //     d3.selectAll("text.sankey").filter((t) => t.id != d.id)
            //         .style("opacity", 0.5)
            // })
            // .on("mousemove", (event, d) => {
            //     tooltip
            //         .style("left", event.pageX - 360 + "px")
            //         .style("top", event.pageY - 160 + "px");
            // })
            // .on("mouseout", (event, d) => {
            //     // tooltip.on("mouseout.tooltip", () => {
            //     // console.log("tooltip mouseout")
            //     tooltip.transition().delay(500).style("display", "none");
            //     // })

            //     d3.selectAll("rect.heatmap")
            //         .style("stroke-width", 2)
            //         .style("stroke", "#e9ecef")
            //         .style("opacity", 1)

            //     d3.selectAll("rect.sankey")
            //         .style("opacity", 1)

            //     d3.selectAll("rect.sankey-border")
            //         .style("opacity", 1)
            //         .style("stroke-width", 2)
            //         .style("stroke", "#adb5bd")

            //     d3.selectAll("circle.network")
            //         .style("stroke-width", 0)
            //         .style("opacity", 1)

            //     d3.selectAll("path#" + d.id)
            //         .attr("opacity", 0.5)
            //         .attr("stroke-width", 1)

            //     d3.selectAll("text.sankey").filter((t) => t.id != d.id)
            //         .style("opacity", 1)
            // })
            // .call(drag(simulation));

            // draw arc
            var arc_data = [{ position: 0, value: 1 }, { position: 5, value: 1 }, { position: 10, value: 1 }, { position: 15, value: 1 }]
            var arc_data_ready = d3.pie().value(d => d.value)(arc_data)
            var arc = d3.arc()
                .innerRadius(radius)
                .outerRadius(radius + 2)
                .padAngle(0.03 * Math.PI);
            nodes.forEach(node => {
                let svg = d3
                    .select("svg#detail_svg")
                    .append("g")
                    .attr("class", "network-arc")
                    .attr("id", `network-arc-${node.id}`)
                    .attr("transform", "translate(" + (10 + node.x) + "," + (node.y + margin.top) + ")")

                // console.log("level", node.level)
                svg.selectAll()
                    .data(arc_data_ready)
                    .enter()
                    .append("path")
                    .attr("class", "network")
                    .attr("d", arc)
                    .attr("fill", (d) => {
                        // console.log(d.data.position)
                        // return node.level > d.data.position ? "#f4978e" : "lightgrey"
                        return Math.random() * 20 > d.data.position ? "#f4978e" : "lightgrey"
                    })

            })

            // draw legend
            var legend_arc = d3.arc()
                .innerRadius(8)
                .outerRadius(10)
                .padAngle(0.03 * Math.PI);
            var arc_legend = [{ level: 1, text: "0~5" }, { level: 6, text: "5~10" }, { level: 11, text: "10~15" }, { level: 16, text: ">15" }]
            var text = svg.append("text").attr("y", -75);
            var legend_text = "synthesis route length";
            text.selectAll("tspan.text")
                .data(legend_text.split(" "))
                .enter()
                .append("tspan")
                .attr("class", "network")
                .text(d => d)
                .attr("x", 35 + 1 / 2 * this.state.medchemWidth)
                .attr("dy", 12)
                .style("font-size", 12)
                .style("text-anchor", "middle")

            arc_legend.forEach((node, i) => {
                let svg = d3
                    .select("svg#detail_svg")
                    .append("g")
                    .attr("class", "network")
                    .attr("transform", "translate(" + (this.state.medchemWidth - (2.7 - i) * 30) + ",20)")

                svg.selectAll().data(arc_data_ready).enter()
                    .append("path")
                    .attr("d", legend_arc)
                    .style("fill", d => node.level > d.data.position ? "#f4978e" : "lightgrey")

                svg.append("text")
                    .text(node.text)
                    .attr("x", 0)
                    .attr("y", 25)
                    .style("font-size", 9)
                    .style("text-anchor", "middle")
            })

            svg.append("text")
                .text("distance between nodes = molecule structure similarity")
                .attr("x", 8)
                .attr("y", -15)
                .style("font-size", 12)
                .style("fill", "#495057")

            // draw background circle for hover
            var hover_border = svg
                .selectAll()
                .data(nodes)
                .enter()
                .append("circle")
                .attr("class", "network-hover-border")
                .attr("r", radius + 4)
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .style("fill", "none")
                .style("stroke-width", 2)
                .style("stroke", "orange")
                .style("opacity", 0)

            var background_circle = svg
                .selectAll()
                .data(nodes)
                .enter()
                .append("circle")
                .attr("class", "network-hover")
                .attr("r", radius + 3)
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .style("fill", "white")
                .style("opacity", 0)
                .on("mouseover", function (event, d) {
                    // console.log(d.id)

                    // tooltip
                    tooltip.transition().duration(200);
                    tooltip
                        .html(() => {
                            var author = ""
                            d.paper_author.forEach(d => author += (d.split(' ')[0][0] + '. ' + d.split(' ')[1] + ", "))

                            var metrics = ""
                            for (const [key, value] of Object.entries(d.medicinal_chemistry_metrics)) {
                                // if (value) metrics += `<span>${key}: ${value}</span><br/>`
                                metrics += `<span>${key}: ${value ? value : 0}</span><br/>`
                            }
                            return `<div class="network-tooltip" style="padding:2px;width:330px">
                        <div class="row">

                        <div class="col-3" style="margin:0px;padding-left:15px;padding-right:0px">
                        <img src='${d.paper_abstract_image}' width=60/>
                        <span class="tooltip-label">Ki: </span>${d.medicinal_chemistry_metrics["Ki"] ? d.medicinal_chemistry_metrics["Ki"] : 0}
                        <span class="tooltip-label"> Kd: </span>${d.medicinal_chemistry_metrics["Ki"] ? d.medicinal_chemistry_metrics["Kd"] : 0}
                        <br/>
                        <span class="tooltip-label">IC50: </span>${d.medicinal_chemistry_metrics["IC50"] ? d.medicinal_chemistry_metrics["IC50"] : 0}
                        <span class="tooltip-label"> Sel: </span>${d.medicinal_chemistry_metrics["selectivity"] ? d.medicinal_chemistry_metrics["selectivity"] : 0}
                        <br/>
                        <span class="tooltip-label">Route: </span>${d.level}
                        </div>

                        <div class="col-9" style="margin:0px;padding:0px">
                        <span class="tooltip-title">${d.paper_title} (${d.paper_year})</span><br/>
                        <span class="tooltip-author">${author}</span><br/><br/>
                        <div class="row">
                        <div class="col-9">
                        <span class="tooltip-label">Doi: </span><a href=${'http://doi.org/' + d.doi} target="_blank" class="tooltip-doi">${d.doi}</a>
                        </div><div class="col-3" style="margin:0px;padding:0px;">
                        <span class="tooltip-label">Cited: </span><span>${parseFloat(d.paper_cited)}</span>
                        </div></div>
                        <span class="tooltip-label">Journal:</span>${d.paper_journal}<br/>
                        <span class="tooltip-label">Institution:</span>${d.paper_institution}<br/>
                        </div>

                        </div>
                        </div>
                        `}
                        )
                        .style("left", event.pageX - 350 + "px")
                        .style("top", event.pageY - 150 + "px")
                        .style("display", "block")
                    // .on("mouseout", () => {
                    // console.log("tooltip mouseout")
                    // tooltip.transition().duration(200).style("opacity", 0);
                    // });

                    // highlight
                    component.handleHighlight(d.id)
                })
                .on("mousemove", (event, d) => {
                    tooltip
                        .style("left", event.pageX - 350 + "px")
                        .style("top", event.pageY - 150 + "px");
                })
                .on("mouseout", (event, d) => {
                    // tooltip.on("mouseout.tooltip", () => {
                    // console.log("tooltip mouseout")
                    tooltip.transition().delay(500).style("display", "none");
                    // })

                    component.handleUndoHighlight(d.id)
                })

            // initial vitro heatmap order
            var initial_sort = nodes.sort((a, b) => a.y - b.y).map(d => d.id)
            console.log("initial_sort", initial_sort)

        }

        return { node_pos, initial_sort }
    }

    drawVitroSort() {
        var margin = { top: 10, right: 10, bottom: 10, left: 10 },
            width = this.state.vitroWidth - margin.left - margin.right;

        var svg = d3
            .select("svg#detail_svg")
            .append("g")
            .attr("class", "sort")
            .style("opacity", 0)
            .attr("transform", "translate(" + (10 + 25 + this.state.medchemWidth + margin.left) + "," + margin.top + ")");

        // x scale
        var xDomain = ["IC50", "Ki", "Kd", "EC50", "Sel", "hERG", "Sol"],
            xAttr = ["IC50", "Ki", "Kd", "EC50", "Selectivity", "hERG", "Solubility"],
            xRange = [0, xDomain.length * this.state.heatSquareLength];
        var xScale = d3.scaleBand().domain(xDomain).range(xRange)

        // set tooltips
        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0.9)
            .style("display", "none");

        // arrow
        svg
            .append('defs')
            .append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', [0, 0, 4, 4])
            .attr('refX', 3)
            .attr('refY', 3)
            .attr('markerWidth', 4)
            .attr('markerHeight', 4)
            .attr('orient', 'auto-start-reverse')

        // ascending icon
        var ascendDef = svg.append('defs').append("g").attr("id", "ascending");

        ascendDef.append("rect")
            .attr("x", -3)
            .attr("y", -8)
            .attr("width", 17)
            .attr("height", 18)
            .style("fill", "#eeeeee")
            .attr("rx", 2)
            .attr("ry", 2)

        ascendDef
            .append("text")
            .attr("x", 0)
            .attr("y", 0)
            .text('0')
            .style("font-size", 9)
            .style("fill", "steelblue")

        ascendDef
            .append("text")
            .attr("x", 0)
            .attr("y", 8)
            .text('9')
            .style("font-size", 9)
            .style("fill", "black")

        ascendDef.append("line")
            .style("stroke", "black")
            .style("stroke-width", 1)
            .attr("x1", 10)
            .attr("y1", -6)
            .attr("x2", 10)
            .attr("y2", 6)
            .attr('marker-end', 'url(#arrow)')

        // descending icon
        var descendDef = svg.append('defs').append("g").attr("id", "descending")
            .attr("x", 20).attr("y", 20).style("border", "black").style("border-width", 1);

        descendDef.append("rect")
            .attr("x", -3)
            .attr("y", -8)
            .attr("width", 17)
            .attr("height", 18)
            .style("fill", "#eeeeee")
            .attr("rx", 2)
            .attr("ry", 2)

        descendDef
            .append("text")
            .attr("x", 0)
            .attr("y", 0)
            .text('9')
            .style("font-size", 9)
            .style("fill", "black")

        descendDef
            .append("text")
            .attr("x", 0)
            .attr("y", 8)
            .text('0')
            .style("font-size", 9)
            .style("fill", "steelblue")

        descendDef.append("line")
            .style("stroke", "black")
            .style("stroke-width", 1)
            .attr("x1", 10)
            .attr("y1", -6)
            .attr("x2", 10)
            .attr("y2", 6)
            .attr('marker-end', 'url(#arrow)')

        // draw ascending
        // svg.selectAll()
        //     .data(xDomain).enter()
        //     // .append('path')
        //     // .attr("d", d3.symbol().type(d3.symbolTriangle).size(60))
        //     // .attr("x", d => xScale(d))
        //     // .attr("y", 0)
        //     .append("use").attr("xlink:href", "#ascending")
        //     // .append('path')
        //     // .attr('d', d3.line()([[0, 0], [0, 8], [11, 4]]))
        //     .attr("transform", (d) => { return "translate(" + (xScale(d) + 5) + ",5)"; })
        //     .style("opacity", 0.5)
        //     .attr("class", "vitro-sort-a")
        //     .on("click", (_, d) => {
        //         // console.log("click ", d)
        //         this.setState({ vitroSort: { attr: xAttr[xDomain.indexOf(d)], acsending: true } })
        //         d3.selectAll(".vitro-sort-a").filter(i => i === d).style("opacity", 1)
        //         d3.selectAll(".vitro-sort-a").filter(i => i !== d).style("opacity", 0.3)
        //         d3.selectAll(".vitro-sort-de").style("opacity", 0.3)
        //     })
        //     .on("mouseover", (event) => {
        //         // d3.selectAll("path.vitro-sort-a").style("cursor", "pointer")
        //         // tooltip
        //         tooltip.transition().duration(200).style("display", "block");
        //         tooltip
        //             .html(
        //                 `sort`
        //             )
        //             .style("left", event.pageX + 10 + "px")
        //             .style("top", event.pageY + 10 + "px");
        //     })
        //     .on("mousemove", (event) => {
        //         tooltip
        //             .style("left", event.pageX + 10 + "px")
        //             .style("top", event.pageY + 10 + "px");
        //     })
        //     .on("mouseout", () => {
        //         // console.log(d3.selectAll("path.vitro-sort"));
        //         // d3.selectAll("path.vitro-sort-a").style("cursor", "default")
        //         tooltip.transition().duration(400).style("display", "none");
        //     });

        // draw descending
        svg.selectAll()
            .data(xDomain).enter()
            // .append('path')
            // .attr("d", d3.symbol().type(d3.symbolTriangle).size(60))
            // .attr("x", d => xScale(d))
            // .attr("y", 0)
            // .append('path')
            // .attr('d', d3.line()([[0, 0], [0, 8], [11, 4]]))
            .append("use").attr("xlink:href", "#descending")
            .attr("transform", (d) => { return "translate(" + (xScale(d) + 5) + ",25)"; })
            // .style("fill", "rgba(218, 218, 218, 0.8)")
            .attr("class", "vitro-sort-de")
            .style("opacity", 0.5)
            .on("click", (_, d) => {
                // console.log("click ", d)
                this.setState({ vitroSort: { attr: xAttr[xDomain.indexOf(d)], acsending: false } })
                d3.selectAll(".vitro-sort-de").filter(i => i === d).style("opacity", 1)
                d3.selectAll(".vitro-sort-de").filter(i => i !== d).style("opacity", 0.3)
                d3.selectAll(".vitro-sort-a").style("opacity", 0.3)
            })
            .on("mouseover", (event) => {
                // tooltip
                tooltip.transition().duration(200).style("display", "block");
                tooltip
                    .html(
                        `sort`
                    )
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
            })
            .on("mouseout", () => {
                // d3.selectAll("path.vitro-sort-de").style("cursor", "default")
                tooltip.transition().duration(400).style("display", "none");
            });

        svg.append("g").call(d3.axisTop(xScale))
            .call(g => {
                g.select(".domain").remove();
                g.selectAll("line").remove();
            })
            .selectAll("text")
            .attr("transform", "translate(13,55), rotate(-90)")
            .style("text-anchor", "middle")
            .style("font-size", 12)

    }

    drawVitroAxis() {
        var margin = { top: 70, right: 10, bottom: 10, left: 10 },
            width = this.state.vitroWidth - margin.left - margin.right;

        var svg = d3
            .select("svg#detail_svg")
            .append("g")
            .attr("transform", "translate(" + (10 + 25 + this.state.medchemWidth + margin.left) + "," + margin.top + ")");

        // x scale
        var xDomain = ["IC50", "Ki", "Kd", "EC50", "se", "hERG", "sol"],
            xRange = [0, width];
        var xScale = d3.scaleBand().domain(xDomain).range(xRange)
        svg.append("g").call(d3.axisTop(xScale))
            .call(g => {
                g.select(".domain").remove();
                g.selectAll("line").remove();
            })
            .selectAll("text")
            .attr("transform", "translate(10,-5), rotate(-90)")
            .style("text-anchor", "start")
            .attr("class", "vitro-axis")
            .on("click", (e, d) => {
                // console.log("click ", d)
                this.setState({ vitroSortAttr: d })
                d3.selectAll("text.vitro-axis").filter(i => i === d).style("fill", "red")
                d3.selectAll("text.vitro-axis").filter(i => i !== d).style("fill", "black")
            })
            .on("mouseover", (e, d) => {
                // console.log(d3.selectAll("text.vitro-axis"));
                d3.selectAll("text.vitro-axis").style("cursor", "pointer")
            })
            .on("mouseout", (e, d) => {
                // console.log(d3.selectAll("text.vitro-axis"));
                d3.selectAll("text.vitro-axis").style("cursor", "default")
            });
    }

    drawVitroHeatmap(vitroHeatData, sort, initial_sort) {
        // if (this.props.detaildata[1]) {
        if (vitroHeatData[0]) {
            var component = this;
            console.log("draw vitro heatmap")
            var margin = { top: 85, right: 10, bottom: 10, left: 10 },
                width = this.state.vitroWidth - margin.left - margin.right,
                height = this.state.Height - 40 - margin.top - margin.bottom;

            var svg = d3
                .select("svg#detail_svg")
                .append("g")
                .attr("transform", "translate(" + (10 + 25 + this.state.medchemWidth + margin.left) + "," + margin.top + ")");

            console.log("vitro heatmap", vitroHeatData)
            // var data = this.props.detaildata[1];
            var data = vitroHeatData;

            // x scale
            var xDomain = ["IC50", "Ki", "Kd", "EC50", "selectivity", "hERG", "solubility"],
                xMetric = ["nM", "nM", "nM", "nM", "fold", "uM", "ug/mL"],
                xRange = [0, xDomain.length * this.state.heatSquareLength];
            var xScale = d3.scaleBand().domain(xDomain).range(xRange)
            // svg.append("g").call(d3.axisTop(xScale))
            //     .call(g => {
            //         g.select(".domain").remove();
            //         g.selectAll("line").remove();
            //     })
            //     .selectAll("text")
            //     .attr("transform", "translate(10,-5), rotate(-90)")
            //     .style("text-anchor", "start");

            // y scale (to make a square)
            var yDomain = [];
            data.forEach(d => {
                if (!yDomain.includes(d.id)) yDomain.push(d.id)
            })
            if (sort.attr) yDomain = this.sortBy(data, sort.attr, sort.acsending);
            else if (initial_sort) yDomain = initial_sort.filter(d => yDomain.includes(d))
            var yRange = [0, yDomain.length * xScale.bandwidth()]
            var yScale = d3.scaleBand().domain(yDomain).range(yRange)

            // store positions for path
            var vitro_heat_pos = []
            yDomain.forEach(d => {
                vitro_heat_pos.push({
                    id: d,
                    x_in: (10 + 25 + this.state.medchemWidth + margin.left),
                    x_out: (10 + 25 + this.state.medchemWidth + margin.left) + xDomain.length * xScale.bandwidth(),
                    y: yScale(d) + margin.top + 1 / 2 * yScale.bandwidth()
                })
            })
            // this.setState({ vitro_heat_pos })

            // color scale
            // var colorScale = d3
            //     .scaleSequential()
            //     .interpolator(d3.interpolateOranges)
            //     .domain([1, 8]);

            var colorScale = d3.scaleLinear()
                .domain([0, 8])
                .range(["rgba(0, 129, 167,0)", "rgba(0, 129, 167,1)"])
            // .range(["white", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3"]) // purple
            // .range(["white", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5"]) // blue
            // .range(["white", "#d8f3dc", "#b7e4c7", "#95d5b2", "#74c69d", "#52b788", "#40916c"])
            // .range(["white", "#fdf8e1", "#fcefb4", "#fae588", "#f9dc5c", "#ffc617", "#ffc000"])

            // set tooltips
            var tooltip = d3
                .select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0.9)
                .style("display", "none");

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
                    return colorScale(Math.log(d.value));
                })
                .style("stroke-width", 2)
                // .style("stroke", "#e9ecef")
                .style("stroke", "#e9ecef")
                .attr("rx", 2)
                .attr("ry", 2)
                .on("mouseover", (event, d) => {
                    // tooltip
                    tooltip.transition().duration(200).style("display", "block");
                    tooltip
                        .html(
                            `<span class="tooltip-label">${d.attr}:</span> ${d.value} ${xMetric[xDomain.indexOf(d.attr)]}`
                        )
                        .style("left", event.pageX + 10 + "px")
                        .style("top", event.pageY + 10 + "px");

                    // highlight
                    component.handleHighlight(d.id)

                })
                .on("mousemove", (event, d) => {
                    tooltip
                        .style("left", event.pageX + 10 + "px")
                        .style("top", event.pageY + 10 + "px");
                })
                .on("mouseout", (event, d) => {
                    tooltip.transition().duration(200).style("display", "none");

                    component.handleUndoHighlight(d.id)
                })
                .on("click", (event, d) => {
                    component.handleClick(d.id)
                })
        }
        return vitro_heat_pos
    }

    drawVivoSort() {
        var margin = { top: 10, right: 10, bottom: 10, left: 10 };

        var svg = d3
            .select("svg#detail_svg")
            .append("g")
            .attr("class", "sort")
            .style("opacity", 0)
            .attr("transform", "translate(" + (30 + this.state.medchemWidth + this.state.vitroWidth + margin.left + this.state.heatSquareLength) + "," + margin.top + ")");

        // add legend
        var linearGradient = svg.append("defs").append("linearGradient")
            .attr("id", `linear-gradient-ph`);

        linearGradient
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");

        //Set the color for the start (0%)
        linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "rgba(0, 129, 167,0.2)");

        //Set the color for the end (100%)
        linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "rgba(0, 129, 167,0.8)");

        svg.append("rect")
            .attr("width", 50)
            .attr("height", 13)
            .style("fill", `url(#linear-gradient-ph)`)
            .attr("x", 80)
            .attr("y", -5)

        svg.append("text")
            .text("xx value: 0~10")
            .attr("x", 0)
            .attr("y", 5)
            .style("font-size", 12)

        // x scale
        var xDomain = ["ED50", "t_half", "AUC", "Bio", "Sol"],
            xAttr = ["ED50", "t_half", "AUC", "Bioavailability", "Solubility"],
            xRange = [0, xDomain.length * this.state.heatSquareLength];
        var xScale = d3.scaleBand().domain(xDomain).range(xRange)

        // set tooltips
        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0.9)
            .style("display", "none");

        // arrow
        svg
            .append('defs')
            .append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', [0, 0, 4, 4])
            .attr('refX', 3)
            .attr('refY', 3)
            .attr('markerWidth', 4)
            .attr('markerHeight', 4)
            .attr('orient', 'auto-start-reverse')

        // ascending icon
        var ascendDef = svg.append('defs').append("g").attr("id", "ascending");

        ascendDef.append("rect")
            .attr("x", -3)
            .attr("y", -8)
            .attr("width", 17)
            .attr("height", 18)
            .style("fill", "#eeeeee")
            .attr("rx", 2)
            .attr("ry", 2)

        ascendDef
            .append("text")
            .attr("x", 0)
            .attr("y", 0)
            .text('0')
            .style("font-size", 9)
            .style("fill", "steelblue")

        ascendDef
            .append("text")
            .attr("x", 0)
            .attr("y", 8)
            .text('9')
            .style("font-size", 9)
            .style("fill", "black")

        ascendDef.append("line")
            .style("stroke", "black")
            .style("stroke-width", 1)
            .attr("x1", 10)
            .attr("y1", -6)
            .attr("x2", 10)
            .attr("y2", 6)
            .attr('marker-end', 'url(#arrow)')

        // descending icon
        var descendDef = svg.append('defs').append("g").attr("id", "descending")
            .attr("x", 20).attr("y", 20).style("border", "black").style("border-width", 1);

        descendDef.append("rect")
            .attr("x", -3)
            .attr("y", -8)
            .attr("width", 17)
            .attr("height", 18)
            .style("fill", "#eeeeee")
            .attr("rx", 2)
            .attr("ry", 2)

        descendDef
            .append("text")
            .attr("x", 0)
            .attr("y", 0)
            .text('9')
            .style("font-size", 9)
            .style("fill", "black")

        descendDef
            .append("text")
            .attr("x", 0)
            .attr("y", 8)
            .text('0')
            .style("font-size", 9)
            .style("fill", "steelblue")

        descendDef.append("line")
            .style("stroke", "black")
            .style("stroke-width", 1)
            .attr("x1", 10)
            .attr("y1", -6)
            .attr("x2", 10)
            .attr("y2", 6)
            .attr('marker-end', 'url(#arrow)')

        // draw ascending
        // svg.selectAll()
        //     .data(xDomain).enter()
        //     // .append('path')
        //     // .attr("d", d3.symbol().type(d3.symbolTriangle).size(60))
        //     // .attr("x", d => xScale(d))
        //     // .attr("y", 0)
        //     // .append('path')
        //     // .attr('d', d3.line()([[0, 0], [0, 8], [11, 4]]))
        //     .append("use").attr("xlink:href", "#ascending")
        //     .attr("transform", (d) => { return "translate(" + (xScale(d) + 5) + ",5)"; })
        //     // .style("fill", "rgba(218, 218, 218, 0.8)")
        //     .style("opacity", 0.5)
        //     .attr("class", "vivo-sort-a")
        //     .on("click", (_, d) => {
        //         // console.log("click ", d)
        //         this.setState({ vivoSort: { attr: xAttr[xDomain.indexOf(d)], acsending: true } })
        //         d3.selectAll(".vivo-sort-a").filter(i => i === d).style("opacity", 1)
        //         d3.selectAll(".vivo-sort-a").filter(i => i !== d).style("opacity", 0.3)
        //         d3.selectAll(".vivo-sort-de").style("opacity", 0.3)
        //     })
        //     .on("mouseover", (event) => {
        //         // tooltip
        //         tooltip.transition().duration(200).style("display", "block");
        //         tooltip
        //             .html(
        //                 `sort`
        //             )
        //             .style("left", event.pageX + 10 + "px")
        //             .style("top", event.pageY + 10 + "px");
        //     })
        //     .on("mousemove", (event) => {
        //         tooltip
        //             .style("left", event.pageX + 10 + "px")
        //             .style("top", event.pageY + 10 + "px");
        //     })
        //     .on("mouseout", () => {
        //         // console.log(d3.selectAll("path.vivo-sort"));
        //         // d3.selectAll("path.vivo-sort-a").style("cursor", "default")
        //         tooltip.transition().duration(400).style("display", "none");
        //     });

        // draw descending
        svg.selectAll()
            .data(xDomain).enter()
            // .append('path')
            // .attr("d", d3.symbol().type(d3.symbolTriangle).size(60))
            // .attr("x", d => xScale(d))
            // .attr("y", 0)
            // .append('path')
            // .attr('d', d3.line()([[0, 0], [0, 8], [11, 4]]))
            .append("use").attr("xlink:href", "#descending")
            .attr("transform", (d) => { return "translate(" + (xScale(d) + 5) + ",25)"; })
            .style("opacity", 0.5)
            .attr("class", "vivo-sort-de")
            .on("click", (_, d) => {
                // console.log("click ", d)
                this.setState({ vivoSort: { attr: xAttr[xDomain.indexOf(d)], acsending: false } })
                d3.selectAll(".vivo-sort-de").filter(i => i === d).style("opacity", 1)
                d3.selectAll(".vivo-sort-de").filter(i => i !== d).style("opacity", 0.3)
                d3.selectAll(".vivo-sort-a").style("opacity", 0.3)
            })
            .on("mouseover", (event) => {
                // d3.selectAll("path.vivo-sort-de").style("cursor", "pointer")
                // tooltip
                tooltip.transition().duration(200).style("display", "block");
                tooltip
                    .html(
                        `sort`
                    )
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
            })
            .on("mouseout", () => {
                // d3.selectAll("path.vivo-sort-de").style("cursor", "default")
                tooltip.transition().duration(400).style("display", "none");
            });

        svg.append("g").call(d3.axisTop(xScale))
            .call(g => {
                g.select(".domain").remove();
                g.selectAll("line").remove();
            })
            .selectAll("text")
            .attr("transform", "translate(13,55), rotate(-90)")
            .style("text-anchor", "middle")
            .style("font-size", 12)

    }

    drawVivoAxis() {
        var margin = { top: 35, right: 10, bottom: 10, left: 0 },
            width = this.state.vivoWidth - margin.left - margin.right;

        var svg = d3
            .select("svg#detail_svg")
            .append("g")
            .attr("transform", "translate(" + (10 + 30 + this.state.medchemWidth + this.state.vitroWidth + margin.left + this.state.heatSquareLength) + "," + margin.top + ")");

        // x scale
        var xDomain = ["ED50", "t_half", "AUC", "bio", "sol"],
            xRange = [0, xDomain.length * this.state.heatSquareLength];
        var xScale = d3.scaleBand().domain(xDomain).range(xRange)
        var attr = null;
        svg.append("g").call(d3.axisTop(xScale))
            .call(g => {
                g.select(".domain").remove();
                g.selectAll("line").remove();
            }).selectAll("text")
            .attr("transform", "translate(10,-5), rotate(-90)")
            .attr("class", "vivo-axis")
            .style("text-anchor", "start")
            .on("click", (e, d) => {
                // console.log("click ", d)
                this.setState({ vivoSortAttr: d })
                d3.selectAll("text.vivo-axis").filter(i => i === d).style("fill", "red")
                d3.selectAll("text.vivo-axis").filter(i => i !== d).style("fill", "black")
            })
            .on("mouseover", (e, d) => {
                // console.log(d3.selectAll("text.vivo-axis"));
                d3.selectAll("text.vivo-axis").style("cursor", "pointer")
            })
            .on("mouseout", (e, d) => {
                // console.log(d3.selectAll("text.vivo-axis"));
                d3.selectAll("text.vivo-axis").style("cursor", "default")
            });
        // svg.append("g")
        //     .selectAll()
        //     .data(xDomain)
        //     .enter()
        //     .append("text")
        //     .attr("class", "vivo-axis")
        //     .text(d => d)
        //     .attr("x", 0)
        //     .attr("y", (d) => xScale(d))
        //     .attr("transform", "rotate(-90)")
        //     .style("text-anchor", "start")
        //     .style("font-size", 10)
        //     .on("click", (e, d) => {
        //         console.log("click ", d)
        //         this.setState({ vivoSortAttr: d })
        //     })
        //     .on("mouseover", (e, d) => {
        //         console.log(d3.selectAll("text.vivo-axis"));
        //         d3.selectAll("text.vivo-axis").style("cursor", "pointer")
        //     });
    }

    drawVivoHeatmap(vivoHeatData, sort, initial_sort) {
        // if (this.props.detaildata[2]) {
        if (vivoHeatData[0]) {
            var component = this;
            console.log("draw vivo heatmap")
            var margin = { top: 85, right: 10, bottom: 10, left: 0 },
                width = this.state.vivoWidth - margin.left - margin.right,
                height = this.state.Height - 40 - margin.top - margin.bottom;

            var svg = d3
                .select("svg#detail_svg")
                .append("g")
                .attr("transform", "translate(" + (10 + 30 + this.state.medchemWidth + this.state.vitroWidth + margin.left + this.state.heatSquareLength) + "," + margin.top + ")");

            // console.log("heatmap", this.props.detaildata[2])
            // var data = this.props.detaildata[2];
            console.log("heatmap", vivoHeatData)
            var data = vivoHeatData;

            // x scale
            var xDomain = ["ED50", "t_half", "AUC", "bioavailability", "solubility"],
                xMetric = ["ug/animal", "h", "ng h/mL", "%", "ug/mL"],
                xRange = [0, xDomain.length * this.state.heatSquareLength];
            var xScale = d3.scaleBand().domain(xDomain).range(xRange)
            // svg.append("g").call(d3.axisTop(xScale))
            //     .call(g => {
            //         g.select(".domain").remove();
            //         g.selectAll("line").remove();
            //     }).selectAll("text")
            //     .attr("transform", "translate(10,-5), rotate(-90)")
            //     .style("text-anchor", "start")
            //     .on("click", (e, d) => {
            //         console.log("click ", d)
            //     });

            // y scale (to make a square)
            var yDomain = [];
            data.forEach(d => {
                if (!yDomain.includes(d.id)) yDomain.push(d.id)
            })
            // var attr = "ED50";
            if (sort.attr) yDomain = this.sortBy(data, sort.attr, sort.acsending);
            else if (initial_sort) yDomain = initial_sort.filter(d => yDomain.includes(d))
            var yRange = [0, yDomain.length * xScale.bandwidth()]
            var yScale = d3.scaleBand().domain(yDomain).range(yRange)

            // store positions for path
            var vivo_heat_pos = []
            yDomain.forEach(d => {
                vivo_heat_pos.push({
                    id: d,
                    x_in: (10 + 30 + this.state.medchemWidth + this.state.vitroWidth + margin.left + this.state.heatSquareLength),
                    x_out: (10 + 30 + this.state.medchemWidth + this.state.vitroWidth + margin.left + this.state.heatSquareLength + xDomain.length * xScale.bandwidth()),
                    y: yScale(d) + margin.top + 1 / 2 * yScale.bandwidth()
                })
            })
            console.log("vivo_heat_pos", vivo_heat_pos)

            // color scale
            // var colorScale = d3
            //     .scaleSequential()
            //     .interpolator(d3.interpolateOranges)
            //     .domain([0, 8]);
            var colorScale = d3.scaleLinear()
                .domain([0, 8])
                .range(["rgba(0, 129, 167,0)", "rgba(0, 129, 167,1)"])
            // .range(["white", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e"]) // pink
            // .range(["white", "#a9d6e5", "#89c2d9", "#61a5c2", "#468faf", "#2c7da0", "#2a6f97"])
            // .range(["white", "#ffe3e0", "#fbc3bc", "#f7a399", "#f38375", "#ef6351", "#c32f27"])

            // set tooltips
            var tooltip = d3
                .select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("display", "none")
                .style("opacity", 0.9);

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
                    return colorScale(Math.log(d.value));
                })
                .style("stroke-width", 2)
                // .style("stroke", "#e9ecef")
                .style("stroke", "#e9ecef")
                .attr("rx", 2)
                .attr("ry", 2)
                .on("mouseover", (event, d) => {
                    // tooltip
                    tooltip.transition().duration(200).style("display", "block");
                    tooltip
                        .html(
                            `<span class="tooltip-label">${d.attr}:</span> ${d.value} ${xMetric[xDomain.indexOf(d.attr)]}`
                        )
                        .style("left", event.pageX + 10 + "px")
                        .style("top", event.pageY + 10 + "px");

                    // highlight
                    component.handleHighlight(d.id)


                })
                .on("mousemove", (event, d) => {
                    tooltip
                        .style("left", event.pageX + 10 + "px")
                        .style("top", event.pageY + 10 + "px");
                })
                .on("mouseout", (event, d) => {
                    tooltip.transition().duration(200).style("display", "none");

                    component.handleUndoHighlight(d.id)
                })
        }
        return vivo_heat_pos
    }

    sortBy(data, attr, acsending) {
        var yDomain = [];
        data.forEach(d => {
            if (!yDomain.includes(d.id) && d.attr == attr) yDomain.push([d.id, d.value])
        })
        yDomain = yDomain.sort((a, b) => acsending ? (a[1] - b[1]) : (b[1] - a[1])).map(d => d[0])
        // console.log("ydomain", yDomain)
        return yDomain
    }

    drawPaths(vitro_heat_pos, vivo_heat_pos, node_pos, sankey_pos) {
        if (vitro_heat_pos && vivo_heat_pos && node_pos && sankey_pos) {
            // console.log("vitro", vitro_heat_pos)
            // console.log("vivo", vivo_heat_pos)


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
                        .attr("opacity", 0.5)
                        .attr("fill", "none")
                        .attr("id", "detailpath-" + d.id.toString())
                        .lower()
                })
            }

            // draw path between vivo and vitro
            if (vitro_heat_pos[0]) {
                vivo_heat_pos.forEach(d => {
                    var curve = d3.line().curve(d3.curveBumpX)
                    var startNode = vitro_heat_pos.find(node => node.id == d.id)
                    var points = [[startNode.x_out, startNode.y], [d.x_in, d.y]]
                    d3.select("svg#detail_svg")
                        .append("path")
                        .attr("class", "detail_path")
                        .attr("d", curve(points))
                        .attr("stroke-width", 1)
                        .attr("stroke", "#adb5bd")
                        .attr("opacity", 0.5)
                        .attr("fill", "none")
                        .attr("id", "detailpath-" + d.id.toString())
                        .lower()
                })
            }

            // draw path between vivo and sankey

            if (vivo_heat_pos[0]) {
                sankey_pos.forEach(d => {
                    var curve = d3.line().curve(d3.curveBumpX)
                    var startNode = vivo_heat_pos.find(node => node.id == d.id)
                    // console.log("startnode", startNode)
                    var points = [[startNode.x_out, startNode.y], [d.x, d.y]]
                    d3.select("svg#detail_svg")
                        .append("path")
                        .attr("class", "detail_path")
                        .attr("d", curve(points))
                        .attr("stroke-width", 1)
                        .attr("stroke", "#adb5bd")
                        .attr("opacity", 0.5)
                        .attr("fill", "none")
                        .attr("id", "detailpath-" + d.id.toString())
                        .lower()
                })
            }

        }
    }

    drawSankeyChart(sankeyData, initial_sort) {
        // if (this.props.sankeydata) {
        if (sankeyData[0]) {
            var component = this;
            console.log("draw sankey chart")
            var margin = { top: 30, right: 10, bottom: 10, left: 0 },
                width = this.state.vivoWidth - margin.left - margin.right,
                height = this.state.Height - 40 - margin.top - margin.bottom;

            var svg = d3
                .select("svg#detail_svg")
                .append("g")
                .attr("transform", "translate(" + (10 + 30 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + margin.left + 1 / 6 * this.state.sankeyWidth) + "," + margin.top + ")");

            // console.log("sankeydata", this.props.sankeydata)
            // var sankeydata = this.props.sankeydata;
            // console.log("sankeyData", sankeyData)
            var sankeydata = sankeyData.sort((a, b) => initial_sort.indexOf(a.name) - initial_sort.indexOf(b.name));

            // color scale for status
            // var colorScale = d3
            //     .scaleSequential()
            //     .interpolator(d3.interpolateRainbow)
            //     .domain([0, 8]);
            var colorScale = d3
                .scaleOrdinal()
                .domain([0, 8])
                .range(["#8dd3c7", "#c51b7d", "#bebada", "#b3de69", "#fccde5", "#d9d9d9", "#b35806", "#984ea3", "#bf812d"])
            // .range(["#eddcd2", "#fde2e4", "#fad2e1", "#99c1de", "#c5dedd", "#fff1e6", "#dbe7e4", "#bcd4e6", "#d6e2e9"])

            // set tooltips
            var tooltip = d3
                .select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0.9)
                .style("display", "none");

            // iterate data
            var cur_y_offset = 0; // starting y of each sankey chart
            var rectHeight = 15, rectWidth = 70; // height of each rect
            var x_offset = (this.state.sankeyWidth - 3 * rectWidth) / 2;
            var sankey_pos = [];
            sankeydata.forEach(d => {
                // console.log(d["data"])
                var sankeysvg = svg.append("g").attr("transform", "translate(0," + cur_y_offset + ")")

                // iterate each phase --> col
                var phases = ["1", "2", "3"], max_num_of_company = 0;
                var phase1_pos = [], phase2_pos = [], phase3_pos = [];
                phases.forEach(phase => {
                    // console.log(phase)
                    var company_list = d.data[`p${phase}_company`]; // array of 9 list with company names of corresponding status
                    var terminate_reason = d.data[`p${phase}_terminate_resaon`];
                    // console.log("terminate reason", d.data)
                    // for (const[key,value] of Object.entries(terminate_reason)){

                    // }
                    var num_of_company = d.data[`p${phase}_company_num`], offset = 0
                    if (phase === "1") max_num_of_company = d.data[`p${phase}_company_num`]
                    else offset = (max_num_of_company - num_of_company) / 2 * rectHeight

                    // iterate each company --> row
                    // create a list of object
                    var company_obj_list = [], border_list = [], height = 0;
                    company_list.forEach((companies, status) => {
                        if (companies.length) {
                            companies.forEach(company => {
                                var reason;
                                // if (Object.keys(terminate_reason).indexOf(company)) reason = terminate_reason[company]
                                company_obj_list.push({ id: d.name, company_name: company, status: status, t_reason: reason ? reason : null })
                            })
                            border_list.push({ id: d.name, status, length: companies.length, height })
                            height += companies.length
                        }
                    })
                    // console.log("company_obj_list", company_obj_list)
                    // console.log("border_list", border_list)

                    sankeysvg.selectAll("rect#sankey")
                        .data(company_obj_list)
                        .enter()
                        .append("rect")
                        .attr("x", (parseInt(phase) - 1) * this.state.sankeyWidth / 3 - 1 / 2 * rectWidth)
                        .attr("y", (d, i) => {
                            // console.log(d)
                            // store pos for path
                            if (phase === "1") phase1_pos.push({ id: d.id, company: d.company_name, x: (parseInt(phase) - 1) * this.state.sankeyWidth / 3 - 1 / 2 * rectWidth + 30, y: (i + 0.5) * rectHeight + offset });
                            else if (phase === "2") phase2_pos.push({ id: d.id, company: d.company_name, x_in: (parseInt(phase) - 1) * this.state.sankeyWidth / 3 - 1 / 2 * rectWidth, x_out: (parseInt(phase) - 1) * this.state.sankeyWidth / 3 - 1 / 2 * rectWidth + 30, y: (i + 0.5) * rectHeight + offset });
                            else phase3_pos.push({ id: d.id, company: d.company_name, x: (parseInt(phase) - 1) * this.state.sankeyWidth / 3 - 1 / 2 * rectWidth, y: (i + 0.5) * rectHeight + offset });

                            return i * rectHeight + offset
                        })
                        .attr("width", 30)
                        .attr("height", rectHeight)
                        .attr("id", d => d.id)
                        .attr("class", "sankey")
                        // .style("fill", d => colorScale(d.status))
                        .style("fill", "rgba(209, 179, 196,0.5)")
                        .style("stroke-width", 0.5)
                        .style("stroke", "white")
                        .on("mouseover", (event, d) => {
                            // tooltip
                            var terminatespan = ""
                            if (d.status == 1) terminatespan = `<span class="tooltip-label">Terminate reason:</span> Death<br/>`
                            tooltip.transition().duration(200).style("display", "block");
                            tooltip
                                .html(
                                    `<div style="width:130px"> 
                                    <span class="tooltip-label">Company:</span> ${d.company_name}<br/>  
                                    ${terminatespan}
                                    </div>`
                                )
                                .style("left", event.pageX - 130 + "px")
                                .style("top", event.pageY + 10 + "px");

                            // highlight
                            component.handleHighlight(d.id)

                        }).on("mousemove", (event, d) => {
                            tooltip
                                .style("left", event.pageX - 130 + "px")
                                .style("top", event.pageY + 10 + "px");
                        })
                        .on("mouseout", (event, d) => {
                            tooltip.transition().duration(200).style("display", "none");

                            component.handleUndoHighlight(d.id)
                        })

                    // draw status border
                    sankeysvg.selectAll("rect#sankey")
                        .data(border_list)
                        .enter()
                        .append("rect")
                        .attr("x", (parseInt(phase) - 1) * this.state.sankeyWidth / 3 - 1 / 2 * rectWidth)
                        .attr("y", (d, i) => d.height * rectHeight + offset)
                        .attr("width", 30)
                        .attr("height", d => d.length * rectHeight)
                        .attr("class", "sankey-border")
                        .attr("id", d => d.id)
                        // .style("fill", d => colorScale(d.status))
                        .style("fill", "none")
                        .style("stroke-width", 2)
                        .style("stroke", "#adb5bd")

                    // add text
                    var statuslist = ["Not yet recruiting", "Recruiting", "Enrolling by invitation", "Active, not recruiting", "Suspended", "Terminated", "Completed", "Withdrawn", "Unknown status"]
                    sankeysvg.selectAll("text#sankey")
                        .data(border_list)
                        .enter()
                        .append("text")
                        .attr("x", (parseInt(phase) - 1) * this.state.sankeyWidth / 3)
                        .attr("y", (d, i) => (d.height + 1 / 2 * d.length) * rectHeight + offset + 2)
                        .attr("width", 40)
                        .attr("height", d => d.length * rectHeight)
                        .attr("class", "sankey")
                        .text(d => statuslist[d.status])
                        .style("font-size", 11)
                        .attr("text-anchor", "start")
                        .style("fill", "#495057")

                    // sankeysvg.selectAll("rect#sankey")
                    //     .data(company_obj_list)
                    //     .enter()
                    //     .append("text")
                    //     .attr("x", (parseInt(phase) - 1) * this.state.sankeyWidth / 3)
                    //     .attr("y", (d, i) => {
                    //         return i * rectHeight + offset + 3 / 4 * rectHeight
                    //     })
                    //     .attr("class", "sankey")
                    //     .text(d => statuslist[d.status])
                    //     .style("font-size", 11)
                    //     .attr("text-anchor", "start")
                    //     .style("fill", "#495057")
                    // .attr("transform", "translate(-5,0)")

                    // sankeysvg.selectAll("rect#sankey")
                    //     .data(company_obj_list)
                    //     .enter()
                    //     .append("text")
                    //     .attr("x", (parseInt(phase) - 1) * this.state.sankeyWidth / 3)
                    //     .attr("y", (d, i) => {
                    //         return i * rectHeight + offset + 3 / 4 * rectHeight
                    //     })
                    //     .attr("class", "sankey")
                    //     .text(d => statuslist[d.status][0])
                    //     .style("font-size", 12)
                    //     .attr("text-anchor", "middle")
                    //     .style("fill", "#495057")
                    //     .attr("transform", "translate(-25,0)")

                })
                // draw parenthesis
                var p = [{ id: d.name, h: max_num_of_company * rectHeight }]
                svg
                    .selectAll("rect#sankey")
                    .data(p)
                    .enter()
                    .append("rect")
                    .attr("x", - 1 / 2 * rectWidth - 5)
                    .attr("y", cur_y_offset)
                    .attr("width", 5)
                    .attr("height", d => d.h)
                    .attr("class", "sankey")
                    // .attr("id", d => d.id)
                    .style("fill", "none")
                    .style("stroke-width", 1)
                    .style("stroke", "#adb5bd")
                // .style("opacity", 0.5)

                // store pos
                sankey_pos.push({
                    id: d.name,
                    x: (10 + 30 - 5 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + margin.left + 1 / 6 * this.state.sankeyWidth - 1 / 2 * rectWidth),
                    y: cur_y_offset + 1 / 2 * max_num_of_company * rectHeight + margin.top
                })
                // console.log("sankey pos", sankey_pos)

                cur_y_offset += max_num_of_company * rectHeight + 20;

                // draw sankey path
                // console.log(phase1_pos, phase2_pos, phase3_pos)
                if (phase2_pos && phase3_pos && phase1_pos) {

                    // draw path between phase1 and phase2
                    if (phase1_pos[0]) {
                        phase2_pos.forEach(d => {
                            // console.log(d)
                            var curve = d3.line().curve(d3.curveBumpX)
                            var startNode = phase1_pos.find(node => node.company == d.company)
                            var points = [[startNode.x, startNode.y], [d.x_in, d.y]]
                            sankeysvg
                                .append("path")
                                .attr("class", "detail_path")
                                .attr("d", curve(points))
                                .attr("stroke-width", 1)
                                .attr("stroke", "#adb5bd")
                                .attr("opacity", 0.5)
                                .attr("fill", "none")
                                .attr("id", d.id)
                                .lower()
                                .on("mouseover", (event) => {
                                    console.log(d)
                                    // tooltip
                                    tooltip.transition().duration(200).style("display", "block");
                                    tooltip
                                        .html(
                                            `company: ${d.company}`
                                        )
                                        .style("left", event.pageX + 20 + "px")
                                        .style("top", event.pageY + 20 + "px");
                                }).on("mousemove", (event) => {
                                    tooltip
                                        .style("left", event.pageX + 20 + "px")
                                        .style("top", event.pageY + 20 + "px");
                                })
                                .on("mouseout", () => {
                                    tooltip.transition().duration(200).style("display", "none");
                                })
                        })
                    }

                    // draw path between phase2 and phase3
                    if (phase2_pos[0]) {
                        phase3_pos.forEach(d => {
                            var curve = d3.line().curve(d3.curveBumpX)
                            var startNode = phase2_pos.find(node => node.company == d.company)
                            var points = [[startNode.x_out, startNode.y], [d.x, d.y]]
                            sankeysvg
                                .append("path")
                                .attr("class", "detail_path")
                                .attr("d", curve(points))
                                .attr("stroke-width", 1)
                                .attr("stroke", "#adb5bd")
                                .attr("opacity", 0.5)
                                .attr("fill", "none")
                                .attr("id", d.id)
                                .lower()
                                .on("mouseover", (event) => {
                                    console.log(d)
                                    // tooltip
                                    tooltip.transition().duration(200).style("opacity", 0.7);
                                    tooltip
                                        .html(
                                            `company: ${d.company}`
                                        )
                                        .style("left", event.pageX + 20 + "px")
                                        .style("top", event.pageY + 20 + "px");
                                }).on("mousemove", (event) => {
                                    tooltip
                                        .style("left", event.pageX + 20 + "px")
                                        .style("top", event.pageY + 20 + "px");
                                })
                                .on("mouseout", () => {
                                    tooltip.transition().duration(200).style("opacity", 0);
                                })
                        })
                    }

                }
            })
        }
        return sankey_pos
    }

    render() {
        return (
            <div>
                <div id="axis" />

                <div id="detail" style={{ height: this.state.Height, overflow: "auto" }}>
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