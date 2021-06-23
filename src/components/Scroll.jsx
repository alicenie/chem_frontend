import React from 'react';

const Scroll = (props) => {
    return (
        <div className="card p-1 m-2" style={{ overflowY: 'scroll', height: '30vh' }}>
            {props.children}
        </div>);
}

export default Scroll;