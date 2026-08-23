import {
  EntradaTexto,
  Boton,
  ModalAviso,
} from "../componentesUI/ComponentesUI.jsx";
import { loginUsuario } from "../../servicios/serviceUsuario.js";
import { useNavigate } from "react-router-dom";
import { URL_BASE } from "../../constantes.js";

import { useState } from "react";
import "./ComponenteLogin.css";

export default function ComponenteLogin() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const navigate = useNavigate();

  async function login() {
    try {
      const respuesta = await loginUsuario(usuario, contrasena);
      if (respuesta && respuesta.success) {
        console.log("Login exitoso");
        navigate(URL_BASE + "/dashboard");
      } else {
        console.error("Error en login:", respuesta.message);
        setMostrarModal(true);
      }
    } catch (error) {
      console.error("Error en loginUsuario:", error);
      setMostrarModal(true);
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

      <ModalAviso
        titulo={"Aviso"}
        visible={mostrarModal}
        setVisible={setMostrarModal}
        mensaje={"Usuario o contraseña incorrectos"}
        mostrar={false}
        onCerrar={() => {}}
      />
    </div>
  );
}
