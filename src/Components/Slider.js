import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './Header.css';

export default function DiscreteSliderMarks() {
  const [value, setValue] = useState(50);
  const [isOpen, setIsOpen] = useState(false);
  const sliderRef = useRef(null);

  const handleMinusClick = () => {
    setValue((prevValue) => Math.max(0, prevValue - 1));
  };

  const handlePlusClick = () => {
    setValue((prevValue) => Math.min(100, prevValue + 1));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSliderMouseDown = () => {
    setIsOpen(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event) => {
    if (sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      const offsetX = event.clientX - left;
      const percent = (offsetX / width) * 100;
      setValue(Math.round(percent));
    }
  };

  const handleMouseUp = () => {
    setIsOpen(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleClickOutside = (event) => {
    if (sliderRef.current && !sliderRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`slider-container ${isOpen ? 'open' : ''}`} ref={sliderRef}>
      <div className='slider-header'>Velocity</div>
      <div className='slider-content'>
        <Box sx={{ width: 200, margin: 'auto', paddingTop: '1rem', alignContent: 'center' }}>
          <Slider
            value={value}
            onChange={handleChange}
            className='custom-slider'
            onMouseDown={handleSliderMouseDown}
          />
        </Box>
        <div className='slider-controls'>
          <button
            className='slider-control1'
            onClick={handleMinusClick}
            disabled={value === 0}
          >
            <i className='fa-solid fa-minus control-icon'></i>
          </button>

          <h3 className='slider-value'>{value}</h3>

          <button
            className='slider-control2'
            onClick={handlePlusClick}
            disabled={value === 100}
          >
            <i className='fa-solid fa-plus control-icon'></i>
          </button>
        </div>
      </div>
    </div>
  );
}
