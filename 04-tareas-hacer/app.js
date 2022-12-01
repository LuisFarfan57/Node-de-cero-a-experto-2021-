const colors = require('colors')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer')
const Tareas = require('./models/tareas')

const main = async () => {
    let opt = -1

    const tareas = new Tareas()
    const tareasDB = leerDB()

    if(tareasDB) {
        tareas.setListado(tareasDB)
    }

    do {
        opt = await inquirerMenu()

        switch (opt) {
            case 1: //Nueva tarea
                const descripcion = await leerInput('Descripción:')
                tareas.crearTarea(descripcion)
                break;
            case 2: //Listado de tareas
                tareas.listadoCompleto()
                break;
            case 3: //Listado de tareas completadas
                tareas.listarPendientesCompletadas(true)
                break;
            case 4: //Listado de tareas pendientes
                tareas.listarPendientesCompletadas(false)
                break;
            case 5: //Completar tareas
                const ids = await mostrarListadoChecklist(tareas._listado)
                tareas.toggleCompletadas(ids)
                break;
            case 6: //Borrar tareas
                const id = await listadoTareasBorrar(tareas._listado)

                if (id === 0) break

                const seguroBorrar = await confirmar('¿Está seguro?')

                if (seguroBorrar) {
                    tareas.borrarTarea(id)
                    console.log('Tarea borrada'.red)
                }

                break
        }

        guardarDB(tareas._listado)

        if (opt !== 0) await pausa()
    } while (opt !== 0);
}

main()