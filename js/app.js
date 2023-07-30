
debugger;
let respuesta = '';
const CANT = 2;

const alumnos = [];
notas = [];

const tabla = document.getElementById('tabla');
const frmAgregar = document.querySelector('#frmAgregar');
const btnAgregar = document.querySelector('#btnAgregar');
const nombre = document.getElementById('inputNombre');
const nota1 = document.getElementById('inputNota1');
const nota2 = document.getElementById('inputNota2');
const hAprobados = document.getElementById('aprobados');

function eventsListeners()
{
  ////agregamos un escuchador del evento cuando el DOM se carga 
  ////que traiga los items del localstorage a los arrays
  document.addEventListener('DOMContentLoaded', traerAlumnos);

    ///event listener de agregar un alumno a la grilla
    frmAgregar.addEventListener('submit', (e) =>
    {
    e.preventDefault();

    agregarAlumno();

    actualizarAlumnos();

    console.log(alumnos);

    limpiarFormulario(frmAgregar);

    });

}

function agregarAlumno(){
    const alumno = new Alumno(nombre.value);
    alumno.ingresarNota(+nota1.value);
    alumno.ingresarNota(+nota2.value);

    alumnos.push(alumno);
}

function limpiarFormulario(formulario) {
    formulario.reset(); //resetea el formulario
}

function traerAlumnos(){
    alumnosStorage = JSON.parse(localStorage.getItem('alumnos')) || [];

    alumnosStorage.forEach(item => {
        const alumno = new Alumno(item.nombre);
        alumno.ingresarNota(+item.nota[0]);
        alumno.ingresarNota(+item.nota[1]);

        alumnos.push(alumno);
    });

    actualizarTabla();
}

function actualizarAlumnos(){
    localStorage.setItem('alumnos',JSON.stringify(alumnos));

    actualizarTabla();
}

function actualizarTabla(){
    tabla.innerHTML = '';
    output = ''
    alumnos.forEach((item,index) => {
        output = output + `
                <tr>
                    <th scope="row">${index+1}</th>
                    <td>${item.nombre}</td>
                    <td>${item.nota[0]}</td>
                    <td>${item.nota[1]}</td>
                    <td>${item.getPromedio()}</td>
                </tr>
                `;
        }
    );
    tabla.innerHTML = output;

    // alumnos.forEach((alumno) => {
    //     respuesta = respuesta + alumno.getResumen() + ' | Promedio: ' + alumno.getPromedio();
    // });

    getAprobados(alumnos)
}

function getAprobados(alumnos) {
    hAprobados.innerHTML = '';
    let resp;
    const aprobados = alumnos.filter((alumno) => alumno.getPromedio() > 6);

    if (aprobados.length > 0) {
        resp = '\n\nALUMNOS APROBADOS:\n' ;
        aprobados.forEach((aprobado) => {
            resp = resp + aprobado.nombre.toUpperCase() + ', ';
        });
    } else {
        resp = '\n\nNO HAY ALUMNOS APROBADOS  ';
    }

    hAprobados.innerHTML=resp.slice(0, -2);;
}


eventsListeners();

console.log(alumnos);



