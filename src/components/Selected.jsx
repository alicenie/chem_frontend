import React, { Component } from 'react';

class Selected extends Component {
    state = {}

    handleClick = (target) => {
        this.props.handleRemoveSelection(target)
    }


    render() {
        return (<div>
            {this.props.value.map(i => {
                console.log("i", i)
                return (<div>
                    <p>img_path:{i.img_path}</p>
                    <p>label:{i.label}</p>
                    <button onClick={() => this.handleClick(i)}>click</button>
                </div>)
            })
            }
        </div >
        );
    }
}

export default Selected;