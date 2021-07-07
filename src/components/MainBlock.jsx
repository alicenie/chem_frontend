import React, { Component } from 'react';
// import LeftBar from './LeftBar';
// import SimilarityGraph from './SimilarityGraph';
// import { Container, Row, Col } from 'react-grid-system';
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


// setConfiguration({ maxScreenClass: 'xl', gutterWidth: 5 });
class MainBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTargets: [],
            remainOptions: target_data
        }
        // this.handleAddSelection = this.handleAddSelection.bind(this);
    }

    handleAddSelection = (selectedTarget) => {
        if (selectedTarget != null) {
            console.log("handle add selection in LeftBar:", selectedTarget)

            // add to selectedTargets
            let selectedTargets = this.state.selectedTargets
            selectedTargets.push(selectedTarget)
            // console.log(selectedTargets)

            // remove from remainOptions
            let remainOptions = this.state.remainOptions
            remainOptions.splice(remainOptions.indexOf(selectedTarget), 1)

            this.setState({ selectedTargets, remainOptions });
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

    render() {
        const layout = [
            { i: 'a', x: 0, y: 0, w: 3, h: 2, static: true },
            { i: 'b', x: 0, y: 2, w: 3, h: 3, static: true },
            { i: 'c', x: 3, y: 0, w: 11, h: 2 },
            { i: 'd', x: 3, y: 2, w: 11, h: 3 }
        ];

        const { innerWidth: width, innerHeight: height } = window;
        const m = 5
        const rowh = height / 5 - m;
        console.log(width, height)

        return (
            <div>
                <GridLayout className="layout" layout={layout} cols={14} rowHeight={rowh} width={width} margin={[m, m]} isResizable={true}>
                    <div key="a">
                        <Card variant="outlined" style={{ height: 2 * rowh }}>
                            <p style={{ backgroundColor: "#e9ecef", margin: "5px", paddingLeft: "5px" }}>Left Bar</p>
                            {/* <CardContent>
                                <LeftBar value={"hi"} />
                            </CardContent> */}
                            <Autocomplete
                                id="search"
                                options={this.state.remainOptions}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, value) => this.handleAddSelection(value)}
                                renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
                            ></Autocomplete>
                            {/* target component img view */}
                        </Card>
                    </div>
                    <div key="b">
                        <Card variant="outlined" style={{ height: 3 * rowh }} >
                            <p style={{ backgroundColor: "#e9ecef", margin: "5px", paddingLeft: "5px" }}>Left Bar</p>
                            {/* <CardContent>
                                <LeftBar value={"hi"} />
                            </CardContent> */}
                            <Selected value={this.state.selectedTargets} handleRemoveSelection={this.handleRemoveSelection} />
                        </Card>
                    </div>
                    <div key="c">
                        <Card variant="outlined" style={{ height: 2 * rowh }}>
                            <p style={{ backgroundColor: "#e9ecef", margin: "5px", paddingLeft: "5px" }}>Middle Upper View</p>
                        </Card>
                    </div>
                    <div key="d">
                        <Card variant="outlined" style={{ height: 3 * rowh }}>
                            <p style={{ backgroundColor: "#e9ecef", margin: "5px", paddingLeft: "5px" }}>Middle Lower View</p>
                        </Card>
                    </div>
                </GridLayout>

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
            </div>
        );
    }
}

export default MainBlock;