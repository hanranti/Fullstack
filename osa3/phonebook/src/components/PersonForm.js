import React from 'react'

const PersonForm = ({ persons, newName, newNumber,
    handleNewNameChange, handleNewNumberChage,
    alertOnSubmit, addPerson }) => (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNewNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNewNumberChage} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

export default PersonForm