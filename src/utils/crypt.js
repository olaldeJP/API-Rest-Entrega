import { hashSync, compareSync, genSaltSync } from "bcrypt";
import {
  NewError,
  ErrorType,
} from "../middlewares/errorsManagers.Middlewares.js";
export function hashear(frase) {
  return new Promise((resolve, reject) => {
    try {
      const hash = hashSync(frase, genSaltSync(10));
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
}

export async function hasheadasSonIguales(recibida, almacenada) {
  try {
    return compareSync(recibida, almacenada);
  } catch (error) {
    throw NewError(ErrorType.INVALID_DATA, "USER NOT FOUND");
  }
}
