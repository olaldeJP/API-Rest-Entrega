import { Server } from "../app/app.js";
import { PORT } from "./config/config.js";
import { URL_MONGO_ATLAS } from "./config/config.js";
const server = new Server(URL_MONGO_ATLAS);
server.connect(PORT);
