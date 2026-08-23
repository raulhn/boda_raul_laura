import { useCallback, useEffect, useState } from "react";
import {
  actualizarMesa as actualizarMesaServicio,
  eliminarMesa as eliminarMesaServicio,
  insertarMesa as insertarMesaServicio,
  obtenerMesas,
} from "../servicios/serviceMesas.js";

export const useMesas = () => {
  const [mesas, setMesas] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const refrescarMesas = useCallback(async () => {
    setCargando(true);
    setError(null);

    try {
      const mesasRecuperadas = await obtenerMesas();
      setMesas(mesasRecuperadas);
    } catch (error) {
      console.error("Error al obtener las mesas:", error);
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    refrescarMesas();
  }, [refrescarMesas]);

  const ejecutarMutacion = useCallback(
    async (mutacion) => {
      setGuardando(true);
      setError(null);

      try {
        await mutacion();
        await refrescarMesas();
      } catch (error) {
        console.error("Error al guardar la mesa:", error);
        setError(error.message);
        throw error;
      } finally {
        setGuardando(false);
      }
    },
    [refrescarMesas],
  );

  const insertarMesa = useCallback(
    (nombreMesa, descripcion) =>
      ejecutarMutacion(() => insertarMesaServicio(nombreMesa, descripcion)),
    [ejecutarMutacion],
  );

  const actualizarMesa = useCallback(
    (idMesa, nombreMesa, descripcion) =>
      ejecutarMutacion(() =>
        actualizarMesaServicio(idMesa, nombreMesa, descripcion),
      ),
    [ejecutarMutacion],
  );

  const eliminarMesa = useCallback(
    (idMesa) => ejecutarMutacion(() => eliminarMesaServicio(idMesa)),
    [ejecutarMutacion],
  );

  return {
    mesas,
    cargando,
    guardando,
    error,
    refrescarMesas,
    insertarMesa,
    actualizarMesa,
    eliminarMesa,
  };
};
