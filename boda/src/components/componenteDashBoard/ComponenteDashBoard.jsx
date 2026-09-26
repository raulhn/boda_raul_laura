import { Link } from "react-router-dom";
import { useState } from "react";
import { URL_BASE } from "../../constantes.js";
import { asignarRetosAutomaticamente } from "../../servicios/serviceRetos.js";
import "./ComponenteDashBoard.css";

export default function ComponenteDashBoard() {
  const [asignando, setAsignando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  async function asignarRetos() {
    const confirmar = window.confirm(
      "Se asignarán cinco retos aleatorios a cada mesa. Las asignaciones activas actuales se sustituirán. ¿Quieres continuar?",
    );
    if (!confirmar) {
      return;
    }

    setAsignando(true);
    setMensaje("");
    setError("");

    try {
      await asignarRetosAutomaticamente();
      setMensaje(
        "Se han asignado cinco retos distintos a cada mesa correctamente.",
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setAsignando(false);
    }
  }

  return (
    <div className="componente-dash-board">
      <h1>Bienvenido al Dashboard</h1>
      <p>Este es el componente principal del dashboard.</p>
      <nav className="dashboard-navegacion" aria-label="Administración">
        <Link to={`${URL_BASE}/mesas`}>Gestionar mesas</Link>
        <Link to={`${URL_BASE}/retos`}>Gestionar retos</Link>
        <Link to={`${URL_BASE}/tokens-mesa`}>Gestionar tokens de mesa</Link>
      </nav>
      <section className="dashboard-asignacion-retos">
        <h2>Asignación automática de retos</h2>
        <p>
          Distribuye cinco retos activos y distintos a cada mesa de invitados.
        </p>
        <button
          type="button"
          className="dashboard-boton-asignar"
          disabled={asignando}
          onClick={asignarRetos}
        >
          {asignando
            ? "Asignando retos..."
            : "Asignar retos automáticamente"}
        </button>
        {mensaje && <p className="dashboard-exito" role="status">{mensaje}</p>}
        {error && <p className="dashboard-error" role="alert">{error}</p>}
      </section>
    </div>
  );
}
