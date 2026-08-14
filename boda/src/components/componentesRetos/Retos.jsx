import {
  EntradaTexto,
  EntradaFichero,
} from "../componentesUI/ComponentesUI.jsx";
import { useState } from "react";
import {
  MdCameraAlt,
  MdCardGiftcard,
  MdLockOutline,
  MdSend,
} from "react-icons/md";
import "./Retos.css";

export default function Retos() {
  const [mesa, setMesa] = useState("");
  const [clave, setClave] = useState("");
  const [, setFichero] = useState(null);
  return (
    <>
      <section className="retos section" id="retos">
        <div className="container retos-contenedor">
          <h2 className="section-title">Retos</h2>
          <p className="section-subtitle">
            ¡Participa en nuestros retos y gana premios especiales!
          </p>

          <div className="retos-grid">
            <div className="reto-item">
              <div className="reto-icono">
                <MdCameraAlt aria-hidden="true" />
              </div>
              <div>
                <span className="reto-etiqueta">RETO ACTIVO</span>
                <h3>Reto de Fotos</h3>
              </div>
              <p>
                Comparte tus mejores fotos del evento en Instagram usando el
                hashtag #BodaRaulLaura. Las mejores fotos serán premiadas.
              </p>
              <div className="reto-premio">
                <MdCardGiftcard aria-hidden="true" />
                <span>Tu foto puede ganar un premio especial</span>
              </div>
            </div>

            <form
              className="retos-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="retos-form-cabecera">
                <span className="retos-paso">PASO 1 DE 1</span>
                <h3>Comparte tu mejor recuerdo</h3>
                <p>Identifícate y selecciona la foto con la que participas.</p>
              </div>

              <div className="retos-campos">
                <div className="retos-campo">
                  <label htmlFor="mesa">Número de mesa</label>
                  <EntradaTexto
                    id="mesa"
                    valorDefecto={mesa}
                    setTexto={setMesa}
                    placeholder="Ej. 12"
                    width="100%"
                    height="48px"
                  />
                </div>
                <div className="retos-campo">
                  <label htmlFor="clave">Clave de participación</label>
                  <div className="retos-input-con-icono">
                    <MdLockOutline aria-hidden="true" />
                    <EntradaTexto
                      id="clave"
                      valorDefecto={clave}
                      setTexto={setClave}
                      secure={true}
                      placeholder="Tu clave"
                      width="100%"
                      height="48px"
                    />
                  </div>
                </div>
              </div>

              <div className="retos-campo retos-campo-fichero">
                <span className="retos-etiqueta-campo">Tu foto</span>
                <EntradaFichero setFichero={setFichero} width="100%" />
                <p className="retos-nota">Formatos admitidos: JPG, PNG o HEIC.</p>
              </div>

              <button className="retos-enviar" type="submit">
                Enviar mi participación
                <MdSend aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
