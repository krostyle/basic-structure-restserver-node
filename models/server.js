const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users'
        this.authPath = '/api/auth'

        //CONNECTION TO DB
        this.connectionDB();

        //MIDDLEWARE
        this.middleware();

        //ROUTES
        this.routes();

    }

    async connectionDB() {
        await dbConnection();
    }

    middleware() {
        //CORS
        this.app.use(cors());
        //LECTURA Y PARSEO DEL BODY
        this.app.use(express.json());

        //DIRECTORIO PUBLICO
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usersPath, require('../routes/users.routes'));


    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Server is running on port: ' + this.port);
        });
    }
}


module.exports = Server;