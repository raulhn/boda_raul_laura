import { useState, useEffect } from "react";
import { obtenerMesas } from "../services/mesas";

export const useMesas = () => {
  const [mesas, setMesas] = useState([]);
  const [refrescar, setRefrescar] = useState(false);
  const [error, setError] = useState(null);

  function refrescarMesas() {
    setRefrescar(!refrescar);
  }

  useEffect(() => {
    obtenerMesas()
      .then((mesasRecuperadas) => {
        setMesas(mesasRecuperadas);
      })
      .catch((error) => {
        console.error("Error al obtener las mesas:", error);
        setError(error);
      });
  }, [refrescar]);

  return { mesas, refrescarMesas, error };
};
