import './OurStory.css'

const OurStory = () => {
  return (
    <section id="story" className="our-story section">
      <div className="container">
        <h2 className="section-title">Nuestra Historia</h2>
        
        <div className="story-timeline">
          <div className="timeline-item">
            <div className="timeline-date">2019</div>
            <div className="timeline-content">
              <h3>Nos Conocimos</h3>
              <p>
                Todo comenzó en una hermosa tarde de primavera. El destino nos juntó de la manera más 
                inesperada, y desde ese momento supimos que algo especial había comenzado.
              </p>
            </div>
            <div className="timeline-icon">❤️</div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">2021</div>
            <div className="timeline-content">
              <h3>Primer Viaje Juntos</h3>
              <p>
                Decidimos aventurarnos juntos por primera vez. Ese viaje nos enseñó que éramos 
                el equipo perfecto, capaces de enfrentar cualquier desafío juntos.
              </p>
            </div>
            <div className="timeline-icon">✈️</div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">2023</div>
            <div className="timeline-content">
              <h3>Viviendo Juntos</h3>
              <p>
                Decidimos dar el siguiente paso y crear nuestro primer hogar juntos. 
                Cada día se convirtió en una nueva aventura llena de amor y complicidad.
              </p>
            </div>
            <div className="timeline-icon">🏠</div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">2025</div>
            <div className="timeline-content">
              <h3>¡La Propuesta!</h3>
              <p>
                En un lugar muy especial para nosotros, Raúl se arrodilló y me pidió que fuera 
                su esposa para toda la vida. ¡Por supuesto dije que SÍ!
              </p>
            </div>
            <div className="timeline-icon">💍</div>
          </div>

          <div className="timeline-item current">
            <div className="timeline-date">2026</div>
            <div className="timeline-content">
              <h3>¡Nos Casamos!</h3>
              <p>
                Y aquí estamos, a punto de dar el paso más importante de nuestras vidas. 
                Queremos celebrar este momento único con todas las personas que amamos.
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
          <cite>- Raúl & Laura</cite>
        </div>
      </div>
    </section>
  )
}

export default OurStory