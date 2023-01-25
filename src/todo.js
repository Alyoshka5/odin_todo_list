import todoDom from './todoDomController';
import { currentProject } from "./project";
import { updateTodoButtons } from './eventController';

const todoFactory = (title, description, dueDate, priority, index) => {
    let completed = false;

    return { title, description, dueDate, priority, index, completed }
}

let todoFormAction;
let editedTodo;

function changeTodoFormAction(action) {
    todoFormAction = action;
}

function manageEditTodoForm(todoInfoDiv) {
    let todoIndex = todoInfoDiv.parentNode.getAttribute('data-todo-index');
    editedTodo = currentProject.todos.find(todo => todo.index == todoIndex);
    todoDom.fillTodoForm(editedTodo);
}

function manageTodoForm(e) {
    e.preventDefault();
    if (todoFormAction == 'create') {
        createTodo();
    } else {
        updateTodo();
    }
}

function createTodo() {
    let [title, description, duedate, priority] = todoDom.getFormValues();
    let index = currentProject.todoIndex;
    currentProject.todoIndex += 1;
    let newTodo = todoFactory(title, description, duedate, priority, index);
    currentProject.todos.push(newTodo);
    todoDom.displayTodo(newTodo);
    updateTodoButtons();
    todoDom.closeTodoForm();
}

function updateTodo() {
    [editedTodo.title, editedTodo.description, editedTodo.dueDate, editedTodo.priority] = todoDom.getFormValues();
    todoDom.closeTodoForm();
    todoDom.reloadTodoDiv(editedTodo);
}

function addDefaultTodo() {
    let today = "2050-01-01T00:00";
    let index = currentProject.todoIndex;
    currentProject.todoIndex += 1;
    let todo = todoFactory("My first todo", "This is a todo", today, 'none', index);
    currentProject.todos.push(todo);
    todoDom.displayTodo(todo);
    updateTodoButtons();
}

function findTodo(todoButton) {
    let index = todoButton.parentNode.getAttribute('data-todo-index');
    let todo = currentProject.todos.find(todo => todo.index == index);
    return todo;
}

function deleteTodo() {
    let todo = findTodo(this);
    currentProject.todos = currentProject.todos.filter(t => t.index != todo.index);
    todoDom.removeTodo(todo);
}

export { todoFormAction, changeTodoFormAction, manageEditTodoForm, manageTodoForm, updateTodo, addDefaultTodo, findTodo, deleteTodo };