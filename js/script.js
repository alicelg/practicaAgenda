import { initTasks } from './todo.js';

const loginButton = document.querySelector('#loginButton');
const logoutButton = document.querySelector('#logoutButton');
const taskListDiv = document.querySelector('#taskList');
const addTaskButton = document.querySelector('#addTaskButton');
const taskInput = document.querySelector('#task');
const priorityInput = document.querySelector('#priority');
const buttonHelp = document.querySelectorAll('.alertBtn');
const userName = document.querySelector('#userName')

const taskArray = initTasks;


/* --- Evento visualizar login o espacio de tareas --- */

loginButton.addEventListener('click', login);
logoutButton.addEventListener('click', logout);
addTaskButton.addEventListener('click', addTask);

/* --- Función visualizar login o espacio de tareas --- */

function login() {

    /* Capturo nombre y contraseña */
    const name = document.querySelector('#name').value;
    const password = document.querySelector('#password').value;

    /* valido los datos capturados */
    if ((name.toLowerCase() == 'juanan' && password == '123') || (name.toLowerCase() == 'alice' && password == '456')) {
        task
        document.querySelector('#login').style.display = 'none';
        document.querySelector('#todoList').style.display = 'block';
        userName.innerText = name.toLowerCase();
    } else {
        alert("el usuario o la contraseña no son válidos");
    }
}

function logout() {
    document.querySelector('#login').style.display = 'flex';
    document.querySelector('#todoList').style.display = 'none';
}

/* --- Evento botoneshelp en login--- */
/* buttonHelp.addEventListener('click', alert("No tines cuentas o no recuerdas tu cuenta. No te preocuopes, escribe Juanan y contraseña 123")) */

/* --- Función botoneshelp en login --- */
/* function mostrarAlerta() {
    alert("No tines cuentas o no recuerdas tu cuenta. No te preocuopes, escribe Juanan y contraseña 123");
} */



/* --- Función Pintar tarea --- */

printTask(taskArray)
function printTask(pTasks) {
    taskListDiv.innerHTML = "";
    for (let task of pTasks) {
        taskListDiv.innerHTML += `
            <div class="row ${task.prioridad} mb-2 ">
                <div class="col-10 d-flex align-items-center">
                    <p class="mb-0">${task.tarea}</p>
                </div>
                <div class="col-2 px-0 d-flex justify-content-end">
                    <div class="btn btn-danger deleteButton">Eliminar</div>
                </div>
            </div>
            `
    }

    /* Se pone aquí porque hasta que no se cree, no lo puede capturar */
    const deleteButtons = document.querySelectorAll('.deleteButton')
    /* después de capturarlos recorremos y añadimos eventListeners del click */
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', deleteTask)
    })
}

/* --- Funcion Agregar tarea --- */

function addTask() {
    /* Capturo y valido los datos del formulario */
    console.log(taskInput.value);
    console.log(priorityInput.value);
    if (taskInput.value.trim().length == 0 || priorityInput.value == "elige") {
        alert('por favor mete todos los datos');
    } else {
        const createTask = {
            idTarea: 0,
            tarea: taskInput.value,
            prioridad: priorityInput.value
        }
        taskArray.push(createTask)
        printTask(taskArray)
    }
}

/* --- Función Eliminar tarea --- */

function deleteTask(event) {

    /* El event es el evento click, el target es el elemento que clicko */
    /*  console.log(event.target) */
    /* console.log(event.target.parentNode.parentNode) */

    const deleteRow = event.target.parentNode.parentNode

    deleteRow.parentNode.removeChild(deleteRow)

}

/* --- Función Filtrar Prioridad --- */

/* function filterTaskByPriority(pTaskArray, pPriority) {
    const result = pTaskArray.filter(task => task.prioridad)

    return result;
} */



/* --- Función Filtrar Tarea --- */

function filterTaskByName(pTaskArray, pWordSearch) {

    const filterArrayTaskName = pTaskArray.filter(task => {

        let taskName = task.tarea;

        return taskName.toLowerCase().includes(pWordSearch.toLowerCase());
    })
    return filterArrayTaskName;
}

/* --- Evento Filtrar Tarea --- */

let searchByTaskName = document.querySelector('#inputSearch');

searchByTaskName.addEventListener('input', pickUpSearch);

function pickUpSearch(event) {
    let wordSearch = event.target.value.trim();
    let filterArrayTask = filterTaskByName(task, wordSearch);

    printTask(filterArrayTask, taskListDiv);
}




