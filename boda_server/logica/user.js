import pool from "../bd/conexion.js";
import bcrypt from "bcrypt";
import * as wrapperBD from "../bd/wrapperBD.js";

import { ESQUEMA_BD, SALTROUNDS } from "../constantes.js";

export async function comparar_passwords(password, password2) {
  console.log("Comparar passwords", password, password2)
  const resultado = await bcrypt.compare(password, password2)
  console.log("Resultado", resultado)
  return resultado
}

export async function obtenerUsuario(login) {
  try {
    await compruebaUsuAdmin();
    const sql = "select * from " + ESQUEMA_BD + ".usuario where login = " + pool.escape(login);
    console.log("SQL", sql)

    const results = await wrapperBD.consulta(sql);
    return results
  } catch (error) {
    console.error("Error en la funcion de obtenerUsuario", error)
    throw new Error("Error en la funcion de obtenerUsuario")
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

// Comprueba si existe el usuario admin, si no existe lo crea con la contraseña del .env
export async function compruebaUsuAdmin() {
  try {
    const password_admin = process.env.PASSWORD_ADMIN;
    const sql =
      "select * from " +
      ESQUEMA_BD +
      ".usuario where login = " +
      pool.escape("admin");
    const results = await wrapperBD.consulta(sql);
    if (results.length === 0) {
      await registrar("admin", password_admin);
      return true;
    }
    return true;
  } catch (error) {
    console.error("Error en la función compruebaUsuAdmin:", error);
    return false;
  }
}
