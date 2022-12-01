const Tarea = require('./tarea')
require('colors')

class Tareas {
    /**
     * Ejemplo
     * { 'uuid-12341234-12341234-2': {id: 12, descripcion: asdf, completadoEn: 919191}}
     */
    _listado = {}

    listadoCompleto() {
        console.log()
        Object.keys(this._listado).forEach((key, i) => {
            this.mostrarTarea(this._listado[key], i)
        })
    }

    listarPendientesCompletadas(completadas = true) {
        console.log()
        Object.keys(this._listado).forEach((key, i) => {
            if(this._listado[key].completadoEn && completadas || !this._listado[key].completadoEn && !completadas)
                this.mostrarTarea(this._listado[key], i)
        })
    }

    mostrarTarea(tarea, i) {
        const {descripcion, completadoEn} = tarea
        const datos = `${descripcion} :: ${completadoEn ? `COMPLETADO ${completadoEn}`.green : 'PENDIENTE'.red}`
        let index = ''

        if(tarea.completadoEn !== null)
            index = `${i + 1}.`.green
        else
            index = `${i + 1}.`.red

        console.log(`${index} ${datos}`)
    }

    setListado(listado) {
        this._listado = listado
    }

    constructor() {
        this._listado = {}
    }

    borrarTarea(id = '') {
        if (this._listado[id])
            delete this._listado[id]
    }

    crearTarea(descripcion = '') {
        const tarea = new Tarea(descripcion)

        this._listado[tarea.id] = tarea
    }

    toggleCompletadas(ids = []) {
        //Si algun id no esta en los que se completaron como completados, se quita el completado
        Object.keys(this._listado).forEach((key) => {
            if (!ids.includes(key))
                this._listado[key].completadoEn = null
        })

        ids.forEach((id) => {
            const tarea = this._listado[id]
            if (!tarea.completadoEn)
                tarea.completadoEn = new Date().toISOString()
        })
    }
}

module.exports = Tareas