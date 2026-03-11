import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Booking from './components/Booking'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import Particles from './components/Particles'
import Navigation from './components/Navigation'

function usePerformanceMode() {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for mobile device
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsMobile(mobile)
    }
    
    // Check for reduced motion preference
    const checkReducedMotion = () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setPrefersReducedMotion(reduced)
    }
    
    checkMobile()
    checkReducedMotion()
    
    window.addEventListener('resize', checkMobile)
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', checkReducedMotion)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', checkReducedMotion)
    }
  }, [])

  // Use low power mode for mobile or reduced motion preference
  const isLowPower = isMobile || prefersReducedMotion

  return { isMobile, prefersReducedMotion, isLowPower }
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { isMobile, prefersReducedMotion, isLowPower } = usePerformanceMode()

  useEffect(() => {
    // Simulate loading - faster on mobile
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, isMobile ? 1500 : 2500)

    return () => clearTimeout(timer)
  }, [isMobile])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: isLowPower ? 0.3 : 0.8 }}
          className="relative min-h-screen bg-luxury-black"
        >
          {/* Particle Background - reduced on mobile */}
          <Particles isMobile={isMobile} prefersReducedMotion={prefersReducedMotion} />
          
          {/* Navigation */}
          <Navigation />
          
          {/* Main Content */}
          <main>
            <Hero isMobile={isMobile} isLowPower={isLowPower} />
            <Services isMobile={isMobile} isLowPower={isLowPower} />
            <Gallery isMobile={isMobile} isLowPower={isLowPower} />
            <About isMobile={isMobile} isLowPower={isLowPower} />
            <Testimonials isMobile={isMobile} isLowPower={isLowPower} />
            <Booking isMobile={isMobile} />
          </main>
          
          {/* Footer */}
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
