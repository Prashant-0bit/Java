import React, { useState } from "react";
import "./robotmotion.css";
import {FaPowerOff} from 'react-icons/fa';

export default function RobotMotion() {
  const [showContent, setShowContent] = useState(false);
  const [isPowerOn, setIsPowerOn] = useState(false);

  const handlePowerButtonClick = () => {
    setIsPowerOn((prevIsPowerOn) => !prevIsPowerOn);
    setShowContent(false);
  }

  const handleActualPositionClick = () => {
    setShowContent(true);
  };

  return (
    <div className="robotmotion-container">
      <button type='button' 
      className={`power-button ${isPowerOn ? "on" : "off"}`}
      onClick={handlePowerButtonClick}>
      <FaPowerOff className="power-icon"/>
      </button>
      <div className="robot-container">
        <button
          type="button"
          className="btn btn-light actual-position"
          onClick={handleActualPositionClick}
        >
          Actual Position
        </button>
        <button type="button" className="btn btn-light home-position">
          Home Position
        </button>
        <button type="button" className="btn btn-light base-system">
          Base Coordinate System
        </button>
        <button type="button" className="btn btn-light tool-system">
          Tool Coordinate System
        </button>
      </div>
      {showContent && (
        <div className="content-container">
          <p>X</p>
          <p>Y</p>
        </div>
      )}
    </div>
  );
}
