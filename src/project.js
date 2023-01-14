import { projectDom } from "./domController";
import { updateProjectButtons } from "./eventController";
import todoFactory from "./todo";

const projectFormInput = document.querySelector('.project-form input');

const projectFactory = (name, index) => {
    let todos = [];
    todos.push(todoFactory("a", "b", "c", "d"));
    todos.push(todoFactory("e", "f", "g", "h"));

    return { name, index, todos }
}

let projects = [];
let projectIndex = 0;

function createProject(e) {
    e.preventDefault();
    const project = projectFactory(projectFormInput.value, projectIndex);
    projects.push(project);
    projectIndex += 1;
    projectDom.closeProjectForm();
    projectDom.addProject(project);
    updateProjectButtons();
}

function findProject(projectButton) {
    let index = projectButton.getAttribute('data-project-index');
    return projects.find(project => project.index == index);
}

export { createProject, findProject }