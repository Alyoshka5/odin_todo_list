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

export { todoFactory, createTodo };