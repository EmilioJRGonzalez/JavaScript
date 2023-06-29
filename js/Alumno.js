class Alumno {
    nombre;
    nota = [];
   
    constructor() {
        this.nombre = this.ingresarNombre();
    }

    ingresarNombre = function() {
        let nom;
        let hayError = '';
    
        do{
            nom = prompt(hayError + 'Ingrese el nombre del alumno:');
    
            if (nom == '' || nom == null){
                hayError = 'DATOS INCORRECTOS - ';
            }
    
        }while(nom == '' || nom == null)
    
        return nom;
    }

    ingresarNota = function() {
        let valor;
        let hayError = '';
        
        do{
            valor = parseFloat(prompt(hayError + 'Ingrese la nota de la ' + (this.nota.length + 1) + '° evalucion:'));
    
            if (isNaN(valor)){
                hayError = 'DATOS INCORRECTOS - ';
                valor = -1;
            }
            
        }while(valor < 0 || valor > 10)
    
        this.nota.push(valor);
    }

    getResumen = function() {
        let respuesta;

        respuesta = `\n\nALUMNO ${this.nombre.toUpperCase()} \n`;

        this.nota.forEach((valor, index) => {
            respuesta = respuesta + `Nota ${index+1}: ${valor} `;
        });

        return respuesta;
    }

    getPromedio = function() {

        const suma = this.nota.reduce(
            (total, valor) => total + valor, 0
        );

        return suma / this.nota.length;
    }

}