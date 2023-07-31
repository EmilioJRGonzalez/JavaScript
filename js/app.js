
const alumnos = [];

const tabla = document.getElementById('tabla');
const frmAgregar = document.querySelector('#frmAgregar');
const btnAgregar = document.querySelector('#btnAgregar');
const nombre = document.getElementById('inputNombre');
const nota1 = document.getElementById('inputNota1');
const nota2 = document.getElementById('inputNota2');
const hAprobados = document.getElementById('aprobados');
const hCurso = document.getElementById('curso');
const hProfesor = document.getElementById('profesor');


function eventsListeners()
{
  ////agregamos un escuchador del evento cuando el DOM se carga 
  ////que traiga los items del localstorage a los arrays
  document.addEventListener('DOMContentLoaded', traerAlumnos);

    ///event listener de agregar un alumno a la grilla
    frmAgregar.addEventListener('submit', (e) =>
    {
        e.preventDefault();

        if (datosCorrectos()){

            agregarAlumno();

            actualizarAlumnos();

            console.log(alumnos);

            limpiarFormulario(frmAgregar);

        }

    });

    callPromise();

}

function datosCorrectos (){
    resp = true;
    aux = '';

    if (nombre.value == '' || nombre.value.length < 2){
        aux = '- El valor ingresado en Nombre es incorrecto <br>'
    }
    if (+nota1.value < 0 || +nota1.value > 10 || isNaN(+nota1.value)){
        aux = aux + '- El valor Nota 1° parcial es incorrecto <br>'
    }
    if (+nota2.value < 0 || +nota2.value > 10 || isNaN(+nota2.value)){
        aux = aux + '- El valor Nota 2° parcial es incorrecto <br>'
    }

    if (aux != ''){
        resp = false;

        Swal.fire({
            icon: 'error',
            title: 'Solucione los siguientes errores',
            html: aux
        })
    }  

    return resp;
    
}

function agregarAlumno(){
    const alumno = new Alumno(nombre.value);
    alumno.ingresarNota(+nota1.value);
    alumno.ingresarNota(+nota2.value);

    alumnos.push(alumno);

    toast();
}

function toast(){

    Toastify({
        text: "Alumno agregado a la lista",        
        duration: 5000,
        close: true,
        gravity: 'bottom',
        stopOnFocus: true     
        }).showToast();
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

    getAprobados(alumnos)
}

function getAprobados(alumnos) {
    hAprobados.innerHTML = '';
    let resp;
    const aprobados = alumnos.filter((alumno) => alumno.getPromedio() > 6);

    if (aprobados.length > 0) {
        resp = 'ALUMNOS APROBADOS: ' ;
        aprobados.forEach((aprobado) => {
            resp = resp + aprobado.nombre.toUpperCase() + ', ';
        });
    } else {
        resp = 'NO HAY ALUMNOS APROBADOS  ';
    }

    hAprobados.innerHTML=resp.slice(0, -2);;
}

function callPromise(){

    fetch('./assets/cursos.json')
    .then((response) => {
        if (response.ok) {
            return response.json(); 
        } else {
            Toastify({
                text: "Error al cargar los datos del curso",        
                duration: 5000,
                close: true,
                gravity: 'bottom',
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                  }
                }).showToast();
        }
    })
    .then((cursos) => {
        let id = 0;
        hCurso.innerHTML = `Curso: ${cursos[id].curso}`;
        hProfesor.innerHTML = `Profesor: ${cursos[id].profesor}`;
    })
}

eventsListeners();

console.log(alumnos);




