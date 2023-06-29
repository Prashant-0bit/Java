import React from "react";
import './robotmotion.css'

export default function RobotMotion() {
  return (
    <div className="robot-container">
      <button type="button" className="btn btn-light actual-position">Actual Position</button>
      <button type="button" className="btn btn-light home-position">Home Position</button>
      <button type="button" className="btn btn-light base-system">Base Coordinate System</button>
      <button type="button" className="btn btn-light tool-system">Tool Coordinate System</button>

    </div>
  )
}
