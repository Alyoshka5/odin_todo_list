import { projectDom, todoDom } from "./domController";
import { createProject } from "./project";
import { createTodo } from "./todo";

const newProjectButton = document.querySelector('#new-project-button');
const projectForm = document.querySelector('.project-form');
const projectCancelButton = document.querySelector('.project-form .cancel-button');
let projectButtons = document.querySelectorAll('.project-button');newProjectButton.addEventListener('click', projectDom.openProjectForm);
const newTodoButton = document.querySelector('#add-todo-button');
const cancelTodoButton = document.querySelector('button.cancel-todo');
const todoForm = document.querySelector('.todo-form');

newProjectButton.addEventListener('click', projectDom.openProjectForm);
projectForm.addEventListener('submit', createProject);
projectCancelButton.addEventListener('click', projectDom.closeProjectForm);
projectButtons.forEach(projectButton => projectButton.addEventListener('click', projectDom.loadProject));
newTodoButton.addEventListener('click', todoDom.toggleTodoForm);
cancelTodoButton.addEventListener('click', todoDom.closeTodoForm);
todoForm.addEventListener('submit', createTodo);

function updateProjectButtons() {
    projectButtons = document.querySelectorAll('.project-button');
    projectButtons.forEach(projectButton => projectButton.addEventListener('click', projectDom.loadProject));
}

export { updateProjectButtons }