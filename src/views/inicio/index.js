let enviar = document.getElementById("registrar")
let editUser = document.getElementById("editUser")

let editModal = new bootstrap.Modal(document.getElementById('editModal'), {
    keyboard: false
});

// crear modal nuevo con nuevos inputs, crear funcion para editar el usuarios
//validations
const letras = new RegExp("^[a-zA-Z ]+$");
const numeros = /^[0-9]+$/
const email_validate = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/


//consts
const LOCALSTORAGEITEM = 'usuarios'


const tablaUsuarios = () => {
    let listarUsuario = JSON.parse(localStorage.getItem('usuarios'))
    let table = document.getElementById("table")
    console.log(table)
    table.innerHTML = ''


    listarUsuario.forEach(value => {


        table.innerHTML += `
    <tr class="select">
        <td >${value.nombre}</td>
        <td >${value.documento}</td>
        <td >${value.telefono}</td>
        <td >${value.email}</td>
        <td >${value.isActive ? "activo" : "inactivo"}</td>
        
        <td>
            <i class="fa-solid fa-pen-to-square" onclick="openEdit(${value.documento})"></i> 
            <i class="fa-solid fa-ban" onclick="eliminar(${value.documento})"></i>

        </td>
    </tr>

    `
    });
}

const saveUser = (e) => {
    e.preventDefault()
    let userLS = JSON.parse(localStorage.getItem(LOCALSTORAGEITEM)) ?? []
    const user = {
        nombre: document.getElementById('nombre').value,
        documento: document.getElementById('documento').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        contraseña1: document.getElementById('contraseña1').value,
        contraseña2: document.getElementById('contraseña2').value,
        isActive: true
    }


    if (user.nombre === "" || user.documento === "" || user.telefono === "" || user.email === "" || user.contraseña1 === "" || user.contraseña2 === "")
        return alert("todos los campos deben estar llenos")

    if (!letras.test(user.nombre))
        return alert("el nombre solo lleva letras")
    if (!numeros.test(user.documento))
        return alert("el documento solo lleva numeros")
    if (!email_validate.test(user.email))
        return alert("el email es incorrecto")
    if (!numeros.test(user.telefono))
        return alert("el telefono solo lleva numeros")
    if (user.contraseña1 != user.contraseña2)
        return alert("contraseñas no coinciden")


    userLS.push(user)
    alert(`Usuario ${user.nombre} agregado correctamente`)
    localStorage.setItem(LOCALSTORAGEITEM, JSON.stringify(userLS))
    tablaUsuarios()
    document.getElementById("formR").reset();
}
enviar.addEventListener("click", saveUser)






//editar
function openEdit(documento) {
    console.log("editando");
    editModal.show()

    let userLS = JSON.parse(localStorage.getItem(LOCALSTORAGEITEM))

    let userToEdit = userLS.find((user) => parseInt(user.documento) === documento)
    console.log(documento);
    console.log(userToEdit);


    document.getElementById('nombreEdit').value = userToEdit.nombre
    document.getElementById('documentoEdit').value = userToEdit.documento
    document.getElementById('emailEdit').value = userToEdit.email
    document.getElementById('telefonoEdit').value = userToEdit.telefono
    
}

// eliminar 

function eliminar(documento) {

    let userLS = JSON.parse(localStorage.getItem(LOCALSTORAGEITEM))

    const newUsers = userLS.filter((user) => {
        return parseInt(user.documento) !== documento
    });

    console.log(newUsers, documento);
    localStorage.setItem(LOCALSTORAGEITEM, JSON.stringify(newUsers))
    tablaUsuarios()
}

function editar(){
    console.log("editado");
    let users = JSON.parse(localStorage.getItem(LOCALSTORAGEITEM))
    const newUser = {
        nombre: document.getElementById('nombreEdit').value,
        email: document.getElementById('emailEdit').value,
        documento: document.getElementById('documentoEdit').value,
        telefono: document.getElementById('telefonoEdit').value
    }
    const editado = users.map((value) => value.documento === newUser.documento ? {
        ...value,
        ...newUser
    } : value)
    console.log(editado);

    localStorage.setItem(LOCALSTORAGEITEM, JSON.stringify(editado))
    tablaUsuarios()

}
editUser.addEventListener("click", editar)



function buscar(){
    let input = document.getElementById("buscador").value
    let usuario = JSON.parse(localStorage.getItem(LOCALSTORAGEITEM))
    usuario.filter((user) => {
        return user.documento !== documento
    });

}

document.addEventListener('keyup', e =>{
    if(e.target.matches('#buscador')){ //matches() metodo de la interfaz que comprueba que el selector de CSS especificado seleccionara un elemento
        document.querySelectorAll('.select').forEach(value => {
            value.textContent.toLowerCase().includes(e.target.value) ? value.classList.remove('filtro') : value.classList.add('filtro') // el includes me devuelve true o false si el valor cohincide con la info
            console.log(value.textContent.toLowerCase().includes(e.target.value) ? value.classList.remove('filtro') : value.classList.add('filtro'));
        })
    } 
})



document.addEventListener("DOMContentLoaded", tablaUsuarios);