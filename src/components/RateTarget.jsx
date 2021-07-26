import React, { Component } from 'react';
import RateCircle from './RateCircle';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const DragHandle = sortableHandle(() => <span style={{ cursor: "move" }}>::</span>);

const SortableItem = sortableElement(({ target }) => (
    <li style={{ listStyleType: "none", margin: 0, padding: 0 }}>
        <div className="row" style={{ paddingLeft: 23, marginTop: 10 }}>
            <span className="col-6" style={{ fontSize: 15, padding: 0 }}><DragHandle /> {target.label}</span>
            <div className="col-6" style={{ paddingLeft: 5 }}>
                <div id={`target-rater-${target.id}`} className="row">
                    {/* <div className="col"> */}
                    <RateCircle attr="T" target={target.id} />
                    {/* </div> */}
                    {/* <div className="col"> */}
                    <RateCircle attr="C" target={target.id} />
                    {/* </div> */}
                    {/* <div className="col"> */}
                    <RateCircle attr="P" target={target.id} />
                    {/* </div> */}
                    {/* <div className="col"> */}
                    <RateCircle attr="F" target={target.id} />
                    {/* </div> */}
                </div>
            </div>
        </div>
    </li>
));

const SortableContainer = sortableContainer(({ children }) => {
    return <ul style={{ margin: 0, padding: 0 }}>{children}</ul>;
});
class RateTarget extends Component {
    state = { items: this.props.targets, }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    render() {
        const { items } = this.state;
        return (
            <div style={{ height: this.props.height }}>
                <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                    {items.map((target, index) => (
                        <SortableItem key={`item-${target.id}`} index={index} target={target} />
                    ))}
                </SortableContainer>
            </div >);
    }
}

export default RateTarget;

// {this.props.targets.map((target, index) => {
//     // console.log("index", index)
//     return (
//         <div className="row" style={{ paddingLeft: 10, marginTop: 10 }}>
//             <span className="col-6" style={{ fontSize: 15 }}>{target.label}</span>
//             <div className="col-6" style={{ padding: 0 }}>
//                 <div id={`target-rater-${target.id}`} className="row">
//                     {/* <div className="col"> */}
//                     <RateCircle attr="T" target={target.id} />
//                     {/* </div> */}
//                     {/* <div className="col"> */}
//                     <RateCircle attr="C" target={target.id} />
//                     {/* </div> */}
//                     {/* <div className="col"> */}
//                     <RateCircle attr="P" target={target.id} />
//                     {/* </div> */}
//                     {/* <div className="col"> */}
//                     <RateCircle attr="F" target={target.id} />
//                     {/* </div> */}
//                 </div>
//             </div>
//         </div>
//     )
// })
// }