import React from "react";
import "./keypad.css";
import {
  MdOutlineKeyboardTab,
  MdOutlineKeyboardBackspace,
  MdOutlineKeyboardCapslock,
  MdOutlineKeyboardReturn,
  MdOutlineSpaceBar,
} from "react-icons/md";

export default function Keypad({
  enteredText,
  setEnteredText,
  handleKeypadInput,
  handleKeypadEnter,
  isCapsLockPressed,
  toggleCapsLock,
}) {
  const keypadRows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "ß", "´"],
    ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü", "+"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä", "#"],
    ["<", "y", "x", "c", "v", "b", "n", "m", ",", ".", "-", "_"],
  ];

  const handleKeypadBackspace = () => {
    const updatedText = enteredText.slice(0, -1);
    setEnteredText(updatedText);
  };

  const handleKeypadTab = () => {
    const updatedText = enteredText + "    ";
    setEnteredText(updatedText);
  };

  const handleKeypadSpace = () => {
    const updatedText = enteredText + " ";
    setEnteredText(updatedText);
  };

  return (
    <div className="keyboard-container">
      <div className="keypad">
        <div className="keypad-buttons">
          {keypadRows.map((row, index) => (
            <div key={index} className="keypad-row">
              {row.map((value) => (
                <button
                  key={value}
                  className={`keypad-button ${value === " " ? "space" : ""}`}
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
                  <MdOutlineKeyboardBackspace />
                </button>
              )}
              {index === 1 && (
                <button className="keypad-button" onClick={handleKeypadTab}>
                  <MdOutlineKeyboardTab />
                </button>
              )}
              {index === 2 && (
                <button className="keypad-button" onClick={handleKeypadEnter}>
                  <MdOutlineKeyboardReturn />
                </button>
              )}
              {index === 3 && (
                <button className="keypad-button" onClick={toggleCapsLock}>
                  <MdOutlineKeyboardCapslock />
                </button>
              )}
            </div>
          ))}
          <div className="keypad-row">
            <button className="keypad-button" onClick={handleKeypadSpace}>
              <MdOutlineSpaceBar />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
