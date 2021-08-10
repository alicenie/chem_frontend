import React, { Component } from 'react';
import Relect from 'relect';
import 'relect/lib/relect.css';

class AddColumn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chosen: null,

        }
    }

    onChange(index) {
        // this.setState({ chosen: index });
        this.props.handleAddAttr(this.props.options[index])
        console.log("index", this.props.options[index])
    }


    render() {
        return (

            <Relect options={this.props.options}
                // chosen={this.state.chosen}
                onChange={this.onChange.bind(this)}
                height={10}
                width={130}
                placeholder={"add column..."}

            />
        );
    }
}

export default AddColumn;