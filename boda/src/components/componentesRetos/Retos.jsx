import { useEffect, useState } from "react";
import { MdCameraAlt, MdCardGiftcard, MdSend } from "react-icons/md";
import { EntradaTexto } from "../componentesUI/ComponentesUI.jsx";
import { useParams } from "react-router-dom";
import {
  iniciarSesionInvitado,
  obtenerRetosInvitado,
  subirFotoReto,
} from "../../servicios/serviceInvitados.js";
import "./Retos.css";

export default function Retos() {
  const { token: tokenRuta } = useParams();
  const [token, setToken] = useState("");
  const [retos, setRetos] = useState([]);
  const [ficheros, setFicheros] = useState({});
  const [retoEnSubida, setRetoEnSubida] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tokenRuta) {
      return;
    }

    async function iniciarSesionDesdeEnlace() {
      setCargando(true);
      setError("");
      setMensaje("");

      try {
        await iniciarSesionInvitado(tokenRuta);
        const retosAsignados = await obtenerRetosInvitado();
        setRetos(retosAsignados);
        setMensaje("Sesión iniciada. Completa los retos y sube una foto para cada uno.");
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    iniciarSesionDesdeEnlace();
  }, [tokenRuta]);

  async function iniciarSesion(event) {
    event.preventDefault();
    setCargando(true);
    setError("");
    setMensaje("");

    try {
      await iniciarSesionInvitado(token);
      const retosAsignados = await obtenerRetosInvitado();
      setRetos(retosAsignados);
      setMensaje(
        retosAsignados.length > 0
          ? "Sesión iniciada. Completa los retos y sube una foto para cada uno."
          : "Esta mesa no tiene retos fotográficos activos.",
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  function seleccionarFichero(retoId, fichero) {
    setFicheros((ficherosActuales) => ({
      ...ficherosActuales,
      [retoId]: fichero,
    }));
  }

  async function enviarFoto(event, retoId) {
    event.preventDefault();
    const fichero = ficheros[retoId];

    if (!fichero) {
      setError("Selecciona una foto para este reto.");
      return;
    }

    setRetoEnSubida(retoId);
    setError("");
    setMensaje("");

    try {
      await subirFotoReto(retoId, fichero);
      setRetos(await obtenerRetosInvitado());
      setFicheros((ficherosActuales) => ({
        ...ficherosActuales,
        [retoId]: null,
      }));
      setMensaje("Foto guardada correctamente.");
    } catch (error) {
      setError(error.message);
    } finally {
      setRetoEnSubida(null);
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
              <section className="retos-form retos-form-subida">
                <div className="retos-form-cabecera">
                  <span className="retos-paso">PASO 2</span>
                  <h3>Completa tus retos</h3>
                </div>
                <div className="retos-lista">
                  {retos.map((reto) => (
                    <article className="reto-subida" key={reto.id_reto}>
                      <h4>{reto.nombre_reto}</h4>
                      <p>{reto.descripcion}</p>
                      {reto.ruta_foto && (
                        <img
                          className="reto-foto"
                          src={`/static/photos/${reto.ruta_foto}`}
                          alt={`Foto enviada para ${reto.nombre_reto}`}
                        />
                      )}
                      <form onSubmit={(event) => enviarFoto(event, reto.id_reto)}>
                        <label
                          className="reto-fichero"
                          htmlFor={`foto-reto-${reto.id_reto}`}
                        >
                          <span>Selecciona una foto</span>
                          <input
                            id={`foto-reto-${reto.id_reto}`}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                            onChange={(event) =>
                              seleccionarFichero(
                                reto.id_reto,
                                event.target.files?.[0] ?? null,
                              )
                            }
                          />
                          {ficheros[reto.id_reto] && (
                            <small>{ficheros[reto.id_reto].name}</small>
                          )}
                        </label>
                        <button
                          className="retos-enviar"
                          type="submit"
                          disabled={retoEnSubida === reto.id_reto}
                        >
                          {retoEnSubida === reto.id_reto
                            ? "Guardando..."
                            : reto.ruta_foto
                              ? "Sustituir mi foto"
                              : "Subir mi foto"}
                          <MdSend aria-hidden="true" />
                        </button>
                      </form>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {mensaje && <p className="retos-estado" role="status">{mensaje}</p>}
            {error && <p className="retos-error" role="alert">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
