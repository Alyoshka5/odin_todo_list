import projects from "./project";

const projectForm = document.querySelector('.project-form');
const projectFormInput = document.querySelector('.project-form input');
const projectsDiv = document.querySelector('.projects');
const screenGate = document.querySelector('.screen-gate');


// Project form
function openProjectForm() {
    projectForm.classList.remove('hide');
    screenGate.classList.remove('hide');
}

function closeProjectForm() {
    projectFormInput.value = "";
    projectForm.classList.add('hide');
    screenGate.classList.add('hide');
}

// Project display

function addProject(project) {
    console.log(project);
    console.log(projectsDiv.innerHTML);
    projectsDiv.innerHTML += `<button data-project-index="${project.index}">${project.name}</button>`;
    console.log(projectsDiv.innerHTML);
}

export { openProjectForm, closeProjectForm, addProject } 