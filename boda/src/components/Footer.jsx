import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Raúl & Laura</h3>
            <p>
              Gracias por ser parte de nuestro día especial. 
              Tu presencia hace que este momento sea aún más perfecto.
            </p>
          </div>

          <div className="footer-section">
            <h4>Información de Contacto</h4>
            <div className="contact-info">
              <p>📧 contacto@raulylaura2026.com</p>
              <p>📱 +52 123 456 7890</p>
              <p>📱 +52 098 765 4321</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>Síguenos</h4>
            <p>Comparte tus fotos con nosotros:</p>
            <div className="hashtag">#RaulYLaura2026</div>
            <div className="social-links">
              <a href="#" className="social-link">📸 Instagram</a>
              <a href="#" className="social-link">📘 Facebook</a>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-hearts">
            <span className="heart">💕</span>
            <span className="heart">💖</span>
            <span className="heart">💕</span>
          </div>
          <p>
            Hecho con amor para nuestra boda • 7 de Marzo, 2026
          </p>
          <div className="footer-date">
            ¡Nos vemos en el altar!
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer