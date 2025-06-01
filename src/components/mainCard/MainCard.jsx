import React from 'react'
import './MainCard.css'
import { format } from 'date-fns'

import { useWeather } from '../../context/WeatherContext'

import rain from '../../assets/rain.png';
import cloud from '../../assets/cloud.png';
import snow from '../../assets/snow.png';
import sunny from '../../assets/sunny.png'

const airPullutionLevels = [
  'Good',
  'Fair',
  'Moderate',
  'Poor',
  'Very Poor'
]

function MainCard() {
  const { weatherData, airPullutionData, loadingWeather, loadingAir } = useWeather()

  const isLoading = loadingWeather || loadingAir;

  let airQuality;

  if (!isLoading) {
    airQuality = airPullutionLevels[airPullutionData.list[0].main.aqi - 1];
  }

  const rainnyCondition = weatherData.weather[0].main === "Rain" || weatherData.weather[0].main === "Drizzle" 
                        || weatherData.weather[0].main === "Thunderstorm";
  const smokeCondition = weatherData.weather[0].main === "Smoke" || weatherData.weather[0].main === "Haze" 
                        || weatherData.weather[0].main === "Mist" || weatherData.weather[0].main === "Clouds";

  const rainImage = <img src={rain} alt="rain" width={200}/>
  const sunnyImage = <img src={sunny} alt="rain" width={200}/>
  const snowImage = <img src={snow} alt="rain" width={200}/>
  const cloudImage = <img src={cloud} alt="rain" width={200}/>
  

  return (
    <>
    { !isLoading && <div className='card-maincard'>
        <div className='card-header'>
          <h1>{weatherData.name}</h1>
          <p>{format(new Date(weatherData.dt * 1000), 'dd-MM-yyyy')}</p>
        </div>
        <div className='card-body'>
          <div className='temperature'>
            <h2>{Math.round(weatherData.main.temp)}°C</h2>
            { rainnyCondition ? rainImage 
              : smokeCondition ? cloudImage 
              : weatherData.weather[0].main === "Snow" ? snowImage 
              : sunnyImage}
            <p>{weatherData.weather[0].description}</p>
          </div>
          <div className='details'>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>
              Air Quality: <span className={ airQuality === "Good" ? 'good' 
                : airQuality === "Fair" ? 'fair'
                : airQuality === "Moderate" ? 'moderate'
                : airQuality === "Poor" ? 'poor'
                : 'very-poor'}>{airQuality}</span>
            </p>
          </div>
        </div> 
      </div>
    } 
    </>
  )
}

export default MainCard