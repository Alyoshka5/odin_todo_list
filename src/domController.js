import { findProject } from "./project";

const projectForm = document.querySelector('.project-form');
const projectFormInput = document.querySelector('.project-form input');
const projectsDiv = document.querySelector('.projects');
const screenGate = document.querySelector('.screen-gate');
const todosDiv = document.querySelector('.todos');

const projectDom = (() => {
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
        projectsDiv.innerHTML += `<button data-project-index="${project.index}" class="project-button">${project.name}</button>`;
    }

    function loadProject() {
        let project = findProject(this);
        todosDiv.innerHTML = '';
        project.todos.forEach(todo => {
            todosDiv.innerHTML += `
                <div>
                    <p>${todo.title}</p>
                    <p>${todo.dueDate}</p>
                </div>
            `;
        });
    }
    
    return { openProjectForm, closeProjectForm, addProject, loadProject } 
})();

export { projectDom } 