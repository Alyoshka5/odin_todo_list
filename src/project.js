import { projectDom, todoDom } from "./domController";
import { updateProjectButtons } from "./eventController";
import { addDefaultTodo } from "./todo";

const projectFactory = (name, index) => {
    let todos = [];
    let todoIndex = 0;

    function addTodo(newTodo) {
        todos.push(newTodo);
    }
    
    return { name, index, todos, todoIndex, addTodo }
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
    currentProject = project;
    projectDom.closeProjectForm();
    projectDom.addProject(project);
    projectDom.loadProject(project);
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