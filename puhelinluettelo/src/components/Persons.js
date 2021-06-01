import React from 'react'
import Person from './Person'
import personService from '../services/persons'

const Persons = ({ persons, setPersons, setMessage }) => {
  const deletePerson = (id) => {
    personService
      .remove(id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage({
            text: 'Deleted!',
            type: "success"})
      
        setTimeout(() => {
            setMessage(null)
      }, 5000)
    })
      .catch(error => {
        setMessage({
            text:'This person was already removed from server',
            type:"error"})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter((person) => person.id !== id))
      })
  }


  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => 
        <Person 
          key={person.id}
          person={person}
          handleDeletePerson={deletePerson}
        />
      )}
    </div>
  )
}

export default Persons