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

function reloadLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function createProject(e) {
    e.preventDefault();
    let project = projectFactory(projectFormInput.value, projectIndex);
    projects.push(project);
    projectIndex += 1;
    localStorage.setItem('projectIndex', JSON.stringify(projectIndex));
    let currentProjectDiv = document.querySelector(`.project-div[data-project-index="${currentProject.index}"`);
    currentProjectDiv.classList.remove('current-project');
    currentProject = project;
    projectDom.closeProjectForm();
    projectDom.addProject(project);
    reloadLocalStorage();
    projectDom.loadProject(project);
    updateProjectButtons();
    todoDom.closeTodoForm();
    projectDom.setCurrentProjectStyling(project);
}

function createDefaultProject() {
    let project = projectFactory("Welcome", projectIndex);
    projects.push(project);
    projectIndex += 1;
    localStorage.setItem('projectIndex', JSON.stringify(projectIndex));
    currentProject = project;
    projectDom.addProject(project);
    projectDom.setCurrentProjectStyling(project);
    updateProjectButtons();
    addDefaultTodo();
    reloadLocalStorage();
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
    reloadLocalStorage();
}

function resetCurrentProject() {
    if (projects.length > 0) {
        currentProject = projects[0];
        projectDom.loadProject(currentProject);
        projectDom.setCurrentProjectStyling(currentProject);
    } else {
        todoDom.clearTodos();
    }
}

function manageProjectLoading() {
    if (localStorage.getItem('projects')) {
        projects = JSON.parse(localStorage.getItem('projects'));
        projectIndex = parseInt(localStorage.getItem('projectIndex'));
        projectDom.addStoredProjects(projects);
        resetCurrentProject();
    } else {
        createDefaultProject();
    }
}

window.onload = manageProjectLoading;

export { currentProject, reloadLocalStorage, createProject, findProject, deleteProject, resetCurrentProject }