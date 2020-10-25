import { initTasks } from './todo.js';

const loginButton = document.querySelector('#loginButton');
const logoutButton = document.querySelector('#logoutButton');
const userName = document.querySelector('#userName')

const taskListDiv = document.querySelector('#taskList');

const addTaskButton = document.querySelector('#addTaskButton');
const addTaskInput = document.querySelector('#add-task');
const addPriorityInput = document.querySelector('#add-priority');

const filterTaskInput = document.querySelector('#filter-task');
const filterPriorityInput = document.querySelector('#filter-priority')

const buttonSignUp = document.querySelector('#alertBtn');
const buttonRememberPassword = document.querySelector('#alertBtnPassword')
const buttonHelp = document.querySelector('.helpme')


let taskArray;
let filteredArray = []

let idTarea;

/* --- LocalStorage --- */

if (JSON.parse(localStorage.getItem('taskArray'))) {
    taskArray = JSON.parse(localStorage.getItem('taskArray'));
    /* idTarea = taskArray[taskArray.length - 1].idTarea + 1 */
} else {
    taskArray = initTasks;
    /* idTarea = 3 */
}

/* se hace para poder eliminar todas y que no se produzca un error  */
idTarea = taskArray[taskArray.length - 1] ? taskArray[taskArray.length - 1].idTarea + 1 : 0



printTask(taskArray)


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

/* --- Evento boton Registrate en login--- */
buttonSignUp.addEventListener('click', showAlert);
/* --- Función boton Registrate  en login --- */
function showAlert() {
    alert("En estos momentos no te puedes registrar, intenta más tarde.");
}

/* --- Evento boton Olvide Contraseña en login--- */
buttonRememberPassword.addEventListener('click', showPassword);
/* --- Función boton Olvide Contraseña en login --- */
function showPassword() {
    alert("Solo contamos con 2 usuarios así que intenta con: \n (Juanan - 123) (Alice - 456)")
}

/* --- Evento boton Necesitas Ayuda en login--- */
buttonHelp.addEventListener('click', showHelpMe);
/* --- Función boton Necesitas Ayuda  en login --- */
function showHelpMe() {
    alert("Todos necesitamos ayuda para aprender JS")
}


/* --- Función Pintar tarea --- */

function printTask(pTasks) {
    taskListDiv.innerHTML = "";
    for (let task of pTasks) {
        /* añado el id para luego poder borrar del array*/
        taskListDiv.innerHTML += `
            <div class="row ${task.prioridad} mb-2" data-id="${task.idTarea}">
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
    console.log(addTaskInput.value);
    console.log(addPriorityInput.value);
    if (addTaskInput.value.trim().length == 0 || addPriorityInput.value == "elige") {
        alert('por favor mete todos los datos');
    } else {

        const createTask = {
            idTarea: idTarea,
            tarea: addTaskInput.value,
            prioridad: addPriorityInput.value
        }

        let existe = taskArray.findIndex(task => {
            return task.tarea == addTaskInput.value && task.prioridad == addPriorityInput.value;
        })

        if (existe == -1) {
            taskArray.push(createTask)
            printTask(taskArray)
            idTarea++;
        } else {
            alert('Esta tarea se está duplicando')
        }

        /* Guardo el array final en el localStorage */
        localStorage.setItem('taskArray', JSON.stringify(taskArray))

        /* console.log(taskArray) */
    }
}

/* --- Función Eliminar tarea --- */

function deleteTask(event) {

    /* El event es el evento click, el target es el elemento que clicko */
    /* console.log(event.target) */
    /* console.log(event.target.parentNode.parentNode) */
    const deleteRow = event.target.parentNode.parentNode
    deleteRow.parentNode.removeChild(deleteRow)

    let idTareaBorrar = deleteRow.dataset.id;

    let arrayPositionToDelete = taskArray.findIndex(task => task.idTarea == idTareaBorrar);

    taskArray.splice(arrayPositionToDelete, 1);

    /* guardo el array final en el localStorage */
    localStorage.setItem('taskArray', JSON.stringify(taskArray));
}

/* --- Función Filtrar Prioridad --- */

function filterTaskByPriority(pTaskArray, pPriority) {
    /* console.log(pPriority) */

    filterTaskInput.value = ''; /* se pone esto para que al añadir prioridad, se vacie el espacio de busqueda */

    let filterArrayTaskPriority;
    /* se crea un if para que la opción elegir muestre elegir y no se quede sin nada. */
    if (pPriority == 'elegir') {
        filterArrayTaskPriority = pTaskArray;
    } else {
        filterArrayTaskPriority = pTaskArray.filter(task => task.prioridad.toLowerCase() == pPriority);
    }

    filteredArray = filterArrayTaskPriority
    /* console.log(filteredArray); */

    return filterArrayTaskPriority;
}

/* --- Evento de filtrar Prioridad --- */

filterPriorityInput.addEventListener('change', event => {
    /* console.log(event); */
    /* const result = taskArray.filter(task => task.prioridad.toLowerCase() == event.target.value);
    printTask(result); */


    /*  intento de hacer un casi superfiltro sin boton
      if (filteredArray.length > 0) {
          printTask(filterTaskByPriority(filteredArray, event.target.value));
  
      } else {
          printTask(filterTaskByPriority(taskArray, event.target.value));
      } */
    printTask(filterTaskByPriority(taskArray, event.target.value));
})


/* --- Función Filtrar Tarea --- */

function filterTaskByWord(pTaskArray, pWordSearch) {

    filterPriorityInput.value = 'elegir' /* se pone esto para que al añadir tarea, se vacie el espacio de elegir prioridad */

    const filterArrayTaskName = pTaskArray.filter(task => task.tarea.toLowerCase().includes(pWordSearch.toLowerCase()))

    filteredArray = filterArrayTaskName
    console.log(filteredArray);

    return filterArrayTaskName;
}

/* --- Evento Filtrar Tarea --- */

filterTaskInput.addEventListener('input', event => {
    let wordSearch = event.target.value.trim();
    /*   const result = taskArray.filter(task => task.tarea.toLowerCase().includes(wordSearch.toLowerCase()));
    printTask(result) */

    /*   intento de hacer un casi superfiltro sin boton
    if (filteredArray.length > 0) {
         printTask(filterTaskByWord(filteredArray, wordSearch), taskListDiv);
 
     } else {
         printTask(filterTaskByWord(taskArray, wordSearch), taskListDiv);
     } */
    printTask(filterTaskByWord(taskArray, wordSearch), taskListDiv);
});


/* --- Selector de temas, cambios de colores --- */
let theme = $('#theme')
$('#to-black').click(function () {
    theme.attr("href", "css/black.css")
});
$('#to-blue').click(function () {
    theme.attr("href", "css/blue.css")
});
$('#to-pink').click(function () {
    theme.attr("href", "css/pink.css")
})




