import React, { Component } from 'react';
import Select from 'react-select';

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];

class Selector extends Component {
    state = {
        selectedOption: null,
        // remainTargets: options
    };

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);

        // let remainTargets = this.state.remainTargets;
        // remainTargets = remainTargets.filter(target => target.value !== selectedOption.value)
        // this.setState({ remainTargets })

        this.props.handleAddSelection(selectedOption)
    };

    render() {
        const { selectedOption } = this.state;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={this.props.options}
            />
        );
    }
}

export default Selector;