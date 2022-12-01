const path = require('path')
const fs = require('fs')

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero
        this.escritorio = escritorio
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0
        this.hoy = new Date().getDate() //11, 31, 1, fecha
        this.tickets = []
        this.ultimos4 = []

        this.init()
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    init() {
        //Como es json de una vez lo transforma a un objeto de javascript
        const {tickets, hoy, ultimos4, ultimo} = require('../db/data.json')

        //Mismo dia, osea, solo se recarga el servidor
        if (hoy === this.hoy) {
            this.tickets = tickets
            this.ultimo = ultimo
            this.ultimos4 = ultimos4
        }
        //Si es un nuevo dia, se utilizan los valores iniciales y se guarda en la db
        else {
            this.guardarDB()
        }
    }

    guardarDB() {
        const dbPath = path.join(__dirname, '../db/data.json')

        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    siguiente() {
        this.ultimo += 1
        const ticket = new Ticket(this.ultimo, null)
        this.tickets.push(ticket)

        this.guardarDB()

        return ticket.numero
    }

    atenderTicket(escritorio) {
        //No hay tickets
        if (this.tickets.length === 0) return null

        //Obtiene el primer elemento del arreglo y lo elimina del arreglo de una vez
        const ticket = this.tickets.shift()

        //Le asignamos el escritorio al ticket
        ticket.escritorio = escritorio

        this.ultimos4.unshift(ticket)

        //Elimina el ultimo ticket
        if (this.ultimos4.length > 4) this.ultimos4.splice(-1,1)

        this.guardarDB()

        return ticket
    }
}

module.exports = TicketControl