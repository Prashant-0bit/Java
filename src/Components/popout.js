// ConfirmationPopups.js
import React from 'react';
import './MainFunc.css';

export const DeleteConfirmationPopup = ({ projectToDelete, onCancel, onConfirm }) => {
  return (
    <div className="popup">
      <div className="modal-content">
        <p>{`Do you want to delete ${projectToDelete} project?`}</p>
        <div className="modal-actions">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>OK</button>
        </div>
      </div>
    </div>
  );
};

export const RenameConfirmationPopup = ({ oldName, newName, onCancel, onConfirm }) => {
  return (
    <div className="popup">
      <div className="modal-content">
        <p>{`Do you want to rename the project name from ${oldName} to ${newName}?`}</p>
        <div className="modal-actions">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>OK</button>
        </div>
      </div>
    </div>
  );
};
