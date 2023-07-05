import React, { useState } from 'react';
import Keypad from './SubComponents/Keyboard';
import { HiPencil } from 'react-icons/hi';

function ToolSelection() {
  const [showMenu, setShowMenu] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [toolNames, setToolNames] = useState(Array(16).fill('Undefined'));
  const [selectedToolIndex, setSelectedToolIndex] = useState(null);

  const handleRename = (index, name) => {
    // Logic to handle renaming the tool at the given index with the provided name
    const updatedToolNames = [...toolNames];
    updatedToolNames[index] = name;
    setToolNames(updatedToolNames);
  };

  const handleToggleMenu = (index) => {
    setSelectedToolIndex(index);
    setShowMenu(!showMenu);
  };

  const handleToggleKeyboard = (index) => {
    setSelectedToolIndex(index);
    setShowKeyboard(!showKeyboard);
  };

  return (
    <div className='Dropdown'>
      <button
        className="btn btn-dark dropdown-toggle"
        onClick={() => handleToggleMenu(null)}
        aria-expanded={showMenu}
      >
        Tool Selection
      </button>
      {showMenu && (
        <ul className="dropdown-menu dropdown-menu-dark show" onClick={(e) => e.stopPropagation()}>
          <div className="dropdown-menu-scroll">
            {[...Array(16)].map((_, index) => (
              <>
              <li className="tool-selection" key={index}>
                <button
                  className="tool-button"
                  onClick={() => handleToggleMenu(index)}
                >
                  {toolNames[index]}
                </button>
                <div className="tool-options">
                  {showKeyboard && selectedToolIndex === index && (
                    <div className="keypad-container">
                      <Keypad
                        enteredText={toolNames[index]}
                        setEnteredText={(name) => handleRename(index, name)}
                        handleKeypadInput={() => {}}
                        handleKeypadEnter={() => {}}
                        isCapsLockPressed={false}
                        toggleCapsLock={() => {}}
                      />
                    </div>
                  )}
                  <HiPencil
                    className="pencil-icon"
                    onClick={() => handleToggleKeyboard(index)}
                  />
                </div>
              </li>
              <div className="divider" />
              </>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
}

export default ToolSelection;
