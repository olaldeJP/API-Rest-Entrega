import winston from "winston";

const customLevelsOptions = {
  levels: {
    FATAL: 0,
    ERROR: 1,
    WARNING: 2,
    INFO: 3,
    HTTP: 4,
    DEBUG: 5,
  },
  colors: {
    FATAL: "red",
    ERROR: "yellow",
    WARNING: "magenta",
    INFO: "blue",
    HTTP: "green",
    DEBUG: "grey",
  },
};

export const logger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "DEBUG",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./dataBase/logs/error.log",
      level: "ERROR",
    }),
  ],
});

export const addLogger = async (req, res, next) => {
  logger.HTTP(
    `${
      req.url
    } | ${new Date().toLocaleTimeString()} -  ${new Date().toLocaleDateString()}`
  );
  next();
};
