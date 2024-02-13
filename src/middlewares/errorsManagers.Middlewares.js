export const ErrorType = {
  NOT_FOUND: "NOT_FOUND",
  INVALID_DATA: "INVALID_DATA",
  ERROR_REQUEST: "ERROR_REQUEST",
  UNAUTHORIZED_USER: "UNAUTHORIZED_USER",
  FORBIDDEN_USER: " FORBIDDEN_USER",
};

export async function newError(errorType, message) {
  const error = new Error(message);
  error.name = errorType;
  return error;
}

export async function manejadorDeErrores(error, req, res, next) {
  switch (error.name) {
    case ErrorType.INVALID_DATA:
      res.status(400);
      break;
    case ErrorType.ERROR_REQUEST:
      res.status(400);
      break;
    case ErrorType.UNAUTHORIZED_USER:
      res.status(401);
      break;
    case ErrorType.FORBIDDEN_USER:
      res.status(403);
      break;
    case ErrorType.NOT_FOUND:
      res.status(404);
      break;
    default:
      break;
  }
  res.json({ status: "ERROR", message: error.message });
}
