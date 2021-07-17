import React, { Component } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, } from "d3-sankey";

class SankeyTest extends Component {
    state = {}

    render() {
        sankey()

        return <div>
            <sankey></sankey>
        </div>
    }
}

export default SankeyTest;