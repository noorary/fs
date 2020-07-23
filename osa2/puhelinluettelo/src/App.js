import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Phonebook from './components/Phonebook'
import Form from './components/Form'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [notification, setNotification] = useState({
    content: null,
    style: null
  })

  useEffect(() => {
    console.log('use effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons)

  const showNotification = (content, style) => {
    setNotification({
      content: content,
      style: style
    })
    setTimeout(() => {
      setNotification({
        content: null,
        style: null
      })
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.findIndex(person => person.name === newName) > -1) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(n => n.name === newName)
        updateNumber(person.id, newNumber)
        showNotification(`${newName} was updated`, 'success')
      }
      
      else {
        setNewName('')
        setNewNumber('')
      }
    } else if(persons.findIndex(person => person.number === newNumber) > -1) {
      if(window.confirm(`${newNumber} is already added to phonebook, replace the old name with a new name?`)) {
        const person = persons.find(n => n.number === newNumber)
        updateName(person.id, newName)
        showNotification(`'${newNumber}' was updated`, 'success')
      } else {
        setNewNumber('')
        setNewName('')
      }
      
    }
    
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .addPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })

        showNotification(`'${newName}' was added to phonebook`, 'success')
    }
    
  }

  const deletePerson = (id) => {
    const selected = persons.findIndex((person) => {
      return person.id === id
    })

    if(window.confirm(`Delete ${persons[selected].name}?`)) {
      personService
      .deletePerson(id)
      .then(deletedPerson => {
          showNotification(`${persons[selected].name} was deleted`, 'success')
          setPersons(persons.filter(p => p.id !== id))
      })
    }

  }

  const updateNumber = (id, newNumber) => {
    const person = persons.find(p => p.id === id)
    const updatedPerson = { ...person, number : newNumber}

    personService
      .updatePerson(id, updatedPerson)
      .then(updatedPersons => {
        setPersons(persons.map(person => person.id !== id ? person : updatedPersons))
      }).catch((error) => {
        showNotification(`Failed to update ${updatedPerson.name}`, 'failure')
      })
  }

  const updateName = (id, newName) => {
    const person = persons.find(p => p.id === id)
    const updatedPerson = { ...person, name : newName}

    personService
      .updatePerson(id, updatedPerson)
      .then(updatedPersons => {
        setPersons(persons.map(person => person.id !== id ? person : updatedPersons))
      }).catch((error) => {
        showNotification(`Failed to update ${updatedPerson.number}`, 'failure')
      })
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
      <Notification notification={notification}/>
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
        personsToShow={personsToShow}
        deletePerson={deletePerson} />
    </div>
  )

}

export default App

