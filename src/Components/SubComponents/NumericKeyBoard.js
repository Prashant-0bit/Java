import React, { useState } from 'react';
import { MdOutlineKeyboardReturn, MdOutlineKeyboardBackspace } from 'react-icons/md';
import { HiMinus } from 'react-icons/hi';
import { FcCheckmark } from 'react-icons/fc';

function NumericKeypad({ onKeyPress, onClose, activeInput, inputValues, setInputValues }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [keypadLeft, setKeypadLeft] = useState(200);
  const [keypadTop, setKeypadTop] = useState(1);

  const handleButtonClick = (value) => {
    if (value === 'Check' || value === 'Enter')  {
      onClose();
    } else if (value === 'Backspace') {
      handleBackspaceClick();
    } else {
      onKeyPress(value);
    }
  };

  const handleBackspaceClick = () => {
    if (activeInput !== null) {
      const updatedValue = inputValues[activeInput].slice(0, -1);
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [activeInput]: updatedValue,
      }));
    }
  };

  const handleNumericKeyPress = (e) => {
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'Enter', 'Backspace', 'Check', 'Minus'];
    if (validKeys.includes(e.key)) {
      if (activeInput !== null && e.key !== 'Backspace') {
        const inputValue = inputValues[activeInput];
        if (inputValue.length < 7) {
          setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [activeInput]: inputValue + e.key,
          }));
        }
      }
    } else {
      e.preventDefault();
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const offsetX = e.clientX - dragStartX;
      const offsetY = e.clientY - dragStartY;

      const maxLeft = window.innerWidth - 240; // Adjust the value based on your keypad's width
      const maxTop = window.innerHeight - 200; // Adjust the value based on your keypad's height
      const minLeft = 0;
      const minTop = 0;

      // Calculate the new positions for keypadLeft and keypadTop
      let newLeft = keypadLeft - offsetX; // Subtract offsetX here
      let newTop = keypadTop - offsetY; // Subtract offsetY here

      // Ensure the keypad does not go outside the screen boundaries
      newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
      newTop = Math.max(minTop, Math.min(newTop, maxTop));

      // Update the dragStartX and dragStartY to the current mouse position
      setDragStartX(e.clientX);
      setDragStartY(e.clientY);

      // Update the keypad position
      setKeypadLeft(newLeft);
      setKeypadTop(newTop);
    }
  };


  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const offsetX = e.touches[0].clientX - dragStartX;
      const offsetY = e.touches[0].clientY - dragStartY;
      setKeypadLeft((prevLeft) => {
        const newLeft = prevLeft - offsetX; // Subtract offsetX here
        return Math.max(0, Math.min(newLeft, window.innerWidth - 240));
      });
      setKeypadTop((prevTop) => {
        const newTop = prevTop - offsetY; // Subtract offsetY here
        return Math.max(0, Math.min(newTop, window.innerHeight - 213));
      });
      setDragStartX(e.touches[0].clientX);
      setDragStartY(e.touches[0].clientY);
    }
  };


  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="numeric-keypad"
      style={{ bottom: keypadTop, right: keypadLeft }}
      onKeyDown={handleNumericKeyPress}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="numeric-row">
        <button className="Numer-Key" onClick={() => handleButtonClick(1)}>1</button>
        <button className="Numer-Key" onClick={() => handleButtonClick(2)}>2</button>
        <button className="Numer-Key" onClick={() => handleButtonClick(3)}>3</button>
      </div>
      <div className="numeric-row">
        <button className="Numer-Key" onClick={() => handleButtonClick(4)}>4</button>
        <button className="Numer-Key" onClick={() => handleButtonClick(5)}>5</button>
        <button className="Numer-Key" onClick={() => handleButtonClick(6)}>6</button>
      </div>
      <div className="numeric-row">
        <button className="Numer-Key" onClick={() => handleButtonClick(7)}>7</button>
        <button className="Numer-Key" onClick={() => handleButtonClick(8)}>8</button>
        <button className="Numer-Key" onClick={() => handleButtonClick(9)}>9</button>
      </div>
      <div className="numeric-row">
        <button className="Numer-Key" onClick={() => handleButtonClick('.')}>.</button>
        <button className="Numer-Key" onClick={() => handleButtonClick(0)}>0</button>
        <button className='Numer-Key' onClick={() => handleButtonClick('-')}><HiMinus /></button>
      </div>
      <div className="numeric-row">
        <button className="Numer-Key" onClick={() => handleButtonClick('Enter')}><MdOutlineKeyboardReturn /></button>
        <button className="Numer-Key" onClick={handleBackspaceClick}><MdOutlineKeyboardBackspace /></button>
        <button className="Numer-Key" onClick={() => handleButtonClick('Check')}><FcCheckmark /></button>
      </div>
    </div>
  );
}

export default NumericKeypad;
