import { closeProjectForm } from "./domController"

const projectFactory = (name, index) => {
    let todos = [];

    return { name, index }
}

const projectFormInput = document.querySelector('.project-form input');

let projects = [];
let projectIndex = 0;

function instanciateProject(e) {
    e.preventDefault();
    const project = projectFactory(projectFormInput.value, projectIndex);
    projects.push(project);
    projectIndex += 1;
    closeProjectForm();
    console.log(projects)
}

export default projects;
export { instanciateProject }