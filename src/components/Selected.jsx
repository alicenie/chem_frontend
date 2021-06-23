import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import JanusImg from '../target_img/Janus_kinase.png';

class Selected extends Component {
    state = {}

    handleClick = (target) => {
        this.props.handleRemoveSelection(target)
    }


    render() {
        return (<div>
            {this.props.value.map(i => {
                console.log("i", i)
                const img = require(`${'../target_img/Janus_kinase.png'}`)
                return (
                    <div className="card m-1 p-1">
                        <div className="row">
                            {/* <img src={i.img_path} className="col-3"></img> */}
                            {/* <Image source={require('../target_img/Janus_kinase.png')} /> */}
                            <img src={JanusImg} width="50" height="50" className="col-4" />
                            <span className="col-5">{i.label}</span>
                            <i className="bi bi-x-circle"></i>
                            <div className="col-1">
                                <Button variant="outline-primary" size="sm" onClick={() => this.handleClick(i)}>-</Button>

                            </div>
                        </div>
                    </div>)
            })
            }
        </div >
        );
    }
}

export default Selected;