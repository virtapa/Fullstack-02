import React from 'react'

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <div>
      <h2>Add Contact</h2>
      <form onSubmit={addPerson}>
        Name: <input 
          name='name'
          id='name'
          value={newName}
          onChange={handleNameChange}/>
        
          Phone Number: <input 
          name='phonenumber'
          id='phonenumber'
          value={newNumber}
          onChange={handleNumberChange}/>
        
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default PersonForm