import { useState } from "react";
import { useMesas } from "../../hooks/useMesas";
import "./ComponenteMesas.css";

export default function ComponenteMesas() {
  const {
    mesas,
    cargando,
    guardando,
    error,
    insertarMesa,
    actualizarMesa,
    eliminarMesa,
  } = useMesas();
  const [nombreMesa, setNombreMesa] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mesaEditando, setMesaEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");

  function limpiarFormulario() {
    setNombreMesa("");
    setDescripcion("");
    setMesaEditando(null);
  }

  async function guardarMesa(event) {
    event.preventDefault();
    setMensaje("");

    try {
      if (mesaEditando) {
        await actualizarMesa(mesaEditando, nombreMesa, descripcion);
        setMensaje("Mesa actualizada correctamente.");
      } else {
        await insertarMesa(nombreMesa, descripcion);
        setMensaje("Mesa creada correctamente.");
      }
      limpiarFormulario();
    } catch {
      // El hook expone el error de la petición.
    }
  }

  function editarMesa(mesa) {
    setMesaEditando(mesa.id_mesa);
    setNombreMesa(mesa.nombre_mesa);
    setDescripcion(mesa.descripcion);
    setMensaje("");
  }

  async function borrarMesa(idMesa) {
    if (!window.confirm("¿Quieres eliminar esta mesa?")) {
      return;
    }

    setMensaje("");
    try {
      await eliminarMesa(idMesa);
      if (mesaEditando === idMesa) {
        limpiarFormulario();
      }
      setMensaje("Mesa eliminada correctamente.");
    } catch {
      // El hook expone el error de la petición.
    }
  }

  return (
    <section className="componente-mesas">
      <h1>Gestión de mesas</h1>
      <form className="mesas-formulario" onSubmit={guardarMesa}>
        <label htmlFor="nombre-mesa">Nombre</label>
        <input
          id="nombre-mesa"
          value={nombreMesa}
          onChange={(event) => setNombreMesa(event.target.value)}
          maxLength="100"
          required
        />
        <label htmlFor="descripcion-mesa">Descripción</label>
        <textarea
          id="descripcion-mesa"
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
          maxLength="500"
          required
        />
        <div className="mesas-acciones-formulario">
          <button type="submit" className="btn" disabled={guardando}>
            {guardando
              ? "Guardando..."
              : mesaEditando
                ? "Actualizar mesa"
                : "Crear mesa"}
          </button>
          {mesaEditando && (
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
        <p className="mesas-mensaje" role="status">
          {mensaje}
        </p>
      )}
      {error && (
        <p className="mesas-error" role="alert">
          {error}
        </p>
      )}

      {cargando ? (
        <p>Cargando mesas...</p>
      ) : mesas.length === 0 ? (
        <p>No hay mesas registradas.</p>
      ) : (
        <table className="mesas-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mesas.map((mesa) => (
              <tr key={mesa.id_mesa}>
                <td>{mesa.nombre_mesa}</td>
                <td>{mesa.descripcion}</td>
                <td className="mesas-acciones">
                  <button
                    type="button"
                    onClick={() => editarMesa(mesa)}
                    className="btn-editar"
                    disabled={guardando}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => borrarMesa(mesa.id_mesa)}
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
