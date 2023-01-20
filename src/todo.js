import todoDom from './todoDomController';
import { currentProject } from "./project";

const todoFactory = (title, description, dueDate, priority, index) => {
    
    return { title, description, dueDate, priority, index }
}

function createTodo(e) {
    e.preventDefault();
    let [title, description, duedate, priority] = todoDom.getFormValues();
    let index = currentProject.todoIndex;
    currentProject.todoIndex += 1;
    let newTodo =  todoFactory(title, description, duedate, priority, index);
    currentProject.addTodo(newTodo);
    todoDom.displayTodo(newTodo);
    todoDom.closeTodoForm();
}

function addDefaultTodo() {
    let today = new Date().toLocaleDateString();
    let index = currentProject.todoIndex;
    currentProject.todoIndex += 1;
    let todo = todoFactory("My first todo", "This is a todo", today, 'normal', index);
    currentProject.addTodo(todo);
    todoDom.displayTodo(todo);
}

export { createTodo, addDefaultTodo };