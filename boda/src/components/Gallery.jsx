import { useState } from 'react'
import './Gallery.css'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  // Usando imágenes de Unsplash para la demostración
  const photos = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
      alt: 'Compromiso en la playa',
      category: 'engagement'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop',
      alt: 'Caminando juntos',
      category: 'engagement'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
      alt: 'Momento romántico',
      category: 'couple'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop',
      alt: 'Atardecer juntos',
      category: 'couple'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',
      alt: 'Preparativos',
      category: 'preparation'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1525258436552-1c71b26b8b7c?w=800&h=600&fit=crop',
      alt: 'Anillos de compromiso',
      category: 'preparation'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop',
      alt: 'Sonrisas de amor',
      category: 'couple'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1594736797933-d0dc81f6ba74?w=800&h=600&fit=crop',
      alt: 'Momentos especiales',
      category: 'engagement'
    }
  ]

  const openModal = (photo) => {
    setSelectedImage(photo)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <h2 className="section-title">Galería de Momentos</h2>
        <p className="gallery-subtitle">
          Algunos de nuestros momentos favoritos juntos
        </p>

        <div className="gallery-grid">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="gallery-item"
              onClick={() => openModal(photo)}
            >
              <img 
                src={photo.src} 
                alt={photo.alt}
                loading="lazy"
              />
              <div className="gallery-overlay">
                <div className="overlay-content">
                  <span className="view-icon">👁️</span>
                  <p>{photo.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-note">
          <p>
            💕 Estas son solo algunas de nuestras fotos favoritas. 
            ¡Esperamos crear muchos más recuerdos hermosos el día de nuestra boda!
          </p>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
            />
            <div className="modal-caption">
              <p>{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery