import { EntradaTexto, Boton } from "../componentesUI/ComponentesUI.jsx";
import { loginUsuario } from "../../servicios/serviceUsuario.js";

import { useState } from "react";
import "./ComponenteLogin.css";

export default function ComponenteLogin() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  async function login() {
    try {
      const respuesta = await loginUsuario(usuario, contrasena);
      if (respuesta && respuesta.success) {
        console.log("Login exitoso");
      } else {
        console.error("Error en login:", respuesta.message);
      }
    } catch (error) {
      console.error("Error en loginUsuario:", error);
    }
  }

  return (
    <div className="componente-login">
      <EntradaTexto
        valor={usuario}
        setTexto={setUsuario}
        placeholder={"Usuario"}
      />
      <EntradaTexto
        valor={contrasena}
        setTexto={setContrasena}
        placeholder={"Contraseña"}
        secure={true}
      />

      <Boton texto={"Iniciar sesión"} onClick={login} />
    </div>
  );
}
