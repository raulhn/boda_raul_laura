import { useEffect } from "react";
import { loginToken } from "../../servicios/serviceUsuario";
import { useNavigate } from "react-router-dom";

export default function ComponenteLoginToken() {
  const navigate = useNavigate();
  function login() {
    // Obtener un parámetro específico
    const parametros = new URLSearchParams(window.location.search);
    const token = parametros.get("token");

    if (token) {
      loginToken(token)
        .then((respuesta) => {
          console.log("Login con token exitoso:", respuesta);
          navigate("/retos-mesas");
        })
        .catch((error) => {
          console.error("Error en login con token:", error);
          // Aquí puedes manejar el error del login con token
        });
    } else {
      console.log("No hay token almacenado en localStorage.");
    }
  }

  useEffect(() => {
    login();
  }, []);

  return (
    <div>
      <h1>Componente Login Token</h1>
      <p>Este es el componente de login con token.</p>
    </div>
  );
}
