import React from 'react'
import './App.css'

import Snowfall from './components/snowfall/Snowfall'
import Rainy from './components/rainy/Rainy'
import Sunny from './components/sunny/Sunny'
import Smoke from './components/smoke/Smoke'

import MainCard from './components/mainCard/MainCard'
import SubCard from './components/subCard/SubCard'
import Map from './components/map/Map'

import { useWeather } from './context/WeatherContext'

function App() {
  const { weatherData, loadingWeather, error, isLocationSet } = useWeather()

  if (loadingWeather) {
    return <div className="loading"></div>;
  }

  const rainnyCondition = weatherData.weather[0].main === "Rain" || weatherData.weather[0].main === "Drizzle" 
                        || weatherData.weather[0].main === "Thunderstorm";
  const smokeCondition = weatherData.weather[0].main === "Smoke" || weatherData.weather[0].main === "Haze" 
                        || weatherData.weather[0].main === "Mist" || weatherData.weather[0].main === "Clouds";

  return (
    <>
      { error ? ( 
        <p className="error-message">{error}</p> 
      ) : isLocationSet ? (
        <>
          <div className="forecast">
            <MainCard />
            <SubCard />
          </div>
          <div className="map">
            <Map />
          </div>
          { rainnyCondition && ( <Rainy /> ) }
          { smokeCondition && ( <Smoke /> ) }
          { weatherData.weather[0].main === "Snow" && ( <Snowfall /> ) }
          { weatherData.weather[0].main === "Clear" && ( <Sunny /> ) }
        </>
      ) : (
        <div className="loading"></div>
      )}
    </>
  )
}

export default App