import React, { Component } from 'react';
// import Search from './Search';
import target_data from '../target'
// import Selector from './Selector';
import Selected from './Selected';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

class LeftBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTargets: [],
            remainOptions: target_data
        }
        // this.handleAddSelection = this.handleAddSelection.bind(this);
    }

    handleAddSelection = (selectedTarget) => {
        if (selectedTarget != null) {
            console.log("handle add selection in LeftBar:", selectedTarget)

            // add to selectedTargets
            let selectedTargets = this.state.selectedTargets
            selectedTargets.push(selectedTarget)
            // console.log(selectedTargets)

            // remove from remainOptions
            let remainOptions = this.state.remainOptions
            remainOptions.splice(remainOptions.indexOf(selectedTarget), 1)

            this.setState({ selectedTargets, remainOptions });
        }

    }

    handleRemoveSelection = (removeTarget) => {
        console.log("handle remove in leftbar", removeTarget)

        // remove from selectedTargets
        let selectedTargets = this.state.selectedTargets
        selectedTargets.splice(selectedTargets.indexOf(removeTarget), 1)

        // add to remainOptions
        let remainOptions = this.state.remainOptions
        remainOptions.push(removeTarget)

        this.setState({ selectedTargets, remainOptions });
    }

    render() {
        // console.log("state")
        // console.log(this.state.remainOptions)
        // console.log(this.state.selectedTargets)
        return (
            <div >
                {/* <Search details={target_data} /> */}
                {/* <div className="card m-1" style={{ height: '40vh' }}> */}
                <Autocomplete
                    id="search"
                    options={this.state.remainOptions}
                    getOptionLabel={(option) => option.label}
                    onChange={(e, value) => this.handleAddSelection(value)}
                    renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
                ></Autocomplete>
                {/* <Selector handleAddSelection={this.handleAddSelection} options={this.state.remainOptions} /> */}
                {/* </div> */}

                <div className="card m-1" style={{ overflowY: "auto", height: '80vh' }}>
                    <p className="m-2">Selected Targets:</p>
                    <Selected value={this.state.selectedTargets} handleRemoveSelection={this.handleRemoveSelection} />
                </div>
            </div >
        );
    }
}

export default LeftBar;