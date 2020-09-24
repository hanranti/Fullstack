import React from 'react'

const Persons = ({ newFilter, persons, deletePerson }) => {
    const filteredPersons = newFilter === '' ? persons : persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase()))
    return filteredPersons.map(person =>
        <li key={person.id}>{person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button></li>)
}

export default Persons