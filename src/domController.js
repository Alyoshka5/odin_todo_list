import { currentProject, findProject, resetCurrentProject } from "./project";
import { updateProjectButtons } from "./eventController";

// project form
const projectForm = document.querySelector('.project-form');
const projectFormInput = document.querySelector('.project-form input');
const projectsDiv = document.querySelector('.projects');
const screenGate = document.querySelector('.screen-gate');

const todosDiv = document.querySelector('.todos');
const editBar = document.querySelector('.edit-bar');
// todo form
const addTodoButton = document.querySelector('#add-todo-button');
const todoForm = document.querySelector('.todo-form');
const todoFormTitle = document.querySelector('.todo-form .todo-title');
const todoFormDescription = document.querySelector('.todo-form .todo-description');
const todoFormDuedate = document.querySelector('.todo-form .todo-duedate');
const todoFormPriority = document.querySelector('.todo-form .todo-priority');


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

const todoDom = (() => {
    // Add todo button
    function showTodoButton() {
        addTodoButton.classList.remove('hide');
    }

    function hideTodoButton() {
        addTodoButton.classList.add('hide');
    }

    // Todo form
    function toggleTodoForm() {
        todoForm.classList.toggle('hide');
        editBar.classList.toggle('hide');
    }

    function clearFormValues() {
        todoFormTitle.value = '';
        todoFormDescription.value = '';
        todoFormDuedate.value = '';
        todoFormPriority.selectedIndex = 0;
    }
    
    function closeTodoForm() {
        todoForm.classList.add('hide');
        editBar.classList.add('hide');
        clearFormValues();
    }

    function getFormValues() {
        let title = todoFormTitle.value;
        let description = todoFormDescription.value;
        let duedate = todoFormDuedate.value;
        let priority = todoFormPriority.value;
        clearFormValues();
        return [title, description, duedate, priority];
    }

    function displayTodo(todo) {
        todosDiv.innerHTML += `
            <div class="todo" data-todo-index=${todo.index}">
                <p>${todo.title}</p>
                <p>${todo.dueDate}</p>
            </div>
        `;
    }

    function clearTodos() {
        todosDiv.innerHTML = 'You have no projects';
        addTodoButton.classList.add('hide');
    }

    return { showTodoButton, hideTodoButton, toggleTodoForm, closeTodoForm, getFormValues, displayTodo, clearTodos }
})();

export { projectDom, todoDom } 