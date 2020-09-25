import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => personService.getAll()
    .then(initialPersons => setPersons(initialPersons)), [])

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChage = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personToEdit = persons.find(person => person.name === newName)
    if (personToEdit
      ? window.confirm(`Do you want to edit ${personToEdit.name}s number?`)
      : false) {
      personService.update(personToEdit.id, {
        name: personToEdit.name,
        number: newNumber
      }).then(editedPerson => {
        setPersons(person => person.id !== personToEdit.id
          ? person
          : editedPerson)
        setNewName('')
        setNewNumber('')
      })
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService.create(newPerson)
        .then(addedPerson => setPersons(persons.concat(addedPerson)))
      setNewName('')
      setNewNumber('')
    }
  }

  const deletePerson = (id) => {
    console.log(persons.map(
      person => person.id !== id ? person : null))
    personService.remove(id)
      .then(removedPerson => setPersons(persons.filter(
        person => person.id !== id)))
      .catch(() => setPersons(persons.filter(
        person => person.id !== id)))
  }

  const alertOnSubmit = (event) => {
    event.preventDefault()
    window.alert(`${newName} is already added to the phonebook!`)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleNewFilterChange={handleNewFilterChange} />
      <h2>add a new</h2>
      <PersonForm persons={persons} newName={newName} newNumber={newNumber}
        handleNewNameChange={handleNewNameChange} addPerson={addPerson}
        handleNewNumberChage={handleNewNumberChage} alertOnSubmit={alertOnSubmit} />
      <h2>Numbers</h2>
      <Persons newFilter={newFilter} persons={persons} deletePerson={deletePerson} />
    </div>
  )

}

export default App