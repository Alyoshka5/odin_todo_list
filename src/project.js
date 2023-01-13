import { closeProjectForm, addProject } from "./domController"

const projectFormInput = document.querySelector('.project-form input');

const projectFactory = (name, index) => {
    let todos = [];

    return { name, index }
}

let projects = [];
let projectIndex = 0;

function createProject(e) {
    e.preventDefault();
    const project = projectFactory(projectFormInput.value, projectIndex);
    projects.push(project);
    projectIndex += 1;
    closeProjectForm();
    addProject(project);
}

export default projects;
export { createProject }