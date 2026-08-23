import { useState } from "react";
import { useRetos } from "../../hooks/useRetos.js";
import "./ComponenteRetos.css";

const ESTADOS = ["activo", "inactivo", "finalizado"];

export default function ComponenteRetos() {
  const {
    retos,
    cargando,
    guardando,
    error,
    insertarReto,
    actualizarReto,
    eliminarReto,
  } = useRetos();
  const [nombreReto, setNombreReto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("activo");
  const [icono, setIcono] = useState("");
  const [retoEditando, setRetoEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");

  function limpiarFormulario() {
    setNombreReto("");
    setDescripcion("");
    setEstado("activo");
    setIcono("");
    setRetoEditando(null);
  }

  async function guardarReto(event) {
    event.preventDefault();
    setMensaje("");

    try {
      if (retoEditando) {
        await actualizarReto(
          retoEditando,
          nombreReto,
          descripcion,
          estado,
          icono,
        );
        setMensaje("Reto actualizado correctamente.");
      } else {
        await insertarReto(nombreReto, descripcion, estado, icono);
        setMensaje("Reto creado correctamente.");
      }
      limpiarFormulario();
    } catch {
      // El hook expone el error de la petición.
    }
  }

  function editarReto(reto) {
    setRetoEditando(reto.id_reto);
    setNombreReto(reto.nombre_reto);
    setDescripcion(reto.descripcion);
    setEstado(reto.estado);
    setIcono(reto.icono);
    setMensaje("");
  }

  async function borrarReto(idReto) {
    if (!window.confirm("¿Quieres eliminar este reto?")) {
      return;
    }

    setMensaje("");
    try {
      await eliminarReto(idReto);
      if (retoEditando === idReto) {
        limpiarFormulario();
      }
      setMensaje("Reto eliminado correctamente.");
    } catch {
      // El hook expone el error de la petición.
    }
  }

  return (
    <section className="componente-retos">
      <h1>Gestión de retos</h1>
      <form className="retos-formulario" onSubmit={guardarReto}>
        <label htmlFor="nombre-reto">Nombre</label>
        <input
          id="nombre-reto"
          value={nombreReto}
          onChange={(event) => setNombreReto(event.target.value)}
          maxLength="100"
          required
        />
        <label htmlFor="descripcion-reto">Descripción</label>
        <textarea
          id="descripcion-reto"
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
          maxLength="500"
          required
        />
        <label htmlFor="estado-reto">Estado</label>
        <select
          id="estado-reto"
          value={estado}
          onChange={(event) => setEstado(event.target.value)}
        >
          {ESTADOS.map((estadoDisponible) => (
            <option key={estadoDisponible} value={estadoDisponible}>
              {estadoDisponible}
            </option>
          ))}
        </select>
        <label htmlFor="icono-reto">Icono</label>
        <input
          id="icono-reto"
          value={icono}
          onChange={(event) => setIcono(event.target.value)}
          maxLength="100"
          placeholder="Ej. cámara o URL del icono"
          required
        />
        <div className="retos-acciones-formulario">
          <button type="submit" className="btn" disabled={guardando}>
            {guardando
              ? "Guardando..."
              : retoEditando
                ? "Actualizar reto"
                : "Crear reto"}
          </button>
          {retoEditando && (
            <button
              type="button"
              className="btn"
              onClick={limpiarFormulario}
              disabled={guardando}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {mensaje && (
        <p className="retos-mensaje" role="status">
          {mensaje}
        </p>
      )}
      {error && (
        <p className="retos-error" role="alert">
          {error}
        </p>
      )}

      {cargando ? (
        <p>Cargando retos...</p>
      ) : retos.length === 0 ? (
        <p>No hay retos registrados.</p>
      ) : (
        <table className="retos-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Icono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {retos.map((reto) => (
              <tr key={reto.id_reto}>
                <td>{reto.nombre_reto}</td>
                <td>{reto.descripcion}</td>
                <td>{reto.estado}</td>
                <td>{reto.icono}</td>
                <td className="retos-acciones">
                  <button
                    type="button"
                    onClick={() => editarReto(reto)}
                    className="btn-editar"
                    disabled={guardando}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => borrarReto(reto.id_reto)}
                    disabled={guardando}
                    className="btn-eliminar"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
