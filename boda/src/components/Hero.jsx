import { useEffect, useState } from 'react'
import './Hero.css'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className={`hero-text ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <p className="hero-date">7 de Marzo, 2026</p>
          <h1 className="hero-names">
            <span className="name">Raúl</span>
            <span className="ampersand">&</span>
            <span className="name">Laura</span>
          </h1>
          <p className="hero-subtitle">¡Nos casamos!</p>
          <p className="hero-description">
            Te invitamos a celebrar con nosotros el día más especial de nuestras vidas
          </p>
          <div className="hero-buttons">
            <a href="#details" className="btn">Ver Detalles</a>
            <a href="#rsvp" className="btn btn-outline">Confirmar Asistencia</a>
          </div>
        </div>
        
        <div className="hero-decoration">
          <div className="floating-hearts">
            <div className="heart heart-1"></div>
            <div className="heart heart-2"></div>
            <div className="heart heart-3"></div>
            <div className="heart heart-4"></div>
            <div className="heart heart-5"></div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  )
}

export default Hero