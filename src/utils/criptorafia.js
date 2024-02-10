import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export function encriptar(data) {
  return new Promise((resolve, reject) => {
    if (!data) {
      reject(new Error("Invalid data for encryption"));
    }
    jwt.sign(data, JWT_SECRET, { expiresIn: "24h" }, (err, encoded) => {
      //encoded:datos encriptados
      if (err) {
        reject(err);
      } else {
        resolve(encoded);
      }
    });
  });
}

export function desencriptar(token) {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error("Invalid Token"));
    }
    jwt.verify(token, JWT_SECRET, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
