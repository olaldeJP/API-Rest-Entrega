import express from "express";
import { engine } from "express-handlebars";
import { apiRouter } from "../src/routers/api/api.Routers.js";
import { initializePassport } from "../src/config/passport.conf.js";
import swaggerUiExpress from "swagger-ui-express";
import { sessionConf } from "../src/config/session.conf.js";
import swaggerJSDoc from "swagger-jsdoc";
import { mongoConf } from "../src/config/mongodb.conf.js";
import { logger } from "../src/utils/winston.js";
export class Server {
  #server;
  constructor(URL_MONGO) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.engine("handlebars", engine());
    initializePassport(this.app);
    mongoConf(URL_MONGO);
    sessionConf(this.app, URL_MONGO);
    this.app.use("/api", apiRouter);
    const SWAGGER_CONFIG = {
      definition: {
        openapi: "3.0.1",
        info: {
          version: "1",
          title: "Swagger ",
          description: "Swagger For Ecommers",
        },
      },
      apis: ["./docs/**/*.yaml"],
    };

    const spec = swaggerJSDoc(SWAGGER_CONFIG);

    this.app.use(
      "/api-doc",
      swaggerUiExpress.serve,
      swaggerUiExpress.setup(spec)
    );
    logger.INFO(`Server Config Success`);
  }

  connect(port) {
    return new Promise((resolve, reject) => {
      this.#server = this.app.listen(port, () => {
        logger.INFO(`Server Listening Port ${port} Success`);
        resolve(true);
      });
    });
  }
  disconnect() {
    return new Promise((resolve, reject) => {
      this.#server.close((err) => {
        if (err) return reject(err);
        logger.INFO(`Server Disconnect Succes`);
        resolve(true);
      });
    });
  }
}
