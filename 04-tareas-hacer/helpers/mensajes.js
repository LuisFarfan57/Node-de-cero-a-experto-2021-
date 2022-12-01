const colors = require('colors')
const readline = require('readline')

const mostrarMenu = () => {
    return new Promise((resolve, reject) => {
        console.clear()
        console.log('=========================='.green)
        console.log('  Seleccione una opción'.green)
        console.log('=========================='.green)

        console.log(`${'1.'.green} Crear tarea`)
        console.log(`${'2.'.green} Listar tareas`)
        console.log(`${'3.'.green} Listar tareas completadas`)
        console.log(`${'4.'.green} Listar tareas pendientes`)
        console.log(`${'5.'.green} Completar tarea(s)`)
        console.log(`${'6.'.green} Borrar tarea`)
        console.log(`${'0.'.green} Salir \n`)

        const read = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        read.question('Seleccione una opción: ', (opt) => {
            read.close()
            resolve(opt)
        })
    })
}

const pausa = () => {
    return new Promise((resolve, reject) => {
        const read = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        read.question(`Presione ${'ENTER'.green} para continuar: `, (opt) => {
            read.close()
            resolve()
        })
    })
}

module.exports = {
    mostrarMenu,
    pausa
}