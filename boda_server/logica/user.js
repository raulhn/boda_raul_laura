import pool from "../bd/conexion.js";
import bcrypt from "bcrypt";
import * as wrapperBD from "../bd/wrapperBD.js";

import { ESQUEMA_BD, SALTROUNDS } from "../constantes.js";

export function comparar_passwords(password, password2) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, password2, (err, result) => {
      if (err) {
        console.error("Error al comparar las contraseñas:", err);
        reject(new Error("Error al comparar las contraseñas"));
      } else {
        resolve(result);
      }
    });
  });
}

export async function login(login, password) {
  try {
    const sql =
      "select * from " +
      ESQUEMA_BD +
      ".usuario where login = " +
      pool.escape(login) +
      " and password = " +
      pool.escape(password);

    const results = await wrapperBD.consulta(sql);
    return results;
  } catch (error) {
    console.error("Error en la función login:", error);
    throw new Error("Error en la función login");
  }
}

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALTROUNDS, (err, hash) => {
      if (err) {
        console.error("Error al hashear la contraseña:", err);
        reject(new Error("Error al hashear la contraseña"));
      } else {
        resolve(hash);
      }
    });
  });
}

export async function registrar(login, password) {
  try {
    const hash_password = await hashPassword(password);

    const sql =
      "insert into " +
      ESQUEMA_BD +
      ".usuario (login, password) values (" +
      pool.escape(login) +
      ", " +
      pool.escape(hash_password) +
      ")";

    const results = await wrapperBD.actualiza(sql);
    return results;
  } catch (error) {
    console.error("Error en la función registrar:", error);
    throw new Error("Error en la función registrar");
  }
}
