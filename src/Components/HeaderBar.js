import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import DiscreteSliderMarks from './Slider';
import TimePicker from './TimePicker';
import Logo_Mairotec_weiss from './Logo_Mairotec_weiss.png';

export default function HeaderBar() {
  const [sliderVisible, setSliderVisible] = useState(false);

  const handleSliderToggle = () => {
    setSliderVisible((prevVisible) => !prevVisible);
  };

  return (
    <>
      <nav className="navbar navbar-expand-md bg-body-tertiary mt-0" data-bs-theme="dark">
        <div className="container-fluid">
          {/* HMI-ICON */}
          <Link className="navbar-brand text" to="/">
          <img src={Logo_Mairotec_weiss} alt='Logo' className='LogoIcon'/>
            MAIRobot
          </Link>
          <ul className="navbar-nav">
            {/* Mode Selection */}
            <li className="nav-item">
              <CustomLink className="nav-link" to="/mode">
                <button type="button" className="btn btn header-icon">
                </button>
              </CustomLink>
            </li>
            {/* Slider control */}
            <li className="nav-item">
              <CustomLink className="nav-link" to="/slider" handleClick={handleSliderToggle}>
                <i className="fa-solid fa-play header-icon">
                  </i>
              </CustomLink>
            </li>
            {/* USER */}
            <li className="nav-item">
              <CustomLink className="nav-link" to="/users">
                <button type="button" className="btn btn logo">
                  <i className="fa-solid fa-user header-icon"></i>
                </button>
              </CustomLink>
            </li>
            {/* SETTING */}
            <li className="nav-item">
              <CustomLink className="nav-link" to="/settings">
                <button type="button" className="btn btn logo">
                  <i className="fa-solid fa-gear header-icon"></i>
                </button>
              </CustomLink>
            </li>
            <TimePicker />
          </ul>
        </div>
      </nav>

      <div className="header-content">
        {/* Message */}
        <div className="message">
          <div className='message-icon'>
          <i className="fa-solid fa-circle-info status" style={{ color: '#2196F3' }}></i>
          <i className="fa-solid fa-triangle-exclamation status" style={{ color: '#FFC107' }}></i>
          <i className="fa-solid fa-circle-xmark status" style={{ color: '#F44336' }}></i>
          </div>
        </div>
      </div>

      <div
        style={{
          background: 'black',
          height: '15px',
        }}
      />

      {/* Slider Container */}
      {sliderVisible && (
        <div className="slider-container">
          <DiscreteSliderMarks onClose={handleSliderToggle} />
        </div>
      )}
    </>
  );
}

function CustomLink({ to, children, handleClick }) {
  const location = useLocation();
  const [selectedMode, setSelectedMode] = useState('T1');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const isActive = location.pathname === to;

  const handleMenuToggle = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
    setActiveButton(null);
  };

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setDropdownOpen(false);
  };

  const handleLinkClick = () => {
    if (handleClick) {
      handleClick();
    }
    setDropdownOpen(false);
    setActiveButton(null);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.mode-dropdown')) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleClick]);

  return (
    <li className={isActive ? 'active' : ''}>
      {to === '/mode' ? (
        <div className={`mode-dropdown ${dropdownOpen ? 'open' : ''}`}>
          <button className="btn btn logo" onClick={handleMenuToggle}>
            {selectedMode}
          </button>
          <div className="mode-menu">
            <button
              className={`mode-item${selectedMode === 'T1' ? ' active' : ''}`}
              onClick={() => handleModeSelect('T1')}
            >
              T1
            </button>
            <button
              className={`mode-item${selectedMode === 'T2' ? ' active' : ''}`}
              onClick={() => handleModeSelect('T2')}
            >
              T2
            </button>
            <button
              className={`mode-item${selectedMode === 'Aut' ? ' active' : ''}`}
              onClick={() => handleModeSelect('Aut')}
            >
              Aut
            </button>
            <button
              className={`mode-item${selectedMode === 'Ext' ? ' active' : ''}`}
              onClick={() => handleModeSelect('Ext')}
            >
              Ext
            </button>
          </div>
        </div>
      ) : (
        <>
          {to === '/slider' ? (
            <button
              className={`btn btn logo ${dropdownOpen ? 'open' : ''} ${activeButton === 'slider' ? '' : 'active'}`}
              onClick={handleLinkClick}
              onBlur={handleOutsideClick}
            >
              {children}
            </button>
          ) : (
            <Link to={to} activeclassname={isActive ? 'active' : ''} onClick={() => setActiveButton(null)}>
              {children}
            </Link>
          )}
        </>
      )}
    </li>
  );
}
