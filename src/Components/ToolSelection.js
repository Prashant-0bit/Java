import React, { useState, useEffect, useMemo } from 'react';
import NumericKeypad from './SubComponents/NumericKeyBoard';
import Keypad from './SubComponents/Keyboard';
import './robotmotion.css';
import { HiPencil } from 'react-icons/hi';


function ToolSelection() {
  const initialToolList = useMemo(() => [
    { id: 1, name: 'Tool 1', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },
    { id: 2, name: 'Tool 2', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },
    { id: 3, name: 'Tool 3', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },
    { id: 4, name: 'Tool 4', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },
    { id: 5, name: 'Tool 5', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },
    { id: 6, name: 'Tool 6', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },
    { id: 7, name: 'Tool 7', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },
    { id: 8, name: 'Tool 8', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },
    { id: 9, name: 'Tool 9', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },
    { id: 10, name: 'Tool 10', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },
    { id: 11, name: 'Tool 11', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },
    { id: 12, name: 'Tool 12', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },
    { id: 13, name: 'Tool 13', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },
    { id: 14, name: 'Tool 14', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },
    { id: 15, name: 'Tool 15', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },
    { id: 16, name: 'Tool 16', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '' } },

  ], []);


  const [toolList, setToolList] = useState(initialToolList);
  const [renamingTool, setRenamingTool] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [inputValues, setInputValues] = useState(null);
  const [toolName, setToolName] = useState("");
  const [virtualKeypadText, setVirtualKeypadText] = useState("");
  const [isVirtualKeypadOpen, setIsVirtualKeypadOpen] = useState(false);

  const handleVirtualKeypadInput = (value) => {
    if (virtualKeypadText.length < 25) {
      setVirtualKeypadText(virtualKeypadText + value);
      setToolName(toolName + value);

      if (selectedTool !== null) {
        const updatedToolList = [...toolList];
        updatedToolList[selectedTool - 1].name = toolName + value;
        setToolList(updatedToolList);
      }
    }
  };

  const handleVirtualKeypadEnter = () => {
    if (isVirtualKeypadOpen) {
      setIsVirtualKeypadOpen(false);
      setRenamingTool(false);
      if (toolName !== "") {
        const updatedToolList = [...toolList];
        updatedToolList[selectedTool - 1].name = toolName;
        setToolList(updatedToolList);
        setToolName("");
      }
    }
  };

  
  const handleInputClick = (fieldName) => {
    setActiveInput(fieldName);
    const inputElement = document.getElementById(fieldName);
    if (inputElement) {
      inputElement.focus();
    }
  };

  const handleNumericKeyPress = (value) => {
    if (activeInput !== null && inputValues[activeInput].length < 7) {
      const newValue = inputValues[activeInput] + value;

      if (value === '.') {
        if (!inputValues[activeInput].includes('.')) {
          setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [activeInput]: newValue,
          }));
        }
      } else if (value === '-') {
        if (!inputValues[activeInput].includes('-')) {
          setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [activeInput]: newValue,
          }));
        }
      } else {
        const decimalIndex = newValue.indexOf('.');
        if (decimalIndex === -1 || newValue.length - decimalIndex <= 3) {
          setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [activeInput]: newValue,
          }));
        }
      }
    }
  };

  const handleCloseKeypad = () => {
    setActiveInput(null);
  };

  const handleToolClick = (toolId) => {
    const selectedToolInfo = toolList.find((tool) => tool.id === toolId).info;
    setSelectedTool(toolId);
    setInputValues({ ...selectedToolInfo });
  };

  const handleRenameTool = () => {
    if (selectedTool !== null) {
      setIsVirtualKeypadOpen(true); // Open the virtual keypad
      setRenamingTool(true);
      setToolName(toolList[selectedTool - 1].name);
    }
  };

  useEffect(() => {
    if (selectedTool !== null) {
      const selectedToolInfo = toolList.find((tool) => tool.id === selectedTool).info;
      setInputValues({ ...selectedToolInfo });
    }
  }, [selectedTool, toolList]);

  return (
    <div className="Tool-container">
      <div className='tool-info-text'>Tool Information</div>
      <div className="tool-list">
        {toolList.map((tool) => (
          <div
            key={tool.id}
            className={`tool-item ${selectedTool === tool.id ? 'selected-tool' : ''}`}
            onClick={() => handleToolClick(tool.id)}
          >
            {tool.name}
          </div>
        ))}
      </div>
      <div className='tool-info'>
        {renamingTool ? (
            <input
              id='rename'
              className='rename-input'
              type="text"
              value={toolName}
              onChange={(e) => setToolName(e.target.value)}
              autoFocus
            />
        ) : (
          <>
            <div className='tool-name'>
              Tool Name: {selectedTool !== null ? toolList.find((tool) => tool.id === selectedTool).name : ''}
              <button className='rename-tool' onClick={handleRenameTool}><HiPencil /></button>
            </div>
          </>
        )}

        {selectedTool !== null && (
          <div className="input-container">
            <div className="column">
              <div className={`input-field ${activeInput === 'x' ? 'selected-input' : ''}`}>
                <span className="input-label">X</span>
                <input
                  type="text"
                  id="x"
                  value={inputValues.x}
                  onClick={() => handleInputClick('x')}
                  readOnly
                />
              </div>
              <div className={`input-field ${activeInput === 'y' ? 'selected-input' : ''}`}>
                <span className="input-label">Y</span>
                <input
                  type="text"
                  id="y"
                  value={inputValues.y}
                  onClick={() => handleInputClick('y')}
                  readOnly
                />
              </div>
              <div className={`input-field ${activeInput === 'z' ? 'selected-input' : ''}`}>
                <span className="input-label">Z</span>
                <input
                  type="text"
                  id="z"
                  value={inputValues.z}
                  onClick={() => handleInputClick('z')}
                  readOnly
                />
              </div>
            </div>
            <div className="column">
              <div className={`input-field ${activeInput === 'a' ? 'selected-input' : ''}`}>
                <span className="input-label">A</span>
                <input
                  type="text"
                  id="a"
                  value={inputValues.a}
                  onClick={() => handleInputClick('a')}
                  readOnly
                />
              </div>
              <div className={`input-field ${activeInput === 'b' ? 'selected-input' : ''}`}>
                <span className="input-label">B</span>
                <input
                  type="text"
                  id="b"
                  value={inputValues.b}
                  onClick={() => handleInputClick('b')}
                  readOnly
                />
              </div><div className={`input-field ${activeInput === 'c' ? 'selected-input' : ''}`}>
                <span className="input-label">C</span>
                <input
                  type="text"
                  id="c"
                  value={inputValues.c}
                  onClick={() => handleInputClick('c')}
                  readOnly
                />
              </div>
            </div>
            <div className="column">
              <div className={`input-field ${activeInput === 'jx' ? 'selected-input' : ''}`}>
                <span className="input-label">JX</span>
                <input
                  type="text"
                  id="jx"
                  value={inputValues.jx}
                  onClick={() => handleInputClick('jx')}
                  readOnly
                />
              </div>
              <div className={`input-field ${activeInput === 'jy' ? 'selected-input' : ''}`}>
                <span className="input-label">JY</span>
                <input
                  type="text"
                  id="jy"
                  value={inputValues.jy}
                  onClick={() => handleInputClick('jy')}
                  readOnly
                />
              </div>
              <div className={`input-field ${activeInput === 'jz' ? 'selected-input' : ''}`}>
                <span className="input-label">JZ</span>
                <input
                  type="text"
                  id="jz"
                  value={inputValues.jz}
                  onClick={() => handleInputClick('jz')}
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {activeInput !== null && (
        <NumericKeypad
          onKeyPress={handleNumericKeyPress}
          onClose={handleCloseKeypad}
          activeInput={activeInput}
          inputValues={inputValues}
          setInputValues={setInputValues}
        />
      )}

      {isVirtualKeypadOpen && (
        <Keypad
          enteredText={virtualKeypadText}
          setEnteredText={setVirtualKeypadText}
          handleKeypadInput={handleVirtualKeypadInput}
          handleKeypadEnter={handleVirtualKeypadEnter}
          isCapsLockPressed={false}
          toggleCapsLock={() => { }}
        />
      )}
    </div>
  );
}

export default ToolSelection;
