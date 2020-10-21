import { initTasks } from './todo.js'

const loginButton = document.querySelector('#loginButton')
const logoutButton = document.querySelector('#logoutButton')
const taskListDiv = document.querySelector('#taskList')

loginButton.addEventListener('click', login)
logoutButton.addEventListener('click', logout)

function login() {
    document.querySelector('#login').style.display = 'none';
    document.querySelector('#todoList').style.display = 'block';
}

function logout() {
    document.querySelector('#login').style.display = 'flex';
    document.querySelector('#todoList').style.display = 'none';
}

printTask(initTasks)
function printTask(pTasks) {
    for (let task of pTasks) {
        taskListDiv.innerHTML += `
            <div class="row">
                <div class="col-10">
                    <p>${task.tarea}</p>
                </div>
                <div class="col-2">
                    <div class="btn btn-danger">Eliminar</div>
                </div>
            </div>
            `
    }
}
