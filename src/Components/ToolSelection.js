import React, { useState } from 'react';
import Keypad from './SubComponents/Keyboard';
import { HiPencil } from 'react-icons/hi';
import './robotmotion.css'

function ToolSelection() {
  const [showKeypad, setShowKeypad] = useState(false);
  const [enteredText, setEnteredText] = useState('');
  const [selectedToolIndex, setSelectedToolIndex] = useState(null);
  const [selectedToolInfo, setSelectedToolInfo] = useState(null);
  const [renamingMode, setRenamingMode] = useState(false);

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

  const handleRename = (index, name) => {
    const updatedToolNames = [...toolNames];
    updatedToolNames[index].name = name;
    setToolNames(updatedToolNames);
    setSelectedToolIndex(index);
    setEnteredText(name);
    setRenamingMode(true);
    setShowKeypad(true);
  };

  const handleRenameConfirm = () => {
    if (selectedToolIndex !== null && renamingMode) {
      const isValidName = /^[a-zA-Z]/.test(enteredText);
      if (!isValidName) {
        alert("Tool name must start with a letter.");
        return;
      }

      if (enteredText.length > 20) {
        alert("Tool name cannot exceed 20 characters.");
        return;
      }

      const updatedToolNames = [...toolNames];
      updatedToolNames[selectedToolIndex].name = enteredText;
      setToolNames(updatedToolNames);
      setRenamingMode(false);
      setShowKeypad(false);
    }
  };


  const handleRenameCancel = () => {
    setRenamingMode(false);
  };

  const handleOpenKeypadForLoad = () => {
    setShowKeypad(true);
    setEnteredText(selectedToolInfo ? selectedToolInfo.load : '');
  };

  const handleToggleKeypad = (field) => {
    if (field === 'load') {
      handleOpenKeypadForLoad();
    } else {
      setShowKeypad(true);
    }
  };

  const handleKeypadClick = (event) => {
    event.stopPropagation();
  };

  const handleKeypadEnter = () => {
    if (showKeypad) {
      if (selectedToolIndex !== null) {
        const updatedToolNames = [...toolNames];
        updatedToolNames[selectedToolIndex].load = enteredText;
        setToolNames(updatedToolNames);
        setSelectedToolInfo({ ...selectedToolInfo, load: enteredText });
      }
      setShowKeypad(false);
    }
  };

  const handleClearEnteredText = () => {
    setEnteredText('');
  };

  const handleSelectTool = (index) => {
    const toolInfo = toolNames[index];
    setSelectedToolIndex(index);
    setSelectedToolInfo(toolInfo);
    setShowKeypad(true);
    setEnteredText('');
  };

// Inside handleInputChange function
const handleInputChange = (e, field) => {
  if (selectedToolInfo) {
    const value = e.target.value;
    let validValue = value.replace(/[^0-9.-]/g, ''); // Allow only digits, dots, and hyphens
    validValue = validValue.slice(0, 7); // Limit to a maximum of 7 characters
    const updatedToolInfo = { ...selectedToolInfo };
    updatedToolInfo[field] = validValue;
    setSelectedToolInfo(updatedToolInfo);
  }
};

  // Inside handleKeypadInput function
  const handleKeypadInput = (value) => {
    if (selectedToolInfo && showKeypad) {
      const updatedToolInfo = { ...selectedToolInfo };
      const activeField = Object.keys(updatedToolInfo).find(
        (field) => field === 'load' || field === 'x' || field === 'y' || field === 'z'
      );
      if (activeField) {
        updatedToolInfo[activeField] = updatedToolInfo[activeField] + value;
        setSelectedToolInfo(updatedToolInfo);
      }
    }
  };



  return (
    <div className='Tool-container'>
      <h5 className='Tool-info'>Tool Information</h5>
      <div className="dropdown-menu-scroll">
        {[...Array(16)].map((_, index) => (
          <React.Fragment key={index}>
            <li className="tool-selection">
              <div className="tool-name">
                {renamingMode && selectedToolIndex === index ? (
                  <div className='rename-input'>
                    <input
                      type='text'
                      value={enteredText}
                      onChange={(e) => setEnteredText(e.target.value)}
                      autoFocus
                      onBlur={handleRenameConfirm}
                    />
                    {showKeypad && (
                      <div className='keypad-wrapper'>
                        <Keypad
                          enteredText={enteredText}
                          setEnteredText={setEnteredText}
                          handleKeypadInput={handleKeypadInput}
                          handleKeypadEnter={handleKeypadEnter}
                          handleClearEnteredText={handleClearEnteredText}
                        />
                      </div>
                    )}
                    <div className='button-container'>
                      <button className='confirm-cancel-button' onClick={handleRenameConfirm}>Confirm</button>
                      <button className='confirm-cancel-button' onClick={handleRenameCancel}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <React.Fragment>
                    <button className="tool-button" onClick={() => handleSelectTool(index)}>
                      <span>{toolNames[index]?.name}</span>
                    </button>
                    <button className='tool-rename' onClick={() => handleRename(index, toolNames[index]?.name)}>
                      <HiPencil />
                    </button>
                  </React.Fragment>
                )}
              </div>
            </li>
            <div className="divider" />
          </React.Fragment>
        ))}
      </div>
      <div className="selected-tool-info">

        <div className="tool-data">
          <div className='tool-container'>
            <div className='selected-tool-name'>
              Tool Name: {selectedToolIndex !== null ? toolNames[selectedToolIndex].name : ''}
            </div>
            <div className='load-data'>
              Tool Load:{' '}
              <input
                id='load'
                type="text"
                autoComplete='off'
                value={selectedToolInfo ? selectedToolInfo.load : ''}
                onChange={(e) => handleInputChange(e, 'load')}
                placeholder='kg'
                onFocus={() => handleToggleKeypad('load')}
                onBlur={() => handleToggleKeypad('load')}
              />
            </div>
          </div>
          <div className='tool-input-data'>
            <div className='tool-column'>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  X:
                </span>
                <input
                  id='x'
                  type="text"
                  autoComplete='off'
                  value={selectedToolInfo ? selectedToolInfo.x : ''}
                  onChange={(e) => handleInputChange(e, 'x')}
                  placeholder='mm' />
              </div>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  Y:
                </span>
                <input id='y' type="text" autoComplete='off' value={selectedToolInfo ? selectedToolInfo.y : ''} onChange={(e) => handleInputChange(e, 'y')} placeholder='mm' />
              </div>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  Z:
                </span>
                <input id='z' type="text" autoComplete='off' value={selectedToolInfo ? selectedToolInfo.z : ''} onChange={(e) => handleInputChange(e, 'z')} placeholder='mm' />
              </div>
            </div>
            <div className='tool-column'>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  A:
                </span>
                <input id='a' type="text" autoComplete='off' value={selectedToolInfo ? selectedToolInfo.a : ''} onChange={(e) => handleInputChange(e, 'a')} placeholder='°' />
              </div>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  B:
                </span>
                <input id='b' type="text" autoComplete='off' value={selectedToolInfo ? selectedToolInfo.b : ''} onChange={(e) => handleInputChange(e, 'b')} placeholder='°' />
              </div>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  C:
                </span>
                <input id='c' type="text" autoComplete='off' value={selectedToolInfo ? selectedToolInfo.c : ''} onChange={(e) => handleInputChange(e, 'c')} placeholder='°' />
              </div>
            </div>
            <div className='tool-column'>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  JX:
                </span>
                <input id='jx' type="text" autoComplete='off' value={selectedToolInfo ? selectedToolInfo.jx : ''} onChange={(e) => handleInputChange(e, 'jx')} placeholder='kgm²' />
              </div>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  JY:
                </span>
                <input id='jy' type="text" autoComplete='off' value={selectedToolInfo ? selectedToolInfo.jy : ''} onChange={(e) => handleInputChange(e, 'jy')} placeholder='kgm²' />
              </div>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  JZ:
                </span>
                <input id='jz' type="text" autoComplete='off' value={selectedToolInfo ? selectedToolInfo.jz : ''} onChange={(e) => handleInputChange(e, 'jz')} placeholder='kgm²' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showKeypad && (
        <div className='keypad-wrapper' onClick={handleKeypadClick}>
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
