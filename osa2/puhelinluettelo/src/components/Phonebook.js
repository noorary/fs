import React from 'react'

const Phonebook = ({ personsToShow }) => {

    return (
        <div>
            <h2>Numbers</h2>
            <ul>
        {personsToShow.map(person =>
        <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
        </div>
    )
}

export default Phonebook