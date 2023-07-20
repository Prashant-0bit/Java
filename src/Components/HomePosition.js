import React from 'react';

function HomePosition() {
  return (
    <div className='position-container'>
      <div className='actual-position-coordinate'>
        <button
          type='button'
          className='btn btn-light actual-position-button'>
          Move Home
        </button>
        <button
          type='button'
          className='btn btn-light actual-position-button'>
          Set Home Position
        </button>
      </div>
      <div className='coordinate-labels'>
        <div className='coordinate-label'>
          <span className='home-pos-coor'>X</span>
          <span className="actual-position-data"></span>
          <span className='home-pos-coor'>Y</span>
          <span className="actual-position-data"></span>
          <span className='home-pos-coor'>Z</span>
          <span className="actual-position-data"></span>
          <span className='home-pos-coor'>A</span>
          <span className="actual-position-data"></span>
          <span className='home-pos-coor'>B</span>
          <span className="actual-position-data"></span>
          <span className='home-pos-coor'>C</span>
          <span className="actual-position-data"></span>
        </div>
      </div>
    </div>
  );
}

export default HomePosition;
