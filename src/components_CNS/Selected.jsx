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
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';


const DragHandle = sortableHandle(() => <span style={{ cursor: "move" }}>::</span>);

const img = {
    app: ALK,
    comt: EGFR,
    dat: HER2,
    sert: KRAS,
    mao_b: STAT3
}

const SortableItem = sortableElement(({ target, height, width, color, onSelect, onRemove }) => (
    <li key={target.id} style={{ listStyleType: "none", margin: 0, padding: 0, height: height, width: width }}>
        <div className="row" style={{ padding: 0, alignItems: "center", borderRadius: "10px", height: height - 5, backgroundColor: color }}>
            <div className="col-1">
                <DragHandle />
            </div>
            <div className="col-3" style={{ paddingLeft: 6 }} >
                <img src={img[target.id]} width="80" data-tip data-for={target.id} />
                <ReactTooltip id={target.id} type="light">
                    <img src={img[target.id]} width="180" />
                </ReactTooltip>
            </div>
            <div
                className="col-5"
                style={{ marginLeft: 5, cursor: "pointer", paddingLeft: 10, paddingRight: 0 }}
                onClick={onSelect}
                data-tip data-for="text-tooltip">
                <ul style={{ listStyleType: "none", marginLeft: 20, padding: 0, fontSize: 17 }}>
                    <li>{target.label}</li>
                    {/* <li style={{ fontSize: 10 }}>Discovery time: 2000</li> */}
                </ul>
                <ReactTooltip id="text-tooltip" type="light" place="bottom" backgroundColor="#555" textColor="#fff">
                    <span>Show details</span>
                </ReactTooltip>
            </div>
            <div className="col-1">
                <IconButton aria-label="clear" style={{ marginLeft: -10, opacity: 0.5 }} onClick={onRemove}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    </li>
));

const SortableContainer = sortableContainer(({ height, children }) => {
    return <ul style={{ height: height, listStyleType: "none", margin: 5, paddingLeft: 14 }}>{children}</ul>;
});
class Selected extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Height: this.props.height - 75,
            Width: this.props.width - 45,
            selected: null,
            // items: this.props.value,
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

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
        console.log("items", this.state.items)
    };

    render() {
        const img = {
            ALK: ALK,
            EGFR: EGFR,
            HER2: HER2,
            KRAS: KRAS,
            STAT3: STAT3
        }
        // const { items } = this.props;
        return (
            <ScrollSyncPane>
                <div style={{ overflow: "auto", marginTop: 15, height: this.state.Height }}>
                    <SortableContainer onSortEnd={this.props.handleSortSelection} useDragHandle height={this.state.Height}>
                        {this.props.items.map((target, index) => (
                            <SortableItem key={`item-${target.id}`} index={index} target={target} height={this.state.Height / 3} width={this.state.Width} color={this.color(target)} onSelect={() => this.handleClick(target)} onRemove={() => this.handleRemove(target)} />
                        ))}
                    </SortableContainer>
                </div>
            </ScrollSyncPane >

        );
    }
}

export default Selected;