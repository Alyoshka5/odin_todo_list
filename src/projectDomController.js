import todoDom from "./todoDomController";
import { updateProjectButtons, updateTodoButtons } from "./eventController";
import { currentProject, findProject, resetCurrentProject } from "./project";


const projectTitle = document.querySelector('.project-title');
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
        projectTitle.textContent = project.name;
        projectsDiv.innerHTML += `
        <div class="project-div" data-project-index="${project.index}">
            <a class="project-button">${project.name}</a>
            <a class="delete-project">🗑️</a>
        </div>
        `;
    }

    function setCurrentProject(projectButton) {
        let currentProjectDiv = document.querySelector(`.project-div[data-project-index="${currentProject.index}"`);
        currentProjectDiv.classList.remove('current-project');
        let project = findProject(projectButton);
        let projectDiv = document.querySelector(`.project-div[data-project-index="${project.index}"`);
        projectDiv.classList.add('current-project');
        return project;
    }

    function displayProject() {
        let project = setCurrentProject(this);
        loadProject(project);
    }

    function loadProject(project) {
        projectTitle.textContent = project.name;
        addTodoButton.classList.remove('hide');
        todosDiv.innerHTML = '';
        project.todos.forEach(todo => {
            todoDom.displayTodo(todo);
        });
        updateTodoButtons();
    }

    function removeProject(project) {
        let projectDiv = document.querySelector(`[data-project-index="${project.index}"]`);
        projectsDiv.removeChild(projectDiv);
        resetCurrentProject();
        updateProjectButtons();
    }
    
    return { openProjectForm, closeProjectForm, addProject, displayProject, setCurrentProject, loadProject, removeProject } 
})();

export default projectDom;