import React, { useState, useRef, useEffect } from 'react';
import './RightComp.css';
import robotArmImage from './RobotCoordinate.svg';
import {LuAxis3D} from 'react-icons/lu';

const RightComp = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const [sidebarHeight, setSidebarHeight] = useState(window.innerHeight - 172); // Subtract the height of the navbar
  const [sidebarLabels, setSidebarLabels] = useState(['X', 'Y', 'Z', 'A', 'B', 'C']);
  const [isAxisSelected, setIsAxisSelected] = useState(false);

  const handleResize = () => {
    setSidebarHeight(window.innerHeight - 172); // Subtract the height of the navbar
  };

  const handleIconClick = () => {
    setShowMenu((prevState) => !prevState);
  };

  const handleIconSelection = (icon) => {
    if (selectedIcon !== icon) {
      setSelectedIcon(icon);
      if (icon === 'axis') {
        setSidebarLabels(['A1', 'A2', 'A3', 'A4', 'A5', 'A6']); // Change the sidebar labels when "Axis" button is pressed
      } else {
        setSidebarLabels(['X', 'Y', 'Z', 'A', 'B', 'C']); // Reset the sidebar labels to default when another button is pressed
      }
    }
    setShowMenu(false);
  };

  const renderIcon = (icon, name) => {
    return (
      <button
        className={`icon-button ${selectedIcon === icon ? 'selected' : ''}`}
        onClick={() => handleIconSelection(icon, name)}
      >
        <i className={`fa-solid ${icon} icon`}></i>
      </button>
    );
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="right-component">
      <div className="icon-menu-container" ref={menuRef}>
        <button className="coordinate-button" onClick={handleIconClick}>
          {selectedIcon ? (
            selectedIcon === 'axis' ? (
              <LuAxis3D className="coordinate-icon clicked" />
            ) : (
              <i className={`fa-solid ${selectedIcon} coordinate-icon clicked`}></i>
            )
          ) : (
            <i className="fa-solid fa-earth-americas coordinate-icon"></i>
          )}
        </button>
        {showMenu && (
          <div className="icon-menu">
            <span className="header-coordinate">Coordinates system</span>
            <button
              className={`icon-button ${selectedIcon === 'axis' ? 'selected' : ''}`}
              onClick={() => handleIconSelection('axis', 'Axis Coordinate')}
            >
              <LuAxis3D/>
            </button>
            <p className="coordinate-name">Axis</p>
            {renderIcon('fa-earth-americas', 'World Coordinate')}
            <p className="coordinate-name">World</p>
            {renderIcon('fa-wrench', 'Tool Coordinate')}
            <p className="coordinate-name">Tools</p>
            {renderIcon('fa-layer-group', 'Base Coordinate')}
            <p className="coordinate-name">Base</p>
          </div>
        )}
        <div className={`sidebar ${isAxisSelected ? 'axis' : ''}`} style={{ height: sidebarHeight }}>
          {sidebarLabels.map((label) => (
            <span className="coordinates" key={label}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightComp;
