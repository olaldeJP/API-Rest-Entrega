import { hashSync, compareSync, genSaltSync } from "bcrypt";
import {
  NewError,
  ErrorType,
} from "../middlewares/errorsManagers.Middlewares.js";
export function hashear(frase) {
  return hashSync(frase, genSaltSync(10));
}

export async function hasheadasSonIguales(recibida, almacenada) {
  try {
    return compareSync(recibida, almacenada);
  } catch (error) {
    throw NewError(ErrorType.INVALID_DATA, "USER NOT FOUND");
  }
}
