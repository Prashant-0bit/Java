import React, { useState, useEffect } from 'react';
import './teachPosition.css';

function TeachPositionPopup({ points, onClose, onSave }) {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [newPointName, setNewPointName] = useState(selectedPoint ? points[selectedPoint] : '');

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    setNewPointName(points[point]);
  };

  const handlePointNameChange = (e) => {
    setNewPointName(e.target.value);
  };

  const handleSave = () => {
    if (selectedPoint) {
      onSave(selectedPoint, newPointName);
      setSelectedPoint(null);
    }
  };

  const handleDelete = () => {
    if (selectedPoint) {
      const updatedPoints = { ...points };
      delete updatedPoints[selectedPoint];
      onSave(selectedPoint, newPointName);
      setSelectedPoint(null);
    }
  };

  useEffect(() => {
    if (selectedPoint) {
      setNewPointName(points[selectedPoint]);
    }
  }, [selectedPoint, points]);

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
              <input
                id="displayName"
                type="text"
                autoComplete='off'
                value={point === selectedPoint ? newPointName : points[point]}
                onChange={handlePointNameChange}
              />
              <hr/>
            </li>
          ))}
        </ul>
      </div>
        <div className="teach-position-popup-editor">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
    </div>
  );
}

export default TeachPositionPopup;
