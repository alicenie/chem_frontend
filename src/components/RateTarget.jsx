import React, { Component } from 'react';
import RateCircle from './RateCircle';

class RateTarget extends Component {
    state = {}
    render() {
        return (
            <div style={{ height: this.props.height }}>
                {this.props.targets.map((target, index) => {
                    // console.log("index", index)
                    return (
                        <div className="row" style={{ paddingLeft: 10, marginTop: 10 }}>
                            <span className="col-6" style={{ fontSize: 15 }}>{target.label}</span>
                            <div className="col-6" style={{ padding: 0 }}>
                                <div id={`target-rater-${target.id}`} className="row">
                                    {/* <div className="col"> */}
                                    <RateCircle attr="T" target={target.id} />
                                    {/* </div> */}
                                    {/* <div className="col"> */}
                                    <RateCircle attr="C" target={target.id} />
                                    {/* </div> */}
                                    {/* <div className="col"> */}
                                    <RateCircle attr="P" target={target.id} />
                                    {/* </div> */}
                                    {/* <div className="col"> */}
                                    <RateCircle attr="F" target={target.id} />
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div >);
    }
}

export default RateTarget;