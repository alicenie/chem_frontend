import React, { Component } from 'react';
import * as d3 from "d3";
import Slider from '@material-ui/core/Slider';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import ReactSlider from 'react-slider';
import styled from 'styled-components';

class StackedArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Height: this.props.height - 75,
            stackWidth: this.props.width / 12 * 2,
            targetList: this.props.value,
            trendRange: [2016, 2020]
        }
    }

    componentDidMount() {
        console.log("component did mount ")
    }

    componentDidUpdate() {
        console.log("component did update")
        this.state.targetList.forEach(d => {
            // console.log(d)
            this.drawStackedArea(`stackedarea-${d.id}`, d.stackedareadata)
        })
    }

    drawStackedArea(container, data) {
        // trim the data
        var newdata = data.filter(d => {
            return d.year <= this.state.trendRange[1] && d.year >= this.state.trendRange[0]
        })
        // console.log("newdata", newdata)

        const width = this.state.stackWidth - 30, height = this.state.Height / 3 - 20, margin = 20;
        d3
            .select(`#${container}`)
            .selectAll("svg").remove()
        var svg = d3.select(`#${container}`).
            append("svg")
            .attr("width", width + 30)
            .attr("height", height + 20)
            .append("g")
            .attr("transform", "translate(18,0)")

        // GENERAL //
        // List of groups
        var keys = ["A", "B", "C"]

        // color palette
        var color = d3.scaleOrdinal()
            .domain(keys)
            .range(["#cbc0d3", "#efd3d7", "#feeafa"]);

        //stack the data?
        var stackedData = d3.stack()
            .keys(keys)
            (newdata)

        // AXIS //
        // Add X axis
        var x = d3.scaleLinear()
            .domain(d3.extent(newdata, function (d) { return d.year; }))
            .range([0, width]);
        var xAxis = svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(2))

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 100000])
            .range([height, 0]);
        // svg.append("g")
        //     .call(d3.axisLeft(y).ticks(5))

        // BRUSHING AND CHART //
        // Add a clipPath: everything out of this area won't be drawn.
        var clip = svg.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0);

        // Add brushing
        var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
            .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        // .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

        // Create the scatter variable: where both the circles and the brush take place
        var areaChart = svg.append('g')
            .attr("clip-path", "url(#clip)")

        // Area generator
        var area = d3.area()
            .x(function (d) { return x(d.data.year); })
            .y0(function (d) { return y(d[0]); })
            .y1(function (d) { return y(d[1]); })

        // Show the areas
        areaChart
            .selectAll("mylayers")
            .data(stackedData)
            .enter()
            .append("path")
            .attr("class", function (d) { return "myArea " + d.key })
            .style("fill", function (d) { return color(d.key); })
            .attr("d", area)

        // Add the brushing
        areaChart
            .append("g")
            .attr("class", "brush")
            .call(brush);

        var idleTimeout
        function idled() { idleTimeout = null; }

        // A function that update the chart for given boundaries
        // function updateChart() {

        //     var extent = d3.event.selection

        //     // If no selection, back to initial coordinate. Otherwise, update X axis domain
        //     if (!extent) {
        //         if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        //         x.domain(d3.extent(newdata, function (d) { return d.year; }))
        //     } else {
        //         x.domain([x.invert(extent[0]), x.invert(extent[1])])
        //         areaChart.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
        //     }

        //     // Update axis and area position
        //     // xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5))
        //     areaChart
        //         .selectAll("path")
        //         .transition().duration(1000)
        //         .attr("d", area)
        // }
    }

    handleChange = (value) => {
        // console.log("slider value:", value)
        this.setState({ trendRange: value })
    }

    render() {
        const StyledTrack = styled.div`
            top: 0;
            bottom: 0;
            height: 15px;
            margin-top: 2px;
            background: ${props => props.index === 1 ? 'rgb(206, 212, 218)' : 'rgba(206, 212, 218,0.5)'};
            border-radius: 2px;
        `;


        return (
            <div style={{ height: this.props.height - 20, }}>
                {/* <Slider
                    value={this.state.trendRange}
                    onChange={this.handleChange}
                    // valueLabelDisplay="disabled"
                    min={2016}
                    max={2020}
                    style={{ width: this.state.stackWidth / 2, float: "right", marginRight: "10px" }}
                /> */}
                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    defaultValue={[2016, 2020]}
                    min={2016}
                    max={2020}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    ariaValuetext={state => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => <div {...props}><div style={{ textAlign: state.index === 0 ? "start" : "end" }}>|</div><p className="thumb-text">{state.valueNow}</p></div>}
                    renderTrack={(props, state) => <StyledTrack {...props} index={state.index} />}
                    pearling
                    minDistance={0}
                    onChange={this.handleChange}
                />

                {/* <p style={{ fontSize: "13px", paddingLeft: 30 }}>{this.state.trendRange[0]} - {this.state.trendRange[1]}</p> */}

                <ScrollSyncPane>
                    <div style={{ height: this.props.height - 75, width: 200, overflow: "auto" }}>
                        {this.props.value.map((i, index) => {
                            // console.log("index", index)
                            return (
                                <div id={`stackedarea-${i.id}`}></div>
                            )
                        })
                        }
                    </div>
                </ScrollSyncPane>
            </div >
        )

    }
}

export default StackedArea;