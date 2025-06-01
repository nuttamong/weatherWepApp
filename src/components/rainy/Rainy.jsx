import React from 'react'
import './Rainy.css'

function Rainy() {
  return (
    <div className="rain-container">
      {[...Array(100)].map((_, i) => (
        <div className="raindrop" 
        key={i}
        style={{
          '--i': i,
          left: `${Math.random() * 100}%`,
          animationDuration: `${0.8 + Math.random()}s`,
          opacity: Math.random(),
        }}
        ></div>
      ))}
    </div>
  )
}

export default Rainy