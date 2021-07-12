import React, { Component } from 'react';
import JanusImg from '../target_img/Janus_kinase.png';
// import StackedBar from './StackedBar.jsx';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ReactTooltip from 'react-tooltip';
import { ScrollSyncPane } from 'react-scroll-sync';


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
            Height: this.props.height - 100
        }
    }

    handleClick = (target) => {
        this.props.handleRemoveSelection(target)
    }

    render() {
        return (
            <ScrollSyncPane>
                <div style={{ overflow: "auto" }}>


                    <List style={{
                        // position: 'relative',
                        // overflow: 'auto',
                        height: this.state.Height,
                        padding: 0
                        // maxHeight: 440,
                    }}>

                        {this.props.value.map(i => {
                            // console.log("i", i)
                            // const img = require(`${'../target_img/Janus_kinase.png'}`)

                            return (
                                <div key={i}>
                                    <ListItem alignItems="flex-start" style={{ height: this.state.Height / 3 }}>
                                        <ListItemAvatar>
                                            {/* <Avatar variant="square" src="../target_img/Janus_kinase.png"> */}
                                            <img src={JanusImg} width="50" data-tip />
                                            <ReactTooltip type="light">
                                                <img src={JanusImg} width="130" height="130" />
                                            </ReactTooltip>
                                            {/* <StackedBar /> */}
                                            {/* </Avatar> */}
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={i.label}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={{
                                                            display: 'inline',
                                                        }}
                                                        color="textPrimary"
                                                    >
                                                        info
                                                    </Typography>
                                                    {" — xxx"}
                                                </React.Fragment>
                                            }
                                        />
                                        <IconButton aria-label="deleteOutlined" onClick={() => this.handleClick(i)}>
                                            <DeleteOutlinedIcon />
                                        </IconButton>
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </div>
                            )
                        })
                        }
                    </List>
                </div>
            </ScrollSyncPane>

        );
    }
}

export default Selected;