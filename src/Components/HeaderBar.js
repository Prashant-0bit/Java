import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DiscreteSliderMarks from './Slider';
import Logo_Mairotec_weiss from './Logo_Mairotec_weiss.png';
import ToolPopup from './ToolPopup';

export default function HeaderBar({ dateTime }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [sliderVisible, setSliderVisible] = useState(false);
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [sButtonActive, setSButtonActive] = useState(false);
  const [hasError, setHasError] = useState(false);

  const togglePopup = () => {
    setPopupVisible((prevVisible) => !prevVisible);
  };

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleSelectTool = (toolName) => {
    setSelectedTool(toolName);
  };

  const handleSliderToggle = () => {
    setSliderVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sliderRef.current && !sliderRef.current.contains(e.target)) {
        setSliderVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSButton = () => {
    if (!hasError) {
      setSButtonActive(true);
    }
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
      <div className={isActive ? 'active' : ''}>
        {to === '/mode' ? (
          <div className={`mode-dropdown ${dropdownOpen ? 'open' : ''}`}>
            <button className="btn btn mode-popup-button" onClick={handleMenuToggle}>
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
      </div>
    );
  }

  return (
    <>
      <nav className="navbar navbar-expand-md bg-body-tertiary mt-0" data-bs-theme="dark">
        <div className="container-fluid">
          {/* HMI-ICON */}
          <button className="navbar-brand text" onClick={() => navigate("/")}>
            <img src={Logo_Mairotec_weiss} alt='Logo' className='LogoIcon' />
            MAIRobot
          </button>
          <ul className="navbar-nav">
            <button
              type="button"
              className={`header-icon-active ${sButtonActive ? 'active' : ''} ${hasError ? 'error' : ''}`}
              onClick={handleSButton}
              disabled={sButtonActive || hasError}
            >
              S
            </button>

            <button type="button" className=" header-icon-active"> O
            </button>
            <button type="button" className=" header-icon-active"> R
            </button>
            
            <button className='tool-base-button ' onClick={togglePopup}>TB</button>
            {popupVisible && (
        <ToolPopup onClose={closePopup} onSelectTool={handleSelectTool} />
      )}
            {/* Mode Selection */}
            <CustomLink className="nav-link" to="/mode">
              <button type="button" className="btn btn header-icon">
              </button>
            </CustomLink>
            {/* Slider control */}
            <li className="nav-item">
              <CustomLink className="nav-link" to="/slider" handleClick={handleSliderToggle}>
                <i className="fa-solid fa-play header-icon">
                </i>
              </CustomLink>
            </li>
            {/* USER */}
            <li className="nav-item">
              <button type="button" className="nav-link btn btn logo" onClick={() => navigate("users")}>
                <i className="fa-solid fa-user header-icon"></i>
              </button>
            </li>
            {/* SETTING */}
            <li className="nav-item">
              <button type="button" className="nav-link btn btn logo" onClick={() => navigate("settings")}>
                <i className="fa-solid fa-gear header-icon"></i>
              </button>
            </li>
            <p>{dateTime}</p>
          </ul>
        </div>
      </nav>

      {/* Slider Container */}
      {sliderVisible && (
        <div ref={sliderRef}>
          <DiscreteSliderMarks onClose={handleSliderToggle} />
        </div>
      )}

    </>

  );
}
