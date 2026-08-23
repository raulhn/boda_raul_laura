import { useCallback, useEffect, useState } from "react";
import {
  actualizarReto as actualizarRetoServicio,
  eliminarReto as eliminarRetoServicio,
  insertarReto as insertarRetoServicio,
  obtenerRetos,
} from "../servicios/serviceRetos.js";

export const useRetos = () => {
  const [retos, setRetos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const refrescarRetos = useCallback(async () => {
    setCargando(true);
    setError(null);

    try {
      const retosRecuperados = await obtenerRetos();
      setRetos(retosRecuperados);
    } catch (error) {
      console.error("Error al obtener los retos:", error);
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    refrescarRetos();
  }, [refrescarRetos]);

  const ejecutarMutacion = useCallback(
    async (mutacion) => {
      setGuardando(true);
      setError(null);

      try {
        await mutacion();
        await refrescarRetos();
      } catch (error) {
        console.error("Error al guardar el reto:", error);
        setError(error.message);
        throw error;
      } finally {
        setGuardando(false);
      }
    },
    [refrescarRetos],
  );

  const insertarReto = useCallback(
    (nombreReto, descripcion, estado, icono) =>
      ejecutarMutacion(() =>
        insertarRetoServicio(nombreReto, descripcion, estado, icono),
      ),
    [ejecutarMutacion],
  );

  const actualizarReto = useCallback(
    (idReto, nombreReto, descripcion, estado, icono) =>
      ejecutarMutacion(() =>
        actualizarRetoServicio(idReto, nombreReto, descripcion, estado, icono),
      ),
    [ejecutarMutacion],
  );

  const eliminarReto = useCallback(
    (idReto) => ejecutarMutacion(() => eliminarRetoServicio(idReto)),
    [ejecutarMutacion],
  );

  return {
    retos,
    cargando,
    guardando,
    error,
    refrescarRetos,
    insertarReto,
    actualizarReto,
    eliminarReto,
  };
};
