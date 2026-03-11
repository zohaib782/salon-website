import { useMemo } from 'react'
import { motion } from 'framer-motion'

function Particles({ isMobile, prefersReducedMotion }) {
  // Significantly reduce particles on mobile or when reduced motion is preferred
  const shouldReduceParticles = isMobile || prefersReducedMotion
  const particleCount = shouldReduceParticles ? 8 : 40

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: shouldReduceParticles ? Math.random() * 2 + 1 : Math.random() * 4 + 2,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 10,
      opacity: shouldReduceParticles ? Math.random() * 0.3 + 0.1 : Math.random() * 0.5 + 0.2,
    }))
  }, [particleCount, shouldReduceParticles])

  // Don't render particles on reduced motion
  if (prefersReducedMotion) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            bottom: '-20px',
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(212, 175, 55, ${particle.opacity}) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, particle.opacity, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Gradient overlays for depth - reduced opacity on mobile */}
      <div className={`absolute inset-0 bg-gradient-to-b from-luxury-black/50 via-transparent to-luxury-black/80 ${isMobile ? 'opacity-50' : ''}`} />
    </div>
  )
}

export default Particles
