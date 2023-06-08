
function ingresarNombre() {
    let nom = '';
    let hayError = '';

    do{
        nom = prompt(hayError + 'Ingrese el nombre del alumno:');

        if (nom == ''){
            hayError = 'DATOS INCORRECTOS - ';
        }

    }while(nom == '')

    return nom;
}

function ingresarNota(i) {
    let nota = -1;
    let hayError = '';
    
    do{
        nota = parseFloat(prompt(hayError + 'Ingrese la nota de la ' + i + '° evalucion:'));
        if (isNaN(nota)){
            hayError = 'DATOS INCORRECTOS - ';
            nota = -1;
        }
    }while(nota < 0 || nota > 10)

    return nota;
}

function getPromedio(nota1, nota2) {
    return (nota1 + nota2) / 2;
}


let respuesta = ''
let nombre = '';
let nota1 = 0;
let nota2 = 0;
const CANT = 2;

do {
    nombre = ingresarNombre();

    for (let i = 1 ; i <= CANT; i++)
    {
        switch(i) {

            case 1: 
                    nota1 = ingresarNota(i);
                    break;
            case 2:
                    nota2 = ingresarNota(i);
                    break;
            default:
        }
    }

    respuesta = respuesta + 'ALUMNO ' + nombre.toUpperCase() + '\nNota 1: ' + nota1 + ' Nota 2: ' + nota2;
    respuesta = respuesta  + ' | Promedio: ' + getPromedio(nota1, nota2) + '\n';

    console.log(respuesta);
    continuar = prompt('Desea cargar los datos de otro alumno? si/no');

}while(continuar.toLowerCase() == 'si');

alert('------DATOS INGRESADOS--------\n\n' + respuesta);
