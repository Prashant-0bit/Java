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
      </div>
      <div className='coordinate-labels'>
        <div className='coordinate-label'>
          <label>X</label>
          <span className="actual-position-data"></span>
          <label>Y</label>
          <span className="actual-position-data"></span>
          <label>Z</label>
          <span className="actual-position-data"></span>
          <label>A</label>
          <span className="actual-position-data"></span>
          <label>B</label>
          <span className="actual-position-data"></span>
          <label>C</label>
          <span className="actual-position-data"></span>
        </div>
      </div>
    </>
  );
}

export default HomePosition;
