import React, { Component } from 'react';
import * as d3 from "d3";

class DetailView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Height: this.props.height - 30,
            Width: this.props.width,
            marginL: 0,
            marginR: 0,
            medchemWidth: (this.props.width - 30 - 30) / 7 * 2.1,
            vitroWidth: (this.props.width - 30 - 30) / 7 * 1.4,
            vivoWidth: (this.props.width - 30 - 30) / 7 * 1.0,
            sankeyWidth: (this.props.width - 30 - 30) / 7 * 2.5,
            vitroSort: { attr: null, acsending: null },
            vivoSort: { attr: null, acsending: null },
            heatSquareLength: ((this.props.width - 30 - 30) / 7 * 2.4 - 40) / 14,
            test: true,
        }
    }

    componentDidMount() {
        this.drawBoundary();
        this.drawAxis('axis');
        // this.drawVitroAxis();
        // this.drawVivoAxis();
        // this.drawVitroSort();
        // this.drawVivoSort();
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
        if (initial) {
            console.log("this.state.vitroSort.attr", this.state.vitroSort.attr)
            if (this.state.vitroSort.attr) this.setState({ vitroSort: { attr: null, acsending: null } });
            if (this.state.vivoSort.attr !== null) this.setState({ vivoSort: { attr: null, acsending: null } });
        }
        console.log("this.state.vitroSort.attr", this.state.vitroSort.attr)
        this.drawWhole(initial);
        d3.selectAll("g.sort").remove()
        this.drawVitroSort();
        this.drawVivoSort();

        // hide/show axis
        if (this.props.label) {
            d3.selectAll("g.sort").style("opacity", 1);
            // d3.selectAll("g.boundary").style("opacity", 1)
        }
        else {
            d3.selectAll("g.sort").style("opacity", 0);
            // d3.selectAll("g.boundary").style("opacity", 0)
        }
    }

    drawBoundary() {
        var svg = d3.select("#detail")
            .append("svg")
            .attr("id", "detail_svg")
            .attr("width", this.state.Width + 20)
            .attr("height", 11000)
            .append("g")
            .attr("class", "boundary")
            .attr("transform", "translate(8,0)")

        // for (var i = 0; i < 3; i++) {
        svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", 10900)
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
            .attr("height", 10900)
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
            .attr("height", 10900)
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
            .style("fill", "#E69389")
        svg.append("rect")
            .attr("x", 0)
            .attr("y", 13)
            .attr("width", 20 + this.state.medchemWidth)
            .attr("height", 13)
            .style("fill", "#EEB2B2")
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
            .style("fill", "#76B7CB")
        svg.append("rect")
            .attr("x", vitroX)
            .attr("y", 13)
            .attr("width", (this.state.vitroWidth + this.state.vivoWidth + 5))
            .attr("height", 13)
            .style("fill", "#9FC9D7")
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
            .style("fill", "#A9A9D8")
        svg.append("rect")
            .attr("x", ph1X)
            .attr("y", 13)
            .attr("width", this.state.sankeyWidth)
            .attr("height", 13)
            .style("fill", "#C6C6EB")
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
            .style("stroke-width", 1)
            .attr("x1", 0)
            .attr("y1", 13)
            .attr("x2", 30 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + this.state.sankeyWidth + 5)
            .attr("y2", 12)

        svg.append("line")
            .style("stroke", "white")
            .style("stroke-width", 1)
            .attr("x1", 10 + 1 / 2 * this.state.medchemWidth)
            .attr("y1", 13)
            .attr("x2", 10 + 1 / 2 * this.state.medchemWidth)
            .attr("y2", 26)
        svg.append("line")
            .style("stroke", "white")
            .style("stroke-width", 1)
            .attr("x1", 20 + this.state.medchemWidth + this.state.vitroWidth)
            .attr("y1", 13)
            .attr("x2", 20 + this.state.medchemWidth + this.state.vitroWidth)
            .attr("y2", 26)
        svg.append("line")
            .style("stroke", "white")
            .style("stroke-width", 1)
            .attr("x1", 30 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + 1 / 3 * this.state.sankeyWidth)
            .attr("y1", 13)
            .attr("x2", 30 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + 1 / 3 * this.state.sankeyWidth)
            .attr("y2", 26)
        svg.append("line")
            .style("stroke", "white")
            .style("stroke-width", 1)
            .attr("x1", 30 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + 2 / 3 * this.state.sankeyWidth)
            .attr("y1", 13)
            .attr("x2", 30 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + 2 / 3 * this.state.sankeyWidth)
            .attr("y2", 26)

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
        console.log("draw whole")
        // clear svg
        d3.selectAll("g.network").remove()
        d3.selectAll("g.network-arc").remove()
        d3.selectAll('.detail_path').remove()
        d3.selectAll(".heatmap").remove()
        d3.selectAll("g.sankey").remove()
        d3.selectAll(".sankey-border").remove()
        d3.selectAll(".tooltip").remove()
        var { node_pos, initial_sort } = this.drawNetwork(initial);
        var { vitroHeatData, vivoHeatData, sankeyData } = this.handleData(); // handle sankey should be here
        var vitro_heat_pos = this.drawVitroHeatmap(vitroHeatData, this.state.vitroSort, initial_sort);
        var vivo_heat_pos = this.drawVivoHeatmap(vivoHeatData, this.state.vivoSort, initial_sort);
        var sankey_pos = this.drawSankeyChart(sankeyData, initial_sort);
        // var sankey_pos = [];
        this.drawPaths(vitro_heat_pos, vivo_heat_pos, node_pos, sankey_pos)

        this.handleHighlight(-1)
        this.handleUndoHighlight(-1)
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
                    sankeyData.push({ name: paper.id, drug_name: paper.compound_name_drug, data: paper.clinical_statistics })
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
                                vitroHeatData.push({ id: paper.id, attr: key, value: value === 0 ? Math.floor(0.000001 * 10) : value })
                            }
                        }
                    }
                    else {
                        // sankey empty, vivo not empty => add both data
                        for (const [key, value] of Object.entries(vitro_raw)) {
                            vitroHeatData.push({ id: paper.id, attr: key, value: value === 0 ? Math.floor(0.000001 * 10) : value })
                        }
                        for (const [key, value] of Object.entries(vivo_raw)) {
                            vivoHeatData.push({ id: paper.id, attr: key, value: value === 0 ? Math.floor(0.000001 * 10) : value })
                        }
                    }
                } else {
                    // sankey not empty => add all
                    for (const [key, value] of Object.entries(vitro_raw)) {
                        vitroHeatData.push({ id: paper.id, attr: key, value: value === 0 ? Math.floor(0.000001 * 100) : value })
                    }
                    for (const [key, value] of Object.entries(vivo_raw)) {
                        vivoHeatData.push({ id: paper.id, attr: key, value: value === 0 ? Math.floor(0.000001 * 100) : value })
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
            .attr("class"));
        let rect_class = d3.selectAll("rect.heatmap")
            .filter((node) => node.id == id)
            .attr("class").split(" ");
        if (rect_class.indexOf("rect-click") > -1) {
            this.handleUndoHighlight(id)
            d3.selectAll("rect.heatmap")
                .filter((node) => node.id == id)
                .classed("rect-click", false)
        }
        else {
            this.handleHighlight(id)
            d3.selectAll("rect.heatmap")
                .filter((node) => node.id == id)
                .classed("rect-click", true)
        }

        // d3.selectAll("rect.rect-click")
        //     .filter((node) => node.id == id)
        //     .classed("rect-click", false)
    }

    handleHighlight = (id) => {

        let click_nodes = this.props.click_nodes;
        console.log("handle highlight", click_nodes)
        // highlight
        d3.selectAll("rect.heatmap")
            .filter((node) => node.id == id || click_nodes[node.id])
            .style("stroke", "orange")
            .style("stroke-width", 3)

        d3.selectAll("rect.heatmap")
            .filter((node) => node.id != id && !click_nodes[node.id])
            .style("opacity", 0.5)

        d3.selectAll("rect.sankey")
            .filter((node) => node.id != id && !click_nodes[node.id])
            .style("opacity", 0.5)

        d3.selectAll("rect.sankey-border")
            .filter((node) => node.id == id || click_nodes[node.id])
            .style("opacity", 1)
            .style("stroke", "orange")
            .style("stroke-width", 3)

        d3.selectAll("rect.sankey-border")
            .filter((node) => node.id != id && !click_nodes[node.id])
            .style("opacity", 0.5)

        d3.selectAll("circle.network-hover-border")
            .filter((node) => node.id == id || click_nodes[node.id])
            .style("opacity", 1)

        d3.selectAll("circle.network")
            .filter((node) => node.id != id && !click_nodes[node.id])
            .style("opacity", 0.5)

        // d3.selectAll("g.sankey-node")
        //     .filter((node) => node.id != id && !click_nodes[node.id])
        //     .style("opacity", 0.5)

        let highlight_id = Object.keys(click_nodes).filter(d => click_nodes[d]);
        highlight_id.push(id);
        d3.selectAll("g.network-arc")
            .style("opacity", 0.5)

        highlight_id.forEach(id => {
            d3.selectAll(`g#network-arc-${id}`)
                .style("opacity", 1)

            d3.selectAll("path#detailpath-" + id.toString())
                .attr("opacity", 1)
                .attr("stroke-width", 2)

            d3.selectAll("path.sankey_path_" + id.toString())
                .attr("opacity", 1)
                .attr("stroke-width", 1)

            d3.selectAll("text.sankey").filter((t) => t.id !== id)
                .style("opacity", 0.5)
        })

    }

    handleUndoHighlight = (id) => {
        let click_nodes = this.props.click_nodes;
        console.log("handle undo highlight", click_nodes)

        d3.selectAll("rect.heatmap")
            .filter(node => !click_nodes[node.id])
            .style("stroke-width", 2)
            .style("stroke", "#e9ecef")
            .style("opacity", 1)
        // .style("transform", "scale(1)")

        d3.selectAll("rect.sankey")
            .style("opacity", 1)

        d3.selectAll("rect.sankey-border")
            .filter(node => !click_nodes[node.id])
            .style("opacity", 1)
            .style("stroke-width", 2)
            .style("stroke", "#ADABB9")

        d3.selectAll("circle.network-hover-border")
            .filter((node) => node.id == id && !click_nodes[node.id])
            .style("opacity", 0)

        d3.selectAll("circle.network")
            .style("opacity", 1)

        d3.selectAll("g.network-arc")
            .style("opacity", 1)

        d3.selectAll("text.sankey")
            .style("opacity", 1)

        if (!click_nodes[id]) {
            d3.selectAll("path#detailpath-" + id.toString())
                .attr("opacity", 0.5)
                .attr("stroke-width", 1)

            d3.selectAll("path.sankey_path_" + id.toString())
                .attr("opacity", 0.5)
                .attr("stroke-width", 1)
        }
    }

    drawNetwork(initial) {
        // if (this.props.detaildata[0]) {
        if (this.props.value) {
            var component = this;
            // console.log("networkData", this.state.networkData)
            // var nodes = this.props.value.drug_molecule_paper.map(d => { let node = { ...d }; node["id"] = node.id; return node }),
            var nodes = this.props.value.drug_molecule_paper,
                links = this.props.value.medicinal_chemistry_similarity;
            console.log('nodes', nodes);

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
            // var colorScale = d3
            //     .scaleLinear()
            //     .domain([1, 5])
            //     .range(["rgba(240, 113, 103,0.1)", "rgba(240, 113, 103,1)"])
            // .range(["#f1dca7", "#ffcb69", "#e8ac65", "#d08c60", "#b58463"])
            // .range(["#f7b267", "#f79d65", "#f4845f", "#f27059", "#f25c54"])
            // .range(["#edeec9", "#dde7c7", "#bfd8bd", "#98c9a3", "#77bfa3"])
            // .range(["#ffdab9", "#fbc4ab", "#f8ad9d", "#f4978e", "#f08080"]) // pink

            // node r scale
            var radius = 8;
            var rScale = d3.scaleLinear().domain([1, 15]).range([3, radius])

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

            var circle_legend = [1, 7, 15], circle_cx = [0, rScale(1) + rScale(5) + 5, rScale(1) + 2 * rScale(5) + 10 + rScale(10)]
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
                .text("1")

            circle_legend_svg.append("text")
                .attr("x", 100 + circle_cx[2])
                .attr("y", 20)
                .style("font-size", "12px")
                .attr("class", "network")
                .attr("text-anchor", "middle")
                .text("15")

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
                            let valueScale = d3.scaleQuantize().domain([0, 1]).range([0, 0.2, 0.4, 0.6, 0.8, 1])
                            // console.log("valuescale d", d.value, valueScale(d.value))
                            return (1 - valueScale(d.value)) ** 1.5 * 185
                            // return (1 - d.value) * 200
                        }) // This is the link distance based on nodes similarity
                        .links(links) // and this the list of links
                )
                .force("charge", d3.forceManyBody().strength(0)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
                .force("center", d3.forceCenter(width / 2 - 6, height / 2)) // This force attracts nodes to the center of the svg area
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
            // console.log("nodes", nodes)
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
                .attr("r", d => rScale(Math.sqrt(d.compound_count)))
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                // .style("stroke", (d) => colorScale(d.group))
                // .style("stroke-width", 4)
                .style("fill", (d) => "#f4978e")

            // draw arc
            var arc_data = [{ position: 0, value: 1 }, { position: 3, value: 1 }, { position: 6, value: 1 }, { position: 10, value: 1 }]
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
                        return 0.000001 * 20 > d.data.position ? "#f4978e" : "lightgrey"
                    })

            })

            // draw legend
            var legend_arc = d3.arc()
                .innerRadius(8)
                .outerRadius(10)
                .padAngle(0.03 * Math.PI);
            var arc_legend = [{ level: 1, text: "1~3" }, { level: 6, text: "4~6" }, { level: 11, text: "7~10" }, { level: 16, text: ">10" }]
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
                            return `<div class="network-tooltip" style="padding:2px;width:300px">
                        
                        <div class="row" style="margin:0px;padding-left:0px;padding-right:0px">
                        <img class="col-6" src='${process.env.PUBLIC_URL}/img/${component.props.label}/${d.id}.jpeg' width="200px">
                        <div class="col-6">
                        <span class="tooltip-label">Ki: </span>${d.medicinal_chemistry_metrics["Ki"] ? d.medicinal_chemistry_metrics["Ki"] : 0} nM
                        <span class="tooltip-label"> Kd: </span>${d.medicinal_chemistry_metrics["Ki"] ? d.medicinal_chemistry_metrics["Kd"] : 0} nM
                        <br/>
                        <span class="tooltip-label">IC50: </span>${d.medicinal_chemistry_metrics["IC50"] ? d.medicinal_chemistry_metrics["IC50"] : 0} nM
                        <span class="tooltip-label"> Sel: </span>${d.medicinal_chemistry_metrics["selectivity"] ? d.medicinal_chemistry_metrics["selectivity"] : 0} fold
                        <br/>
                        <span class="tooltip-label">Route length: </span>${d.level ? d.level : 0}
                        </div>
                        </div>

                        <div  style="margin:0px;margin-top:5px;padding:0px">
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
                .on("click", (event, d) => {
                    // component.handleClick(d.id)
                    this.props.handleClick(d.id)
                    console.log("click nodes from detail view after click", this.props.click_nodes)
                    if (this.props.click_nodes[d.id])
                        component.handleHighlight(d.id)
                    else
                        component.handleUndoHighlight(d.id)
                })

            // initial vitro heatmap order
            var initial_sort = nodes.sort((a, b) => a.y - b.y).map(d => d.id)
            // console.log("initial_sort", initial_sort)

        }

        return { node_pos, initial_sort }
    }

    drawVitroSort() {
        var vitroHeatSquareLength = this.state.heatSquareLength + 1;
        var margin = { top: 0, right: 10, bottom: 10, left: 0.5 * (this.state.vitroWidth - 7 * vitroHeatSquareLength) },
            width = this.state.vitroWidth - margin.left - margin.right;

        var svg = d3
            .select("svg#detail_svg")
            .append("g")
            .attr("class", "sort")
            // .style("opacity", 0)
            .attr("transform", "translate(" + (10 + 25 + this.state.medchemWidth + margin.left) + "," + margin.top + ")");

        // x scale
        var xDomain = ["IC50", "Ki", "Kd", "EC50", "Selectivity", "hERG", "Solubility"],
            xAttr = ["IC50", "Ki", "Kd", "EC50", "selectivity", "hERG", "solubility"],
            xRange = [0, xDomain.length * vitroHeatSquareLength];
        var xScale = d3.scaleBand().domain(xDomain).range(xRange)

        // set tooltips
        let tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0.9)
            .style("display", "none");

        // // arrow
        // svg
        //     .append('defs')
        //     .append('marker')
        //     .attr('id', 'arrow')
        //     .attr('viewBox', [0, 0, 8, 8])
        //     .attr('refX', 3)
        //     .attr('refY', -1)
        //     .attr('markerWidth', 2)
        //     .attr('markerHeight', 2)
        //     .attr("stroke-width", 1)
        //     .attr('orient', 'auto-start-reverse')

        // ascending icon
        var ascendDef = svg.append('defs').append("g").attr("id", "ascending");

        ascendDef.append("rect")
            .attr("x", -1)
            .attr("y", -7)
            .attr("width", 10)
            .attr("height", 19)
            .style("fill", "white")
            .attr("rx", 2)
            .attr("ry", 2)

        ascendDef
            .append("text")
            .attr("x", 4)
            .attr("y", 1)
            .text('1')
            .style("font-size", 9)
            .style("fill", "#8b8b8b")

        ascendDef
            .append("text")
            .attr("x", 4)
            .attr("y", 10)
            .text('9')
            .style("font-size", 9)
            .style("fill", "#8b8b8b")

        ascendDef.append("line")
            .style("stroke", "#8b8b8b")
            .style("stroke-width", 1)
            .attr("x1", 2)
            .attr("y1", -3)
            .attr("x2", 2)
            .attr("y2", 10)
        // .attr('marker-start', 'url(#arrow)')
        ascendDef.append('path')
            .attr('d', d3.line()([[0, 0], [0, 4], [6, 2]]))
            .attr("transform", "rotate(-90)")
            .style("stroke", "none")
            .style("fill", "#8b8b8b")


        // descending icon
        var descendDef = svg.append('defs').append("g").attr("id", "descending")
        // .attr("x", 20).attr("y", 20).style("border", "black").style("border-width", 1);

        descendDef.append("rect")
            .attr("x", -4)
            .attr("y", -12)
            .attr("width", 10)
            .attr("height", 19)
            .style("fill", "white")
            .attr("rx", 2)
            .attr("ry", 2)

        descendDef
            .append("text")
            .attr("x", 0)
            .attr("y", -4)
            .text('9')
            .style("font-size", 9)
            .style("fill", "#8b8b8b")

        descendDef
            .append("text")
            .attr("x", 0)
            .attr("y", 5)
            .text('1')
            .style("font-size", 9)
            .style("fill", "#8b8b8b")

        descendDef.append("line")
            .style("stroke", "#8b8b8b")
            .style("stroke-width", 1)
            .attr("x1", -2)
            .attr("y1", -10)
            .attr("x2", -2)
            .attr("y2", 4)
        // .attr('marker-start', 'url(#arrow)')
        descendDef.append('path')
            .attr('d', d3.line()([[0, 0], [0, 4], [6, 2]]))
            .attr("transform", "rotate(90)")
            .style("stroke", "none")
            .style("fill", "#8b8b8b")

        // draw ascending
        svg.selectAll()
            .data(xDomain).enter()
            .append("use").attr("xlink:href", "#ascending")
            .attr("transform", (d) => { return "translate(" + (xScale(d) + 3) + ",40)"; })
            .style("opacity", d => {
                if (this.state.vitroSort.attr === xAttr[xDomain.indexOf(d)] && this.state.vitroSort.acsending) {
                    return 1
                } else if (this.state.vitroSort.attr) {
                    return 0.3
                } else {
                    return 0.6
                }
            })
            .attr("class", "vitro-sort-a")
            .on("click", (event, d) => {
                if (this.state.vitroSort.attr === xAttr[xDomain.indexOf(d)] && this.state.vitroSort.acsending) {
                    // already clicked --> hide ascending, click descending
                    // d3.selectAll(".vitro-sort-a").filter(i => i === d).style("display", "none")
                    // d3.selectAll(".vitro-sort-de").filter(i => i === d).style("display", "block").style("opacity", 1)
                    this.setState({ vitroSort: { attr: null, acsending: false } })

                } else {
                    // not clicked --> click ascending
                    this.setState({ vitroSort: { attr: xAttr[xDomain.indexOf(d)], acsending: true } })
                    // d3.selectAll(".vitro-sort-a").filter(i => i === d).style("opacity", 1)

                }

                tooltip.transition().duration(200).style("display", "block");
                tooltip
                    .html(
                        "<span>sort in ascending order</span>"
                    )
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
            })
            .on("mouseover", (event) => {
                // tooltip
                tooltip.transition().duration(200).style("display", "block");
                tooltip
                    .html(
                        "<span>sort in ascending order</span>"
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
                tooltip.transition().duration(400).style("display", "none");
            });

        // draw descending
        svg.selectAll()
            .data(xDomain).enter()
            .append("use").attr("xlink:href", "#descending")
            .attr("transform", (d) => { return "translate(" + (xScale(d) + 17) + ",45)"; })
            .attr("class", "vitro-sort-de")
            .style("opacity", d => {
                if (this.state.vitroSort.attr === xAttr[xDomain.indexOf(d)] && !this.state.vitroSort.acsending) {
                    return 1
                } else if (this.state.vitroSort.attr) {
                    return 0.3
                } else {
                    return 0.6
                }
            })
            .on("click", (_, d) => {
                if (this.state.vitroSort.attr === xAttr[xDomain.indexOf(d)] && !this.state.vitroSort.acsending) {
                    // clicked --> unclick both, show unclicked ascending, hide descending
                    this.setState({ vitroSort: { attr: null, acsending: null } })
                    // d3.selectAll(".vitro-sort-de").filter(i => i === d).style("display", "none")
                    // d3.selectAll(".vitro-sort-a").filter(i => i === d).style("display", "block").style("opacity", 0.6)
                } else {
                    // not clicked --> click descending
                    // d3.selectAll(".vitro-sort-de").filter(i => i === d).style("opacity", 1)
                    this.setState({ vitroSort: { attr: xAttr[xDomain.indexOf(d)], acsending: false } })
                }
                // others
                // d3.selectAll(".vitro-sort-a").style("opacity", 0.6)
                // d3.selectAll(".vitro-sort-de").filter(i => i !== d).style("opacity", 0.6)
            })
            .on("mouseover", (event) => {
                // tooltip
                tooltip.transition().duration(200).style("display", "block");
                tooltip
                    .html(
                        `sort in descending order`
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

        // svg.append("g").call(d3.axisTop(xScale))
        //     .call(g => {
        //         g.select(".domain").remove();
        //         g.selectAll("line").remove();
        //     })
        //     .selectAll("text")
        //     .attr("transform", "translate(7,45), rotate(-90)")
        //     .style("text-anchor", "middle")
        //     .style("font-size", 10)

        // text
        svg.selectAll().data(xDomain).enter()
            .append("g").attr("transform", d => "translate(" + (xScale(d) + 13) + ",30)")
            .attr("text-anchor", "middle")
            .attr("cursor", "default")
            // .append("g").attr("transform", d => "translate(" + (xScale(d) + 15) + ",50) rotate(-90)")
            .append("text").text(d => {
                if (d.length > 4) return d.substr(0, 3) + "..";
                else return d;
            })
            .style("font-size", 10)
            .on("mouseover", (event, d) => {
                // tooltip
                if (d.length > 4)
                    tooltip.transition().duration(200).style("display", "block");
                tooltip
                    .html(d)
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
            var vitroHeatSquareLength = this.state.heatSquareLength + 1;
            var margin = { top: 55, right: 10, bottom: 10, left: 0.5 * (this.state.vitroWidth - 7 * vitroHeatSquareLength) },
                width = this.state.vitroWidth - margin.left - margin.right,
                height = this.state.Height - 40 - margin.top - margin.bottom;

            var svg = d3
                .select("svg#detail_svg")
                .append("g")
                .attr("transform", "translate(" + (10 + 25 + this.state.medchemWidth + margin.left) + "," + margin.top + ")");

            // console.log("vitro heatmap", vitroHeatData)
            // var data = this.props.detaildata[1];
            var data = vitroHeatData;

            // x scale
            var xDomain = ["IC50", "Ki", "Kd", "EC50", "selectivity", "hERG", "solubility"],
                xMetric = ["nM", "nM", "nM", "nM", "fold", "nM", "µg/mL"],
                xRange = [0, xDomain.length * vitroHeatSquareLength];
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
            var yRange = [0, yDomain.length * this.state.heatSquareLength]
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

            var colorScale = d3.scaleQuantize().domain([0, 8]).range(["#DAEAF0", "#C7DFE7", "#B6D6E1", "#9FC9D7", "#87BDCE", "#76B7CB"])

            // var colorScale = d3.scaleLinear()
            //     .domain([0, 8])
            //     .range(["rgba(0, 129, 167,0)", "rgba(0, 129, 167,1)"])
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
                    if (d.value === 0) return "white"
                    else return colorScale(Math.log(d.value));
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
                    // component.handleClick(d.id)
                    this.props.handleClick(d.id)
                    console.log("click nodes from detail view after click", this.props.click_nodes)
                    if (this.props.click_nodes[d.id])
                        component.handleHighlight(d.id)
                    else
                        component.handleUndoHighlight(d.id)
                })
        }
        return vitro_heat_pos
    }

    drawVivoSort() {
        var margin = { top: 0, right: 10, bottom: 10, left: 0.5 * (this.state.vivoWidth - 5 * this.state.heatSquareLength) };

        var svg = d3
            .select("svg#detail_svg")
            .append("g")
            .attr("class", "sort")
            .style("opacity", 0)
            .attr("transform", "translate(" + (10 + 25 + this.state.medchemWidth + this.state.vitroWidth + margin.left) + "," + margin.top + ")");

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
            .attr("stop-color", "#DAEAF0");

        //Set the color for the end (100%)
        linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#76B7CB");

        svg.append("rect")
            .attr("width", 40)
            .attr("height", 13)
            .style("fill", `url(#linear-gradient-ph)`)
            .attr("x", 78)
            .attr("y", 5)

        svg.append("text")
            .text("drug compound property: min")
            .attr("x", -78)
            .attr("y", 15)
            .style("font-size", 12)
        svg.append("text")
            .text("max")
            .attr("x", 120)
            .attr("y", 15)
            .style("font-size", 12)

        // x scale
        var xDomain = ["ED50", "t 1/2", "AUC", "Bioavailability", "Solubility"],
            xAttr = ["ED50", "t_half", "AUC", "bioavailability", "solubility"],
            xRange = [0, xDomain.length * this.state.heatSquareLength];
        var xScale = d3.scaleBand().domain(xDomain).range(xRange)

        // set tooltips
        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0.9)
            .style("display", "none");

        // ascending icon
        var ascendDef = svg.append('defs').append("g").attr("id", "ascending");

        ascendDef.append("rect")
            .attr("x", -1)
            .attr("y", -7)
            .attr("width", 10)
            .attr("height", 19)
            .style("fill", "white")
            .attr("rx", 2)
            .attr("ry", 2)

        ascendDef
            .append("text")
            .attr("x", 4)
            .attr("y", 1)
            .text('1')
            .style("font-size", 9)
            .style("fill", "#8b8b8b")

        ascendDef
            .append("text")
            .attr("x", 4)
            .attr("y", 10)
            .text('9')
            .style("font-size", 9)
            .style("fill", "#8b8b8b")

        ascendDef.append("line")
            .style("stroke", "#8b8b8b")
            .style("stroke-width", 1)
            .attr("x1", 2)
            .attr("y1", -3)
            .attr("x2", 2)
            .attr("y2", 10)
        // .attr('marker-start', 'url(#arrow)')
        ascendDef.append('path')
            .attr('d', d3.line()([[0, 0], [0, 4], [6, 2]]))
            .attr("transform", "rotate(-90)")
            .style("stroke", "none")
            .style("fill", "#8b8b8b")


        // descending icon
        var descendDef = svg.append('defs').append("g").attr("id", "descending")
        // .attr("x", 20).attr("y", 20).style("border", "black").style("border-width", 1);

        descendDef.append("rect")
            .attr("x", -4)
            .attr("y", -12)
            .attr("width", 10)
            .attr("height", 19)
            .style("fill", "white")
            .attr("rx", 2)
            .attr("ry", 2)

        descendDef
            .append("text")
            .attr("x", 0)
            .attr("y", -4)
            .text('9')
            .style("font-size", 9)
            .style("fill", "#8b8b8b")

        descendDef
            .append("text")
            .attr("x", 0)
            .attr("y", 5)
            .text('1')
            .style("font-size", 9)
            .style("fill", "#8b8b8b")

        descendDef.append("line")
            .style("stroke", "#8b8b8b")
            .style("stroke-width", 1)
            .attr("x1", -2)
            .attr("y1", -10)
            .attr("x2", -2)
            .attr("y2", 4)
        // .attr('marker-start', 'url(#arrow)')
        descendDef.append('path')
            .attr('d', d3.line()([[0, 0], [0, 4], [6, 2]]))
            .attr("transform", "rotate(90)")
            .style("stroke", "none")
            .style("fill", "#8b8b8b")

        // draw ascending
        svg.selectAll()
            .data(xDomain).enter()
            .append("use").attr("xlink:href", "#ascending")
            .attr("transform", (d) => { return "translate(" + (xScale(d) + 3) + ",40)"; })
            .style("opacity", d => {
                if (this.state.vivoSort.attr === xAttr[xDomain.indexOf(d)] && this.state.vivoSort.acsending) {
                    return 1
                } else if (this.state.vivoSort.attr) {
                    return 0.3
                } else {
                    return 0.6
                }
            })
            .attr("class", "vitro-sort-a")
            .on("click", (event, d) => {
                if (this.state.vivoSort.attr === xAttr[xDomain.indexOf(d)] && this.state.vivoSort.acsending) {
                    // already clicked --> hide ascending, click descending
                    // d3.selectAll(".vitro-sort-a").filter(i => i === d).style("display", "none")
                    // d3.selectAll(".vitro-sort-de").filter(i => i === d).style("display", "block").style("opacity", 1)
                    this.setState({ vivoSort: { attr: null, acsending: false } })

                } else {
                    // not clicked --> click ascending
                    this.setState({ vivoSort: { attr: xAttr[xDomain.indexOf(d)], acsending: true } })
                    // d3.selectAll(".vitro-sort-a").filter(i => i === d).style("opacity", 1)

                }

                tooltip.transition().duration(200).style("display", "block");
                tooltip
                    .html(
                        "<span>sort in ascending order</span>"
                    )
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + 10 + "px");
            })
            .on("mouseover", (event) => {
                // tooltip
                tooltip.transition().duration(200).style("display", "block");
                tooltip
                    .html(
                        "<span>sort in ascending order</span>"
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
                tooltip.transition().duration(400).style("display", "none");
            });

        // draw descending
        svg.selectAll()
            .data(xDomain).enter()
            .append("use").attr("xlink:href", "#descending")
            .attr("transform", (d) => { return "translate(" + (xScale(d) + 17) + ",45)"; })
            .attr("class", "vitro-sort-de")
            .style("opacity", d => {
                if (this.state.vivoSort.attr === xAttr[xDomain.indexOf(d)] && !this.state.vivoSort.acsending) {
                    return 1
                } else if (this.state.vivoSort.attr) {
                    return 0.3
                } else {
                    return 0.6
                }
            })
            .on("click", (_, d) => {
                if (this.state.vivoSort.attr === xAttr[xDomain.indexOf(d)] && !this.state.vivoSort.acsending) {
                    // clicked --> unclick both, show unclicked ascending, hide descending
                    this.setState({ vivoSort: { attr: null, acsending: null } })
                    // d3.selectAll(".vitro-sort-de").filter(i => i === d).style("display", "none")
                    // d3.selectAll(".vitro-sort-a").filter(i => i === d).style("display", "block").style("opacity", 0.6)
                } else {
                    // not clicked --> click descending
                    // d3.selectAll(".vitro-sort-de").filter(i => i === d).style("opacity", 1)
                    this.setState({ vivoSort: { attr: xAttr[xDomain.indexOf(d)], acsending: false } })
                }
                // others
                // d3.selectAll(".vitro-sort-a").style("opacity", 0.6)
                // d3.selectAll(".vitro-sort-de").filter(i => i !== d).style("opacity", 0.6)
            })
            .on("mouseover", (event) => {
                // tooltip
                tooltip.transition().duration(200).style("display", "block");
                tooltip
                    .html(
                        `sort in descending order`
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


        svg.selectAll().data(xDomain).enter()
            .append("g").attr("transform", d => "translate(" + (xScale(d) + 13) + ",30)")
            .attr("text-anchor", "middle")
            .attr("cursor", "default")
            // .append("g").attr("transform", d => "translate(" + (xScale(d) + 15) + ",50) rotate(-90)")
            .append("text").text(d => {
                if (d.length > 4) return d.substr(0, 3) + "..";
                else return d;
            })
            .style("font-size", 10)
            .on("mouseover", (event, d) => {
                // tooltip
                if (d.length > 4) {
                    tooltip.transition().duration(200).style("display", "block");
                    tooltip
                        .html(d)
                        .style("left", event.pageX + 10 + "px")
                        .style("top", event.pageY + 10 + "px");
                }
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

    }

    drawVivoAxis() {
        var margin = { top: 35, right: 10, bottom: 10, left: 0 },
            width = this.state.vivoWidth - margin.left - margin.right;

        var svg = d3
            .select("svg#detail_svg")
            .append("g")
            .attr("transform", "translate(" + (10 + 30 + this.state.medchemWidth + this.state.vitroWidth + margin.left) + "," + margin.top + ")");

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
            var margin = { top: 55, right: 10, bottom: 10, left: 0.5 * (this.state.vivoWidth - 5 * this.state.heatSquareLength) },
                width = this.state.vivoWidth - margin.left - margin.right,
                height = this.state.Height - 40 - margin.top - margin.bottom;

            var svg = d3
                .select("svg#detail_svg")
                .append("g")
                .attr("transform", "translate(" + (10 + 25 + this.state.medchemWidth + this.state.vitroWidth + margin.left) + "," + margin.top + ")");

            // console.log("heatmap", this.props.detaildata[2])
            // var data = this.props.detaildata[2];
            // console.log("heatmap", vivoHeatData)
            var data = vivoHeatData;

            // x scale
            var xDomain = ["ED50", "t_half", "AUC", "bioavailability", "solubility"],
                xMetric = ["µg/animal", "h", "ng•h/mL", "%", "µg/mL"],
                xRange = [0, xDomain.length * (this.state.heatSquareLength)];
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
            var yRange = [0, yDomain.length * this.state.heatSquareLength]
            var yScale = d3.scaleBand().domain(yDomain).range(yRange)

            // store positions for path
            var vivo_heat_pos = []
            yDomain.forEach(d => {
                vivo_heat_pos.push({
                    id: d,
                    x_in: (10 + 25 + this.state.medchemWidth + this.state.vitroWidth + margin.left),
                    x_out: (10 + 25 + this.state.medchemWidth + this.state.vitroWidth + margin.left + xDomain.length * xScale.bandwidth()),
                    y: yScale(d) + margin.top + 1 / 2 * yScale.bandwidth()
                })
            })
            // console.log("vivo_heat_pos", vivo_heat_pos)

            // color scale
            // var colorScale = d3
            //     .scaleSequential()
            //     .interpolator(d3.interpolateOranges)
            //     .domain([0, 8]);
            // var colorScale = d3.scaleLinear()
            //     .domain([0, 8])
            var colorScale = d3.scaleQuantize().domain([0, 8]).range(["#DAEAF0", "#C7DFE7", "#B6D6E1", "#9FC9D7", "#87BDCE", "#76B7CB"])
            // .range(["rgba(0, 129, 167,0)", "rgba(0, 129, 167,1)"])
            // .range(["white", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e"]) // pink
            // .range(["white", "#a9d6e5", "#89c2d9", "#61a5c2", "#468faf", "#2c7da0", "#2a6f97"])
            // .range(["white", "#ffe3e0", "#fbc3bc", "#f7a399", "#f38375", "#ef6351", "#c32f27"])

            // set tooltips
            var tooltip = d3
                .select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0.9)
                .style("display", "none")

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
                    if (d.value === 0) return "white";
                    else return colorScale(Math.log(d.value));
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
                    // component.handleClick(d.id)
                    this.props.handleClick(d.id)
                    console.log("click nodes from detail view after click", this.props.click_nodes)
                    if (this.props.click_nodes[d.id])
                        component.handleHighlight(d.id)
                    else
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

    handleSankeyHighlight(company_count) {
        // console.log("this.props.sankey_click_nodes", this.props.sankey_click_nodes)
        let counts = [...this.props.sankey_click_nodes];
        if (counts.indexOf(company_count) < 0) counts.push(company_count)
        // console.log("counts", counts)
        counts.forEach(count => {
            d3.selectAll("rect.sankey-rect").filter(rect => rect.company_count === count)
                .style("fill", "#fed9b7")
            d3.selectAll(`path#sankey-path-${count.toString()}`).style("stroke", "orange").style("stroke-width", 2)
        })
    }

    handleSankeyUndoHighlight(company_count) {
        // sankey highlight
        d3.selectAll("rect.sankey-rect").filter(rect => this.props.sankey_click_nodes.indexOf(rect.company_count) === -1)
            .style("fill", "#E8E7F5")
        // d3.selectAll(`path#sankey-path-${company_count.toString()}`).style("stroke", "#adb5bd").style("stroke-width", 1)
        console.log("this.props.sankey_click_nodes", this.props.sankey_click_nodes)
        console.log("company_count", company_count)
        console.log("index", this.props.sankey_click_nodes.indexOf(company_count))
        if (this.props.sankey_click_nodes.indexOf(company_count) === -1)
            d3.selectAll(`path#sankey-path-${company_count.toString()}`).style("stroke", "#adb5bd").style("stroke-width", 1)
    }

    drawSankeyChart(sankeyData, initial_sort) {
        // if (this.props.sankeydata) {
        if (sankeyData[0]) {
            var component = this;
            console.log("draw sankey chart")
            var margin = { top: 40, right: 10, bottom: 10, left: 0 },
                width = this.state.vivoWidth - margin.left - margin.right,
                height = this.state.Height - 40 - margin.top - margin.bottom;

            var svg = d3
                .select("svg#detail_svg")
                .append("g")
                .attr("class", "sankey")
                .attr("transform", "translate(" + (10 + 30 + this.state.medchemWidth + this.state.vitroWidth + this.state.vivoWidth + margin.left + 1 / 6 * this.state.sankeyWidth) + "," + margin.top + ")");

            // legend
            svg.append("rect")
                .attr("x", 120)
                .attr("y", -30)
                .attr("width", 30)
                .attr("height", 15)
                .style("fill", "#E8E7F5")
                .style("stroke-width", 0.5)
                .style("stroke", "white")
            svg.append("text")
                .attr("x", 128)
                .attr("y", -19)
                .text("1-2")
                .style("font-size", 10)
            svg.append("text")
                .attr("x", 155)
                .attr("y", -20)
                .text("1: drug number  2: company number")
                .style("font-size", 10)

            // console.log("sankeydata", this.props.sankeydata)
            // var sankeydata = this.props.sankeydata;
            // console.log("sankeyData", sankeyData)
            var sankeydata = sankeyData.sort((a, b) => initial_sort.indexOf(a.name) - initial_sort.indexOf(b.name));

            // color scale for status
            // var colorScale = d3
            //     .scaleSequential()
            //     .interpolator(d3.interpolateRainbow)
            //     .domain([0, 8]);
            // var colorScale = d3
            //     .scaleOrdinal()
            //     .domain([0, 8])
            //     .range(["#8dd3c7", "#c51b7d", "#bebada", "#b3de69", "#fccde5", "#d9d9d9", "#b35806", "#984ea3", "#bf812d"])
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
            // identical number for each company
            // var company_count = 0;

            sankeydata.forEach((d, i) => {
                var company_count = 1;
                // d --> one paper
                // console.log("iterate sankeydata", d["data"])
                var sankeysvg = svg.append("g").attr("transform", "translate(0," + cur_y_offset + ")")

                // iterate each phase --> col
                var phases = ["1", "2", "3"], max_num_of_company = 0;
                var phase1_pos = [], phase2_pos = [], phase3_pos = [];
                // temp store of company count
                var company_count_temp = {} // {company_name: company_count}
                phases.forEach(phase => {
                    // console.log(phase)
                    var company_list = d.data[`p${phase}_company`]; // array of 9 list with company names of corresponding status

                    var terminate_reason = d.data[`p${phase}_terminate_reason`];
                    console.log("terminate reason", terminate_reason)
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
                                var reason = null;
                                if (Object.keys(terminate_reason).indexOf(company) !== -1) reason = terminate_reason[company]
                                // console.log("reason", reason)
                                // console.log("company", company)
                                if (phase === "1") {
                                    // assign company count
                                    // console.log("company_count", company_count)
                                    company_obj_list.push({ id: d.name, company_count: (i + 1).toString() + "-" + company_count.toString(), company_name: company, status: status, drug_name: d.drug_name, t_reason: reason })
                                    company_count_temp[company] = (i + 1).toString() + "-" + company_count.toString()
                                    company_count += 1;
                                } else {
                                    company_obj_list.push({ id: d.name, company_count: company_count_temp[company], company_name: company, status: status, drug_name: d.drug_name, t_reason: reason })
                                }
                            })
                            border_list.push({ id: d.name, status, length: companies.length, height })
                            height += companies.length
                        }
                    })
                    // console.log("company_obj_list", company_obj_list)
                    // console.log("border_list", border_list)

                    if (phase !== 1) {
                        // sort by company_count
                        company_obj_list.sort((a, b) => {
                            return a.status !== b.status ? a.status - b.status : a.company_count.split("-")[1] - b.company_count.split("-")[1]
                        })
                    }
                    var node = sankeysvg.selectAll("rect#sankey")
                        .data(company_obj_list)
                        .enter()
                        .append("g")
                        .attr("class", "sankey-node")
                        .on("mouseover", (event, d) => {
                            // tooltip
                            var terminatespan = ""
                            console.log("reason", d.t_reason)
                            if (d.t_reason) terminatespan = `<span class="tooltip-label">Terminate reason:</span>${d.t_reason}<br/>`
                            tooltip.transition().duration(200).style("display", "block");
                            tooltip
                                .html(
                                    `<div style="width:130px"> 
                                    <span class="tooltip-label">Company:</span> ${d.company_name}<br/>
                                    <span class="tooltip-label">Drug:</span> ${d.drug_name}<br/>  
                                    ${terminatespan}
                                    </div>`
                                )
                                .style("left", event.pageX - 130 + "px")
                                .style("top", event.pageY + 10 + "px");

                            // highlight
                            component.handleHighlight(d.id)

                            component.handleSankeyHighlight(d.company_count)
                        }).on("mousemove", (event, d) => {
                            tooltip
                                .style("left", event.pageX - 130 + "px")
                                .style("top", event.pageY + 10 + "px");
                        })
                        .on("mouseout", (event, d) => {
                            tooltip.transition().duration(200).style("display", "none");

                            component.handleUndoHighlight(d.id)

                            component.handleSankeyUndoHighlight(d.company_count)
                        })
                        .on("click", (event, d) => {
                            console.log("click nodes from detail view after click", this.props.click_nodes)
                            if (!this.props.click_nodes[d.id]) {
                                // path not clicked --> highlight path
                                component.handleHighlight(d.id)
                                this.props.handleClick(d.id)
                            } else {
                                // path clicked
                                console.log("sankey_click_nodes", this.props.sankey_click_nodes)
                                console.log("d.company_count", d.company_count)
                                console.log("index", this.props.sankey_click_nodes.indexOf(d.company_count))

                                // if (this.props.sankey_click_nodes.length === 0) {
                                //     // no company clicked --> undo highlight path
                                //     component.handleUndoHighlight(d.id)
                                //     this.props.handleClick(d.id)
                                // } else {
                                //     // exist company clicked
                                //     // company not clicked --> highlight company
                                //     this.props.handleSankeyClick(d.company_count)
                                // }

                                // company clicked --> undo highlight company
                                if (this.props.sankey_click_nodes.indexOf(d.company_count) < 0) {
                                    // company not clicked --> highlight company

                                } else {
                                    // company clicked --> undo highlight on all company and path
                                    component.handleUndoHighlight(d.id)
                                    this.props.handleClick(d.id, true)
                                }
                                // update status of company click
                                this.props.handleSankeyClick(d.company_count)
                            }
                        })
                        .attr("transform", (d, i) => {
                            let x = (parseInt(phase) - 1) * this.state.sankeyWidth / 3 - 1 / 2 * rectWidth;
                            let y = i * rectHeight + offset;
                            // store pos for path
                            if (phase === "1") phase1_pos.push({ id: d.id, company_count: d.company_count, company: d.company_name, x: (parseInt(phase) - 1) * this.state.sankeyWidth / 3 - 1 / 2 * rectWidth + 30, y: (i + 0.5) * rectHeight + offset });
                            else if (phase === "2") phase2_pos.push({ id: d.id, company_count: d.company_count, company: d.company_name, x_in: (parseInt(phase) - 1) * this.state.sankeyWidth / 3 - 1 / 2 * rectWidth, x_out: (parseInt(phase) - 1) * this.state.sankeyWidth / 3 - 1 / 2 * rectWidth + 30, y: (i + 0.5) * rectHeight + offset });
                            else phase3_pos.push({ id: d.id, company_count: d.company_count, company: d.company_name, x: (parseInt(phase) - 1) * this.state.sankeyWidth / 3 - 1 / 2 * rectWidth, y: (i + 0.5) * rectHeight + offset });
                            return "translate(" + x + "," + y + ")"
                        })

                    node.append("rect")
                        .attr("width", 30)
                        .attr("height", rectHeight)
                        .attr("id", d => d.id)
                        .attr("class", "sankey-rect")
                        .style("fill", "#E8E7F5")
                        .style("stroke-width", 0.5)
                        .style("stroke", "white")

                    node.append("text")
                        .text(d => d.company_count)
                        .attr("x", 15)
                        .attr("y", rectHeight - 3)
                        .attr("text-anchor", "middle")
                        .attr("font-size", 10)
                        .attr("class", "sankey")
                        .attr("fill", "#495057")
                        .attr("cursor", "default")

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
                        .style("stroke", "#ADABB9")

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
                            // console.log("company", d.company)
                            var startNode = phase1_pos.find(node => node.company == d.company)
                            // console.log("startNode", startNode)
                            var points = [[startNode.x, startNode.y], [d.x_in, d.y]]
                            sankeysvg
                                .append("path")
                                .attr("class", `sankey_path_${d.id}`)
                                .attr("d", curve(points))
                                .attr("stroke-width", 1)
                                .attr("stroke", "#adb5bd")
                                .attr("opacity", 0.5)
                                .attr("fill", "none")
                                .attr("id", "sankey-path-" + d.company_count)
                                .lower()
                                .on("mouseover", (event) => {
                                    // console.log(d)
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
                                .attr("class", `sankey_path_${d.id}`)
                                .attr("d", curve(points))
                                .attr("stroke-width", 1)
                                .attr("stroke", "#adb5bd")
                                .attr("opacity", 0.5)
                                .attr("fill", "none")
                                .attr("id", "sankey-path-" + d.company_count)
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