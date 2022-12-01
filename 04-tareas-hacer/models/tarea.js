const { v4: uuidv4 } = require('uuid')

class Tarea {
    id = ''
    descripcion = ''
    //null no se ha completado
    //Si tiene algo ya se completo
    completadoEn = null

    constructor(descripcion) {
        //Genera un id unico
        this.id = uuidv4()
        this.descripcion = descripcion
        this.completadoEn = null
    }
}

module.exports = Tarea