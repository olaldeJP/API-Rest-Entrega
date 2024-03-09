import express from "express";
import { apiRouter } from "./routers//api/api.Routers.js";
import { PORT, URL_MONGO } from "./config/config.js";
import { sessionConf } from "./config/session.conf.js";
import { mongoConf } from "./config/mongodb.conf.js";
import { initializePassport } from "./config/passport.conf.js";
import { handlebarsConf } from "./config/handlebars.conf.js";
import swaggerUiExpress from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));
app.use(express.static("./views"));
app.use("/static", express.static("./static"));

handlebarsConf(app); //Motor de plantillas : Handlebars
mongoConf(URL_MONGO); // conexion a base de datos
sessionConf(app, URL_MONGO); //Se cambia por mongo-session
initializePassport(app); //cargo los middlewares de passport

const server = app.listen(PORT, () => {
  console.log("Conectado al puerto 8080");
});

//Se agregan las apis a las rutas

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

app.use("/api-doc", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

app.use("/api", apiRouter);
