import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import * as d3 from "d3";

class TargetLine extends Component {
    state = {}

    componentDidMount() {

    }

    drawHeatSquare() {

    }

    render() {
        return (
            <div>
                <br />
                {this.props.value.map(i => {
                    console.log("i", i)
                    return (
                        <Row key={i} style={{ height: 70 }}>
                            <Col md={3}>
                                {i.label}
                            </Col>
                            <Col md={6}>
                                {i.label}
                            </Col>

                        </Row>
                    )
                })
                }
            </div>
        )

    }
}

export default TargetLine;