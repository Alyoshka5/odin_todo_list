import projects from "./project";

const projectForm = document.querySelector('.project-form');
const projectFormInput = document.querySelector('.project-form input');

// Project form
function openProjectForm() {
    projectForm.classList.remove('hide');
}

function closeProjectForm() {
    projectFormInput.value = "";
    projectForm.classList.add('hide');
}

// Project display


export { openProjectForm, closeProjectForm } 