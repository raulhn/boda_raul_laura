import { useCallback, useEffect, useState } from "react";
import { obtenerRetosAsignadosMesas } from "../../servicios/serviceRetos.js";
import "./ComponenteRetosMesas.css";

function obtenerCategoria(nombreReto) {
  const nombre = nombreReto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-ES");
  const categorias = [
    ["Bonitos", /\bbonit[oa]s?\b/],
    ["Búsqueda", /\bbusqueda\b/],
    ["Con los novios", /\bcon (?:los )?novios\b/],
    ["Difíciles", /\bdificil(?:es)?\b/],
    ["Divertidas", /\bdivertid[oa]s?\b/],
    ["Durante la Fiesta", /\bdurante la fiesta\b/],
    ["En la Boda", /\ben la boda\b/],
    ["Fáciles", /\bfacil(?:es)?\b/],
    ["Interacción", /\binteracci(?:on|ones)\b/],
  ];
  return categorias.find(([, patron]) => patron.test(nombre))?.[0] ?? "Sin categoría";
}

export default function ComponenteRetosMesas() {
  const [asignaciones, setAsignaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarAsignaciones = useCallback(async () => {
    setCargando(true);
    setError("");
    try {
      setAsignaciones(await obtenerRetosAsignadosMesas());
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(cargarAsignaciones);
  }, [cargarAsignaciones]);

  const mesas = asignaciones.reduce((mesasPorId, asignacion) => {
    let mesa = mesasPorId.get(asignacion.id_mesa);
    if (!mesa) {
      mesa = {
        idMesa: asignacion.id_mesa,
        nombreMesa: asignacion.nombre_mesa,
        retos: [],
      };
      mesasPorId.set(asignacion.id_mesa, mesa);
    }
    if (asignacion.id_reto) {
      mesa.retos.push(asignacion);
    }
    return mesasPorId;
  }, new Map());

  return (
    <section className="retos-mesas">
      <div className="retos-mesas-cabecera">
        <div>
          <h1>Retos asignados por mesa</h1>
          <p>
            La categoría se identifica a partir del nombre del reto, por
            ejemplo: &quot;Bonitos: Foto de grupo&quot;.
          </p>
        </div>
        <button type="button" onClick={cargarAsignaciones} disabled={cargando}>
          {cargando ? "Actualizando..." : "Actualizar"}
        </button>
      </div>

      {error && <p className="retos-mesas-error" role="alert">{error}</p>}
      {cargando ? (
        <p>Cargando retos asignados...</p>
      ) : asignaciones.length === 0 ? (
        <p>No hay mesas registradas.</p>
      ) : (
        <div className="retos-mesas-lista">
          {[...mesas.values()].map((mesa) => (
            <article className="retos-mesa" key={mesa.idMesa}>
              <h2>{mesa.nombreMesa}</h2>
              {mesa.retos.length === 0 ? (
                <p>Esta mesa no tiene retos activos asignados.</p>
              ) : (
                <ul className="retos-mesa-lista">
                  {mesa.retos.map((reto) => (
                    <li key={reto.id_reto}>
                      <strong>{reto.nombre_reto}</strong>
                      <span>{obtenerCategoria(reto.nombre_reto)}</span>
                      <p>{reto.descripcion}</p>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
