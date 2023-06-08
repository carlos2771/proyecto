// Agregar usuario
let agregar = [];

const crearUsuario = (nombre,documento, telefono, email) => {
    let newUsuario = {
        nombre,
        documento,
        telefono,
        email
        
    }
    console.log(newUsuario);
    agregar.push(newUsuario)
}

console.log(agregar);
// // listar
// const listarUsuarios = () =>{
//     return agregar
// }

