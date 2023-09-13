import React, { useState, useEffect, useMemo } from 'react';
import { HiPencil } from 'react-icons/hi';
import Keypad from './SubComponents/Keyboard';
import NumericKeypad from './SubComponents/NumericKeyBoard';
import { useTranslation } from 'react-i18next';
import './robotmotion.css';


function BaseSelection() {
  const initialBaseList = useMemo(() => [
    { id: 1, name: 'Base 1', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 2, name: 'Base 2', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 3, name: 'Base 3', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 4, name: 'Base 4', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 5, name: 'Base 5', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 6, name: 'Base 6', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 7, name: 'Base 7', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 8, name: 'Base 8', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 9, name: 'Base 9', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 10, name: 'Base 10', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 11, name: 'Base 11', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 12, name: 'Base 12', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 13, name: 'Base 13', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 14, name: 'Base 14', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 15, name: 'Base 15', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 16, name: 'Base 16', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 17, name: 'Base 17', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 18, name: 'Base 18', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 19, name: 'Base 19', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 20, name: 'Base 20', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 21, name: 'Base 21', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 22, name: 'Base 22', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 23, name: 'Base 23', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 24, name: 'Base 24', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 25, name: 'Base 25', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 26, name: 'Base 26', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 27, name: 'Base 27', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 28, name: 'Base 28', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 29, name: 'Base 29', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 30, name: 'Base 30', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 31, name: 'Base 31', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },
    { id: 32, name: 'Base 32', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', workload: '' } },

  ], []);


  const [toolList, setToolList] = useState(initialBaseList);
  const [renamingTool, setRenamingTool] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [inputValues, setInputValues] = useState(null);
  const [toolName, setToolName] = useState("");
  const [virtualKeypadText, setVirtualKeypadText] = useState("");
  const [isVirtualKeypadOpen, setIsVirtualKeypadOpen] = useState(false);
  const [saveButtonClicked, setSaveButtonClicked]= useState(false);
  const { t } = useTranslation();

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
    setSaveButtonClicked(false);
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
      <div className='tool-info-text'>{t('Base Information')}</div>
      <div className="tool-list">
        {toolList.map((tool, index) => (
          <div key={tool.id}>
            <div
              key={tool.id}
              className={`tool-item ${selectedTool === tool.id ? 'selected-tool' : ''}`}
              onClick={() => handleToolClick(tool.id)}
            >
              {t(tool.name)}
            </div>
            {index < toolList.length - 1 && <hr className="divider-line" />}
          </div>
        ))}
      </div>
      <div className='tool-info'>
        {renamingTool ? (
          <input
            id='rename'
            className='rename-input'
            type="text"
            value={t(toolName)}
            onChange={(e) => setToolName(e.target.value)}
            autoFocus
          />
        ) : (
          <>
            <div className='tool-name'>
              {t('Base Name')}: {selectedTool !== null ? t(toolList.find((tool) => tool.id === selectedTool).name) : ''}
              <button className='rename-tool' onClick={handleRenameTool}><HiPencil /></button>
            </div>
          </>
        )}

        {selectedTool !== null && (
          <>
            <div className={`load-input-field ${activeInput === 'workload' ? 'selected-input' : ''}`}>
              <button
                className={`save-load-button ${saveButtonClicked ? 'clicked' : ''}`}
                onClick={() => {
                  setSaveButtonClicked(true);
                }}
              >
                {t('Save')}
              </button>
            </div>
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
          </>
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

export default BaseSelection;
