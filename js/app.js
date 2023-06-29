function ingresarNombre() {
    let nom = '';
    let hayError = '';

    do{
        nom = prompt(hayError + 'Ingrese el nombre del alumno:');

        if (nom == ''){
            hayError = 'DATOS INCORRECTOS - ';
        }

    }while(nom == '' || nom == null)

    return nom;
}


let respuesta = '';
let nombre;
const CANT = 2;

const alumnos = [];

do {
    nombre = ingresarNombre();

    alumnos.push(new Alumno(nombre));

    console.log(alumnos);

    alumnos[alumnos.length-1].getPromedio();

    /* for (let i = 0 ; i < CANT; i++)
    {
        console.log(i);
        alumnos[alumnos.length-1].ingresarNota();
    }
 */

    // console.log(respuesta);
    console.log(alumnos);
    continuar = prompt('Desea cargar los datos de otro alumno? si/no');

}while(continuar.toLowerCase() == 'si');

alert('------DATOS INGRESADOS--------\n\n' + alumnos[0].getResumen() + ' | Promedio: ' + alumnos[alumnos.length-1].getPromedio());
