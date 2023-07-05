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
          <label htmlFor='x'>X</label>
          <input id='x' className="actual-position-data"></input>
          <label htmlFor='y'>Y</label>
          <input id='y' className="actual-position-data"></input>
          <label htmlFor='z'>Z</label>
          <input id='z' className="actual-position-data"></input>
          <label htmlFor='a'>A</label>
          <input id='a' className="actual-position-data"></input>
          <label htmlFor='b'>B</label>
          <input id='b' className="actual-position-data"></input>
          <label htmlFor='c'>C</label>
          <input id='c' className="actual-position-data"></input>
        </div>
      </div>
    </>
  );
}

export default HomePosition;
