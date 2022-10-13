import OneCountry from "./OneCountry"

const Result = ({ searchResult }) => {
    return (
        searchResult.length > 10 
        ? <p>Too many matches, specify another filter</p>
        : <OneCountry searchResult={searchResult} />
    )
}

export default Result