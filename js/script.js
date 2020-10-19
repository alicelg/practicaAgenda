const loginButton = document.querySelector('#loginButton')
const logoutButton = document.querySelector('#logoutButton')

loginButton.addEventListener('click', login)
logoutButton.addEventListener('click', logout)




function login() {
    document.querySelector('#login').style.display = 'none',
        document.querySelector('#todoList').style.display = 'block';
}

function logout() {
    document.querySelector('#login').style.display = 'flex',
        document.querySelector('#todoList').style.display = 'none';
}

const prueba = [{
    idTarea: 0,
    titulo: 'Estudiar JS',
    prioridad: 'urgente'
}]

/* function printList(pLista) {

} */