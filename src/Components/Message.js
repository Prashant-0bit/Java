
import React from 'react'
import './Header.css';

export default function Message() {
    return (

<div className="header-content">
        {/* Message */}
        <div className="message">
          <div className='message-icon'>
          <i className="fa-solid fa-circle-info status" style={{ color: '#2196F3' }}></i>
          <i className="fa-solid fa-triangle-exclamation status" style={{ color: '#FFC107' }}></i>
          <i className="fa-solid fa-circle-xmark status" style={{ color: '#F44336' }}></i>
          </div>
          <div className='acknowledge-button'>
            <button type='button' className='btn btn-warning acknowledge-ok'>
              OK
            </button>
            <button type='button' className='btn btn-warning acknowledge-confirm'>
              Confirm All
            </button>
          </div>
          
        </div>
        
      <div className='Horizontal-divider'/>
      </div>
  
    )
}
