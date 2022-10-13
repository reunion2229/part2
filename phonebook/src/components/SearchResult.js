import { useEffect, useState } from 'react'

const SearchResult = ({ persons, searchTerm }) => {
    const [searchResult, setSearchResult] = useState([])
    useEffect(() => {
        const result = persons.filter(person =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setSearchResult(result)
    }, [searchTerm, persons])

    return (
        searchTerm && searchResult.map(person =>
            <p key={person.name}>{person.name} {person.number}</p>)
    )
}

export default SearchResult