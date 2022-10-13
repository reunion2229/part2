import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [info, setInfo] = useState({})

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`
        axios
            .get(url)
            .then(response => {
                setInfo(response.data)
            })
    }, [country])

    const icon = info.weather && info.weather[0].icon
    const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

    return (
        <>
            {info.main && <p>temperature {info.main.temp.toFixed()}°C</p>}
            {icon && <img src={imageUrl} alt='weather icon' />}
            {info.wind && <p>wind {info.wind.speed.toFixed()} m/s</p>}
        </>
    )
}

export default Weather
