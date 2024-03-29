import React, { useState, useRef, useEffect } from 'react';
import './MainFunc.css';
import Keypad from './SubComponents/Keyboard';
import { VscEyeClosed, VscEye } from 'react-icons/vsc';
import { useButtonMode } from './ButtonModeContext';
import { useTranslation } from 'react-i18next';


export default function User() {
  const [isKeypadOpen, setIsKeypadOpen] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [mode, setMode] = useState('');
  const [lastButtonPressed, setLastButtonPressed] = useState('');
  const [isCapsLockPressed, setIsCapsLockPressed] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const passwordInputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isKeypadOpen) {
      passwordInputRef.current.focus();
    }
  });

  const handleButtonClick = (button) => {
    if (button === lastButtonPressed) {
      setIsKeypadOpen((prevState) => !prevState);
    } else {
      setIsKeypadOpen(true);
    }
    setLastButtonPressed(button);
    setSelectedButton(button);
  };

  const handleKeypadInput = (value) => {
    const character = isCapsLockPressed ? value.toUpperCase() : value;
    setEnteredPassword((prevPassword) => prevPassword + character);
  };

  const handleKeypadEnter = () => {
    if (enteredPassword === '1234') {
      setIsKeypadOpen(false);
      setEnteredPassword('');
      setMode(lastButtonPressed);
    } else {
      setEnteredPassword('');
    }
  };

  const handleKeypadBackspace = () => {
    setEnteredPassword((prevPassword) => prevPassword.slice(0, -1));
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const keypadProps = {
    enteredText: enteredPassword,
    setEnteredText: setEnteredPassword,
    handleKeypadInput,
    handleKeypadEnter,
    handleKeypadBackspace,
    isCapsLockPressed,
    toggleCapsLock: () => setIsCapsLockPressed((prevState) => !prevState),
  };

  const keypadButtons = [
    t('Manual'),
    t('Testing'),
    t('Operator'),
    t('Safety Maintenance'),
    t('Administrator'),
  ];

  return (
      <div className="main-func-container">
        <div className="user-buttons">
          {keypadButtons.map((button) => (
            <button
              key={button}
              className={`main-func ${selectedButton === button ? 'selected' : ''}`}
              onClick={() => handleButtonClick(button)}
            >
              {button}
            </button>
          ))}
        
        <div className="user-input">
          {isKeypadOpen && (
            <div className="password-input-container">
              <input
                ref={passwordInputRef}
                id="password"
                name="password"
                autoComplete="off"
                type={isPasswordVisible ? 'text' : 'password'}
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
                placeholder="Enter password"
                className="user-password-input"
              />
              <button className="password-visibility-toggle" onClick={handleTogglePasswordVisibility}>
                {isPasswordVisible ? <VscEyeClosed /> : <VscEye />}
              </button>
            </div>
          )}
        </div>
        {isKeypadOpen && <Keypad {...keypadProps} />}
      </div>
      </div>
  );
}