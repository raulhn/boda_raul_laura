import { useState, useEffect } from "react";
import { obtenerRetos } from "../services/s";

export const useMesas = () => {
  const [retos, setRetos] = useState([]);
  const [refrescar, setRefrescar] = useState(false);
  const [error, setError] = useState(null);

  function refrescarRetos() {
    setRefrescar(!refrescar);
  }

  useEffect(() => {
    obtenerRetos()
      .then((retos) => {
        setRetos(retos);
      })
      .catch((error) => {
        console.error("Error al obtener los retos:", error);
        setError(error);
      });
  }, [refrescar]);

  return { retos, refrescarRetos, error };
};
