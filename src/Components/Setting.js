import React from 'react'
import './MainFunc';

export default function Setting() {
  return (
    <div className="main-func-container">
      <button className='main-func' to="/languages">Language</button>
      <button className='main-func' to="/time">Time</button>
      <button className='main-func' to="/about">About</button>
      <button className='main-func' to="/help">Help</button>
      <button className='main-func' to="/help">Minimize</button>
    </div>
  )
}
 