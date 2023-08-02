import React, { useState } from 'react';
import Keypad from './SubComponents/Keyboard';
import { HiPencil } from 'react-icons/hi';

function BaseSelection() {
  const [showMenu, setShowMenu] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [baseNames, setbaseNames] = useState([...Array(16)].map((_, index) => ({
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
  const [selectedBaseIndex, setselectedBaseIndex] = useState(null);
  const [selectedBaseInfo, setselectedBaseInfo] = useState(null);

  const handleRename = (index, name) => {
    const updatedbaseNames = [...baseNames];
    updatedbaseNames[index].name = name;
    setbaseNames(updatedbaseNames);
  };

  const handleToggleMenu = (index) => {
    if (showMenu && selectedBaseIndex === index) {
      // Close the menu if it is already open and the clicked index matches the selected tool index
      setShowMenu(false);
    } else {
      // Open the menu and update the selected tool index
      setselectedBaseIndex(index);
      setShowMenu(true);
    }
  };

  const handleToggleKeyboard = (index) => {
    setselectedBaseIndex(index);
    setShowKeyboard(!showKeyboard);
  };

  const handleSelectBase = (index) => {
    const toolInfo = baseNames[index];
    setselectedBaseIndex(index);
    setselectedBaseInfo(toolInfo);
    setShowKeyboard(true);
    setShowMenu(false); // Close the menu after selecting a tool
  };

  const handleInputChange = (e, field) => {
    if (selectedBaseInfo) {
      const value = e.target.value;
      const validValue = value.replace(/[^0-9.]/g, '').slice(0, 7);
      const updatedToolInfo = { ...selectedBaseInfo };
      updatedToolInfo[field] = validValue;
      setselectedBaseInfo(updatedToolInfo);
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
          Base Selection
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
                    onClick={() => handleSelectBase(index)}
                  >
                    <div className="tool-name">{baseNames[index].name}</div>
                  </button>
                  <div className="tool-options">
                    <HiPencil
                      className="pencil-icon"
                      onClick={() => handleToggleKeyboard(index)}
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
        <h5 className='Tool-info'>Selected Base Information</h5>
        <div className="tool-data">
          <div className='tool-container'>
            <div className='selected-tool-name'>
              Base Name: {selectedBaseIndex !== null ? baseNames[selectedBaseIndex].name : ''}
            </div>
            <div className='load-data'>
              Workpiece Load: <input id='load' type="text" value={selectedBaseInfo ? selectedBaseInfo.load : ''} onChange={(e) => handleInputChange(e, 'load')} placeholder='kg' />
            </div>
          </div>
          <div className='tool-input-data'>
            <div className='tool-column'>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  X:
                </span>
                <input id='x' type="text" value={selectedBaseInfo ? selectedBaseInfo.x : ''} onChange={(e) => handleInputChange(e, 'x')} placeholder='mm' />
              </div >
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  Y:
                </span>
                <input id='y' type="text" value={selectedBaseInfo ? selectedBaseInfo.y : ''} onChange={(e) => handleInputChange(e, 'y')} placeholder='mm' />
              </div>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  Z:
                </span>
                <input id='z' type="text" value={selectedBaseInfo ? selectedBaseInfo.z : ''} onChange={(e) => handleInputChange(e, 'z')} placeholder='mm' />
              </div>
            </div >
            <div className='tool-column'>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  A:
                </span>
                <input id='a' type="text" value={selectedBaseInfo ? selectedBaseInfo.a : ''} onChange={(e) => handleInputChange(e, 'a')} placeholder='°' />
              </div>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  B:
                </span>
                <input id='b' type="text" value={selectedBaseInfo ? selectedBaseInfo.b : ''} onChange={(e) => handleInputChange(e, 'b')} placeholder='°' />
              </div>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  C:
                </span>
                <input id='c' type="text" value={selectedBaseInfo ? selectedBaseInfo.c : ''} onChange={(e) => handleInputChange(e, 'c')} placeholder='°' />
              </div>
            </div>
            <div className='tool-column'>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  JX:
                </span>
                <input id='jx' type="text" value={selectedBaseInfo ? selectedBaseInfo.jx : ''} onChange={(e) => handleInputChange(e, 'jx')} placeholder='kgm²' />
              </div>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  JY:
                </span>
                <input id='jy' type="text" value={selectedBaseInfo ? selectedBaseInfo.jy : ''} onChange={(e) => handleInputChange(e, 'jy')} placeholder='kgm²' />
              </div>
              <div className='tool-data-container'>
                <span className='tool-data-name'>
                  JZ:
                </span>
                <input id='jz' type="text" value={selectedBaseInfo ? selectedBaseInfo.jz : ''} onChange={(e) => handleInputChange(e, 'jz')} placeholder='kgm²' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BaseSelection;
