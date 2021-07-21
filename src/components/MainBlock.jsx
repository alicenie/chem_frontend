import React, { Component } from 'react';
// import LeftBar from './LeftBar';
import SimilarityGraph from './SimilarityGraph';
import HeatSquare from './HeatSquare';
import { Container, Row, Col } from 'react-grid-system';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { setConfiguration } from 'react-grid-system';
import Card from '@material-ui/core/Card'
// import { CardContent } from '@material-ui/core';
// import CardHeader from '@material-ui/core/CardHeader';
import GridLayout from 'react-grid-layout';
import Selected from './Selected';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import target_data from '../target'
import StackedArea from './StackedArea';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import SearchIcon from '@material-ui/icons/Search';
import DetailView from './DetailView';
import TargetTree from './TargetTree';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// setConfiguration({ maxScreenClass: 'xl', gutterWidth: 5 });
class MainBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTargets: [],
            remainOptions: target_data,
            selectedDetailTarget: null,
            selected: null,
            // selectDetail: [],
            // selectSankeyDetail: null,
        }
        // this.handleAddSelection = this.handleAddSelection.bind(this);
    }

    componentDidMount() {

    }

    handleAddSelection = (selectedTarget) => {
        if (selectedTarget.length !== 0) {
            console.log("handle add selection in LeftBar:", selectedTarget)

            this.setState({ selected: selectedTarget })

            // add to selectedTargets
            let selectedTargets = this.state.selectedTargets
            selectedTargets.push(selectedTarget[0])
            // console.log(selectedTargets)

            // remove from remainOptions
            let remainOptions = this.state.remainOptions
            remainOptions.splice(remainOptions.indexOf(selectedTarget[0]), 1)

            // console.log("selected targets", selectedTargets)
            // console.log("remain targets", remainOptions)
            this.setState({ selectedTargets, remainOptions });
        } else {
            this.setState({ selected: "" })
        }
    }

    handleRemoveSelection = (removeTarget) => {
        console.log("handle remove in leftbar", removeTarget)

        // remove from selectedTargets
        let selectedTargets = this.state.selectedTargets
        selectedTargets.splice(selectedTargets.indexOf(removeTarget), 1)

        // add to remainOptions
        let remainOptions = this.state.remainOptions
        remainOptions.push(removeTarget)

        this.setState({ selectedTargets, remainOptions });
    }

    handleSelectDetail = (target) => {
        if (target) {
            // console.log("set state in mainblock ", target)
            // this.setState({ selectDetail: target.detaildata })
            // this.setState({ selectSankeyDetail: target.sankeydata })
            this.setState({ selectedDetailTarget: target })
        }
    }

    render() {

        const layout = [
            { i: 'a', x: 0, y: 4, w: 3, h: 7, static: true },
            { i: 'b', x: 0, y: 0, w: 3, h: 4, static: true },
            { i: 'c', x: 3, y: 4, w: 9, h: 7, static: true },
            { i: 'd', x: 3, y: 0, w: 9, h: 4, static: true },
            { i: 'e', x: 12, y: 4, w: 2, h: 7, static: true },
            { i: 'f', x: 12, y: 0, w: 2, h: 4, static: true },
        ];

        const { innerWidth: width, innerHeight: height } = window;
        const m = 0;
        const rowh = height / 11;
        const upperHeight = rowh * 7, lowerHeight = rowh * 4;
        console.log("rowh", rowh)

        return (
            <div>
                <ScrollSync>
                    <GridLayout className="layout" layout={layout} cols={14} rowHeight={rowh} width={width} margin={[3, 1]} isResizable={true}>
                        <div key="a">
                            <Card variant="outlined" style={{ height: upperHeight }}>
                                <p style={{ backgroundColor: "#e9ecef", margin: "5px", paddingLeft: "5px" }}>Target Tree</p>
                                <TargetTree value={this.state.selectedTargets} />
                            </Card>
                        </div>

                        <div key="b">
                            <Card variant="outlined" overflow="visible" style={{ height: lowerHeight }} >
                                <p style={{ backgroundColor: "#e9ecef", margin: "5px", paddingLeft: "5px" }}>Search Targets</p>
                                {/* <ScrollSyncPane> */}
                                <Row style={{ height: 20 }} justify="center">
                                    <Col md={10}>
                                        <Typeahead
                                            clearButton={true}
                                            id="basic-typeahead-single"
                                            onChange={(selected) => {
                                                // this.setState({ selected });
                                                this.handleAddSelection(selected)
                                                console.log("selectd", selected)
                                            }}
                                            options={this.state.remainOptions}
                                            labelKey={option => option.label}
                                            placeholder="Search..."
                                            selected={this.state.selected}
                                            style={{ marginTop: 2 }}
                                            size={"sm"}>
                                        </Typeahead>
                                        {/* <Autocomplete
                                            id="search"
                                            options={this.state.remainOptions}
                                            popupIcon={false}
                                            value={""}
                                            size={'small'}
                                            getOptionLabel={(option) => option.label}
                                            style={{ width: width / 14 * 2, marginLeft: width / 14 * 0.2 }}
                                            onChange={(e, value) => this.handleAddSelection(value)}
                                            renderInput={(params) => <TextField {...params} size="small" label="Search" variant="standard" />}
                                        ></Autocomplete> */}
                                    </Col>
                                    <Col md={1}>
                                        <SearchIcon style={{ marginTop: 6, marginLeft: -25, opacity: 0.6 }} />
                                    </Col>
                                </Row>
                                <Selected value={this.state.selectedTargets} handleRemoveSelection={this.handleRemoveSelection} handleSelectDetail={this.handleSelectDetail} height={lowerHeight} width={width / 14 * 3} />
                                {/* </ScrollSyncPane> */}
                            </Card>
                        </div>

                        <div key="d">
                            <Card variant="outlined" style={{ height: lowerHeight }}>
                                <HeatSquare width={width / 14 * 9} height={lowerHeight} value={this.state.selectedTargets} />
                            </Card>
                        </div>

                        <div key="f">
                            <Card variant="outlined" style={{ height: lowerHeight, padding: 0 }}>
                                <p style={{ backgroundColor: "#e9ecef", margin: "5px", paddingLeft: "5px" }}>Topic Trend</p>
                                {/* <ScrollSyncPane> */}
                                <StackedArea width={width / 14 * 11} height={lowerHeight} value={this.state.selectedTargets} />
                                {/* </ScrollSyncPane> */}
                            </Card>
                        </div>


                        <div key="c">
                            <Card variant="outlined" style={{ height: upperHeight }}>
                                <div className="row" style={{ backgroundColor: "#e9ecef", margin: "5px", justifyItems: "center" }}>
                                    <span className="col-2" style={{ paddingLeft: 5 }}>Detail View</span>

                                    <div className="col-10" style={{ textAlign: "right" }}>{this.state.selectedDetailTarget ? `You have chosen: ${this.state.selectedDetailTarget.label}` : ""}</div>
                                </div>
                                {/* <SimilarityGraph /> */}
                                <DetailView height={upperHeight}
                                    detaildata={this.state.selectedDetailTarget ? this.state.selectedDetailTarget.detaildata : []}
                                    sankeydata={this.state.selectedDetailTarget ? this.state.selectedDetailTarget.sankeydata : null}
                                    width={width / 14 * 9} />
                            </Card>
                        </div>

                        <div key="e">
                            <Card variant="outlined" style={{ height: upperHeight }}>
                                <p style={{ backgroundColor: "#e9ecef", margin: "5px", paddingLeft: "5px" }}>Right Lower View</p>
                            </Card>
                        </div>
                    </GridLayout>
                </ScrollSync>


                {/* <Container fluid style={{ backgroundColor: "#e9ecef" }}>
                    <Row style={{ height: '800px' }}>
                        <Col md={3} >
                            <Card variant="outlined" style={{ height: '780px', marginTop: "5px" }}>
                                <p style={{ backgroundColor: "#e9ecef", margin: "5px", paddingLeft: "5px" }}>Left Bar</p>
                                <CardContent>
                                    <LeftBar value={"hi"} />
                                </CardContent>
                            </Card>
                        </Col>
                        <Col md={6} >
                            <Card variant="outlined" style={{ height: '780px', marginTop: "5px" }}>
                                <CardHeader title="Middle View" />
                                <CardContent>
                                </CardContent>
                            </Card>
                        </Col>
                        <Col md={3} >
                            <Card variant="outlined" style={{ height: '780px', marginTop: "5px" }}>
                                <CardHeader title="Right View" />
                                <CardContent>
                                    <SimilarityGraph />
                                </CardContent>
                            </Card>
                        </Col>
                    </Row>
                </Container> */}
            </div >
        );
    }
}

export default MainBlock;