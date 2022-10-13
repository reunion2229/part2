import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Result from './components/Result'

const App = () => {
  const [countries, setCountries] = useState([])

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])

  // Get data from the server
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('PROMISE FULFILLED')
        setCountries(response.data)
      })
  }, [])

  // Implement search filter
  useEffect(() => {
    let result = countries.filter(c =>
      c.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    searchTerm === ''
      ? setSearchResult([])
      : setSearchResult(result)
  }, [countries, searchTerm])

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <Filter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange} />
      <h3>Result:</h3>
      <Result
        searchTerm={searchTerm}
        searchResult={searchResult} />
    </>
  )
}

export default App;
