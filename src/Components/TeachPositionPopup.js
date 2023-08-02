import React, { useState } from 'react';
import './teachPosition.css';

function TeachPositionPopup({ points, onClose, onSave }) {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [newName, setNewName] = useState('');

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    setNewName(points[point]);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSave = () => {
    if (selectedPoint) {
      onSave(selectedPoint, newName);
    }
    setSelectedPoint(null);
  };

  const handleDelete = () => {
    if (selectedPoint) {
      const updatedPoints = { ...points };
      delete updatedPoints[selectedPoint];
      onSave(selectedPoint, newName);
      setSelectedPoint(null);
    }
  };

  return (
    <div className="teach-position-popup">
      <div className="teach-position-popup-header">
        <h2>Teach Position</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="teach-position-popup-list">
        <ul>
          {Object.keys(points).map((point) => (
            <li key={point} onClick={() => handlePointClick(point)}>
              {point}
            </li>
          ))}
        </ul>
      </div>
      {selectedPoint && (
        <div className="teach-position-popup-editor">
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
            placeholder="Enter point name"
          />
          <div className='point-container'>
            <div className='point'>X:
              <input
                id='pointX'
                name='PointX'
                type='text'
                className='point-input'
              />
            </div>
            <div className='point'>Y:
              <input
                id='pointY'
                name='PointY'
                type='text'
                className='point-input'
              />
            </div>
            <div className='point'>Z:
              <input
                id='pointZ'
                name='PointZ'
                type='text'
                className='point-input'
              />
            </div>
          </div>
          <div className='point-container'>
            <div className='point'>A:
              <input
                id='pointA'
                name='PointA'
                type='text'
                className='point-input'
              />
            </div>
            <div className='point'>B:
              <input
                id='pointB'
                name='PointB'
                type='text'
                className='point-input'
              />
            </div>
            <div className='point'>C:
              <input
                id='pointC'
                name='PointC'
                type='text'
                className='point-input'
              />
            </div>
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

    </div>
  );
}

export default TeachPositionPopup;
