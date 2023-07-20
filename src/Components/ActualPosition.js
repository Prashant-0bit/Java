import React, { useState } from 'react';
import './robotmotion.css';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';

function ActualPosition() {
    const [selectedCoordinate, setSelectedCoordinate] = useState('Axis');

    const coordinates = {
        Axis: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
        World: ['X', 'Y', 'Z', 'A', 'B', 'C'],
        Base: ['X', 'Y', 'Z', 'A', 'B', 'C'],
        Tool: ['X', 'Y', 'Z', 'A', 'B', 'C'],
        // Add more coordinates and their labels as needed
    };

    const handleCoordinateSelection = (coordinate) => {
        setSelectedCoordinate(coordinate);
    };

    return (
        <div className='position-container'>
            <div className='actual-position-coordinate'>
                {Object.keys(coordinates).map((coordinate) => (
                    <button
                        key={coordinate}
                        type='button'
                        className={`btn btn-light actual-position-button ${selectedCoordinate === coordinate ? 'active' : ''}`}
                        onClick={() => handleCoordinateSelection(coordinate)}
                    >
                        {coordinate}
                    </button>
                ))}
                <div>
                    <button type='button' className='btn btn-light actual-position-button'>
                        Absolute
                    </button>
                    <button type='button' className='btn btn-light actual-position-button'>
                        Relative
                    </button>
                </div>
            </div>

            <div className="coordinate-labels">
            <button type='button' className='btn btn-light actual-position-button'>
                    Active Jog
                </button>
                {coordinates[selectedCoordinate].map((label) => (
                    <div key={label} className="coordinate-label">
                        <span className='home-pos-coor'>{label}</span>
                        <div className='position-data' >
                            <button type='button' className='btn btn-light jog-button'>
                                <FiMinusCircle />
                            </button>
                            <span className='actual-position-data'></span>
                            <button type='button' className='btn btn-light jog-button'>
                                <FiPlusCircle />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default ActualPosition;
