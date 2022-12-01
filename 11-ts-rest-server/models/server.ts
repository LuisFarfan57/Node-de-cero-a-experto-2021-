import express, {Application} from "express"
import userRoutes from "../routes/usuarios"
import cors from 'cors'
import db from "../db/connection"

class Server {
    //Se definen las propiedades antes
    private app: Application
    private port: string
    private paths = {
        usuarios: '/api/v1/usuarios'
    }

    constructor() {
        this.app = express()
        //Muestra un error de que el puerto puede ser undefined. Entonces hay que definir algo por defecto, por si no lo encuentra
        this.port = process.env.PORT || '8000'

        this.dbConnection()
        this.middlewares()
        this.routes()
    }

    async dbConnection() {
        try {
            await db.authenticate()
            console.log('Database online')
        } catch (error : any) {
            throw new Error(error)
        }
    }

    middlewares() {
        //CORS
        this.app.use(cors())

        //Lectura del body
        this.app.use(express.json())

        //Carpeta publica
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.paths.usuarios, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port)
        })
    }
}

// module.exports = Server
//Asi se puede hacer en typescript
export default Server