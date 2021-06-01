import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    if (personAlreadyExists(newName)) {
      alert(`${newName} is already added, would you like to update their phone number?`)
      updatePerson(newName)
      setNewName('')
      setNewNumber('')
      return;
    }


    const newObject = {
      name: newName, 
      number: newNumber,
    }
  
    personService
      .create(newObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .then(() => {
        setMessage({
          text: `Added ${newObject.name} to the phonebook`,
          type: "success"
        })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch(error => {
        setMessage({
          text: error.response.data.error,
          type: "error"
        })
      })
  }
  const updatePerson = (name) => {
    const person = persons.find((person) => person.name.toLowerCase() === name.toLowerCase())
    const updatedPerson = {...person, number: newNumber }

    personService
      .update(person.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        setMessage({
          text: `Updated ${returnedPerson.name}'s number`,
          type: "success"})
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        
      })
  }

  const filteredPersons = newFilter 
  ? persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  : persons


  const personAlreadyExists = (name) => {
    return persons.some((person) => person.name.toLowerCase() === name.toLowerCase())
  }


    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }
    
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
      setNewFilter(event.target.value)
    }
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification 
        message={message}
      />
      <Filter 
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons
        persons={filteredPersons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
    </div>
  )
}

export default App