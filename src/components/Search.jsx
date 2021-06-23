import React, { useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';

function Search({ details }) {
    const [searchField, setSearchField] = useState("");

    // console.log("search details", details)
    const filteredTargets = details.filter(
        target => {
            return target.name.toLowerCase().includes(searchField.toLowerCase())
        }
    )

    const handleChange = e => {
        setSearchField(e.target.value);
    };

    function searchList() {
        return (
            <Scroll>
                <SearchList filteredTargets={filteredTargets} />
            </Scroll>
        );
    }

    return (
        <div>
            <p>Search:</p>
            <div>
                <input type="search" placeholder="search target" onChange={handleChange} />
            </div>
            {searchList()}
        </div>
    )

}

export default Search;