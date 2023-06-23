import React from 'react'
import './Style.css';

export default function Language() {
  return (
    <div className='back'>
      <button className='text2' href="/en">English<i className="fa-sharp fa-solid fa-play menuplay"></i></button>
      <button className='text2' href="/de">Deutsch<i className="fa-sharp fa-solid fa-play menuplay"></i></button>
    </div>
  )
}
 