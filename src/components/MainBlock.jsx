import React, { Component } from 'react';
import LeftBar from './LeftBar';
import 'bootstrap/dist/css/bootstrap.min.css';
class MainBlock extends Component {
    // state = {  }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">Left Bar
                        <LeftBar value={"hi"} /></div>
                    <div className="col-6">Middle View</div>
                    <div className="col-3">Right View</div>
                </div>
            </div>
        );
    }
}

export default MainBlock;