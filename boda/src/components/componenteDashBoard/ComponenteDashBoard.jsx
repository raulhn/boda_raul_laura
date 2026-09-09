import { Link } from "react-router-dom";
import { URL_BASE } from "../../constantes.js";
import "./ComponenteDashBoard.css";

export default function ComponenteDashBoard() {
  return (
    <div className="componente-dash-board">
      <h1>Bienvenido al Dashboard</h1>
      <p>Este es el componente principal del dashboard.</p>
      <nav className="dashboard-navegacion" aria-label="Administración">
        <Link to={`${URL_BASE}/mesas`}>Gestionar mesas</Link>
        <Link to={`${URL_BASE}/retos`}>Gestionar retos</Link>
        <Link to={`${URL_BASE}/tokens-mesa`}>Gestionar tokens de mesa</Link>
      </nav>
    </div>
  );
}
