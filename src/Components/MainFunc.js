import React, { useState } from 'react';
import './MainFunc.css';
import { CgFolderAdd } from 'react-icons/cg';
import { HiPencil } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import {FcCheckmark} from 'react-icons/fc';

export default function MainFunc() {
  const [projects, setProjects] = useState(['Default Project']);
  const [newProjectName, setNewProjectName] = useState('');
  const [showNewProjectInput, setShowNewProjectInput] = useState(false);

  const handleToggleNewProjectInput = () => {
    if (projects.length >= 5) {
      alert('You have reached the maximum limit of projects.');
    } else {
      setShowNewProjectInput((prev) => !prev);
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
  };

  const handleRenameProject = (oldProjectName, newProjectName) => {
    if (!newProjectName || !/^[a-zA-Z]/.test(newProjectName)) {
      alert('Please enter a valid project name starting with a character.');
      return;
    }

    if (projects.includes(newProjectName)) {
      alert('Project name already exists. Please enter a different name.');
      return;
    }

    const updatedProjects = projects.map((project) =>
      project === oldProjectName ? newProjectName : project
    );
    setProjects(updatedProjects);
  };

  const handleDeleteProject = (projectName) => {
    if (projectName === 'Default Project') {
      alert("Cannot delete the default project.");
      return;
    }

    const updatedProjects = projects.filter((project) => project !== projectName);
    setProjects(updatedProjects);
  };

  return (
    <div className="backgn">
      <div className="main-func-container">
        <button className="main-func" href="/menu">
          Menu
        </button>
        <button className="main-func" href="/start">
          Start
        </button>
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <button className="main-func" href={`/project/${project}`}>
              {project}
            </button>
            <div className="project-icons">
              <button
              type='button'
                className="btn btn-dark project-icon"
                onClick={() => {
                  const newProjectName = prompt('Enter the new name for the project:', project);
                  if (newProjectName) {
                    handleRenameProject(project, newProjectName);
                  }
                }}
              >
                <HiPencil className='rename-icon'/>
              </button>
              <button
              type='button'
                className="btn btn-dark project-icon"
                onClick={() => {
                  const confirmDelete = window.confirm(`Are you sure you want to delete the project "${project}"?`);
                  if (confirmDelete) {
                    handleDeleteProject(project);
                  }
                }}
              >
                <MdDelete className='delete-icon'/>
              </button>
            </div>
          </div>
        ))}
        {showNewProjectInput ? (
          <div>
            <input
              type="text"
              value={newProjectName}
              onChange={handleNewProjectNameChange}
              placeholder="Enter project name"
            />
            <button  type="button" className='btn btn-dark project-icon' onClick={handleAddProject}>
              <FcCheckmark className='check-icon'/>
            </button>
          </div>
        ) : (
          <button type="button" className=" btn btn-dark project-icon" onClick={handleToggleNewProjectInput}>
            <CgFolderAdd className='add-icon' />
          </button>
        )}
      </div>
    </div>
  );
}
