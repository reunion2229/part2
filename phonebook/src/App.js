import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import SearchField from './components/SearchField'
import SearchResult from './components/SearchResult'
import Form from './components/Form'
import Notification from './components/Notification'

import personService from './services/persons'

import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString()
    }

    const allPersons = persons.map(person => person.name)

    if (allPersons.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const currentPerson = persons.find(person => person.name === newName)
        const currentIndex = persons.indexOf(currentPerson)
        const currentId = currentPerson.id
        personService
          .update(currentId, personObject)
          .then((returnedOne) => {
            const one = persons.filter(person => persons.indexOf(person) !== currentIndex)
            setPersons(one.concat(returnedOne))
            setNewName('')
            setNewNumber('')
            setNotification(`${returnedOne.name}'s number is updated`)
            setTimeout(() => {
              setNotification(null)
            }, 3000)
          })
          .catch(() => {
            setPersons(persons.filter(person => persons.indexOf(person) !== currentIndex))
            setNewName('')
            setNewNumber('')
            setNotification(`${currentPerson.name} has already been removed from server`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`${returnedPerson.name} added to your phonebook`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
    }
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchField
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <Form
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange} />
      <Notification
        notification={notification} />
      <h3>Numbers</h3>
      {persons.map(person =>
        <Persons
          key={person.id}
          persons={person}
          handleClick={() => removePerson(person.id, person.name)} />
      )}
      <h3>Search result:</h3>
      <SearchResult
        persons={persons}
        searchTerm={searchTerm} />
    </div>
  )
}

export default App