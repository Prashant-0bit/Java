import React, { useState } from 'react';
import './robotmotion.css';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import NumericKeypad from './SubComponents/NumericKeyBoard';
import TeachPositionPopup from './TeachPositionPopup';
import Keypad from './SubComponents/Keyboard';

function ActualPosition() {
    const [selectedCoordinate, setSelectedCoordinate] = useState('Axis');
    const [accelerationValue, setAccelerationValue] = useState('100');
    const [velocityValue, setVelocityValue] = useState('10');
    const [isOpenNumericKeypad, setIsOpenNumericKeypad] = useState(false);
    const [isTeachPositionButtonActive, setIsTeachPositionButtonActive] = useState(false);
    const [isHomePositionActive, setIsHomePositionActive] = useState(false);
    const [isKeypadOpen, setIsKeypadOpen] = useState(false);
    const [newPointName, setNewPointName] = useState('');
    const [selectedPoint, setSelectedPoint] = useState(null);

    const handleHomePositionClick = () => {
        setIsHomePositionActive(true);
    }
    const handleTeachPositionButtonClick = () => {
        setIsTeachPositionButtonActive(true);
        setIsTeachPositionPopupOpen(true);
    };

    const handleTeachPositionPopupClose = () => {
        setIsTeachPositionButtonActive(false);
        setIsTeachPositionPopupOpen(false);
    };

    const coordinates = {
        World:  ['X', 'Y', 'Z', 'A', 'B', 'C'],
        Axis:   ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
        Base:   ['X', 'Y', 'Z', 'A', 'B', 'C'],
        Tool:   ['X', 'Y', 'Z', 'A', 'B', 'C'],
    };

    const [isTeachPositionPopupOpen, setIsTeachPositionPopupOpen] = useState(false);
    const [teachPositionPoints, setTeachPositionPoints] = useState({
        'p1': 'Point 1',
        'p2': 'Point 2',
        'p3': 'Point 3',
        'p4': 'Point 4',
        'p5': 'Point 5',
        'p6': 'Point 6',
        'p7': 'Point 7',
        'p8': 'Point 8',
        'p9': 'Point 9',
        'p10': 'Point 10'
    });

    const handleSaveTeachPosition = (pointKey, newName) => {
        setTeachPositionPoints((prevPoints) => ({
            ...prevPoints,
            [pointKey]: newName,
        }));
    };

    const handlePointClick = (point) => {
        setSelectedPoint(point);
        setIsKeypadOpen(true);
        setNewPointName(teachPositionPoints[point]);
    };

    const handleOpenNumericKeypad = () => {
        setIsOpenNumericKeypad(true);
    };

    const handleCoordinateSelection = (coordinate) => {
        setSelectedCoordinate(coordinate);
    };

    const handleAccelerationChange = (e) => {
        const newValue = e.target.value;
        setAccelerationValue(newValue);
    };

    const handleVelocityChange = (e) => {
        const newValue = e.target.value;
        setVelocityValue(newValue);
    };

    const handleNumericKeyPress = (value) => {
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
            if (selectedCoordinate === 'Acceleration') {
                setAccelerationValue(parsedValue.toString());
            } else if (selectedCoordinate === 'Velocity') {
                setVelocityValue(parsedValue.toString());
            }
        } else if (value === 'Backspace') {
            if (selectedCoordinate === 'Acceleration') {
                setAccelerationValue((prevValue) => prevValue.slice(0, -1));
            } else if (selectedCoordinate === 'Velocity') {
                setVelocityValue((prevValue) => prevValue.slice(0, -1));
            }
        }
    };

    return (
        <div className='position-container'>
            <div className="coordinate-labels">
                <div className='actual-position-coordinate'>
                    {Object.keys(coordinates).map((coordinate) => (
                        <button
                            key={coordinate}
                            type='button'
                            className={`actual-position-button ${selectedCoordinate === coordinate ? 'active' : ''}`}
                            onClick={() => handleCoordinateSelection(coordinate)}
                        >
                            {coordinate}
                        </button>
                    ))}
                </div>

                <div className='home-button'>
                    <button
                        type='button'
                        className={`actual-position-button ${isHomePositionActive ? 'active' : ''}`}
                        onClick={handleHomePositionClick}>
                        Move Home
                    </button>
                    <button
                        type='button'
                        className={`actual-position-button ${isTeachPositionButtonActive ? 'active' : ''}`}
                        onClick={handleTeachPositionButtonClick}>
                        Teach Position
                    </button>
                </div>

                <div className='motion-value-container'>
                    <div className='motion-speed-value'>
                        Acceleration
                        <div className='motion-input-container'>
                            <input
                                type='text'
                                id='acceleration'
                                className='motion-input'
                                value={accelerationValue}
                                onClick={() => handleOpenNumericKeypad()}
                                onChange={handleAccelerationChange}// Update this line
                            />
                        </div>
                    </div>

                    <div className='motion-speed-value'>
                        Velocity
                        <div className='motion-input-container'>
                            <input
                                id='velocity'
                                type='text'
                                className='motion-input'
                                value={velocityValue}
                                onClick={() => handleOpenNumericKeypad()}
                                onChange={handleVelocityChange} // Update this line
                            />
                        </div>
                    </div>
                </div>
            </div>

            {coordinates[selectedCoordinate].map((label) => (
                <div key={label} className="coordinate-label">
                    <span className='home-pos-coor'>{label}</span>
                    <div className='position-data'>
                        <button type='button' className='jog-button'>
                            <FiMinusCircle />
                        </button>
                        <span className='actual-position-data'></span>
                        <button type='button' className='jog-button'>
                            <FiPlusCircle />
                        </button>
                    </div>
                </div>
            ))}

            {isOpenNumericKeypad && (
                <NumericKeypad
                    onKeyPress={handleNumericKeyPress}
                    onClose={() => setIsOpenNumericKeypad(false)}
                />
            )}

            {isTeachPositionPopupOpen && (
                <TeachPositionPopup
                    points={teachPositionPoints}
                    onClose={handleTeachPositionPopupClose}
                    onSave={handleSaveTeachPosition}
                    onPointClick={handlePointClick}
                />
            )}

            {isKeypadOpen && (
                <Keypad
                    enteredText={newPointName}
                    setEnteredText={setNewPointName}
                    handleKeypadInput={(value) => {
                        setNewPointName((prevName) => prevName + value);
                    }}
                    handleKeypadEnter={() => {
                        setIsKeypadOpen(false);
                    }}
                />
            )}
        </div>
    );
}

export default ActualPosition;