import { openProjectForm } from "./domController";
import { instanciateProject } from "./project"

const newProjectButton = document.querySelector('#new-project-button');
const projectForm = document.querySelector('.project-form');

newProjectButton.addEventListener('click', openProjectForm);
projectForm.addEventListener('submit', instanciateProject)