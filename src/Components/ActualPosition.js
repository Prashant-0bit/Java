import React, { useState, useEffect } from 'react';
import './robotmotion.css';

function ActualPosition() {
    const [selectedCoordinate, setSelectedCoordinate] = useState('Axis');
    const coordinates = ['Axis', 'World', 'Base', 'Tool'];
    const [coordinateLabels, setCoordinateLabels] = useState([]);

    const handleCoordinateSelection = (coordinate) => {
        setSelectedCoordinate(coordinate);
    };

    useEffect(() => {
        if (selectedCoordinate === 'Axis') {
            setCoordinateLabels(['A1', 'A2', 'A3', 'A4', 'A5', 'A6']);
        } else {
            setCoordinateLabels(['X', 'Y', 'Z', 'A', 'B', 'C']);
        }
    }, [selectedCoordinate]);

    return (
        <>
            <div className='actual-position-coordinate'>
                {coordinates.map((coordinate) => (
                    <button
                        key={coordinate}
                        type='button'
                        className={`btn btn-light actual-position-button ${selectedCoordinate === coordinate ? 'active' : ''}`}
                        onClick={() => handleCoordinateSelection(coordinate)}
                    >
                        {coordinate}
                    </button>
                ))}
            </div>
            <div className="coordinate-labels">
                {coordinateLabels.map((label) => (
                    <div key={label} className="coordinate-label">
                        <span >{label}</span>
                        <span className='actual-position-data'></span>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ActualPosition;
