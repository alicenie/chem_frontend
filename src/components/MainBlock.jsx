import React, { Component } from 'react';
import LeftBar from './LeftBar';
import { Container, Row, Col } from 'react-grid-system';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setConfiguration } from 'react-grid-system';
import Card from '@material-ui/core/Card'
import { CardContent } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';


setConfiguration({ maxScreenClass: 'xl' });
class MainBlock extends Component {
    // state = {  }
    render() {
        return (
            <div>
                <Container fluid >
                    <Row debug style={{ height: '800px' }}>
                        <Col md={3} >
                            <Card variant="outlined" style={{ height: '760px', marginTop: "20px" }}>
                                <CardHeader title="Left Bar" />
                                <CardContent>
                                    <LeftBar value={"hi"} />
                                </CardContent>
                            </Card>
                        </Col>
                        <Col md={6} >
                            <Card variant="outlined" style={{ height: '760px', marginTop: "20px" }}>
                                <CardHeader title="Middle View" />
                                <CardContent>
                                </CardContent>
                            </Card>
                        </Col>
                        <Col md={3} >
                            <Card variant="outlined" style={{ height: '760px', marginTop: "20px" }}>
                                <CardHeader title="Right View" />
                                <CardContent>
                                </CardContent>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default MainBlock;