import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import "./Header.css";

export default function Message() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isOKButtonClicked, setIsOKButtonClicked] = useState(false);
  const [isConfirmButtonClicked, setIsConfirmButtonClicked] = useState(false);
  const { t } = useTranslation();


  const handlePopupOpen = (message) => {
    setIsPopupOpen(true);
    setPopupMessage(message);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleOKButtonClick = () => {
    setIsOKButtonClicked(true);
  };

  const handleConfirmButtonClick = () => {
    setIsConfirmButtonClicked(true);
  };

  // Add mouseup event listeners to reset button states
  useEffect(() => {
    const resetButtonStates = () => {
      setIsOKButtonClicked(false);
      setIsConfirmButtonClicked(false);
    };
    document.addEventListener("mouseup", resetButtonStates);

    return () => {
      document.removeEventListener("mouseup", resetButtonStates);
    };
  }, []);


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
        <button
            type="button"
            className={`acknowledge-ok ${isOKButtonClicked ? "clicked" : ""}`}
            onClick={handleOKButtonClick}
          >
            OK
          </button>
          <button
            type="button"
            className={`acknowledge-confirm ${isConfirmButtonClicked ? "clicked" : ""}`}
            onClick={handleConfirmButtonClick}
          >
            {t('Confirm All')}
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <>
          <div className="popup-backdrop" onClick={handlePopupClose}></div>
          <div className="message-popup">
            <div className="popup-content">
              <p className="message-display">{popupMessage}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
