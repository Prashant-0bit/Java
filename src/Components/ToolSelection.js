import React, { useState } from 'react';
import Keypad from './SubComponents/Keyboard';
import { HiPencil } from 'react-icons/hi';

function ToolSelection() {
  const [showMenu, setShowMenu] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const [enteredText, setEnteredText] = useState('');
  const [toolNames, setToolNames] = useState([...Array(16)].map((_, index) => ({
    name: `Undefined [${index}]`,
    x: '',
    y: '',
    z: '',
    a: '',
    b: '',
    c: '',
    jx: '',
    jy: '',
    jz: '',
    load: '',
  })));
  const [selectedToolIndex, setSelectedToolIndex] = useState(null);
  const [selectedToolInfo, setSelectedToolInfo] = useState(null);

  const handleRename = (index, name) => {
    const updatedToolNames = [...toolNames];
    updatedToolNames[index].name = name;
    setToolNames(updatedToolNames);
  };

  const handleToggleMenu = (index) => {
    if (showMenu && selectedToolIndex === index) {
      // Close the menu if it is already open and the clicked index matches the selected tool index
      setShowMenu(false);
    } else {
      // Open the menu and update the selected tool index
      setSelectedToolIndex(index);
      setShowMenu(true);
    }
  };

  const handleToggleKeypad = () => {
    setShowKeypad(!showKeypad);
  };

  const handleKeypadInput = (value) => {
    // Handle only numeric inputs
    if (!isNaN(value)) {
      setEnteredText(enteredText + value);
    }
  };

  const handleKeypadEnter = () => {
    // Handle the enter action if needed
    // For example, you can submit the entered text here
  };

  const handleClearEnteredText = () => {
    setEnteredText('');
  };

  const handleSelectTool = (index) => {
    const toolInfo = toolNames[index];
    setSelectedToolIndex(index);
    setSelectedToolInfo(toolInfo);
    setShowKeypad(true);
    setShowMenu(false); // Close the menu after selecting a tool
  };

  const handleInputChange = (e, field) => {
    if (selectedToolInfo) {
      const value = e.target.value;
      const validValue = value.replace(/[^0-9.]/g, '').slice(0, 7);
      const updatedToolInfo = { ...selectedToolInfo };
      updatedToolInfo[field] = validValue;
      setSelectedToolInfo(updatedToolInfo);
    }
  };

  return (
      <div className='Tool-container'>
        <div className='Dropdown'>
          <button
            className="dropdown-toggle"
            onClick={() => setShowMenu(!showMenu)}
            aria-expanded={showMenu}
          >
            Tool Selection
          </button>
        </div>
        {showMenu && (
          <ul className="dropdown-menu dropdown-menu-dark show" onClick={(e) => e.stopPropagation()}>
            <div className="dropdown-menu-scroll">
              {[...Array(16)].map((_, index) => (
                <React.Fragment key={index}>
                  <li className="tool-selection">
                    <button
                      className="tool-button"
                      onClick={() => handleSelectTool(index)}
                    >
                      <div className="tool-name">{toolNames[index].name}</div>
                    </button>
                    <div className="tool-options">
                      <HiPencil
                        className="pencil-icon"
                        onClick={() => handleRename(index, 'New Name')}
                      />
                    </div>
                  </li>
                  <div className="divider" />
                </React.Fragment>
              ))}
            </div>
          </ul>
        )}
        <div className="selected-tool-info">
          <h5 className='Tool-info'>Selected Tool Information</h5>
          <div className="tool-data">
            <div className='tool-container'>
              <div className='selected-tool-name'>
                Tool Name: {selectedToolIndex !== null ? toolNames[selectedToolIndex].name : ''}
              </div>
              <div className='load-data'>
                Tool Load: <input
                  id='load'
                  type="text"
                  value={selectedToolInfo ? selectedToolInfo.load : enteredText}
                  onChange={(e) => handleInputChange(e, 'load')}
                  placeholder='kg'
                  onFocus={handleToggleKeypad}
                  onBlur={handleToggleKeypad}
                />
              </div>
            </div>
            <div className='tool-input-data'>
              <div className='tool-column'>
                <div className='tool-data-container'>
                  <span className='tool-data-name'>
                    X:
                  </span>
                  <input id='x' type="text" value={selectedToolInfo ? selectedToolInfo.x : ''} onChange={(e) => handleInputChange(e, 'x')} placeholder='mm' />
                </div>
                <div className='tool-data-container'>
                  <span className='tool-data-name'>
                    Y:
                  </span>
                  <input id='y' type="text" value={selectedToolInfo ? selectedToolInfo.y : ''} onChange={(e) => handleInputChange(e, 'y')} placeholder='mm' />
                </div>
                <div className='tool-data-container'>
                  <span className='tool-data-name'>
                    Z:
                  </span>
                  <input id='z' type="text" value={selectedToolInfo ? selectedToolInfo.z : ''} onChange={(e) => handleInputChange(e, 'z')} placeholder='mm' />
                </div>
              </div>
              <div className='tool-column'>
                <div className='tool-data-container'>
                  <span className='tool-data-name'>
                    A:
                  </span>
                  <input id='a' type="text" value={selectedToolInfo ? selectedToolInfo.a : ''} onChange={(e) => handleInputChange(e, 'a')} placeholder='°' />
                </div>
                <div className='tool-data-container'>
                  <span className='tool-data-name'>
                    B:
                  </span>
                  <input id='b' type="text" value={selectedToolInfo ? selectedToolInfo.b : ''} onChange={(e) => handleInputChange(e, 'b')} placeholder='°' />
                </div>
                <div className='tool-data-container'>
                  <span className='tool-data-name'>
                    C:
                  </span>
                  <input id='c' type="text" value={selectedToolInfo ? selectedToolInfo.c : ''} onChange={(e) => handleInputChange(e, 'c')} placeholder='°' />
                </div>
              </div>
              <div className='tool-column'>
                <div className='tool-data-container'>
                  <span className='tool-data-name'>
                    JX:
                  </span>
                  <input id='jx' type="text" value={selectedToolInfo ? selectedToolInfo.jx : ''} onChange={(e) => handleInputChange(e, 'jx')} placeholder='kgm²' />
                </div>
                <div className='tool-data-container'>
                  <span className='tool-data-name'>
                    JY:
                  </span>
                  <input id='jy' type="text" value={selectedToolInfo ? selectedToolInfo.jy : ''} onChange={(e) => handleInputChange(e, 'jy')} placeholder='kgm²' />
                </div>
                <div className='tool-data-container'>
                  <span className='tool-data-name'>
                    JZ:
                  </span>
                  <input id='jz' type="text" value={selectedToolInfo ? selectedToolInfo.jz : ''} onChange={(e) => handleInputChange(e, 'jz')} placeholder='kgm²' />
                </div>
              </div>
            </div>
          </div>
        </div>
      
      {showKeypad && (
        <div className='.keypad-wrapper' >
          <Keypad
            enteredText={enteredText}
            setEnteredText={setEnteredText}
            handleKeypadInput={handleKeypadInput}
            handleKeypadEnter={handleKeypadEnter}
            handleClearEnteredText={handleClearEnteredText}
          />
        </div>
      )}
      </div>
  );
}

export default ToolSelection;
