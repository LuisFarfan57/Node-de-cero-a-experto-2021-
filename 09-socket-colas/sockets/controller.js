const TicketControl = require('../models/ticket-control');

//Cuando se reinicie el servidor, se crea una nueva instancia
const ticketControl = new TicketControl()

const socketController = (socket) => {
    socket.emit('ultimo-ticket', ticketControl.ultimo)
    socket.emit('estado-actual', ticketControl.ultimos4)
    socket.emit('tickets-pendientes', ticketControl.tickets.length)

    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente = ticketControl.siguiente()

        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length)

        callback(siguiente)
    })

    socket.on('atender-ticket', ({escritorio}, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio)

        //Emitir que cambiaron los ultimos 4
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4)

        //Emitir que cambiaron los tickets pendientes
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length)
        socket.emit('tickets-pendientes', ticketControl.tickets.length)

        if (!ticket) {
            return callback({
                ok: false,
                msg: 'Ya no hay tickets en cola'
            })
        }

        return callback({
            ok: true,
            ticket
        })
    })

}

module.exports = {
    socketController
}

