import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Step } from '@material-ui/core';
import * as d3 from 'd3';

class TreeNode {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.children = [];
        this.parents = [];
    }

    getID() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getParents() {
        return this.parents;
    }

    getChildren() {
        return this.children;
    }
}

const cancer_tree = {
    "name": "root",
    "children": [
        {
            "name": "APP",
            "children": [
                {
                    "name": "BACE"
                }
            ]
        },
        {
            "name": "DDC",
            "children": [
                {
                    "name": "DAT",
                    "children": [
                        {
                            "name": "cAMP",
                            "children": [
                                {
                                    "name": "PKA"
                                }
                            ]
                        },
                        {
                            "name": "COMT",
                            "children": [
                                {
                                    "name": "MAO-B"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "SERT",
            "children": [
                {
                    "name": "5-HT",
                    "children": [
                        {
                            "name": "ERK"
                        }
                    ]
                }
            ]
        }
    ]
}

class TargetTree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.visible,
            // num_leaf: 1,
            // treeCharts: []
        }
    }

    componentDidUpdate() {
        console.log("Target Tree update:")
        console.log(this.state.value)
        var { visible_nodes, visible_links, selected_nodes } = this.handleData()
        this.drawTree(visible_nodes, visible_links, selected_nodes);
    }

    handleData() {
        let visible_nodes = new Set(), visible_links = {}, selected_nodes = new Set();
        this.props.visible.forEach(target => {
            let tree = target.tree;
            tree.nodes.forEach(d => visible_nodes.add(d))
            tree.links.forEach(d => {
                // console.log(d)
                if (visible_links[d[0]]) visible_links[d[0]].push(d[1])
                else visible_links[d[0]] = [d[1]]
            })
            selected_nodes.add(target.label)
        })
        // if (this.props.highlight) selected_node = this.props.highlight.label

        return ({ visible_nodes: visible_nodes, visible_links, selected_nodes })
    }

    drawTree(visible_nodes, visible_links, selected_nodes) {
        // console.log("visible_nodes", visible_nodes)
        // console.log("visible_links", visible_links)
        // console.log("selected_node", selected_nodes)
        d3.select("#target-tree").selectAll("svg").remove()
        var width = 260,
            height = 430;

        var tree = d3.tree()
            .size([width - 50, height - 50])
            .separation(function (a, b) { return (a.parent == b.parent ? 4 : 1) * a.depth; });


        // var diagonal = d3.svg.diagonal()
        //     .projection(function (d) { return [d.x, d.y]; });

        var svg = d3.select("#target-tree").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(0,-30)");



        // d3.json("cancer_tree.json").then(function (root) {
        var root = cancer_tree;
        //  assigns the data to a hierarchy using parent-child relationships
        var nodes = d3.hierarchy(root, function (d) {
            return d.children;
        });

        // maps the node data to the tree layout
        nodes = tree(nodes);
        var nodesraw = nodes.descendants();
        // console.log("nodesraw", nodes.descendants())

        var count = nodesraw.length;
        var nodes = [nodesraw[count - 1]];
        let node_name = [nodesraw[count - 1].data.name]

        nodesraw.slice().reverse().forEach(node => {
            let name = node.data.name;
            if (node_name.indexOf(name) === -1) {
                nodes.push(node)
                node_name.push(name)
            }
        })

        // adjust node position
        let node_5ht = nodes.filter(d => d.data.name === "5-HT")[0]
        node_5ht.y -= 10
        let node_ERK = nodes.filter(d => d.data.name === "ERK")[0]
        node_ERK.y -= 20

        let temp_names = ["DDC", "DAT"]
        temp_names.forEach(name => {
            let node = nodes.filter(d => d.data.name === name)[0]
            node.x += 30
        })
        temp_names = ["cAMP", "PKA"]
        temp_names.forEach(name => {
            let node = nodes.filter(d => d.data.name === name)[0]
            node.x += 50
        })
        temp_names = ["COMT", "MAO-B"]
        temp_names.forEach(name => {
            let node = nodes.filter(d => d.data.name === name)[0]
            node.x += 10
        })

        // console.log("nodes", nodes)

        var links = [];
        // m = d3.map(nodes, function (d) {
        //     return d.name;
        // })
        let node_obj = {}
        nodes.forEach(node => node_obj[node.data.name] = node)
        // console.log("node_obj", node_obj)
        function traverseTree(node) {
            if (!node) {
                return;
            }
            if (node.children && node.children.length > 0) {
                var current = node_obj[node.name];
                for (var i = 0; i < node.children.length; i++) {
                    var templink = { source: current, target: node_obj[node.children[i].name] };
                    // console.log(i, node, templink);
                    links.push(templink);
                    traverseTree(node.children[i]);
                }
            }
        }
        traverseTree(root);
        // console.log("links", links)

        // arrowhead
        var arrow = svg
            .append("defs")
            .append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "-0 -5 10 10")
            .attr("refX", 13)
            .attr("refY", 0)
            .attr("orient", "auto")
            .attr("markerWidth", 5)
            .attr("markerHeight", 5)
            .attr("xoverflow", "visible")
            .append("path")
            .attr("d", "M 0,-5 L 10 ,0 L 0,5")
            .attr("fill", "#999")
            .style("stroke", "none");

        var curve = d3.line()
        // .curve(d3.curveBumpX)

        var link = svg.selectAll(".link")
            .data(links)
            .enter()
            .append("path")
            .attr("class", d => {
                if (!visible_nodes.has(d.source.data.name) || !visible_nodes.has(d.target.data.name)) return "hidden-link";
                else if (Object.keys(visible_links).indexOf(d.source.data.name) !== -1) {
                    // console.log(visible_links)
                    // console.log(d.source.data.name)
                    if (visible_links[d.source.data.name].indexOf(d.target.data.name) === -1) return "hidden-link";
                }
                if (!d.source.parent) return "hidden-link"
                if (d.source.parent && d.source.data.name.indexOf("root") > -1) return "hidden-link"
                return "link"
            })
            .attr("d", d => {
                // if(d.source.data.name==="HER2")
                let points = []
                points = [[d.source.x, d.source.y], [d.target.x, d.target.y]]
                return curve(points)
            })
            .attr('marker-end', 'url(#arrowhead)');

        var node = svg.selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .attr("class", d => {
                if (!visible_nodes.has(d.data.name)) return "hidden-node";
                else if (selected_nodes.has(d.data.name)) return "highlight-node";
                else if (!d.parent || d.data.name.indexOf("root") > -1) return "hidden-node";
                else return "tree-node"
            })

        node.append("circle")
            .attr("r", 4.5);

        node.append("text")
            // .attr("dx", function (d) { return d.children ? -8 : 8; })
            .attr("dx", 6)
            .attr("dy", 12)
            // .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
            .text(d => {
                // console.log("d", d); 
                return d.data.name;
            });
        // });
    }

    drawTargetTree(treeData) {
        // set the dimensions and margins of the diagram
        var margin = { top: 30, right: 50, bottom: 40, left: 0 },
            width = 250 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        // declares a tree layout and assigns the size
        var treemap = d3.tree()
            .size([width, height]);

        //  assigns the data to a hierarchy using parent-child relationships
        var nodes = d3.hierarchy(treeData, function (d) {
            return d.children;
        });

        // maps the node data to the tree layout
        nodes = treemap(nodes);

        // append the svg object to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        d3.select("#target-tree").selectAll("svg").remove();
        var svg = d3.select("#target-tree").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom),
            g = svg.append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        // adds the links between the nodes
        var link = g.selectAll(".link")
            .data(nodes.descendants().slice(1))
            .enter().append("path")
            .attr("class", d => d.parent.data.id === "root-node" ? "root-link" : "link")
            .attr("d", function (d) {
                // console.log("link", d)
                return "M" + d.x + "," + d.y
                    + "C" + (d.x + d.parent.x) / 2 + "," + d.parent.y + " "
                    + (d.x + d.parent.x) / 2 + "," + d.y
                    + " " + d.parent.x + "," + d.parent.y;
            });

        var search_label = this.props.select.map(d => d.label), detail_label = this.props.detail ? this.props.detail.label : "";
        // adds each node as a group
        var node = g.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", d => {
                if (d.data.id === "root-node") return "root-node";
                else if (d.data.name === detail_label) return "detail-node";
                else if (search_label.indexOf(d.data.name) !== -1) return "select-node";
                else return "node-circle";
            })
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .append("circle")
            .attr("r", 10);

        // adds the text to the node
        g.selectAll("text")
            .data(nodes.descendants())
            .enter().append("g")
            .append("text")
            .attr("class", "node-text")
            .attr("dy", ".35em")
            .attr("x", d => d.x + 10)
            .attr("y", d => d.y)
            .text(function (d) { return d.data.name; });
    }

    buildTree() {
        // console.log("buildTree")
        // console.log(this.state.value)
        // construct tree data structure
        var nodes = {}, nodes_list = [];
        this.state.value.forEach(d => {
            d.tree.forEach(e => {
                if (!nodes_list.find(node => node.id == e.id)) nodes_list.push(e)
            })
        })

        const nodes_id = nodes_list.map(d => d.id) // selected id list
        nodes_list.forEach(d => {
            nodes[d.id] = new TreeNode(d.id, d.name)
        })
        nodes_list.forEach(d => {
            d.children.forEach(e => {
                // if the element is selected
                if (nodes_id.indexOf(e) !== -1) {
                    nodes[d.id].children.push(nodes[e])
                }
            })
            d.parents.forEach(e => {
                // if the element is selected
                if (nodes_id.indexOf(e) !== -1) nodes[d.id].parents.push(nodes[e])
            })
        })
        // console.log("tree nodes:", nodes)
        // console.log("nodes_list", nodes_list)
        // calculate num of leaf node
        var num_leaf = 0;
        Object.keys(nodes).forEach(d => {
            if (nodes[d]["children"][0] == null) num_leaf += 1
        })
        // console.log(num_leaf)
        // this.setState({ num_leaf })

        // construct chart data from tree
        var treeCharts = [] // >= 1 tree
        // find the heads
        var treeHeads = []
        for (const [key, value] of Object.entries(nodes)) {
            if (!value.getParents().length) {
                treeHeads.push(value);
            }
        }
        // console.log("tree heads:", treeHeads)
        // build an object starting from each head
        treeHeads.forEach(head => {
            var treeObj = {
                name: head.getName(),
                id: head.getID(),
            }
            if (head.getChildren().length) {
                treeObj["children"] = []
                head.getChildren().forEach(child => {
                    var childObj = {
                        name: child.getName(),
                        id: child.getID(),
                    }
                    if (child.getChildren().length) {
                        childObj["children"] = this.setChildren(child.getChildren())
                    }
                    treeObj["children"].push(childObj)
                })
            }
            treeCharts.push(treeObj)
        })

        // console.log("treeCharts:", treeCharts)

        var treeChart = {
            name: '',
            id: 'root-node',
            children: treeCharts
        }
        return { treeChart, num_leaf }
    }

    setChildren(startNode) {
        var children = []
        startNode.forEach(d => {
            var childObj = {
                name: d.getName(),
                id: d.getID()
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

        var tree = { treeChart: null, num_leaf: null }
        // tree = this.buildTree()
        // console.log(tree)

        return (
            <TransformWrapper
                wheel={{ step: 0.01 }}
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
                // maxPositionY={300}
                minScale={0.5}
                // centerOnInit={true}
                centerZoomedOut={true}>
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <React.Fragment>
                        <div className="tools" style={{ paddingLeft: 5, margin: 0 }}>
                            <IconButton aria-label="add" size="small" onClick={() => zoomIn(0.2)}>
                                <AddIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="add" size="small" onClick={() => zoomOut(0.2)}>
                                <RemoveIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="add" size="small" onClick={() => resetTransform()}>
                                <RefreshIcon fontSize="inherit" />
                            </IconButton>
                            {/* <Button size="sm" style={{ padding: 0, margin: 0 }} onClick={() => zoomIn()}>+</Button> */}
                            {/* <Button style={{ padding: 0, margin: 0 }} onClick={() => zoomOut()}>-</Button> */}
                            {/* <Button style={{ padding: 0, margin: 0 }} onClick={() => resetTransform()}>x</Button> */}
                        </div>
                        <TransformComponent>
                            {/* <img src="image.jpg" alt="test" /> */}
                            {/* <div>Example text</div> */}
                            <div id="target-tree" style={{ width: '30em', height: '30em' }}>
                                {/* <Tree data={tree.treeChart} orientation={'vertical'}
                                    rootNodeClassName={'root-node'}
                                    translate={{ x: 130, y: 50 }}
                                    zoom={0.5 / Math.sqrt(tree.num_leaf)}
                                    zoomable={false}
                                    collapsible={false}
                                    pathClassFunc={(d) => {
                                        // console.log("pathClassFunc", d)
                                        if (!d.source.parent) return "root-path-class"
                                        return "path-class"
                                    }} /> */}
                                {/* {this.drawTargetTree(tree.treeChart)} */}

                            </div>
                        </TransformComponent>
                    </React.Fragment>
                )}
                {/* <div style={{ overflow: "auto" }}> */}
                {/* `<Tree />` will fill width/height of its container; in this case `#treeWrapper`. */}
                {/* <div id="treeWrapper" style={{ width: '10em', height: '10em' }}>
                    <Tree data={orgChart} orientation={'vertical'} />
                </div>
                <div id="treeWrapper" style={{ width: '10em', height: '10em' }}>
                    <Tree data={orgChart} orientation={'vertical'} />
                </div> */}

                {/* <div style={{ width: '20em', height: '30em' }}>
                            <Tree data={tree.treeChart} orientation={'vertical'}
                                rootNodeClassName={'root-node'}
                                translate={{ x: 150, y: 10 }}
                                zoom={1.2 / tree.num_leaf}
                                collapsible={false}
                                pathClassFunc={(d) => {
                                    // console.log("pathClassFunc", d)
                                    if (!d.source.parent) return "root-path-class"
                                    return "path-class"
                                }} />
                        </div> */}

                {/* </div> */}
            </TransformWrapper>
        );
    }
}

export default TargetTree;
