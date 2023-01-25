import projectDom from './projectDomController';
import todoDom from './todoDomController';
import { createProject, deleteProject } from "./project";
import { manageTodoForm, deleteTodo } from "./todo";

const newProjectButton = document.querySelector('#new-project-button');
const projectForm = document.querySelector('.project-form');
const projectCancelButton = document.querySelector('.project-form .cancel-project');
let projectButtons = document.querySelectorAll('.project-button');
let deleteProjectButtons = document.querySelectorAll('a.delete-project');
const addTodoButton = document.querySelector('#add-todo-button');
const cancelTodoButton = document.querySelector('button.cancel-todo');
const todoForm = document.querySelector('.todo-form');
let deleteTodoButtons = document.querySelectorAll('a.delete-todo');
let todosInfo = document.querySelectorAll('.todo-info');
let todoCheckboxes = document.querySelectorAll('.todo-checkbox');
const todoFormPriority = document.querySelector('#todo-priority-input');

newProjectButton.addEventListener('click', projectDom.openProjectForm);
projectForm.addEventListener('submit', createProject);
projectCancelButton.addEventListener('click', projectDom.closeProjectForm);
projectButtons.forEach(projectButton => projectButton.addEventListener('click', projectDom.displayProject));
deleteProjectButtons.forEach(projectButton => projectButton.addEventListener('click', deleteProject));
addTodoButton.addEventListener('click', todoDom.openTodoForm);
cancelTodoButton.addEventListener('click', todoDom.closeTodoForm);
todoForm.addEventListener('submit', manageTodoForm);
deleteTodoButtons.forEach(todoButton => todoButton.addEventListener('click', deleteTodo));
todosInfo.forEach(todoInfo => todoInfo.addEventListener('click', todoDom.openTodoForm));
todoCheckboxes.forEach(checkbox => checkbox.addEventListener('click', todoDom.toggleTodoCompletion));
todoFormPriority.addEventListener('change', todoDom.changePriorityStyle);

function updateProjectButtons() {
    projectButtons = document.querySelectorAll('.project-button');
    deleteProjectButtons = document.querySelectorAll('a.delete-project');
    projectButtons.forEach(projectButton => projectButton.addEventListener('click', projectDom.displayProject));
    deleteProjectButtons.forEach(projectButton => projectButton.addEventListener('click', deleteProject));
}

function updateTodoButtons() {
    deleteTodoButtons = document.querySelectorAll('a.delete-todo');
    deleteTodoButtons.forEach(todoButton => todoButton.addEventListener('click', deleteTodo));
    todosInfo = document.querySelectorAll('.todo-info');
    todosInfo.forEach(todoInfo => todoInfo.addEventListener('click', todoDom.openTodoForm));
    todoCheckboxes = document.querySelectorAll('.todo-checkbox');
    todoCheckboxes.forEach(checkbox => checkbox.addEventListener('click', todoDom.toggleTodoCompletion));
}

export { updateProjectButtons, updateTodoButtons }