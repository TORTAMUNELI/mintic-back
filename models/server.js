const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      usuarios: "/api/usuarios",
      comentarios: "/api/comentarios",
      historias: "/api/historias",
    };

    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ limit: "50mb" }));

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
  }

  async connectDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.comentarios, require("../routes/comentarios"));
    this.app.use(this.paths.historias, require("../routes/historias"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`The server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
