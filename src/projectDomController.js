import todoDom from "./todoDomController";
import { updateProjectButtons } from "./eventController";
import { findProject, resetCurrentProject } from "./project";


const todosDiv = document.querySelector('.todos');
const addTodoButton = document.querySelector('#add-todo-button');
const projectForm = document.querySelector('.project-form');
const projectFormInput = document.querySelector('.project-form input');
const projectsDiv = document.querySelector('.projects');
const screenGate = document.querySelector('.screen-gate');

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
        projectsDiv.innerHTML += `
        <div class="project-div" data-project-index="${project.index}">
            <button class="project-button">${project.name}</button>
            <button class="delete-project">🗑️</button>
        </div>
        `;
    }

    function displayProject() {
        let project = findProject(this);
        loadProject(project);
    }

    function loadProject(project) {
        addTodoButton.classList.remove('hide');
        todosDiv.innerHTML = '';
        project.todos.forEach(todo => {
            todoDom.displayTodo(todo);
        });
    }

    function removeProject(project) {
        let projectDiv = document.querySelector(`[data-project-index="${project.index}"]`);
        projectsDiv.removeChild(projectDiv);
        resetCurrentProject();
        updateProjectButtons();
    }
    
    return { openProjectForm, closeProjectForm, addProject, displayProject, loadProject, removeProject } 
})();

export default projectDom;