import React from 'react'

const Filter = ({ newFilter, handleNewFilterChange }) => (
    <p>filter shown with <input value={newFilter} onChange={handleNewFilterChange} /></p>
)

export default Filter