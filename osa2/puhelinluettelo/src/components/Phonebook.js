import React from 'react'

const Phonebook = ({ personsToShow, deletePerson }) => {

    return (
        <div>
            <h2>Numbers</h2>
            <ul>
        {personsToShow.map(person =>
        <li key={person.name}>{person.name} {person.number} 
        <button type="button" onClick={() => deletePerson(person.id)}>delete</button>
        </li>
        )}
      </ul>
        </div>
    )
}

export default Phonebook