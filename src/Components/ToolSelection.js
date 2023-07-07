import React, { useState } from 'react';
import Keypad from './SubComponents/Keyboard';
import { HiPencil } from 'react-icons/hi';

function ToolSelection() {
  const [showMenu, setShowMenu] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
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

  const handleToggleKeyboard = (index) => {
    setSelectedToolIndex(index);
    setShowKeyboard(!showKeyboard);
  };

  const handleSelectTool = (index) => {
    const toolInfo = toolNames[index];
    setSelectedToolIndex(index);
    setSelectedToolInfo(toolInfo);
    setShowKeyboard(true);
    setShowMenu(false); // Close the menu after selecting a tool
  };

  const handleInputChange = (e, field) => {
    if (selectedToolInfo) {
      const updatedToolInfo = { ...selectedToolInfo };
      updatedToolInfo[field] = e.target.value;
      setSelectedToolInfo(updatedToolInfo);
    }
  };

  return (
    <div className='Tool-container'>
      <div className='Dropdown'>
        <button
          className="btn btn-dark dropdown-toggle"
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
        <h5 className='Tool-info'>Selected Tool Information</h5>
        <div className="tool-data">
          <div className='tool-container'>
            <div className='selected-tool-name'>
              Tool Name: {selectedToolIndex !== null ? toolNames[selectedToolIndex].name : ''}
            </div>
            <div className='load-data'>
              Load: <input id='load' type="text" value={selectedToolInfo ? selectedToolInfo.load : ''} onChange={(e) => handleInputChange(e, 'load')} placeholder='kg'/>
            </div>

          </div>
          <div className='tool-input-data'>
            <div >
              X: <input id='x' type="text" value={selectedToolInfo ? selectedToolInfo.x : ''} onChange={(e) => handleInputChange(e, 'x')} placeholder='mm' />
            </div>
            <div>
              Y: <input id='y' type="text" value={selectedToolInfo ? selectedToolInfo.y : ''} onChange={(e) => handleInputChange(e, 'y')} placeholder='mm' />
            </div>
            <div>
              Z: <input id='z' type="text" value={selectedToolInfo ? selectedToolInfo.z : ''} onChange={(e) => handleInputChange(e, 'z')} placeholder='mm' />
            </div>
            <div>
              A: <input id='a' type="text" value={selectedToolInfo ? selectedToolInfo.a : ''} onChange={(e) => handleInputChange(e, 'a')} placeholder='°' /> 
            </div>
            <div>
              B: <input id='b' type="text" value={selectedToolInfo ? selectedToolInfo.b : ''} onChange={(e) => handleInputChange(e, 'b')} placeholder='°' />
            </div>
            <div>
              C: <input id='c' type="text" value={selectedToolInfo ? selectedToolInfo.c : ''} onChange={(e) => handleInputChange(e, 'c')} placeholder='°' />
            </div>
            <div>
              Jx: <input id='jx' type="text" value={selectedToolInfo ? selectedToolInfo.jx : ''} onChange={(e) => handleInputChange(e, 'jx')} placeholder='kgm²'/>
            </div>
            <div>
              Jy: <input id='jy' type="text" value={selectedToolInfo ? selectedToolInfo.jy : ''} onChange={(e) => handleInputChange(e, 'jy')} placeholder='kgm²' />
            </div>
            <div>
              Jz: <input id='jz' type="text" value={selectedToolInfo ? selectedToolInfo.jz : ''} onChange={(e) => handleInputChange(e, 'jz')} placeholder='kgm²' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolSelection;
