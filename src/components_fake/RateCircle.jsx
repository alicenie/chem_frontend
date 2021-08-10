import React, { Component } from 'react';
import * as d3 from 'd3';

class RateCircle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 0,
            id: `rate-${this.props.target}-${this.props.attr}`
        }
    }

    componentDidMount() {
        this.drawRateCircle();
    }

    componentDidUpdate() {
        this.updateColor();
    }

    drawRateCircle = () => {
        // set tooltips
        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        var attributes = {
            "C": "Confidence",
            "F": "Feasibility",
            "T": "Trend",
            "P": "Promising"
        }

        var svg = d3.select(`#${this.state.id}`).append("svg").attr("width", 25).attr("height", 25)
            .attr("id", this.state.id)
            .on("mouseover", (event) => {
                d3.select(`#${this.state.id}`).style("cursor", "pointer")

                // tooltip
                tooltip.transition().duration(200).style("opacity", 0.7);
                tooltip
                    .html(
                        `${attributes[this.props.attr]}`
                    )
                    .style("left", event.pageX + 0 + "px")
                    .style("top", event.pageY + 20 + "px");
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("left", event.pageX + 0 + "px")
                    .style("top", event.pageY + 20 + "px");
            })
            .on("mouseout", () => {
                tooltip.transition().duration(200).style("opacity", 0);
            })
            .on("click", (e, d) => {
                var newrate = (this.state.rate + 1) % 3;
                this.setState({ rate: newrate })
            });
        svg.append("circle").attr("cx", 12).attr("cy", 12).attr("id", this.state.id)
            .attr("r", 12).style("fill", "#adb5bd").attr("class", "trialcircle")

        svg.append("text").text(this.props.attr).attr("x", 7).attr("y", 17).style("fill", "white")
    }

    updateColor = () => {
        var rate = this.state.rate;
        if (rate == 0) d3.select(`circle#${this.state.id}`).style("fill", "#adb5bd")
        if (rate == 1) d3.select(`circle#${this.state.id}`).style("fill", "#8ecae6")
        if (rate == 2) d3.select(`circle#${this.state.id}`).style("fill", "#0096c7")
    }

    render() {
        return (<div id={this.state.id} style={{ width: 27, height: 27 }}></div>);
    }
}

export default RateCircle;