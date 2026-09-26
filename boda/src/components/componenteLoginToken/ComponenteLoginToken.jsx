import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL_BASE } from "../../constantes.js";

export default function ComponenteLoginToken() {
  const navigate = useNavigate();
  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    if (token) {
      navigate(`${URL_BASE}/token-login/${encodeURIComponent(token)}`, {
        replace: true,
      });
    }
  }, [navigate, token]);

  return (
    <div>
      <h1>Acceso a retos</h1>
      <p>
        {token
          ? "Abriendo los retos de tu mesa..."
          : "Falta el token de acceso de la mesa."}
      </p>
    </div>
  );
}
