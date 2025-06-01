import React from 'react'
import './SubCard.css'
import { format } from 'date-fns'

import { useWeather } from '../../context/WeatherContext'

import rain from '../../assets/rain.png';
import cloud from '../../assets/cloud.png';
import snow from '../../assets/snow.png';
import sunny from '../../assets/sunny.png'

function SubCard() {
  const { forecastData, loadingForecast } = useWeather()

  const rainImage = <img src={rain} alt="rain" width={120}/>
  const sunnyImage = <img src={sunny} alt="rain" width={120}/>
  const snowImage = <img src={snow} alt="rain" width={120}/>
  const cloudImage = <img src={cloud} alt="rain" width={120}/>

  return (
    <>
    { !loadingForecast && <div className="card-subcard">
        <div className="card-header">
          <h2>Forecast</h2>
        </div>
        <div className="card-body">
          {forecastData.list.map((item, index) => (
            <div key={index} className="forecast-item">
              <p>{format(new Date(item.dt * 1000), 'dd-MM-yyyy')}</p>
              <p>{Math.round(item.main.temp)}°C</p>
              { (item.weather[0].main === "Rain" || item.weather[0].main === "Drizzle"
                  || item.weather[0].main === "Thunderstorm") ? rainImage 
                : (item.weather[0].main === "Smoke" || item.weather[0].main === "Haze"
                  || item.weather[0].main === "Mist" || item.weather[0].main == "Clouds") ? cloudImage
                : item.weather[0].main === "Snow" ? snowImage
                : sunnyImage}
              <p>{item.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    }
    </>
  )
}

export default SubCard