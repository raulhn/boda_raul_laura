import {
  EntradaTexto,
  EntradaFichero,
} from "../componentesUI/ComponentesUI.jsx";
import { useState } from "react";
import "./Retos.css";

export default function Retos() {
  const [mesa, setMesa] = useState("");
  const [clave, setClave] = useState("");
  const [fichero, setFichero] = useState(null);
  return (
    <>
      <section className="retos section" id="retos">
        <div className="container">
          <h2 className="section-title">Retos</h2>
          <p className="section-subtitle">
            ¡Participa en nuestros retos y gana premios especiales!
          </p>

          <div className="retos-grid">
            <div className="reto-item">
              <h3>Reto de Fotos</h3>
              <p>
                Comparte tus mejores fotos del evento en Instagram usando el
                hashtag #BodaRaulLaura. Las mejores fotos serán premiadas.
              </p>
            </div>
          </div>
        </div>

        <form>
          <label>Mesa</label>
          <EntradaTexto valorDefecto={mesa} setTexto={setMesa} />

          <label>Clave</label>
          <EntradaTexto
            valorDefecto={clave}
            setTexto={setClave}
            secure={true}
          />

          <EntradaFichero setFichero={setFichero} />

          <button type="submit">Enviar</button>
        </form>
      </section>
    </>
  );
}
