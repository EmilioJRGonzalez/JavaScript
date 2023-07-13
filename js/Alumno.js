class Alumno {
    nombre;
    nota = [];
   
    constructor(nombre) {
        this.nombre = nombre;
    }

    ingresarNota = function(nota) {
        this.nota.push(nota);
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