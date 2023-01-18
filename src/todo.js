import { todoDom, projectDom } from "./domController";
import { addProjectTodo } from "./project";

const todoFactory = (title, description, dueDate, priority) => {
    
    return { title, description, dueDate, priority }
}

function createTodo(e) {
    e.preventDefault();
    let [title, description, duedate, priority] = todoDom.getFormValues();
    let newTodo =  todoFactory(title, description, duedate, priority);
    addProjectTodo(newTodo);
    projectDom.displayNewTodo(newTodo);
    todoDom.closeTodoForm();
}

function addDefaultTodo() {
    let today = new Date().toLocaleDateString();
    let todo = todoFactory("My first todo", "This is a todo", today, 'normal');
    addProjectTodo(todo);
    projectDom.displayNewTodo(todo);
}

export { createTodo, addDefaultTodo };