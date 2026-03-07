import { useState, useEffect } from 'react'
import './Header.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav container">
        <div className="nav-brand">
          <h3>R&L</h3>
        </div>
        
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><button onClick={() => scrollToSection('home')}>Inicio</button></li>
          <li><button onClick={() => scrollToSection('story')}>Nuestra Historia</button></li>
          <li><button onClick={() => scrollToSection('details')}>El Evento</button></li>
          <li><button onClick={() => scrollToSection('gallery')}>Galería</button></li>
          <li><button onClick={() => scrollToSection('rsvp')}>Confirmar</button></li>
        </ul>

        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  )
}

export default Header