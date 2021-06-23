import React from 'react';

function SearchList({ filteredTargets }) {
    const filtered = filteredTargets.map(target =>
        <div style={{ backgroundColor: "lightyellow" }}>
            <p>{target.name}</p>
        </div>)
    return (<div >{filtered}</div>)
}

export default SearchList;