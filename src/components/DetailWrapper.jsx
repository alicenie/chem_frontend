import React, { Component } from 'react';
import DetailView from './DetailView';

class DetailWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            click_nodes: {},
            sankey_nodes: []
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.label !== this.props.label) {
            let click_nodes = this.state.click_nodes;
            let sankey_nodes = this.state.sankey_nodes;
            if (Object.values(click_nodes).indexOf(true) > -1 || sankey_nodes.length !== 0) {
                Object.keys(click_nodes).forEach(d => {
                    click_nodes[d] = false
                });
                sankey_nodes = [];
                this.setState({ click_nodes, sankey_nodes })
            }
        }
    }

    handleClick = (id, clear = false) => {
        console.log("clicked id", id)
        let click_nodes = this.state.click_nodes;
        // console.log("DetailWrapper value before click", click_nodes)

        if (Object.keys(click_nodes).length === 0) {
            this.props.value.drug_molecule_paper.forEach(d => {
                click_nodes[d.id] = d.id === id ? true : false;
            })
        } else {
            click_nodes[id] = click_nodes[id] ? false : true;
        }
        // console.log("DetailWrapper value after click", click_nodes)

        if (clear) {
            Object.keys(click_nodes).forEach(d => {
                click_nodes[d] = false
            })
        }
        this.setState({ click_nodes })
    }

    handleSankeyClick = (company_count) => {
        let sankey_nodes = this.state.sankey_nodes;
        if (sankey_nodes.indexOf(company_count) === -1) sankey_nodes.push(company_count)
        // else sankey_nodes.splice(sankey_nodes.indexOf(company_count), 1)
        else sankey_nodes = []
        this.setState({ sankey_nodes })
        console.log("handleSankeyClick", company_count)
        console.log("sankey_nodes", sankey_nodes)
    }

    render() {
        return (<DetailView
            handleSankeyClick={this.handleSankeyClick}
            handleClick={this.handleClick}
            click_nodes={this.state.click_nodes}
            sankey_click_nodes={this.state.sankey_nodes}
            height={this.props.height}
            value={this.props.value}
            nodes={this.props.nodes}
            label={this.props.label}
            // detaildata={this.props.detaildata}
            // sankeydata={this.props.sankeydata}
            width={this.props.width} />);
    }
}

export default DetailWrapper;