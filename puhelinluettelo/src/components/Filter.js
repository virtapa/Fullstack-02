import React from 'react'

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
        Filter shown with: <input 
        id='filter'
        value={newFilter}
        onChange={handleFilterChange}
        />
    </div>
  )
}

export default Filter