import React, { useState } from "react";
import "./robotmotion.css";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate, Outlet} from "react-router-dom";
import axios from "axios";

function RobotMotion() {
  const [isPowerOn, setIsPowerOn] = useState(false);
  const [activeButton, setActiveButton] = useState(""); // Track the active button
  const navigate = useNavigate();

  const handlePowerButtonClick = () => {
    axios
      .post("/api/power", { isPowerOn: !isPowerOn })
      .then((res) => {
        setIsPowerOn(res.data.success ? !isPowerOn : isPowerOn);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleButtonSelection = (buttonName) => {
    setActiveButton(buttonName);
    navigate(buttonName); // Navigate to the corresponding path
  };

  return (
    <>
      <div className="robotmotion-container">
        <button
          type="button"
          className={`power-button ${isPowerOn ? "on" : "off"}`}
          onClick={handlePowerButtonClick}
        >
          <FaPowerOff className="power-icon" />
        </button>
        <div className="robot-container">
          <div className="button-container">
            <button
              type="button"
              className={`actual-position ${activeButton === "actual-position" ? "active" : ""}`}
              onClick={() => handleButtonSelection("actual-position")}
            >
              Jog Robot
            </button>
            <button
              type="button"
              className={`home-position ${activeButton === "home-position" ? "active" : ""}`}
              onClick={() => handleButtonSelection("home-position")}
            >
              Program
            </button>
            <button
              type="button"
              className={`base-system ${activeButton === "base-selection" ? "active" : ""}`}
              onClick={() => handleButtonSelection("base-selection")}
            >
              Base Selection
            </button>
            <button
              type="button"
              className={`tool-system ${activeButton === "tool-selection" ? "active" : ""}`}
              onClick={() => handleButtonSelection("tool-selection")}
            >
              Tool Selection
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default RobotMotion;
