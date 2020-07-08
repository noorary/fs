import React, { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY
const Weather = ({capital}) => {

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        console.log('getting weather info...')
        axios.get(`${'http://api.weatherstack.com/current'}?access_key=${api_key}&query=${capital}`)
        .then((response) => {
            setWeather(response.data)
            console.log(weather)
        })
    })

    if(weather){
    return (
        
        <div>
            <h2> Weather in {capital}</h2>
            <p><b>temperature:</b> {weather.current.temperature} celsius</p>
            <img src={weather.current.weather_icons[0]} alt='Weather icon'></img>
            <p><b>wind:</b> {weather.current.wind_speed} mph, direction {weather.current.wind_dir}</p>
        </div>
    )}

    else {
        return (<div></div>)
    }
}

export default Weather