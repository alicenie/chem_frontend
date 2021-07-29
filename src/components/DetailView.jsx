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
            heatSquareLength: ((this.props.width - 30 - 30) / 7 * 2.2 - 40) / 14
        }
    }

    componentDidMount() {
        this.drawBoundary();
        this.drawAxis('axis');
        // this.drawVitroAxis();
        // this.drawVivoAxis();
        this.drawVitroSort();
        this.drawVivoSort();
    }

    componentDidUpdate() {
        console.log("DetailView did update")
        this.drawWhole();
        // this.drawSankeyChart(); // later merge into whole
    }

    drawBoundary() {
        var svg = d3.select("#detail")
            .append("svg")
            .attr("id", "detail_svg")
            .attr("width", this.state.Width + 20)
            .attr("height", this.state.Height)
            .append("g")
            .attr("transform", "translate(8,0)")

        // for (var i = 0; i < 3; i++) {
        svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", this.state.Height - 40)
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
            .attr("height", this.state.Height - 40)
            .attr("width", this.state.vitroWidth + this.state.vivoWidth + 5)
            .style("stroke", "#ced4da")
            .style("fill", "none")
            .style("stroke-width", "2px")
            .attr("rx", 5)
            .attr("ry", 5);

        // svg.append("rect")
        //     .attr("x", 30 + this.state.medchemWidth + this.state.vitroWidth)
        //     .attr("y", 0)
        //     .attr("height", this.state.Height - 40)
        //     .attr("width", this.state.vivoWidth)
        //     .style("stroke", "#ced4da")
        //     .style("fill", "none")
        //     .style("stroke-width", "2px");

        svg.append("rect")
            .attr("x", 35 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth)
            .attr("y", 0)
            .attr("height", this.state.Height - 40)
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

    drawWhole() {
        // clear svg
        d3.selectAll(".network").remove()
        d3.selectAll('.detail_path').remove()
        d3.selectAll(".heatmap").remove()
        d3.selectAll(".sankey").remove()
        d3.selectAll("g.sort").style("opacity", 1)
        var { node_pos, initial_sort } = this.drawNetwork();
        var vitro_heat_pos = this.drawVitroHeatmap(this.state.vitroSort, initial_sort),
            vivo_heat_pos = this.drawVivoHeatmap(this.state.vivoSort, initial_sort),
            sankey_pos = this.drawSankeyChart();
        this.drawPaths(vitro_heat_pos, vivo_heat_pos, node_pos, sankey_pos)
    }

    drawNetwork() {
        if (this.props.detaildata[0]) {

            console.log("draw network")
            var node_pos = []
            var margin = { top: 0, right: 0, bottom: 0, left: 0 },
                width = this.state.medchemWidth + 20 - margin.left - margin.right,
                height = this.state.Height - 40 - margin.top - margin.bottom;

            var svg = d3
                .select("svg#detail_svg")
                .append("g")
                .attr("transform", "translate(10,0)");

            // d3.json(this.props.detaildata[0])
            // .then(function (data) {
            // console.log('nodes', this.props.detaildata[0].nodes);
            // console.log('links', this.props.detaildata[0].links);
            var nodes = this.props.detaildata[0].nodes,
                links = this.props.detaildata[0].links;

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
            var radius = 15;
            var rScale = d3.scaleLinear().domain([1, 10]).range([5, radius])

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
                .force("charge", d3.forceManyBody().strength(0)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
                .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
                .force("collision", d3.forceCollide(d => { // This prevents collision between nodes
                    // console.log('d in collision', d)
                    // return rScale(d.value)
                    return radius + 3
                }))
                .stop()

            // make the simulation run without drawing anything
            for (var i = 0; i < 300; ++i) simulation.tick();
            // console.log("simulation end")
            console.log("nodes", nodes)
            node_pos = nodes.map(d => { return { id: d.id, x: d.x, y: d.y } })
            console.log(node_pos)
            // this.setState({ node_pos })

            // draw nodes manually using the x and y created by simulation
            var node = svg
                .selectAll("circle")
                .data(nodes)
                .enter()
                .append("circle")
                .attr("class", "network")
                .attr("r", d => rScale(d.value))
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                // .style("stroke", (d) => colorScale(d.group))
                // .style("stroke-width", 4)
                .style("fill", (d) => "#f4978e")
                .on("mouseover", function (event, d) {
                    // console.log(d.id)

                    // tooltip
                    tooltip.transition().duration(200).style("opacity", 0.9);
                    tooltip
                        .html(() => {
                            var author = ""
                            d.paper_author.forEach(d => author += (d.split(' ')[0][0] + '. ' + d.split(' ')[1] + ", "))

                            var metrics = ""
                            for (const [key, value] of Object.entries(d.medicinal_chemistry_metrics)) {
                                if (value) metrics += `<span>${key}: ${value}</span><br/>`
                            }
                            return `<div class="network-tooltip" style="padding:2px;width:360px">
                            <div class="row">
                            <div class="col-3" style="margin:2px">
                            <img src='${d.paper_abstract_image}' width=80/>
                            ${metrics}
                            </div>
                            
                            <div class="col-7" style="margin-left:3px;padding:0">
                            <span class="tooltip-title">${d.paper_title} (${d.paper_year})</span><br/>
                            <span class="tooltip-author">${author}</span><br/><br/>
                            <span class="tooltip-label">Doi:</span><span class="tooltip-doi">${d.doi}</span><br/>
                            <span class="tooltip-label">Cited:</span>${d.paper_cited}<br/>
                            <span class="tooltip-label">Journal:</span>${d.paper_journal}<br/>
                            
                            </div>
                            </div>
                            <span class="tooltip-label">Institution:</span>${d.paper_institution}<br/>
                            </div>
                            `}
                        )
                        .style("left", event.pageX - 360 + "px")
                        .style("top", event.pageY - 160 + "px");

                    // highlight
                    d3.selectAll("rect.heatmap")
                        .filter((node) => node.id == d.id)
                        .style("stroke", "orange")
                        .style("stroke-width", 3)
                    // .classed("highlightRect", true);

                    d3.selectAll("rect.heatmap")
                        .filter((node) => node.id != d.id)
                        .style("opacity", 0.5)

                    d3.selectAll("rect.sankey")
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

                    d3.selectAll("text.sankey").filter((t) => t.id != d.id)
                        .style("opacity", 0.5)
                })
                .on("mousemove", (event, d) => {
                    tooltip
                        .style("left", event.pageX - 360 + "px")
                        .style("top", event.pageY - 160 + "px");
                })
                .on("mouseout", (event, d) => {
                    tooltip.transition().duration(200).style("opacity", 0);

                    d3.selectAll("rect.heatmap")
                        .style("stroke-width", 2)
                        .style("stroke", "#e9ecef")
                        .style("opacity", 1)

                    d3.selectAll("rect.sankey")
                        .style("opacity", 1)

                    d3.selectAll("circle.network")
                        .style("stroke-width", 0)
                        .style("opacity", 1)

                    d3.selectAll("path#" + d.id)
                        .attr("opacity", 0.5)
                        .attr("stroke-width", 1)

                    d3.selectAll("text.sankey").filter((t) => t.id != d.id)
                        .style("opacity", 1)
                })
            // .call(drag(simulation));

            // draw arc
            var arc_data = [{ position: 5, value: 1 }, { position: 10, value: 1 }, { position: 15, value: 1 }, { position: 20, value: 1 }]
            nodes.forEach(node => {
                var svg = d3
                    .select("svg#detail_svg")
                    .append("g")
                    .attr("transform", "translate(" + (10 + node.x + "," + node.y + ")"))

                var arc_data_ready = d3.pie().value(d => d.value)(arc_data)

                var arc = d3.arc()
                    .innerRadius(radius)
                    .outerRadius(radius + 3)
                    // .startAngle(0.5 * Math.PI)
                    // .endAngle(Math.PI)
                    .padAngle(0.03 * Math.PI);

                // console.log("level", node.level)
                svg.selectAll()
                    .data(arc_data_ready)
                    .enter()
                    .append("path")
                    .attr("class", "network")
                    .attr("d", arc)
                    .attr("fill", (d) => {
                        // console.log(d.data.position)
                        return d.data.position < node.level ? "#f4978e" : "lightgrey"
                    })
            })

            // initial vitro heatmap order
            var initial_sort = nodes.sort((a, b) => a.y - b.y).map(d => d.id)
            console.log("initial_sort", initial_sort)

        }

        return { node_pos, initial_sort }
    }

    drawVitroSort() {
        var margin = { top: 25, right: 10, bottom: 10, left: 10 },
            width = this.state.vitroWidth - margin.left - margin.right;

        var svg = d3
            .select("svg#detail_svg")
            .append("g")
            .attr("class", "sort")
            .style("opacity", 0)
            .attr("transform", "translate(" + (10 + 25 + this.state.medchemWidth + margin.left) + "," + margin.top + ")");

        // x scale
        var xDomain = ["IC50", "Ki", "Kd", "EC50", "se", "hERG", "sol"],
            xRange = [0, xDomain.length * this.state.heatSquareLength];
        var xScale = d3.scaleBand().domain(xDomain).range(xRange)

        // set tooltips
        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        svg.selectAll()
            .data(xDomain).enter()
            // .append('path')
            // .attr("d", d3.symbol().type(d3.symbolTriangle).size(60))
            // .attr("x", d => xScale(d))
            // .attr("y", 0)
            .append('path')
            .attr('d', d3.line()([[0, 0], [0, 8], [11, 4]]))
            .attr("transform", (d) => { return "translate(" + (xScale(d) + 11) + ",5), rotate(-90)"; })
            .style("fill", "rgba(218, 218, 218, 0.8)")
            .attr("class", "vitro-sort-a")
            .on("click", (_, d) => {
                // console.log("click ", d)
                this.setState({ vitroSort: { attr: d, acsending: true } })
                d3.selectAll("path.vitro-sort-a").filter(i => i === d).style("fill", "grey")
                d3.selectAll("path.vitro-sort-a").filter(i => i !== d).style("fill", "rgba(218, 218, 218, 0.8)")
                d3.selectAll("path.vitro-sort-de").style("fill", "rgba(218, 218, 218, 0.8)")
            })
            .on("mouseover", (event) => {
                d3.selectAll("path.vitro-sort-a").style("cursor", "pointer")
                // tooltip
                tooltip.transition().duration(200).style("opacity", 0.9);
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
                // console.log(d3.selectAll("path.vitro-sort"));
                d3.selectAll("path.vitro-sort-a").style("cursor", "default")
                tooltip.transition().duration(400).style("opacity", 0);
            });

        svg.selectAll()
            .data(xDomain).enter()
            // .append('path')
            // .attr("d", d3.symbol().type(d3.symbolTriangle).size(60))
            // .attr("x", d => xScale(d))
            // .attr("y", 0)
            .append('path')
            .attr('d', d3.line()([[0, 0], [0, 8], [11, 4]]))
            .attr("transform", (d) => { return "translate(" + (xScale(d) + 19) + ",8), rotate(90)"; })
            .style("fill", "rgba(218, 218, 218, 0.8)")
            .attr("class", "vitro-sort-de")
            .on("click", (_, d) => {
                // console.log("click ", d)
                this.setState({ vitroSort: { attr: d, acsending: false } })
                d3.selectAll("path.vitro-sort-de").filter(i => i === d).style("fill", "grey")
                d3.selectAll("path.vitro-sort-de").filter(i => i !== d).style("fill", "rgba(218, 218, 218, 0.8)")
                d3.selectAll("path.vitro-sort-a").style("fill", "rgba(218, 218, 218, 0.8)")
            })
            .on("mouseover", (event) => {
                d3.selectAll("path.vitro-sort-de").style("cursor", "pointer")
                // tooltip
                tooltip.transition().duration(200).style("opacity", 0.9);
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
                d3.selectAll("path.vitro-sort-de").style("cursor", "default")
                tooltip.transition().duration(400).style("opacity", 0);
            });

        svg.append("g").call(d3.axisTop(xScale))
            .call(g => {
                g.select(".domain").remove();
                g.selectAll("line").remove();
            })
            .selectAll("text")
            .attr("transform", "translate(8,5), rotate(-90)")
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

    drawVitroHeatmap(sort, initial_sort) {
        if (this.props.detaildata[1]) {

            console.log("draw vitro heatmap")
            var margin = { top: 53, right: 10, bottom: 10, left: 10 },
                width = this.state.vitroWidth - margin.left - margin.right,
                height = this.state.Height - 40 - margin.top - margin.bottom;

            var svg = d3
                .select("svg#detail_svg")
                .append("g")
                .attr("transform", "translate(" + (10 + 25 + this.state.medchemWidth + margin.left) + "," + margin.top + ")");

            console.log("vitro heatmap", this.props.detaildata[1])
            var data = this.props.detaildata[1];

            // x scale
            var xDomain = ["IC50", "Ki", "Kd", "EC50", "se", "hERG", "sol"],
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
                .domain([0, 6])
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
                // .style("stroke", "#e9ecef")
                .style("stroke", "#e9ecef")
                .attr("rx", 2)
                .attr("ry", 2)
                .on("mouseover", (event, d) => {
                    // tooltip
                    tooltip.transition().duration(200).style("opacity", 0.9);
                    tooltip
                        .html(
                            `id: ${d.id}<br/>  ${d.attr}: ${d.value}`
                        )
                        .style("left", event.pageX + 10 + "px")
                        .style("top", event.pageY + 10 + "px");

                    // highlight
                    d3.selectAll("rect.heatmap")
                        .filter((node) => node.id == d.id)
                        .style("stroke", "orange")
                        .style("stroke-width", 3)
                        .classed("highlightRect", true);

                    d3.selectAll("rect.heatmap")
                        .filter((node) => node.id != d.id)
                        .style("opacity", 0.5)

                    d3.selectAll("rect.sankey")
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

                    d3.selectAll("text.sankey").filter((t) => t.id != d.id)
                        .style("opacity", 0.5)

                })
                .on("mousemove", (event, d) => {
                    tooltip
                        .style("left", event.pageX + 10 + "px")
                        .style("top", event.pageY + 10 + "px");
                })
                .on("mouseout", (event, d) => {
                    tooltip.transition().duration(200).style("opacity", 0);

                    d3.selectAll("rect.heatmap")
                        .style("stroke-width", 2)
                        .style("stroke", "#e9ecef")
                        .style("opacity", 1)

                    d3.selectAll("rect.sankey")
                        .style("opacity", 1)

                    d3.selectAll("circle.network")
                        .style("stroke-width", 0)
                        .style("opacity", 1)

                    d3.selectAll("path#" + d.id)
                        .attr("opacity", 0.5)
                        .attr("stroke-width", 1)

                    d3.selectAll("text.sankey").filter((t) => t.id != d.id)
                        .style("opacity", 1)
                })
        }
        return vitro_heat_pos
    }

    drawVivoSort() {
        var margin = { top: 25, right: 10, bottom: 10, left: 10 };

        var svg = d3
            .select("svg#detail_svg")
            .append("g")
            .attr("class", "sort")
            .style("opacity", 0)
            .attr("transform", "translate(" + (30 + this.state.medchemWidth + this.state.vitroWidth + margin.left + this.state.heatSquareLength) + "," + margin.top + ")");

        // x scale
        var xDomain = ["ED50", "t_half", "AUC", "bio", "sol"],
            xRange = [0, xDomain.length * this.state.heatSquareLength];
        var xScale = d3.scaleBand().domain(xDomain).range(xRange)

        // set tooltips
        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        svg.selectAll()
            .data(xDomain).enter()
            // .append('path')
            // .attr("d", d3.symbol().type(d3.symbolTriangle).size(60))
            // .attr("x", d => xScale(d))
            // .attr("y", 0)
            .append('path')
            .attr('d', d3.line()([[0, 0], [0, 8], [11, 4]]))
            .attr("transform", (d) => { return "translate(" + (xScale(d) + 11) + ",5), rotate(-90)"; })
            .style("fill", "rgba(218, 218, 218, 0.8)")
            .attr("class", "vivo-sort-a")
            .on("click", (_, d) => {
                // console.log("click ", d)
                this.setState({ vivoSort: { attr: d, acsending: true } })
                d3.selectAll("path.vivo-sort-a").filter(i => i === d).style("fill", "grey")
                d3.selectAll("path.vivo-sort-a").filter(i => i !== d).style("fill", "rgba(218, 218, 218, 0.8)")
                d3.selectAll("path.vivo-sort-de").style("fill", "rgba(218, 218, 218, 0.8)")
            })
            .on("mouseover", (event) => {
                d3.selectAll("path.vivo-sort-a").style("cursor", "pointer")
                // tooltip
                tooltip.transition().duration(200).style("opacity", 0.9);
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
                // console.log(d3.selectAll("path.vivo-sort"));
                d3.selectAll("path.vivo-sort-a").style("cursor", "default")
                tooltip.transition().duration(400).style("opacity", 0);
            });

        svg.selectAll()
            .data(xDomain).enter()
            // .append('path')
            // .attr("d", d3.symbol().type(d3.symbolTriangle).size(60))
            // .attr("x", d => xScale(d))
            // .attr("y", 0)
            .append('path')
            .attr('d', d3.line()([[0, 0], [0, 8], [11, 4]]))
            .attr("transform", (d) => { return "translate(" + (xScale(d) + 19) + ",8), rotate(90)"; })
            .style("fill", "rgba(218, 218, 218, 0.8)")
            .attr("class", "vivo-sort-de")
            .on("click", (_, d) => {
                // console.log("click ", d)
                this.setState({ vivoSort: { attr: d, acsending: false } })
                d3.selectAll("path.vivo-sort-de").filter(i => i === d).style("fill", "grey")
                d3.selectAll("path.vivo-sort-de").filter(i => i !== d).style("fill", "rgba(218, 218, 218, 0.8)")
                d3.selectAll("path.vivo-sort-a").style("fill", "rgba(218, 218, 218, 0.8)")
            })
            .on("mouseover", (event) => {
                d3.selectAll("path.vivo-sort-de").style("cursor", "pointer")
                // tooltip
                tooltip.transition().duration(200).style("opacity", 0.9);
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
                d3.selectAll("path.vivo-sort-de").style("cursor", "default")
                tooltip.transition().duration(400).style("opacity", 0);
            });

        svg.append("g").call(d3.axisTop(xScale))
            .call(g => {
                g.select(".domain").remove();
                g.selectAll("line").remove();
            })
            .selectAll("text")
            .attr("transform", "translate(8,5), rotate(-90)")
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

    drawVivoHeatmap(sort, initial_sort) {
        if (this.props.detaildata[2]) {

            console.log("draw vivo heatmap")
            var margin = { top: 53, right: 10, bottom: 10, left: 0 },
                width = this.state.vivoWidth - margin.left - margin.right,
                height = this.state.Height - 40 - margin.top - margin.bottom;

            var svg = d3
                .select("svg#detail_svg")
                .append("g")
                .attr("transform", "translate(" + (10 + 30 + this.state.medchemWidth + this.state.vitroWidth + margin.left + this.state.heatSquareLength) + "," + margin.top + ")");

            console.log("heatmap", this.props.detaildata[2])
            var data = this.props.detaildata[2];

            // x scale
            var xDomain = ["ED50", "t_half", "AUC", "bio", "sol"],
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
            // this.setState({ vivo_heat_pos })

            // color scale
            // var colorScale = d3
            //     .scaleSequential()
            //     .interpolator(d3.interpolateOranges)
            //     .domain([0, 8]);
            var colorScale = d3.scaleLinear()
                .domain([0, 6])
                .range(["rgba(0, 129, 167,0)", "rgba(0, 129, 167,1)"])
            // .range(["white", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e"]) // pink
            // .range(["white", "#a9d6e5", "#89c2d9", "#61a5c2", "#468faf", "#2c7da0", "#2a6f97"])
            // .range(["white", "#ffe3e0", "#fbc3bc", "#f7a399", "#f38375", "#ef6351", "#c32f27"])

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
                // .style("stroke", "#e9ecef")
                .style("stroke", "#e9ecef")
                .attr("rx", 2)
                .attr("ry", 2)
                .on("mouseover", (event, d) => {
                    // tooltip
                    tooltip.transition().duration(200).style("opacity", 0.9);
                    tooltip
                        .html(
                            `id: ${d.id}<br/>  ${d.attr}: ${d.value}`
                        )
                        .style("left", event.pageX + 10 + "px")
                        .style("top", event.pageY + 10 + "px");

                    // highlight
                    d3.selectAll("rect.heatmap")
                        .filter((node) => node.id == d.id)
                        .style("stroke", "orange")
                        .style("stroke-width", 3)
                    // .classed("highlightRect", true);

                    d3.selectAll("rect.heatmap")
                        .filter((node) => node.id != d.id)
                        .style("opacity", 0.5)

                    d3.selectAll("rect.sankey")
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

                    d3.selectAll("text.sankey").filter((t) => t.id != d.id)
                        .style("opacity", 0.5)

                })
                .on("mousemove", (event, d) => {
                    tooltip
                        .style("left", event.pageX + 10 + "px")
                        .style("top", event.pageY + 10 + "px");
                })
                .on("mouseout", (event, d) => {
                    tooltip.transition().duration(200).style("opacity", 0);

                    d3.selectAll("rect.heatmap")
                        .style("stroke-width", 2)
                        .style("stroke", "#e9ecef")
                        .style("opacity", 1)

                    d3.selectAll("rect.sankey")
                        .style("opacity", 1)

                    d3.selectAll("circle.network")
                        .style("stroke-width", 0)
                        .style("opacity", 1)

                    d3.selectAll("path#" + d.id)
                        .attr("opacity", 0.5)
                        .attr("stroke-width", 1)

                    d3.selectAll("text.sankey").filter((t) => t.id != d.id)
                        .style("opacity", 1)
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
                        .attr("id", d.id)
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
                        .attr("id", d.id)
                        .lower()
                })
            }

            // draw path between vivo and sankey
            if (vivo_heat_pos[0]) {
                sankey_pos.forEach(d => {
                    var curve = d3.line().curve(d3.curveBumpX)
                    var startNode = vivo_heat_pos.find(node => node.id == d.id)
                    var points = [[startNode.x_out, startNode.y], [d.x, d.y]]
                    d3.select("svg#detail_svg")
                        .append("path")
                        .attr("class", "detail_path")
                        .attr("d", curve(points))
                        .attr("stroke-width", 1)
                        .attr("stroke", "#adb5bd")
                        .attr("opacity", 0.5)
                        .attr("fill", "none")
                        .attr("id", d.id)
                        .lower()
                })
            }

        }
    }

    drawSankeyChart() {
        if (this.props.sankeydata) {

            console.log("draw sankey chart")
            var margin = { top: 30, right: 10, bottom: 10, left: 0 },
                width = this.state.vivoWidth - margin.left - margin.right,
                height = this.state.Height - 40 - margin.top - margin.bottom;

            var svg = d3
                .select("svg#detail_svg")
                .append("g")
                .attr("transform", "translate(" + (10 + 30 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + margin.left + 1 / 6 * this.state.sankeyWidth) + "," + margin.top + ")");

            console.log("sankeydata", this.props.sankeydata)
            var sankeydata = this.props.sankeydata;

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
                .style("opacity", 0);

            // iterate data
            var cur_y_offset = 0; // starting y of each sankey chart
            var rectHeight = 15, rectWidth = 70; // height of each rect
            var x_offset = (this.state.sankeyWidth - 3 * rectWidth) / 2;
            var sankey_pos = [];
            sankeydata.forEach(d => {
                console.log(d["data"])
                var sankeysvg = svg.append("g").attr("transform", "translate(0," + cur_y_offset + ")")

                // iterate each phase --> col
                var phases = ["1", "2", "3"], max_num_of_company = 0;
                var phase1_pos = [], phase2_pos = [], phase3_pos = [];
                phases.forEach(phase => {
                    console.log(phase)
                    var company_list = d.data[`p${phase}_company`]; // array of 9 list with company names of corresponding status
                    var terminate_reason = d.data[`p${phase}_terminate_resaon`];
                    console.log("terminate reason", d.data)
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
                    console.log("company_obj_list", company_obj_list)
                    console.log("border_list", border_list)

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
                            tooltip.transition().duration(200).style("opacity", 0.9);
                            tooltip
                                .html(
                                    `<div style="width:100px">
                                    <span class="tooltip-label">ID:</span> ${d.id}<br/>  
                                    <span class="tooltip-label">Company:</span> ${d.company_name}<br/>  
                                    ${terminatespan}
                                    </div>`
                                )
                                .style("left", event.pageX - 100 + "px")
                                .style("top", event.pageY + 10 + "px");

                            // highlight
                            d3.selectAll("rect.heatmap")
                                .filter((node) => node.id == d.id)
                                .style("stroke", "orange")
                                .style("stroke-width", 3)
                                .classed("highlightRect", true);

                            d3.selectAll("rect.heatmap")
                                .filter((node) => node.id != d.id)
                                .style("opacity", 0.5)

                            d3.selectAll("rect.sankey")
                                .filter((node) => node.id != d.id)
                                .style("opacity", 0.5)

                            d3.selectAll("circle.network")
                                .filter((node) => node.id == d.id)
                                .style("stroke", "orange")
                                .style("stroke-width", 3)

                            console.log(d3.selectAll("rect.sankey")
                                .filter((node) => node.id != d.id))

                            d3.selectAll("circle.network")
                                .filter((node) => node.id != d.id)
                                .style("opacity", 0.5)

                            d3.selectAll("path#" + d.id)
                                .attr("opacity", 1)
                                .attr("stroke-width", 2)

                            d3.selectAll("text.sankey").filter((t) => t.id != d.id)
                                .style("opacity", 0.5)


                        }).on("mousemove", (event, d) => {
                            tooltip
                                .style("left", event.pageX - 100 + "px")
                                .style("top", event.pageY + 10 + "px");
                        })
                        .on("mouseout", (event, d) => {
                            tooltip.transition().duration(200).style("opacity", 0);

                            d3.selectAll("rect.heatmap")
                                .style("stroke-width", 2)
                                .style("stroke", "#e9ecef")
                                .style("opacity", 1)

                            d3.selectAll("rect.sankey")
                                .style("opacity", 1)

                            d3.selectAll("circle.network")
                                .style("stroke-width", 0)
                                .style("opacity", 1)

                            d3.selectAll("path#" + d.id)
                                .attr("opacity", 0.5)
                                .attr("stroke-width", 1)

                            d3.selectAll("text.sankey").filter((t) => t.id != d.id)
                                .style("opacity", 1)
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
                        .attr("class", "sankey")
                        .attr("id", d => d.id)
                        // .style("fill", d => colorScale(d.status))
                        .style("fill", "none")
                        .style("stroke-width", 2)
                        .style("stroke", "#adb5bd")

                    // add text
                    var statuslist = ["A", "Terminated", "C", "Pause", "Active", "Recruiting", "Completed", "H", "I"]
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
                            console.log(d)
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

                <div id="detail">
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