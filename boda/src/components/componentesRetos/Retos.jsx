import { useState } from "react";
import { MdCameraAlt, MdCardGiftcard, MdSend } from "react-icons/md";
import { EntradaFichero, EntradaTexto } from "../componentesUI/ComponentesUI.jsx";
import {
  iniciarSesionInvitado,
  obtenerRetosInvitado,
  subirFotoReto,
} from "../../servicios/serviceInvitados.js";
import "./Retos.css";

export default function Retos() {
  const [token, setToken] = useState("");
  const [retos, setRetos] = useState([]);
  const [retoId, setRetoId] = useState("");
  const [fichero, setFichero] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  async function iniciarSesion(event) {
    event.preventDefault();
    setCargando(true);
    setError("");
    setMensaje("");

    try {
      await iniciarSesionInvitado(token);
      const retosAsignados = await obtenerRetosInvitado();
      setRetos(retosAsignados);
      setRetoId(retosAsignados[0]?.id_reto ?? "");
      setMensaje(
        retosAsignados.length > 0
          ? "Sesión iniciada. Elige un reto y sube tu foto."
          : "Esta mesa no tiene retos fotográficos activos.",
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  async function enviarFoto(event) {
    event.preventDefault();
    if (!retoId || !fichero) {
      setError("Selecciona un reto y una foto.");
      return;
    }

    setCargando(true);
    setError("");
    setMensaje("");

    try {
      await subirFotoReto(retoId, fichero);
      setMensaje("Foto enviada correctamente. Gracias por participar.");
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <section className="retos section" id="retos">
      <div className="container retos-contenedor">
        <h2 className="section-title">Retos fotográficos</h2>
        <p className="section-subtitle">
          Accede con el token de tu mesa y comparte tus mejores recuerdos.
        </p>

        <div className="retos-grid">
          <div className="reto-item">
            <div className="reto-icono">
              <MdCameraAlt aria-hidden="true" />
            </div>
            <div>
              <span className="reto-etiqueta">BODA RAÚL Y LAURA</span>
              <h3>Comparte tu recuerdo</h3>
            </div>
            <p>
              Cada mesa recibe sus propios retos. Completa los que aparecen al
              iniciar sesión con el token entregado en vuestra mesa.
            </p>
            <div className="reto-premio">
              <MdCardGiftcard aria-hidden="true" />
              <span>Las mejores fotos formarán parte de nuestro álbum.</span>
            </div>
          </div>

          <div>
            <form className="retos-form" onSubmit={iniciarSesion}>
              <div className="retos-form-cabecera">
                <span className="retos-paso">PASO 1</span>
                <h3>Accede con el token de tu mesa</h3>
              </div>
              <div className="retos-campo">
                <label htmlFor="token-mesa">Token de mesa</label>
                <EntradaTexto
                  id="token-mesa"
                  valor={token}
                  setTexto={setToken}
                  placeholder="Introduce el token"
                  width="100%"
                  height="48px"
                />
              </div>
              <button className="retos-enviar" type="submit" disabled={cargando}>
                Iniciar sesión
                <MdSend aria-hidden="true" />
              </button>
            </form>

            {retos.length > 0 && (
              <form className="retos-form retos-form-subida" onSubmit={enviarFoto}>
                <div className="retos-form-cabecera">
                  <span className="retos-paso">PASO 2</span>
                  <h3>Completa un reto</h3>
                </div>
                <div className="retos-campo">
                  <label htmlFor="reto">Reto fotográfico</label>
                  <select
                    id="reto"
                    value={retoId}
                    onChange={(event) => setRetoId(event.target.value)}
                  >
                    {retos.map((reto) => (
                      <option key={reto.id_reto} value={reto.id_reto}>
                        {reto.nombre_reto}
                      </option>
                    ))}
                  </select>
                  {retos.find((reto) => String(reto.id_reto) === String(retoId))
                    ?.descripcion && (
                    <p className="retos-nota">
                      {
                        retos.find(
                          (reto) => String(reto.id_reto) === String(retoId),
                        ).descripcion
                      }
                    </p>
                  )}
                </div>
                <div className="retos-campo retos-campo-fichero">
                  <span className="retos-etiqueta-campo">Tu foto</span>
                  <EntradaFichero setFichero={setFichero} width="100%" />
                  <p className="retos-nota">
                    Formatos admitidos: JPG, PNG, WEBP, HEIC o HEIF. Máximo 10 MB.
                  </p>
                </div>
                <button className="retos-enviar" type="submit" disabled={cargando}>
                  Enviar mi participación
                  <MdSend aria-hidden="true" />
                </button>
              </form>
            )}

            {mensaje && <p className="retos-estado" role="status">{mensaje}</p>}
            {error && <p className="retos-error" role="alert">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
