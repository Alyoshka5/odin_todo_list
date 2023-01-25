import { compareAsc, format } from 'date-fns'
import { todoFormAction, changeTodoFormAction, manageEditTodoForm, findTodo } from "./todo";
import { updateTodoButtons } from "./eventController";

const projectTitle = document.querySelector('.project-title');
const todosDiv = document.querySelector('.todos');
const editBar = document.querySelector('.edit-bar');
const addTodoButton = document.querySelector('#add-todo-button');
const todoForm = document.querySelector('.todo-form');
const todoFormHeader = document.querySelector('.todo-form-header');
const todoFormTitle = document.querySelector('#todo-title-input');
const todoFormDescription = document.querySelector('#todo-description-input');
const todoFormDuedate = document.querySelector('#todo-duedate-input');
const todoFormPriority = document.querySelector('#todo-priority-input');
const todoFormSubmit = document.querySelector('#todo-form-submit');

const todoDom = (() => {
    // Add todo button
    function showTodoButton() {
        addTodoButton.classList.remove('hide');
    }

    function hideTodoButton() {
        addTodoButton.classList.add('hide');
    }

    // Todo form
    function openTodoForm() {
        let todoAction = this.parentNode.getAttribute('data-todo-form-action');
        changeTodoFormAction(todoAction ? todoAction : "create");
        if (todoFormAction == 'update') {
            manageEditTodoForm(this);
        } else {
            clearFormValues();
        }
        changePriorityStyle();
        todoFormHeader.textContent = todoFormAction.charAt(0).toUpperCase() + todoFormAction.slice(1) + " todo";
        todoFormSubmit.value = todoFormAction.charAt(0).toUpperCase() + todoFormAction.slice(1);
        if (todoForm.classList.contains('hide')) {
            todoForm.classList.remove('hide');
            editBar.classList.remove('hide');
        }
    }

    function fillTodoForm(todo) {
        todoFormTitle.value = todo.title;
        todoFormDescription.value = todo.description;
        todoFormDuedate.value = todo.dueDate;
        todoFormPriority.value = todo.priority;
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

    function changePriorityStyle() {
        todoFormPriority.classList = `${todoFormPriority.value}-priority todo-input`;
    }

    // Display and modify todos
    function displayTodo(todo) {
        let completedClass = todo.completed ? 'completed-todo' : '';
        let precheckCheckbox = todo.completed ? 'checked' : '';
        let formatedDueDate = todo.dueDate ?  '⏳ ' + format(new Date(todo.dueDate), `dd/MM/yyyy p`) : '';
        todosDiv.innerHTML += `
            <div class="todo ${completedClass}" data-todo-index="${todo.index}" data-todo-form-action="update">
                <input type="checkbox" class="todo-checkbox" ${precheckCheckbox}>
                <div class="todo-info">
                    <p class="todo-title">${todo.title}</p>
                    <p class="todo-dueDate">${formatedDueDate}</p>
                    <p class="todo-priority ${todo.priority}-priority">🏴</p>
                </div>
                <a class="delete-todo">🗑️</a>
            </div>
            <div class="todo-divider"></div>
        `;
    }

    function findTodoInfoDiv(todo) {
        let todoInfoDivs = document.querySelectorAll('.todo-info');
        let todoInfoDiv;
        todoInfoDivs.forEach(infoDiv => {
            if (infoDiv.parentNode.getAttribute('data-todo-index') == todo.index) {
                todoInfoDiv = infoDiv;
                return;
            };
        });
        return todoInfoDiv;
    }

    function reloadTodoDiv(todo) {
        let todoInfoDiv = findTodoInfoDiv(todo);
        let formatedDueDate = todo.dueDate ?  '⏳ ' + format(new Date(todo.dueDate), `dd/MM/yyyy p`) : '';
        todoInfoDiv.innerHTML = `
            <p class="todo-title">${todo.title}</p>
            <p class="todo-dueDate">${formatedDueDate}</p>
            <p class="todo-priority ${todo.priority}-priority">🏴</p>
        `;
    }

    function clearTodos() {
        todosDiv.innerHTML = 'You have no projects';
        projectTitle.textContent = '';
        addTodoButton.classList.add('hide');
    }

    function removeTodo(todo) {
        let todoDiv = document.querySelector(`[data-todo-index="${todo.index}"]`);
        todosDiv.removeChild(todoDiv);
        closeTodoForm();
        updateTodoButtons();
    }

    function toggleTodoCompletion() {
        let todo = findTodo(this);
        this.parentNode.classList.toggle('completed-todo');
        todo.completed = !todo.completed;
        closeTodoForm();
    }

    return { showTodoButton, hideTodoButton, fillTodoForm, openTodoForm, closeTodoForm, getFormValues,changePriorityStyle, displayTodo, reloadTodoDiv, clearTodos, removeTodo, toggleTodoCompletion }
})();

export default todoDom;