import React from 'react';
import { useTranslation } from 'react-i18next';
import './MainFunc.css';

export const DeleteConfirmationPopup = ({ projectToDelete, onCancel, onConfirm }) => {
  const { t } = useTranslation();

  const confirmationText = t('confirmationPopups.deleteConfirmation', { projectName: projectToDelete });

  return (
    <div className="popup">
      <div className="modal-content">
      <p>{confirmationText}</p>
        <div className="modal-actions">
          <button onClick={onCancel}>{t('Cancel')}</button>
          <button onClick={onConfirm}>OK</button>
        </div>
      </div>
    </div>
  );
};

export const RenameConfirmationPopup = ({ oldName, newName, onCancel, onConfirm }) => {
  const { t } = useTranslation();

  const confirmationText = t('confirmationPopups.renameConfirmation', { oldName, newName });

  return (
    <div className="popup">
      <div className="modal-content">
      <p>{confirmationText}</p>
        <div className="modal-actions">
          <button onClick={onCancel}>{t('Cancel')}</button>
          <button onClick={onConfirm}>OK</button>
        </div>
      </div>
    </div>
  );
};
