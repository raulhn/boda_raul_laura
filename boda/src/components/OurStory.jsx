import "./OurStory.css";

const OurStory = () => {
  return (
    <section id="story" className="our-story section">
      <div className="container">
        <h2 className="section-title">Nuestra Historia</h2>

        <div className="story-timeline">
          <div className="timeline-item">
            <div className="timeline-date">2018</div>
            <div className="timeline-content">
              <h3>Nos Conocimos</h3>
              <p></p>
            </div>
            <div className="timeline-icon">❤️</div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">23 de octubre de 2021</div>
            <div className="timeline-content">
              <h3>Iniciamos nuestra relacióm</h3>
              <p></p>
            </div>
            <div className="timeline-icon">✈️</div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">Abril de 2022</div>
            <div className="timeline-content">
              <h3>Viviendo Juntos</h3>
              <p>
                Decidimos dar el siguiente paso y decidimos irnos a vivirjuntos.
                Cada día se convirtió en una nueva aventura llena de amor y
                complicidad.
              </p>
            </div>
            <div className="timeline-icon">🏠</div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">14 de febrero de 2026</div>
            <div className="timeline-content">
              <h3>¡La Propuesta!</h3>
              <p>
                En un lugar muy especial para nosotros, Raúl se lanzó y me pidió
                matrimonio. (Por supuesto dije que SÍ)
              </p>
            </div>
            <div className="timeline-icon">💍</div>
          </div>

          <div className="timeline-item current">
            <div className="timeline-date">2027</div>
            <div className="timeline-content">
              <h3>¡Nos Casamos!</h3>
              <p>
                Y aquí estamos, a punto de dar el paso más importante de
                nuestras vidas. Queremos celebrar este momento único con todas
                las personas que amamos.
              </p>
            </div>
            <div className="timeline-icon">💒</div>
          </div>
        </div>

        <div className="story-quote">
          <blockquote>
            "El amor verdadero no es encontrar a alguien con quien puedas vivir,
            sino encontrar a alguien sin quien no puedas vivir."
          </blockquote>
          <cite>- Laura & Raul</cite>
        </div>
      </div>
    </section>
  );
};

export default OurStory;

