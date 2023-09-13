// ToolNameContext.js
import React, { createContext, useContext, useState } from 'react';

const ToolNameContext = createContext();

export function ToolNameProvider({ children }) {
  const [selectedToolName, setSelectedToolName] = useState('');

  const updateToolName = (newName) => {
    console.log('Updating tool name:', newName);
    setSelectedToolName(newName);
  };

  return (
    <ToolNameContext.Provider value={{ selectedToolName, updateToolName}}>
      {children}
    </ToolNameContext.Provider>
  );
}

export function useToolName() {
  return useContext(ToolNameContext);
}
