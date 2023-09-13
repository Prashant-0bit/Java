import React, { useState, useEffect } from 'react';
import Keypad from './SubComponents/Keyboard'; 
import { useTranslation } from 'react-i18next';
import './teachPosition.css';

function TeachPositionPopup({ points, onClose, onSave,  onPointClick, onPointNameChange, onRenamePoint }) {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [newPointName, setNewPointName] = useState(selectedPoint ? points[selectedPoint] : '');
  const [isKeypadOpen, setIsKeypadOpen] = useState(false); 
  const { t } = useTranslation();

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    setNewPointName(points[point]);
    
  };

  const handleKeypadOpen = () => {
    setIsKeypadOpen(true); 
  };

  const handleKeypadClose = () => {
    setIsKeypadOpen(false); 
  };

  const handleSave = () => {
    if (selectedPoint) {
      onSave(selectedPoint, newPointName);
      setSelectedPoint(null);
    }
  };

  const handleRenamePoint = (point) => {
    onRenamePoint(point);
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
    <>
    <div className="teach-position-popup">
      <div className="teach-position-popup-header">
        <h2>{t('Teach Position')}</h2>
        <button onClick={onClose}>{t('Close')}</button>
      </div>
      <div className="teach-position-popup-list">
        <ul>
          {Object.keys(points).map((point) => (
            <li key={point} onClick={() => handlePointClick(point)}>
              <button className={selectedPoint === point ? 'selected-button' : ''}>
                {t(point)}
              </button>
              <hr />
            </li>
          ))}
        </ul>
      </div>
      {selectedPoint && (
        <div className="teach-position-popup-editor">
          <div className='selected-point'>
            <p onClick={() => handleRenamePoint(selectedPoint)}>{t('Selected Point')}: {t(selectedPoint)}</p>
          </div>
          <button onClick={handleSave} className="save-button">{t('Touch up')}</button>
        </div>
      )}
      
    </div>
    {isKeypadOpen && (
        <Keypad
          enteredText={newPointName}
          setEnteredText={setNewPointName}
          handleKeypadInput={(value) => {
            setNewPointName((prevName) => prevName + value);
          }}
          handleKeypadEnter={() => {
            setIsKeypadOpen(false);
            onPointNameChange(selectedPoint, newPointName);
          }}
          handleKeypadClose={handleKeypadClose}
        />
    )}
    </>
  );
}
export default TeachPositionPopup;
