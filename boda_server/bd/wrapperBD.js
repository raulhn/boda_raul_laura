import pool from "./conexion.js";

export function consulta(sql) {
  return new Promise((resolve, reject) => {
    try {
      pool.getConnection((error, connection) => {
        try {
          if (error) {
            console.log("base_datos.js -> actualiza:", error);
            connection.release();
            reject(error);
          } else {
            try {
              pool.query(sql, (error, results) => {
                try {
                  if (error) {
                    console.log("base_datos.js -> actualiza:", error);
                    connection.release();

                    reject(error);
                  } else {
                    connection.release();

                    resolve(results);
                  }
                } catch (error) {
                  console.log("base_datos.js -> actualiza:", error);
                  connection.release();

                  reject(error);
                }
              });
            } catch (error) {
              console.log("base_datos.js -> actualiza:", error);
              connection.release();

              reject(error);
            }
          }
        } catch (error) {
          console.log("base_datos.js -> actualiza:", error);
          connection.release();
          reject(error);
        }
      });
    } catch (error) {
      console.log("base_datos.js -> actualiza:", error);
      reject(error);
    }
  });
}

export function actualiza(sql) {
  return new Promise((resolve, reject) => {
    try {
      pool.getConnection((error, connection) => {
        try {
          if (error) {
            console.log("base_datos.js -> actualiza:", error);
            connection.release();
            reject(error);
          } else {
            connection.beginTransaction((error) => {
              try {
                if (error) {
                  console.log("base_datos.js -> actualiza:", error);
                  connection.release();
                  reject(error);
                } else {
                  connection.query(sql, (error, results) => {
                    try {
                      if (error) {
                        connection.rollback();
                        console.log("base_datos.js -> actualiza:", error);
                        connection.release();
                        reject(error);
                      } else {
                        connection.commit((error) => {
                          if (error) {
                            connection.rollback();
                            console.log("base_datos.js -> actualiza:", error);
                            connection.release();
                            reject(error);
                          } else {
                            connection.release();
                            resolve(results);
                          }
                        });
                      }
                    } catch (error) {
                      console.log("base_datos.js -> actualiza:", error);
                      connection.release();
                      reject(error);
                    }
                  });
                }
              } catch (error) {
                console.log("base_datos.js -> actualiza:", error);
                connection.release();
                reject(error);
              }
            });
          }
        } catch (error) {
          console.log("base_datos.js -> actualiza:", error);
          reject(error);
        }
      });
    } catch (error) {
      console.log("base_datos.js -> actualiza:", error);
      reject(error);
    }
  });
}
