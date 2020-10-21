import { initTasks } from './todo.js'

const loginButton = document.querySelector('#loginButton')
const logoutButton = document.querySelector('#logoutButton')
const taskListDiv = document.querySelector('#taskList')
const addTaskButton = document.querySelector('#addTaskButton')
const taskInput = document.querySelector('#task')
const priorityInput = document.querySelector('#priority')

const taskArray = initTasks



loginButton.addEventListener('click', login)
logoutButton.addEventListener('click', logout)
addTaskButton.addEventListener('click', addTask)

function login() {
    document.querySelector('#login').style.display = 'none';
    document.querySelector('#todoList').style.display = 'block';
}

function logout() {
    document.querySelector('#login').style.display = 'flex';
    document.querySelector('#todoList').style.display = 'none';
}

printTask(taskArray)
function printTask(pTasks) {
    taskListDiv.innerHTML = ""
    for (let task of pTasks) {
        taskListDiv.innerHTML += `
            <div class="row ${task.prioridad}">
                <div class="col-10">
                    <p>${task.tarea}</p>
                </div>
                <div class="col-2">
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


function addTask() {
    /* Capturo y valido los datos del formulario */
    console.log(taskInput.value);
    console.log(priorityInput.value);
    if (taskInput.value.trim().length == 0 || priorityInput.value == "elige") {
        alert('por favor mete todos los dattos')
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

function deleteTask(event) {

    /* El event es el evento click, el target es el elemento que clicko */
    /*  console.log(event.target) */
    /* console.log(event.target.parentNode.parentNode) */

    const deleteRow = event.target.parentNode.parentNode

    deleteRow.parentNode.removeChild(deleteRow)

}