import { useState } from "react"
import Weather from "./Weather"

const OneCountry = ({ searchResult }) => {
    const [myToggle, setMyToggle] = useState(true)
    const [single, setSingle] = useState(searchResult)

    const handleClick = (index) => {
        setMyToggle(!myToggle)
        setSingle(searchResult[index])
    }

    return (
        searchResult.length > 1 && myToggle
            ? searchResult.map((country, index) => (
                <div key={index}>
                    <h2>{country.name.common} <button onClick={() => handleClick(index)}>show</button></h2>
                </div>)
            )
            : searchResult.length > 1 && !myToggle
                ? <div>
                    <h2>{single.name.common}</h2>
                    <p>capital {single.capital}</p>
                    <p>area {single.area}</p>
                    <h4>languages:</h4>
                    {Object.values(single.languages).map((language, index) =>
                        <li key={index}>{language}</li>
                    )}
                    <br />
                    <img
                        src={single.flags.png}
                        alt="flag of the country" />
                    <h3>Weather in {single.capital}</h3>
                    <Weather country={single} />

                </div>
                : searchResult.map((country, index) => (
                    <div key={index}>
                        <h2>{country.name.common}</h2>
                        <p>capital {country.capital}</p>
                        <p>area {country.area}</p>
                        <h4>languages:</h4>
                        {Object.values(country.languages).map((language, index) =>
                            <li key={index}>{language}</li>
                        )}
                        <br />
                        <img
                            src={country.flags.png}
                            alt="flag of the country" />
                        <h3>Weather in {country.capital}</h3>
                        <Weather country={country} />
                    </div>)
                )
    )
}

export default OneCountry