import { useState } from 'react'
import './EventDetails.css'

const EventDetails = () => {
  const [activeTab, setActiveTab] = useState('ceremonia')

  const eventData = {
    ceremonia: {
      title: 'Ceremonia Religiosa',
      time: '16:00',
      location: 'Iglesia San José',
      address: 'Calle Principal 123, Centro Histórico',
      description: 'Acompáñanos en este momento sagrado donde uniremos nuestras vidas ante Dios.',
      dress_code: 'Formal - Colores sugeridos: tonos pasteles, evitar blanco y negro',
      icon: '⛪'
    },
    celebracion: {
      title: 'Celebración',
      time: '19:00',
      location: 'Salón de Eventos El Jardín',
      address: 'Avenida de los Rosales 456, Jardines del Norte',
      description: 'Continuemos la celebración con cena, baile y mucha diversión hasta altas horas.',
      dress_code: 'Elegante casual - ¡Zapatos cómodos para bailar!',
      icon: '🎉'
    }
  }

  const currentEvent = eventData[activeTab]

  return (
    <section id="details" className="event-details section">
      <div className="container">
        <h2 className="section-title">Detalles del Evento</h2>
        
        <div className="event-tabs">
          <button 
            className={`tab-button ${activeTab === 'ceremonia' ? 'active' : ''}`}
            onClick={() => setActiveTab('ceremonia')}
          >
            ⛪ Ceremonia
          </button>
          <button 
            className={`tab-button ${activeTab === 'celebracion' ? 'active' : ''}`}
            onClick={() => setActiveTab('celebracion')}
          >
            🎉 Celebración
          </button>
        </div>

        <div className="event-content">
          <div className="event-card">
            <div className="event-header">
              <div className="event-icon">{currentEvent.icon}</div>
              <div className="event-title-group">
                <h3>{currentEvent.title}</h3>
                <div className="event-time">{currentEvent.time}</div>
              </div>
            </div>

            <div className="event-body">
              <div className="event-location">
                <div className="location-item">
                  <strong>📍 Lugar:</strong> {currentEvent.location}
                </div>
                <div className="location-item">
                  <strong>📍 Dirección:</strong> {currentEvent.address}
                </div>
              </div>

              <div className="event-description">
                <p>{currentEvent.description}</p>
              </div>

              <div className="dress-code">
                <h4>👔 Código de Vestimenta</h4>
                <p>{currentEvent.dress_code}</p>
              </div>

              <div className="event-actions">
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(currentEvent.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  Ver en Mapa
                </a>
                <button className="btn btn-outline">Añadir al Calendario</button>
              </div>
            </div>
          </div>
        </div>

        <div className="additional-info">
          <div className="info-grid">
            <div className="info-card">
              <h4>🚗 Transporte</h4>
              <p>Contaremos con servicio de transporte desde la iglesia hasta el salón de eventos. El autobús saldrá 15 minutos después de la ceremonia.</p>
            </div>
            <div className="info-card">
              <h4>🎁 Regalos</h4>
              <p>Tu presencia es nuestro mejor regalo. Si deseas obsequiarnos algo, tenemos una mesa de regalos en Liverpool y Palacio de Hierro.</p>
            </div>
            <div className="info-card">
              <h4>📱 Hashtag</h4>
              <p>Comparte tus fotos usando nuestro hashtag oficial: <strong>#RaulYLaura2026</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventDetails