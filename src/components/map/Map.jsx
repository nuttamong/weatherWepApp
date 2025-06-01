import { useState } from 'react';
import './Map.css'
import { MapContainer, TileLayer } from 'react-leaflet';
import { useWeather } from '../../context/WeatherContext'


const weatherLayers = [
  { label: 'Clouds', value: 'clouds_new' },
  { label: 'Precipitation', value: 'precipitation_new' },
  { label: 'Temperature', value: 'temp_new' },
  { label: 'Wind', value: 'wind_new' },
  { label: 'Pressure', value: 'pressure_new' },
];


function Map() {
  const apiKey = import.meta.env.VITE_API_KEY
  const apiMapUrl = import.meta.env.VITE_MAP_API_URL

  const [selectedLayer, setSelectedLayer] = useState('clouds_new');
  const { location } = useWeather();

  return (
    <div className='map-container'>
      {/* Dropdown เลือกเลเยอร์ */}
      <div style={{ position: 'absolute', zIndex: 1000, background: 'white', padding: 20, marginLeft: 50, borderRadius: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <label>Weather Layer: </label>
        <select value={selectedLayer} onChange={(e) => setSelectedLayer(e.target.value)}>
          {weatherLayers.map((layer) => (
            <option key={layer.value} value={layer.value}>
              {layer.label}
            </option>
          ))}
        </select>
      </div>

      {/* แผนที่ */}
      <MapContainer center={[location.lat, location.long]} zoom={6} style={{ height: '100vh', width: '100%' }}>
        {/* Base map */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* Weather Layer */}
        <TileLayer
          attribution='&copy; OpenWeatherMap'
          url={`${apiMapUrl}/${selectedLayer}/{z}/{x}/{y}.png?appid=${apiKey}`}
        />
      </MapContainer>
    </div>
  )
}

export default Map