import { projectDom } from "./domController";
import { updateProjectButtons } from "./eventController";
import { addDefaultTodo } from "./todo";

const projectFactory = (name, index) => {
    let todos = [];
    
    return { name, index, todos }
}

const projectFormInput = document.querySelector('.project-form input');

let projects = [];
let projectIndex = 0;
let currentProject;

function createProject(e) {
    e.preventDefault();
    let project = projectFactory(projectFormInput.value, projectIndex);
    projects.push(project);
    projectIndex += 1;
    projectDom.closeProjectForm();
    projectDom.addProject(project);
    updateProjectButtons();
}

function createDefaultProject() {
    let project = projectFactory("Welcome", projectIndex);
    projects.push(project);
    projectIndex += 1;
    currentProject = project;
    projectDom.addProject(project);
    updateProjectButtons();
    addDefaultTodo();
}

function findProject(projectButton) {
    let index = projectButton.getAttribute('data-project-index');
    currentProject =  projects.find(project => project.index == index);
    return currentProject;
}

function addProjectTodo(newTodo) {
    currentProject.todos.push(newTodo);
}

window.onload = createDefaultProject;

export { createProject, findProject, addProjectTodo }