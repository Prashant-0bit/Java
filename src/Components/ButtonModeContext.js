// ButtonModeContext.js
import React, { createContext, useContext, useState } from 'react';

const ButtonModeContext = createContext();

export const useButtonMode = () => useContext(ButtonModeContext);

export const ButtonModeProvider = ({ children }) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [mode, setMode] = useState('');

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const handleSetMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <ButtonModeContext.Provider
      value={{
        selectedButton,
        mode,
        handleButtonClick,
        handleSetMode,
      }}
    >
      {children}
    </ButtonModeContext.Provider>
  );
};
