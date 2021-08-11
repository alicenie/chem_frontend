import React, { Component } from 'react';
import STAT3 from '../target_img/STAT3.png';
import ALK from '../target_img/ALK.png';
import EGFR from '../target_img/EGFR.png';
import HER2 from '../target_img/HER2.png';
import KRAS from '../target_img/KRAS.png';
import IconButton from '@material-ui/core/IconButton';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import Divider from '@material-ui/core/Divider';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
import ReactTooltip from 'react-tooltip';
import { ScrollSyncPane } from 'react-scroll-sync';
import ClearIcon from '@material-ui/icons/Clear';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         maxWidth: '36ch',
//         backgroundColor: theme.palette.background.paper,
//     },
//     inline: {
//         display: 'inline',
//     },
// }));

class Selected extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Height: this.props.height - 75,
            Width: this.props.width - 45,
            selected: null,
        }
    }

    handleRemove = (target) => {
        this.props.handleRemoveSelection(target)
        if (this.state.selected) {
            if (this.state.selected.id === target.id) this.setState({ selected: null })
        }
    }

    handleClick = (target) => {
        this.props.handleSelectDetail(target)
        this.setState({ selected: target })
    }

    color = (i) => {
        if (this.state.selected) {
            if (i.id == this.state.selected.id) return "rgba(169, 214, 229,0.3)"
        }
        return "#f8f9fa"
    }

    render() {
        const img = {
            ALK: ALK,
            EGFR: EGFR,
            HER2: HER2,
            KRAS: KRAS,
            STAT3: STAT3
        }
        return (
            <ScrollSyncPane>
                <div style={{ overflow: "auto", marginTop: 15 }}>

                    <ul style={{ height: this.state.Height, listStyleType: "none", margin: 5, paddingLeft: 14 }}>

                        {this.props.value.map(i => {
                            console.log("i", i)
                            let id = "img-tooltip-" + i.id;
                            // const img = require(`${'../target_img/Janus_kinase.png'}`)

                            return (
                                <li key={i} style={{ height: this.state.Height / 3, width: this.state.Width }}>
                                    <div className="row" style={{ padding: 0, height: this.state.Height / 3 - 5, alignItems: "center", borderRadius: "10px", backgroundColor: this.color(i) }}>
                                        <div className="col-3" style={{ paddingLeft: 6 }} >
                                            <img src={img[i.label]} width="80" data-tip data-for={id} />
                                            <ReactTooltip id={id} type="light">
                                                <img src={img[i.label]} width="200" />
                                            </ReactTooltip>
                                        </div>
                                        <div
                                            className="col-7"
                                            style={{ marginLeft: 5, cursor: "pointer", paddingLeft: 20, paddingRight: 0 }}
                                            onClick={() => this.handleClick(i)}
                                            data-tip data-for="text-tooltip">
                                            <ul style={{ listStyleType: "none", marginLeft: 20, padding: 0, fontSize: 17 }}>
                                                <li>{i.label}</li>
                                                {/* <li style={{ fontSize: 10 }}>Discovery time: 2000</li> */}
                                            </ul>
                                            <ReactTooltip id="text-tooltip" type="light" place="bottom" backgroundColor="#555" textColor="#fff">
                                                <span>Show details</span>
                                            </ReactTooltip>
                                        </div>
                                        <div className="col-1">
                                            <IconButton aria-label="clear" style={{ marginLeft: -20, opacity: 0.5 }} onClick={() => this.handleRemove(i)}>
                                                <ClearIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
            </ScrollSyncPane >

        );
    }
}

export default Selected;