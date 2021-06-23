import React, { Component } from 'react';
import LeftBar from './LeftBar';
import 'bootstrap/dist/css/bootstrap.min.css';
class MainBlock extends Component {
    // state = {  }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className=" card mt-3 m-1 col-3">
                        <h3>Left Bar</h3>
                        <LeftBar value={"hi"} />
                    </div>
                    <div className="card mt-3 m-1 col-6">
                        <h3>Middle View</h3>
                    </div>
                    <div className="card mt-3 m-1 col-2">
                        <h3>
                            Right View</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainBlock;