import { useState, useEffect } from "react";

export const useMesas = () => {
  const [mesas, setMesas] = useState([]);
  const [refrescar, setRefrescar] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMesas() {
    try {
      const mesasRecuperadas = await obtenerMesas();
      setMesas(mesasRecuperadas);
    } catch (error) {
      console.error("Error al obtener las mesas:", error);
      setError("Error al obtener las mesas: ", error);
      throw new Error("Error al obtener las mesas: ", error);
    }
  }

  function refrescarMesas() {
    setRefrescar(!refrescar);
  }

  useEffect(() => {
    fetchMesas();
  }, [refrescar]);

  return { mesas, refrescarMesas, error };
};
