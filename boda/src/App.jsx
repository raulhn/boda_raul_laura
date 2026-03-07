import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import CountDown from './components/CountDown'
import OurStory from './components/OurStory'
import EventDetails from './components/EventDetails'
import Gallery from './components/Gallery'
import RSVP from './components/RSVP'
import Footer from './components/Footer'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="hearts">
            <div className="heart"></div>
            <div className="heart"></div>
          </div>
          <h2>Raúl & Laura</h2>
          <p>Preparando nuestra historia...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <Header />
      <Hero />
      <CountDown />
      <OurStory />
      <EventDetails />
      <Gallery />
      <RSVP />
      <Footer />
    </div>
  )
}

export default App
