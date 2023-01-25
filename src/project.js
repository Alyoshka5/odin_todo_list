import projectDom from './projectDomController';
import todoDom from './todoDomController';
import { updateProjectButtons } from "./eventController";
import { addDefaultTodo } from "./todo";

const projectFactory = (name, index) => {
    let todos = [];
    let todoIndex = 0;
    
    return { name, index, todos, todoIndex }
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
    let currentProjectDiv = document.querySelector(`.project-div[data-project-index="${currentProject.index}"`);
    currentProjectDiv.classList.remove('current-project');
    currentProject = project;
    projectDom.closeProjectForm();
    projectDom.addProject(project);
    projectDom.loadProject(project);
    updateProjectButtons();
    todoDom.closeTodoForm();
    let projectDiv = document.querySelector(`.project-div[data-project-index="${project.index}"`);
    projectDiv.classList.add('current-project');
}

function createDefaultProject() {
    let project = projectFactory("Welcome", projectIndex);
    projects.push(project);
    projectIndex += 1;
    currentProject = project;
    projectDom.addProject(project);
    let projectDiv = document.querySelector(`.project-div[data-project-index="${project.index}"`);
    projectDiv.classList.add('current-project');
    updateProjectButtons();
    addDefaultTodo();
}

function findProject(projectButton) {
    let index = projectButton.parentNode.getAttribute('data-project-index');
    currentProject = projects.find(project => project.index == index);
    return currentProject;
}

function deleteProject() {
    let project = findProject(this);
    projects = projects.filter(p => p.index != project.index);
    projectDom.removeProject(project);
}

function resetCurrentProject() {
    if (projects.length > 0) {
        currentProject = projects[0];
        projectDom.loadProject(currentProject);
    } else {
        todoDom.clearTodos();
    }
}

window.onload = createDefaultProject;

export { currentProject, createProject, findProject, deleteProject, resetCurrentProject }