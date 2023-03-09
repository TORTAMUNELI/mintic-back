const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {};

    //Conectar a la base de datos
    this.connectDB();

    //Middlewares
    this.middleWares();

    //Rutas
    this.routes();
  }

  middleWares() {
    //Directorio público
    this.app.use(express.static("public"));

    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());
  }

  connectDB() {}

  routes() {}

  listen() {
    this.app.listen(this.port, () => {
      console.log(`The server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
