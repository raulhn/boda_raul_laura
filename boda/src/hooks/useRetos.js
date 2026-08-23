const { useState, useEffect } = require("react");
import { obtenerRetos } from "../services/s";

export const useMesas = () => {
  const [mesas, setMesas] = useState([]);
  const [refrescar, setRefrescar] = useState(false);
  const [error, setError] = useState(null);

  function refrescarMesas() {
    setRefrescar(!refrescar);
  }

  async function fetchMesas() {
    try {
      const retos = await obtenerRetos();
    } catch (error) {
      console.error("Error al obtener los retos:", error);
      throw new Error("Error al obtener los retos: ", error);
    }
  }
};
