import { projectDom } from "./domController";
import { createProject } from "./project"

const newProjectButton = document.querySelector('#new-project-button');
const projectForm = document.querySelector('.project-form');
const projectCancelButton = document.querySelector('.project-form .cancel-button');

newProjectButton.addEventListener('click', projectDom.openProjectForm);
projectForm.addEventListener('submit', createProject);
projectCancelButton.addEventListener('click', projectDom.closeProjectForm);