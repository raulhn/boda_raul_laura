import pool from "../bd/conexion.js";
import bcrypt from "bcrypt";

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

export function login(login, password) {
  const sql =
    "select * from usuario where login = " +
    pool.escape(login) +
    " and password = " +
    pool.escape(password);

  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        reject("Error al obtener el usuario");
        return;
      }

      if (results.length === 0) {
        reject("Usuario no encontrado");
        return;
      }

      resolve(results);
    });
  });
}
