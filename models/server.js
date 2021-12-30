const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/searches'
        }

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
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.users, require('../routes/users.routes'));
        this.app.use(this.paths.categories, require('../routes/categories.routes'));
        this.app.use(this.paths.products, require('../routes/products.routes'));
        this.app.use(this.paths.search, require('../routes/searches.routes'));
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Server is running on http://localhost:' + this.port);
        });
    }
}


module.exports = Server;