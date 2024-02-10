export async function manejadorDeErrores(error, req, res, next) {
  res.status(400).json({ status: "error", message: error.message });
}
