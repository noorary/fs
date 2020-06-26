import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Phonebook from './components/Phonebook'
import Form from './components/Form'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  useEffect(() => {
    console.log('use effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons)

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.findIndex(person => person.name === newName) > -1) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else if(persons.findIndex(person => person.number === newNumber) > -1) {
      window.alert(`${newNumber} is already added to phonebook`)
      setNewNumber('')
      setNewName('')
    }
    
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    
    setSearchTerm(event.target.value)
    if(event.target.value === ('')) {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  const personsToShow = showAll
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange} />

      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />

      <Phonebook
        personsToShow={personsToShow} />
    </div>
  )

}

export default App

