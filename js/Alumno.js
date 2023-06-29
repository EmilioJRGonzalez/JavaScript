class Alumno {
    nombre = '';
    nota = [];
   
    constructor(nombre) {
        this.nombre = nombre;
        this.nota.push(5);
        this.nota.push(8);
    }

    getResumen = function () {
        let respuesta;

        respuesta = `ALUMNO ${this.nombre.toUpperCase()} \n`;

        this.nota.forEach((valor, index) => {
            respuesta = respuesta + `Nota ${index+1}: ${valor} `;
        });

        return respuesta;
    }

    getPromedio = function (){

        const suma = this.nota.reduce(
            (total, valor) => total + valor, 0
        );

        return suma / this.nota.length;

    }

    ingresarNota = function () {
        let valor;
        let hayError = '';
        
        do{
            valor = parseFloat(prompt(hayError + 'Ingrese la nota de la ' + (this.nota.length + 1) + '° evalucion:'));
    
            if (isNaN(valor)){
                hayError = 'DATOS INCORRECTOS - ';
                nota = -1;
            }
            
        }while(valor < 0 || valor > 10)
    
        this.nota.push(valor);
    }

}