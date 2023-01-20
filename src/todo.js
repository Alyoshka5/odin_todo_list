import todoDom from './todoDomController';
import { currentProject } from "./project";
import { updateTodoButtons } from './eventController';

const todoFactory = (title, description, dueDate, priority, index) => {
    let completed = false;

    return { title, description, dueDate, priority, index, completed }
}

function createTodo(e) {
    e.preventDefault();
    let [title, description, duedate, priority] = todoDom.getFormValues();
    let index = currentProject.todoIndex;
    currentProject.todoIndex += 1;
    let newTodo =  todoFactory(title, description, duedate, priority, index);
    currentProject.addTodo(newTodo);
    todoDom.displayTodo(newTodo);
    updateTodoButtons();
    todoDom.closeTodoForm();
}

function addDefaultTodo() {
    let today = new Date().toLocaleDateString();
    let index = currentProject.todoIndex;
    currentProject.todoIndex += 1;
    let todo = todoFactory("My first todo", "This is a todo", today, 'normal', index);
    currentProject.addTodo(todo);
    todoDom.displayTodo(todo);
    updateTodoButtons();
}

function findTodo(todoButton) {
    let index = todoButton.parentNode.getAttribute('data-todo-index');
    let todo = currentProject.todos.find(todo => todo.index == index);
    return todo;
}

export { createTodo, addDefaultTodo, findTodo };