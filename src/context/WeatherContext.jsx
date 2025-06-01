import React, { createContext, useContext, useState, useEffect } from 'react'

const WeatherContext = createContext()

const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [airPullutionData, setAirPullutionData] = useState(null)
  const [location, setLocation] = useState({ lat: 13.7563, long: 100.5018 }); // Default to Bangkok coordinates
  
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [loadingForecast, setLoadingForecast] = useState(true);
  const [loadingAir, setLoadingAir] = useState(true);

  const [error, setError] = useState(null);
  const [isLocationSet, setIsLocationSet] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
          setIsLocationSet(true);
        },
        (err) => {  
          setError(err.message);
        }
      );
    }
  },[])


  useEffect(() => {
    const fetchWeatherData = async () => {
      // Fetch weather data from an API
      const response = await fetch(`${apiUrl}/weather?lat=${location.lat}&lon=${location.long}&units=metric&appid=${apiKey}`)
      const data = await response.json()
      setWeatherData(data)
      setLoadingWeather(false);
    }

    const fetchForecastData = async () => {
        const response = await fetch(`${apiUrl}/forecast?lat=${location.lat}&lon=${location.long}&units=metric&appid=${apiKey}`)
        const data = await response.json()

        // กลุ่มตามวัน
        const seenDates = new Set();
        const dailyData = [];

        data.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0]; // แยกวันที่ออกมา

          if (!seenDates.has(date)) {
            seenDates.add(date);
            dailyData.push(item); // เอาเฉพาะรายการแรกของวันนั้น
          }
        });
        // กำหนดค่าใหม่ให้ forecastData
        data.list = dailyData;
        setForecastData(data)
        setLoadingForecast(false)
    }

    const fetchAirPullutionData = async () => {
        const response = await fetch(`${apiUrl}/air_pollution?lat=${location.lat}&lon=${location.long}&appid=${apiKey}`)
        const data = await response.json()
        setAirPullutionData(data)
        setLoadingAir(false)
    }
    fetchWeatherData()
    fetchForecastData()
    fetchAirPullutionData()
  }, [location])

  

  return (
    <WeatherContext.Provider value={{ weatherData, loadingWeather, forecastData, 
    loadingForecast, airPullutionData, loadingAir, error, isLocationSet, location }}>
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeather = () => {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider')
  }
  return context
}