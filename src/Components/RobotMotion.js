import React, { useState } from "react";
import "./robotmotion.css";
import { FaPowerOff } from 'react-icons/fa';
import { useNavigate, Outlet} from "react-router-dom";

function RobotMotion() {
  const [isPowerOn, setIsPowerOn] = useState(false);
  const navigate = useNavigate();

  const handlePowerButtonClick = () => {
    setIsPowerOn((prevIsPowerOn) => !prevIsPowerOn);
  }

  return (
    <>
      <div className="robotmotion-container">
        <button type='button'
          className={`power-button ${isPowerOn ? "on" : "off"}`}
          onClick={handlePowerButtonClick}>
          <FaPowerOff className="power-icon" />
        </button>
        <div className="robot-container">
          <button
            type="button"
            className="btn btn-light actual-position"
            onClick={() => navigate('actual-position')}
          >
            Actual Position
          </button>
          <button
            type="button"
            className="btn btn-light home-position"
            onClick={() => navigate('home-position')}>
            Home Position
          </button>
          <button
            type="button"
            className="btn btn-light base-system"
            onClick={() => navigate('base-selection')}>
            Base Selection
          </button>
          <button 
          type="button" 
          className="btn btn-light tool-system"
          onClick={() => navigate('tool-selection')}>
            Tool Selection
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
}
export default RobotMotion