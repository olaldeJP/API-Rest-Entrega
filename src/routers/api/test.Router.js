import { Router } from "express";
import { logger } from "../../utils/winston.js";
export const testRouter = new Router();

testRouter.get("/loggerTest", (req, res, next) => {
  logger.HTTP(" TEST HTTP UP ");
  logger.FATAL(" TEST FATAL UP ");
  logger.WARNING("TEST WARNING UP ");
  logger.INFO(" TEST INFO UP ");
  logger.ERROR(" TEST ERROR UP ");
  logger.DEBUG(" TEST DEBUG UP ");
  res.send("CHECKING LOGGERS TEST");
});
