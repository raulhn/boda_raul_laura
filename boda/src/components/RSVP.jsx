import { useState } from 'react'
import './RSVP.css'

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: '',
    guests: '1',
    dietary: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        attendance: '',
        guests: '1',
        dietary: '',
        message: ''
      })
    }, 5000)
  }

  if (isSubmitted) {
    return (
      <section id="rsvp" className="rsvp section">
        <div className="container">
          <div className="success-message">
            <div className="success-icon">💕</div>
            <h3>¡Gracias por confirmar!</h3>
            <p>Hemos recibido tu respuesta. ¡Esperamos verte en nuestro gran día!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="rsvp section">
      <div className="container">
        <h2 className="section-title">Confirma tu Asistencia</h2>
        <p className="rsvp-subtitle">
          Por favor, confirma tu asistencia antes del 1 de febrero de 2026
        </p>

        <div className="rsvp-content">
          <div className="rsvp-info">
            <div className="info-item">
              <div className="info-icon">📅</div>
              <div>
                <h4>Fecha Límite</h4>
                <p>1 de Febrero, 2026</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">👥</div>
              <div>
                <h4>Invitados</h4>
                <p>Por favor incluye a todos los acompañantes</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">🍽️</div>
              <div>
                <h4>Menú</h4>
                <p>Indícanos si tienes alguna restricción alimentaria</p>
              </div>
            </div>
          </div>

          <form className="rsvp-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre Completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Tu nombre completo"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+52 123 456 7890"
                />
              </div>
            </div>

            <div className="form-group">
              <label>¿Asistirás a nuestra boda? *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="attendance"
                    value="si"
                    checked={formData.attendance === 'si'}
                    onChange={handleChange}
                    required
                  />
                  <span>✅ ¡Sí, estaré ahí!</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={formData.attendance === 'no'}
                    onChange={handleChange}
                    required
                  />
                  <span>❌ Lo siento, no podré asistir</span>
                </label>
              </div>
            </div>

            {formData.attendance === 'si' && (
              <>
                <div className="form-group">
                  <label htmlFor="guests">Número de acompañantes (incluyéndote)</label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    <option value="1">Solo yo</option>
                    <option value="2">2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="dietary">Restricciones alimentarias</label>
                  <input
                    type="text"
                    id="dietary"
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleChange}
                    placeholder="Vegetariano, vegano, alergias, etc."
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="message">Mensaje especial (opcional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Comparte tus mejores deseos o algún mensaje especial para nosotros..."
                rows="4"
              />
            </div>

            <button 
              type="submit" 
              className="btn submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Enviando...
                </>
              ) : (
                'Confirmar Asistencia'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default RSVP