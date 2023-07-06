import React from 'react';

function HomePosition() {
  return (
    <>
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
          <span>X</span>
          <span className="actual-position-data"></span>
          <span>Y</span>
          <span className="actual-position-data"></span>
          <span>Z</span>
          <span className="actual-position-data"></span>
          <span>A</span>
          <span className="actual-position-data"></span>
          <span>B</span>
          <span className="actual-position-data"></span>
          <span >C</span>
          <span className="actual-position-data"></span>
        </div>
      </div>
    </>
  );
}

export default HomePosition;
