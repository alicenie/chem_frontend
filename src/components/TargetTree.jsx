import React, { Component } from 'react';
import Tree from 'react-d3-tree';

class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
        this.parents = [];
    }

    getID() {
        return this.value;
    }

    getParents() {
        return this.parents;
    }

    getChildren() {
        return this.children;
    }
}

class TargetTree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value,
            // treeCharts: []
        }
    }

    componentDidUpdate() {
        console.log("Target Tree update:")
        console.log(this.state.value)
    }

    buildTree(value) {
        console.log("buildTree")
        // construct tree data structure
        var nodes = {}, nodes_list = [];
        this.state.value.forEach(d => {
            d.tree.forEach(e => {
                if (!nodes_list.find(node => node.name == e.name)) nodes_list.push(e)
            })
        })
        console.log("nodes_list", nodes_list)
        const nodes_id = nodes_list.map(d => d.name) // selected id list
        nodes_list.forEach(d => {
            nodes[d.name] = new TreeNode(d.name)
        })
        nodes_list.forEach(d => {
            d.children.forEach(e => {
                // if the element is selected
                if (nodes_id.indexOf(e) !== -1) {
                    nodes[d.name].children.push(nodes[e])
                }
            })
            d.parents.forEach(e => {
                // if the element is selected
                if (nodes_id.indexOf(e) !== -1) nodes[d.name].parents.push(nodes[e])
            })
        })
        console.log("tree nodes:", nodes)

        // construct chart data from tree
        var treeCharts = [] // >= 1 tree
        // find the heads
        var treeHeads = []
        for (const [key, value] of Object.entries(nodes)) {
            if (!value.getParents().length) {
                treeHeads.push(value);
            }
        }
        console.log("tree heads:", treeHeads)
        // build an object starting from each head
        treeHeads.forEach(head => {
            var treeObj = {
                name: head.getID(),
            }
            if (head.getChildren().length) {
                treeObj["children"] = []
                head.getChildren().forEach(child => {
                    var childObj = {
                        name: child.getID(),
                    }
                    if (child.getChildren().length) {
                        childObj["children"] = this.setChildren(child.getChildren())
                    }
                    treeObj["children"].push(childObj)
                })
            }
            treeCharts.push(treeObj)
        })

        console.log("treeCharts:", treeCharts)

        var treeChart = {
            name: '',
            children: treeCharts
        }
        return treeChart
    }

    setChildren(startNode) {
        var children = []
        startNode.forEach(d => {
            var childObj = {
                name: d.getID()
            }
            if (d.getChildren().length) {
                childObj["children"] = this.setChildren(d.getChildren())
            }
            children.push(childObj)
        })
        return children
    }


    render() {

        const orgChart = {
            name: 'CEO',
            // children: [
            //     {
            //         name: 'Manager',
            //         attributes: {
            //             department: 'Production',
            //         },
            //         children: [
            //             {
            //                 name: 'Foreman',
            //                 attributes: {
            //                     department: 'Fabrication',
            //                 },
            //                 children: [
            //                     {
            //                         name: 'Worker',
            //                     },
            //                 ],
            //             },
            //             {
            //                 name: 'Foreman',
            //                 attributes: {
            //                     department: 'Assembly',
            //                 },
            //                 children: [
            //                     {
            //                         name: 'Worker-a',
            //                     },
            //                     {
            //                         name: 'Worker-b'
            //                     }
            //                 ],
            //             },
            //             {
            //                 name: 'Anotherman',
            //                 children: [
            //                     {
            //                         name: 'Worker-a'
            //                     }
            //                 ]
            //             }
            //         ],
            //     },
            // ],
        };

        const treeCharts = this.buildTree()

        return (
            <div style={{ overflow: "auto" }}>
                {/* `<Tree />` will fill width/height of its container; in this case `#treeWrapper`. */}
                {/* <div id="treeWrapper" style={{ width: '10em', height: '10em' }}>
                    <Tree data={orgChart} orientation={'vertical'} />
                </div>
                <div id="treeWrapper" style={{ width: '10em', height: '10em' }}>
                    <Tree data={orgChart} orientation={'vertical'} />
                </div> */}

                <div style={{ width: '20em', height: '30em' }}>
                    <Tree data={this.buildTree()} orientation={'vertical'}
                        rootNodeClassName={'root-node'}
                        translate={{ x: 150, y: 10 }}
                        zoom={0.2}
                        collapsible={false}
                        pathClassFunc={(d) => {
                            // console.log("pathClassFunc", d)
                            if (!d.source.parent) return "root-path-class"
                            return "path-class"
                        }} />
                </div>

            </div>
        );
    }
}

export default TargetTree;
