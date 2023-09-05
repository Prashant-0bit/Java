import React, { useState } from "react";
import "./Header.css";

export default function Message() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handlePopupOpen = (message) => {
    setIsPopupOpen(true);
    setPopupMessage(message);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };


  return (
    <>
      <div className="message">
        <div className="message-icon">
          <i
            className="fa-solid fa-circle-info status"
            style={{ color: "#2196F3" }}
          ></i>
          <i
            className="fa-solid fa-triangle-exclamation status"
            style={{ color: "#FFC107" }}
          ></i>
          <i
            className="fa-solid fa-circle-xmark status"
            style={{ color: "#F44336" }}
          ></i>
        </div>
        <button className="message-buttons" onClick={() => handlePopupOpen("This is a popup message.")}>
          {isPopupOpen ? "Normal Message" : "This is popup"}
        </button>
        <div className="acknowledge-button">
          <button type="button" className=" acknowledge-ok">
            OK
          </button>
          <button
            type="button"
            className=" acknowledge-confirm"
          >
            Confirm All
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <>
          <div className="popup-backdrop" onClick={handlePopupClose}></div>
          <div className="message-popup">
            <div className="popup-content">
              <p className="message-display">{popupMessage}</p>
              <div className="message-divider" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
