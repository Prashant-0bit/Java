import React, { useState } from "react";
import "./robotmotion.css";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";

function RobotMotion() {
  const [isPowerOn, setIsPowerOn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
              className={`actual-position ${location.pathname === "/actual-position" ? "active" : ""}`}
              onClick={() => navigate("actual-position")}
            >
              Actual Position
            </button>
            <button
              type="button"
              className={`home-position ${location.pathname === "/home-position" ? "active" : ""}`}
              onClick={() => navigate("home-position")}
            >
              Home Position
            </button>
            <button
              type="button"
              className={`base-system ${location.pathname === "/base-selection" ? "active" : ""}`}
              onClick={() => navigate("base-selection")}
            >
              Base Selection
            </button>
            <button
              type="button"
              className={`tool-system ${location.pathname === "/tool-selection" ? "active" : ""}`}
              onClick={() => navigate("tool-selection")}
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
