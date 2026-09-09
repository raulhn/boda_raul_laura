import { useEffect, useState } from "react";
import {
  generarTokenMesa,
  obtenerTokensMesas,
} from "../../servicios/serviceTokensMesa.js";
import "./ComponenteTokensMesa.css";

export default function ComponenteTokensMesa() {
  const [mesas, setMesas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mesaGenerando, setMesaGenerando] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerTokensMesas()
      .then((respuesta) => setMesas(respuesta.mesas))
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false));
  }, []);

  async function asignarToken(idMesa) {
    setMesaGenerando(idMesa);
    setError("");

    try {
      const { token } = await generarTokenMesa(idMesa);
      setMesas((mesasActuales) =>
        mesasActuales.map((mesa) =>
          mesa.id_mesa === idMesa ? { ...mesa, token } : mesa,
        ),
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setMesaGenerando(null);
    }
  }

  return (
    <section className="componente-tokens-mesa">
      <h1>Tokens de acceso por mesa</h1>
      <p>
        Genera un token para cada mesa y entrégalo a sus invitados. Regenerarlo
        invalida el token anterior de esa mesa.
      </p>

      {error && <p className="tokens-mesa-error" role="alert">{error}</p>}
      {cargando ? (
        <p>Cargando mesas...</p>
      ) : mesas.length === 0 ? (
        <p>No hay mesas registradas.</p>
      ) : (
        <table className="tokens-mesa-tabla">
          <thead>
            <tr>
              <th>Mesa</th>
              <th>Descripción</th>
              <th>Token de acceso</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {mesas.map((mesa) => (
              <tr key={mesa.id_mesa}>
                <td>{mesa.nombre_mesa}</td>
                <td>{mesa.descripcion}</td>
                <td>
                  {mesa.token ? (
                    <code className="tokens-mesa-token">{mesa.token}</code>
                  ) : (
                    "Sin token"
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="tokens-mesa-boton"
                    disabled={mesaGenerando !== null}
                    onClick={() => asignarToken(mesa.id_mesa)}
                  >
                    {mesaGenerando === mesa.id_mesa
                      ? "Generando..."
                      : mesa.token
                        ? "Regenerar token"
                        : "Generar token"}
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
