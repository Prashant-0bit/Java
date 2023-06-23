import React, { useState } from "react";
import "./MainFunc.css";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import {LuSpace} from "react-icons/lu";
import {MdOutlineKeyboardReturn, MdKeyboardTab} from "react-icons/md";
import {BsFillCapslockFill} from "react-icons/bs";
import {FaBackspace} from "react-icons/fa";
import {HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight} from "react-icons/hi"

export default function User() {
  const [isKeypadOpen, setIsKeypadOpen] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [mode, setMode] = useState("");
  const [lastButtonPressed, setLastButtonPressed] = useState("");
  const [isCapsLockPressed, setIsCapsLockPressed] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (button) => {
    if (button === lastButtonPressed) {
      setIsKeypadOpen((prevState) => !prevState);
    } else {
      setIsKeypadOpen(true);
    }
    setLastButtonPressed(button);
    setSelectedButton(button);
  };

  const handleKeypadCapsLock = () => {
    setIsCapsLockPressed((prevState) => !prevState);
  };

  const handleKeypadInput = (value) => {
    const character = isCapsLockPressed ? value.toUpperCase() : value;
    setEnteredPassword((prevPassword) => prevPassword + character);
  };

  const handleKeypadEnter = () => {
    if (enteredPassword === "1234") {
      setIsKeypadOpen(false);
      setEnteredPassword("");
      setMode(lastButtonPressed);
    } else {
      setEnteredPassword("");
    }
  };

  const handleKeypadBackspace = () => {
    setEnteredPassword((prevPassword) => prevPassword.slice(0, -1));
  };


  const keypadRows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "ß", "´"],
    ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü", "+"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä", "#"],
    ["<", "y", "x", "c", "v", "b", "n", "m", ",", ".", "-"],
  ];

  return (
    <div className="backgn">
      <div className="user-buttons">
      <button
          className={`main-func ${selectedButton === "manual" ? "selected" : ""}`}
          onClick={() => handleButtonClick("manual")}
        >
          Manual
        </button>
        <button
          className={`main-func ${selectedButton === "testing" ? "selected" : ""}`}
          onClick={() => handleButtonClick("testing")}
        >
          Testing
        </button>
        <button
          className={`main-func ${selectedButton === "operator" ? "selected" : ""}`}
          onClick={() => handleButtonClick("operator")}
        >
          Operator
        </button>
        <button
          className={`main-func ${selectedButton === "safety maintenance" ? "selected" : ""}`}
          onClick={() => handleButtonClick("safety maintenance")}
        >
          Safety
        </button>
        <button
          className={`main-func ${selectedButton === "administrator" ? "selected" : ""}`}
          onClick={() => handleButtonClick("administrator")}
        >
          Administrator
        </button>
      </div>


      {/* Display password */} 
      {isKeypadOpen && (
        <div className="keyboard-container">
          <div className="keypad">
            <div className="password-input-container">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="name"
                name="name"
                required
                minLength="4"
                autoComplete="none"
                className="password-input"
                value={enteredPassword}
                readOnly
              />
              {isPasswordVisible && <div className="cursor"/> ? (
                <VscEyeClosed className="visibility-icon" onClick={() => setIsPasswordVisible(false)} />
              ) : (
                <VscEye className="visibility-icon" onClick={() => setIsPasswordVisible(true)} />
              )}
            </div>


            {/* Display keypad with buttons */}
            <div className="keypad-buttons">
              {keypadRows.map((row, index) => (
                <div key={index} className="keypad-row">
                  {row.map((value) => (
                    <button
                      key={value}
                      className={`keypad-button ${value === "Space" ? "space" : ""}`}
                      onClick={() => handleKeypadInput(value)}
                    >
                      {isCapsLockPressed ? value.toUpperCase() : value}
                    </button>
                  ))}
                  {index === 0 && (
                    <button
                      onClick={handleKeypadBackspace}
                      className="keypad-button"
                    >
                      <FaBackspace />
                    </button>
                  )}
                  {index === 1 && (
                    <button className="keypad-button">
                      <MdKeyboardTab className="tabKey" />
                    </button>
                  )}
                   {index === 2 && (
                    <button className="keypad-button" onClick={handleKeypadEnter}>
                    <MdOutlineKeyboardReturn className="enterKey"/>
                  </button>
                  )}
                  {index === 3 && (
                    <button
                    className={`keypad-button ${isCapsLockPressed ? "capslock active" : "capslock"}`}
                    onClick={handleKeypadCapsLock}
                  >
                    <BsFillCapslockFill className="capsKey"/>
                  </button>
                  )}
                </div>
              ))} 
              
              <div className="keypad-row">
                <button className="keypad-button">
                  <LuSpace className="spaceKey" />
                </button>
                <button className="keypad-button">
                  <HiOutlineArrowNarrowLeft className="leftArrowKey" />
                </button>
                <button className="keypad-button">
                  <HiOutlineArrowNarrowRight className="rightArrowKey" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 