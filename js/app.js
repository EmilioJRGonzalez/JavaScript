
function getAprobados(alumnos) {
    let resp;
    const aprobados = alumnos.filter((alumno) => alumno.getPromedio() > 6);

    if (aprobados.length > 0) {
        resp = '\n\nALUMNOS APROBADOS:\n' ;
        aprobados.forEach((aprobado) => {
            resp = resp + aprobado.nombre.toUpperCase() + '; ' ;
        });
    } else {
        resp = '\n\nNO HAY ALUMNOS APROBADOS';
    }
    return resp;
}


let respuesta = '';
const CANT = 2;

const alumnos = [];

do {
    alumnos.push(new Alumno());

    for (let i = 0 ; i < CANT; i++)
    {
        alumnos[alumnos.length-1].ingresarNota();
    }

    console.log(alumnos);
    continuar = prompt('Desea cargar los datos de otro alumno? si/no');

}while(continuar.toLowerCase() == 'si');

alumnos.forEach((alumno) => {
    respuesta = respuesta + alumno.getResumen() + ' | Promedio: ' + alumno.getPromedio();
});

alert('------DATOS INGRESADOS--------' + respuesta + getAprobados(alumnos));
