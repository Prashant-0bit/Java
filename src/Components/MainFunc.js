import React, { useState } from 'react';
import './MainFunc.css';
import { CgFolderAdd } from 'react-icons/cg';
import { HiPencil } from 'react-icons/hi';
import { MdDelete, MdClose } from 'react-icons/md';
import { FcCheckmark } from 'react-icons/fc';
import Keypad from './SubComponents/Keyboard';
import {useNavigate} from 'react-router-dom';

export default function MainFunc() {
  const [projects, setProjects] = useState(['Default Project']);
  const [newProjectName, setNewProjectName] = useState('');
  const [showNewProjectInput, setShowNewProjectInput] = useState(false);
  const [isKeypadOpen, setIsKeypadOpen] = useState(false); // State to track keyboard open/close
  const [isRenameMode, setIsRenameMode] = useState(false); // State to track rename mode

  const navigate = useNavigate();

  const handleToggleNewProjectInput = () => {
    if (projects.length >= 5) {
      alert('You have reached the maximum limit of projects.');
    } else {
      setShowNewProjectInput((prev) => !prev);
      setIsKeypadOpen(!isKeypadOpen); // Open/close the keyboard when the add icon is clicked
      setIsRenameMode(false); // Reset the rename mode
      setNewProjectName(''); // Reset the input field
       // Check if the default project button is clicked
    if (newProjectName === 'Default Project') {
      navigate('/robotmotion');
    }
    }
  };

  const handleNewProjectNameChange = (e) => {
    setNewProjectName(e.target.value);
  };

  const handleAddProject = () => {
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
    setIsKeypadOpen(false); // Close the keyboard when the check icon is clicked
  };

  const handleRenameProject = (index) => {
    setIsRenameMode(true);
    setNewProjectName(projects[index]);
    setShowNewProjectInput(true); // Show the input field when the rename button is clicked
    setIsKeypadOpen(true); // Open the keyboard when the rename button is clicked
  };

  const handleRenameKeypadEnter = () => {
    if (!newProjectName || !/^[a-zA-Z]/.test(newProjectName)) {
      alert('Please enter a valid project name starting with a character.');
      return;
    }

    if (projects.includes(newProjectName)) {
      alert('Project name already exists. Please enter a different name.');
      return;
    }

    const updatedProjects = [...projects];
    updatedProjects[projects.length - 1] = newProjectName; // Rename the last added project
    setProjects(updatedProjects);

    setIsRenameMode(false);
    setNewProjectName('');
    setShowNewProjectInput(false);
    setIsKeypadOpen(false); // Close the keyboard when the rename is complete
  };

  const handleDeleteProject = (projectName) => {
    if (projectName === 'Default Project') {
      alert("Cannot delete the default project.");
      return;
    }

    const updatedProjects = projects.filter((project) => project !== projectName);
    setProjects(updatedProjects);
  };

  const handleKeypadInput = (value) => {
    setNewProjectName((prevName) => prevName + value);
  };

  return (
    <div className="backgn">
      <div className="main-func-container">
        <div className="project-list">
          {projects.map((project, index) => (
            <div key={index} className="project">
              <div className="project-info">
                <div className="project-name">
                  <button className='main-func'>{project}</button>
                </div>
                <div className="project-actions">
                  <button className="rename-button" onClick={() => handleRenameProject(index)}>
                    <HiPencil className='rename-icon' />
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteProject(project)}>
                    <MdDelete className='delete-icon' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="add-project-button-container">
          {!showNewProjectInput ? (
            <button className="add-button" onClick={handleToggleNewProjectInput}>
              <span className='add-button-name'> Add Project </span>
              <CgFolderAdd className="add-icon" />
            </button>
          ) : (
            <div className="new-project-input-container">
              <input
                id="text"
                name="name"
                type="text"
                autoComplete="off"
                value={newProjectName}
                onChange={handleNewProjectNameChange}
                className="new-project-input"
                placeholder={isRenameMode ? 'Enter New Project Name' : 'Enter Project Name'}
              />
              {isKeypadOpen && (
                <Keypad
                  enteredText={newProjectName}
                  setEnteredText={setNewProjectName}
                  handleKeypadInput={handleKeypadInput}
                  setIsKeypadOpen={setIsKeypadOpen}
                  isCapsLockPressed={false}
                  toggleCapsLock={() => {}}
                  handleKeypadEnter={isRenameMode ? handleRenameKeypadEnter : handleAddProject}
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
      </div>
    </div>
  );
}
