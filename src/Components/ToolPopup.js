import React, { useEffect,useState } from 'react';
import { useToolName } from './ToolNameContex';
import './toolpopup.css';

function ToolPopup({ onClose, onSelectTool }) {
  const { selectedToolName } = useToolName();
  const [currentToolName, setCurrentToolName] = useState(selectedToolName);

  useEffect(() => {
    // Update the current tool name when selectedToolName changes
    setCurrentToolName(selectedToolName);
  }, [selectedToolName]);

  const toolList = [
    'Tool 1', 'Tool 2', 'Tool 3', 'Tool 4', 'Tool 5', 'Tool 6',
    'Tool 7', 'Tool 8', 'Tool 9', 'Tool 10', 'Tool 11', 'Tool 12',
    'Tool 13', 'Tool 14', 'Tool 15', 'Tool 16',
  ];

  return (
    <div className="tool-popup">
      <div className="tool-popup-header">
        <h5>Select a Tool</h5>
        <button onClick={onClose}>Close</button>
      </div>
      <ul className="tool-list">
        {toolList.map((tool, index) => (
          <li key={index}>
            <button
              onClick={() => {
                onSelectTool(tool);
                onClose();
              }}
              className={currentToolName === tool ? 'selected' : ''}
            >
              {tool}
            </button>
            <hr/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToolPopup;
