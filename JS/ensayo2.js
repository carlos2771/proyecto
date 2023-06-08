
const guardarUsuario = (e) =>{
    e.preventDefault()
    let nombre = document.getElementById("nombre").value
    let documento = document.getElementById("documento").value
    let telefono = document.getElementById("telefono").value
    let email = document.getElementById("email").value
crearUsuario(nombre,documento, telefono, email)
Obtenerlista()
}
document.getElementById("registrar").addEventListener("click", guardarUsuario);


const Obtenerlista = () =>{
    let list = listarUsuarios()
    tbody = document.getElementById("tablaUsuarios")
    tbody.innerHTML = ""

    for(let i = 0; i < list.length; i++) {
        fila = tbody.insertRow(i)
        nombreCelda = row.insertCell(0)
        nombreCelda.innerHTML = list[i].nombre;


        tbody.appendChild(row)
    }
}
// Obtenerlista()