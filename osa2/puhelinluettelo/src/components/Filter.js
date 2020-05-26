import React from 'react'

const Filter = ({ searchTerm, handleSearchChange}) => {
    return (
        <div>
            Filter shown with
            <input value={searchTerm} onChange={handleSearchChange} ></input>
        </div>
    )
}


export default Filter