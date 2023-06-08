
let horas =["8:00", "8:30", "9:00"]

const tabla = () => {
    let table = document.getElementById("table")
    table.innerHTML= "" 
        table.innerHTML= ` 
        <table>
                    <thead>
                        <th style="width: 21%">Hora </th>
                        <th style="width: 5%">Agenda</th>
                    </thead>
                     <tbody >
                     ${horas.map((hora, index) => `
                     <tr>
                        <td>${hora}</td>
                        <td><button class="btn btn-primary" onclick="agendarCita(${index})" >Agendar</button></td>

                    </tr>
                     `
                    )}
                  </tbody>

                </table>
        `                  
}

const agendarCita = (index) =>{
    horas.splice(index,1)
    tabla()
} 
