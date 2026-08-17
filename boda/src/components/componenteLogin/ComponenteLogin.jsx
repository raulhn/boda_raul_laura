import { EntradaTexto, Boton } from "../componentesUI/ComponentesUI.jsx";

import { useState } from "react";

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
        setValor={setUsuario}
        placeholder={"Usuario"}
      />
      <EntradaTexto
        valor={contrasena}
        setValor={setContrasena}
        placeholder={"Contraseña"}
        secure={true}
      />

      <Boton texto={"Iniciar sesión"} onClick={login} />
    </div>
  );
}
