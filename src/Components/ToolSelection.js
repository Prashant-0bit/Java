import React, { useState, useEffect, useMemo } from 'react';
import { HiPencil } from 'react-icons/hi';
import Keypad from './SubComponents/Keyboard';
import NumericKeypad from './SubComponents/NumericKeyBoard';
import { useTranslation } from 'react-i18next';
import './robotmotion.css';


function ToolSelection({ children }) {
  const initialToolList = useMemo(() => [
    { id: 1,  name: 'Tool 1',  info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },
    { id: 2,  name: 'Tool 2',  info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },
    { id: 3,  name: 'Tool 3',  info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },
    { id: 4,  name: 'Tool 4',  info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },
    { id: 5,  name: 'Tool 5',  info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },
    { id: 6,  name: 'Tool 6',  info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },
    { id: 7,  name: 'Tool 7',  info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },
    { id: 8,  name: 'Tool 8',  info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },
    { id: 9,  name: 'Tool 9',  info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },
    { id: 10, name: 'Tool 10', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },
    { id: 11, name: 'Tool 11', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },
    { id: 12, name: 'Tool 12', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },
    { id: 13, name: 'Tool 13', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },
    { id: 14, name: 'Tool 14', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },
    { id: 15, name: 'Tool 15', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },
    { id: 16, name: 'Tool 16', info: { x: '', y: '', z: '', a: '', b: '', c: '', jx: '', jy: '', jz: '', load: '' } },

  ], []);

  const [toolList, setToolList] = useState(initialToolList);
  const [renamingTool, setRenamingTool] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [toolName, setToolName] = useState("");
  const [virtualKeypadText, setVirtualKeypadText] = useState("");
  const [isVirtualKeypadOpen, setIsVirtualKeypadOpen] = useState(false);
  const [inputValues, setInputValues] = useState(null);
  const [activeInput, setActiveInput] = useState(null);
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);
  const [selectedToolForRename, setSelectedToolForRename] = useState(null);
  const [selectedToolName, setSelectedToolName] = useState('');
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
    if (selectedTool !== null) {
      const selectedToolName = toolList.find((tool) => tool.id === selectedTool).name;
      setSelectedToolName(selectedToolName);
    }
  };

  const handleRenameTool = () => {
    if (selectedTool !== null) {
      setIsVirtualKeypadOpen(true);
      setRenamingTool(true);
      setToolName(toolList[selectedTool - 1].name);
      setSelectedToolForRename(selectedTool);
    }
  };

const handleKeypadBackspace = () => {
  if (virtualKeypadText.length > 0) {
    const updatedText = virtualKeypadText.slice(0, -1);
    setVirtualKeypadText(updatedText);

    if (selectedTool !== null) {
      const updatedToolList = [...toolList];
      updatedToolList[selectedTool - 1].name = updatedText;
      setToolList(updatedToolList);
    }
  }
  console.log("virtualKeypadText:", virtualKeypadText);
};


  useEffect(() => {
    if (selectedTool !== null) {
      const selectedToolInfo = toolList.find((tool) => tool.id === selectedTool).info;
      setInputValues({ ...selectedToolInfo });
    }
  }, [selectedTool, toolList]);

  return (
    <div className="Tool-container">
      <div className='tool-info-text'>{t('Tool Information')}</div>
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
            autoComplete='off'
            onChange={(e) => setToolName(e.target.value)}
            autoFocus
          />
        ) : (
          <>
            <div className='tool-name'>
              {t('Tool Name')}: {selectedTool !== null ? t(toolList.find((tool) => tool.id === selectedTool).name) : ''}
              <button className='rename-tool' onClick={handleRenameTool}><HiPencil /></button>
            </div>
          </>
        )}

        {selectedTool !== null && (
          <>
            <div className={`load-input-field ${activeInput === 'load' ? 'selected-input' : ''}`}>
              <span className="load-input-label">{t('Tool load')}</span>
              <input
                type="text"
                id="load"
                value={inputValues.load}
                onClick={() => handleInputClick('load')}
                readOnly
              />
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
          handleKeypadBackspace={handleKeypadBackspace}
          isCapsLockPressed={false}
          toggleCapsLock={() => { }}
        />
      )}
    </div>
  );
}

export default ToolSelection;
