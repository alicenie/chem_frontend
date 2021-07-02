import React, { Component } from 'react';
import LeftBar from './LeftBar';
import { Container, Row, Col } from 'react-grid-system';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setConfiguration } from 'react-grid-system';

setConfiguration({ maxScreenClass: 'xl' });
class MainBlock extends Component {
    // state = {  }
    render() {
        return (
            <div>
                <Container fluid >
                    <Row debug style={{ height: '800px' }}>
                        <Col md={3} debug>
                            Left Bar
                            <LeftBar value={"hi"} />
                        </Col>
                        <Col md={6} debug>Middle View</Col>
                        <Col md={3} debug>Right View</Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default MainBlock;