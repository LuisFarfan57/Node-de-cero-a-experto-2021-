const { comprobarJWT } = require("../helpers")
const { ChatMensajes } = require("../models")

const chatMensajes = new ChatMensajes()

//En el io estan todas las conexiones
const socketController = async (socket, io) => {
    const usuario = await comprobarJWT(socket.handshake.headers['x-token'])

    if (!usuario) return socket.disconnect()

    chatMensajes.agregarUsuario(usuario)
    socket.emit('recibir-mensajes', chatMensajes.ultimos10)
    io.emit('usuarios-activos', chatMensajes.usuariosArr)

    //Conectarlo a una sala especial
    socket.join(usuario.id)

    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id)
        io.emit('usuarios-activos', chatMensajes.usuariosArr)
    })

    socket.on('enviar-mensaje', ({uid, mensaje}) => {
        if (uid) {
            //Al hacer el to, se pone el id de la sala. Como se creo una sala especial para cada usuario, se le envia a esa sala
            socket.to(uid).emit('mensaje-privado', {de: usuario.nombre, mensaje})
        }
        else {
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje)
            io.emit('recibir-mensajes', chatMensajes.ultimos10)
        }
    })
}

module.exports = {
    socketController
}