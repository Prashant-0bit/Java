import React, { useState, useEffect, useCallback, useRef } from 'react';
import './MainFunc.css';
import { CgFolderAdd } from 'react-icons/cg';
import { HiPencil } from 'react-icons/hi';
import { MdDelete, MdClose } from 'react-icons/md'; // Import MdDelete and MdClose from react-icons/md
import { FcCheckmark } from 'react-icons/fc';
import Keypad from './SubComponents/Keyboard';
import { useNavigate } from 'react-router-dom';
import { DeleteConfirmationPopup, RenameConfirmationPopup } from './popout';

export default function MainFunc() {
  const [projects, setProjects] = useState(['Default Project']);
  const [newProjectName, setNewProjectName] = useState('');
  const [showNewProjectInput, setShowNewProjectInput] = useState(false);
  const [isKeypadOpen, setIsKeypadOpen] = useState(false);
  const [isRenameMode, setIsRenameMode] = useState(false);
  const [isRenameConfirmationModalOpen, setIsRenameConfirmationModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectToRename, setProjectToRename] = useState(null);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const isDeleteConfirmationModalOpen = !!projectToDelete;

  useEffect(() => {
    if (showNewProjectInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showNewProjectInput]);

  const handleAddProject = useCallback(() => {
    if (isDeleteConfirmationModalOpen || isRenameConfirmationModalOpen) {
      return;
    }

    if (!newProjectName || !/^[a-zA-Z]/.test(newProjectName)) {
      alert('Please enter a valid project name starting with a character.');
      return;
    }

    if (projects.includes(newProjectName)) {
      alert('Project name already exists. Please enter a different name.');
      return;
    }

    setProjects((prevProjects) => [...prevProjects, newProjectName]);
    setNewProjectName('');
    setShowNewProjectInput(false);
    setIsKeypadOpen(false);
  }, [isDeleteConfirmationModalOpen, isRenameConfirmationModalOpen, newProjectName, projects]);

  const handleToggleNewProjectInput = () => {
    if (isDeleteConfirmationModalOpen || projects.length >= 5) {
      return;
    }

    setShowNewProjectInput((prev) => !prev);
    setIsKeypadOpen(!isKeypadOpen);
    setIsRenameMode(false);
    setNewProjectName('');
    setIsRenameConfirmationModalOpen(false);
    setProjectToRename(null);
  };

  const handleNewProjectNameChange = (e) => {
    if (e.target.value.length <= 25) {
      setNewProjectName(e.target.value);
    }
  };

  const handleRenameProject = (index) => {
    if (isDeleteConfirmationModalOpen || isRenameConfirmationModalOpen) {
      return;
    }

    setIsRenameMode(true);
    setNewProjectName(projects[index]);
    setProjectToRename(projects[index]);
    setShowNewProjectInput(true);
    setIsKeypadOpen(true);
  };

  const handleRenameConfirmation = useCallback(() => {
    if (!newProjectName || newProjectName === projectToRename) {
      setProjectToRename(null);
      setIsRenameConfirmationModalOpen(false);
      return;
    }

    setProjects((prevProjects) =>
      prevProjects.map((project) => (project === projectToRename ? newProjectName : project))
    );

    setIsRenameMode(false);
    setNewProjectName('');
    setShowNewProjectInput(false);
    setIsKeypadOpen(false);
    setIsRenameConfirmationModalOpen(false);
  }, [newProjectName, projectToRename]);

  const handleDeleteProject = (projectName) => {
    if (isRenameConfirmationModalOpen) {
      return;
    }

    if (projectName === 'Default Project') {
      alert("Cannot delete the default project.");
      return;
    }

    setProjectToDelete(projectName);
  };

  const handleCancelDelete = () => {
    setProjectToDelete(null);
  };

  const handleConfirmDelete = () => {
    const updatedProjects = projects.filter((project) => project !== projectToDelete);
    setProjects(updatedProjects);
    setProjectToDelete(null);
  };

  const handleKeypadInput = (value) => {
    if (value === 'Enter') {
      if (isRenameMode) {
        setIsRenameConfirmationModalOpen(true);
      } else {
        handleAddProject();
      }
    } else {
      // Append the value to newProjectName, but ensure it doesn't exceed 25 characters
      if (newProjectName.length + value.length <= 25) {
        setNewProjectName((prevName) => prevName + value);
      }
    }
  };

  const handleKeypadEnter = () => {
    if (isRenameMode) {
      setIsRenameConfirmationModalOpen(true);
    } else {
      handleAddProject();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeypadEnter);
    return () => {
      document.removeEventListener('keydown', handleKeypadEnter);
    };
  }, [handleKeypadEnter]);

  return (
    <div className="main-func-container">
      <div className="project-list">
        {projects.map((project, index) => (
          <div key={index} className="project">
            <div className="project-info">
              <button
                className="main-func"
                onClick={() => navigate('robot-motion')}
                disabled={isDeleteConfirmationModalOpen || isRenameConfirmationModalOpen}
              >
                {project}
              </button>
              <div className="project-actions">
                {project !== 'Default Project' && (
                  <>
                    <button
                      className="rename-button"
                      onClick={() => handleRenameProject(index)}
                      disabled={isDeleteConfirmationModalOpen || isRenameConfirmationModalOpen}
                    >
                      <HiPencil className="rename-icon" />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteProject(project)}
                      disabled={isDeleteConfirmationModalOpen || isRenameConfirmationModalOpen}
                    >
                      <MdDelete className="delete-icon" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
     
      <div className="add-project-button-container">
        {!showNewProjectInput ? (
          <button
            className="add-button"
            onClick={handleToggleNewProjectInput}
            disabled={isDeleteConfirmationModalOpen || isRenameConfirmationModalOpen}
          >
            <span className="add-button-name"> Add Project </span>
            <CgFolderAdd className="add-icon" />
          </button>
        ) : (
          <div className="new-project-input-container">
            <input
              ref={inputRef}
              id="text"
              name="name"
              type="text"
              autoComplete="off"
              value={newProjectName}
              onChange={handleNewProjectNameChange}
              className="new-project-input"
              placeholder={isRenameMode ? 'Enter New Project Name' : 'Enter Project Name (Max. 25 Characters)'}
              maxLength={25}
              disabled={isDeleteConfirmationModalOpen || isRenameConfirmationModalOpen}
            />
            {isKeypadOpen && (
              <Keypad
                enteredText={newProjectName}
                setEnteredText={setNewProjectName}
                handleKeypadInput={handleKeypadInput}
                setIsKeypadOpen={setIsKeypadOpen}
                isCapsLockPressed={false}
                toggleCapsLock={() => {}}
                handleKeypadEnter={handleKeypadEnter} // Handle Enter key directly in the handleKeypadEnter function
              />
            )}
            <div className="new-project-input-actions">
              <button className="cancel-button" onClick={handleToggleNewProjectInput}>
                <MdClose className="cancel-icon" />
              </button>
              {!isRenameMode && (
                <button className="save-button" onClick={handleAddProject}>
                  <FcCheckmark className="save-icon" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {projectToDelete && (
        <DeleteConfirmationPopup
          projectToDelete={projectToDelete}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
      {isRenameConfirmationModalOpen && projectToRename && (
        <RenameConfirmationPopup
          oldName={projectToRename}
          newName={newProjectName}
          onCancel={() => setIsRenameConfirmationModalOpen(false)}
          onConfirm={handleRenameConfirmation}
        />
      )}
    </div>
    </div>
  );
}