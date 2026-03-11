import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { motion } from 'framer-motion'

function SalonChair({ isMobile, isLowPower }) {
  const groupRef = useRef()
  
  // Reduce animation complexity on low power devices
  useFrame((state) => {
    if (groupRef.current && !isLowPower) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  // Simplified chair for mobile
  const scale = isMobile ? 0.5 : 0.8

  return (
    <Float speed={isLowPower ? 0.5 : 1.5} rotationIntensity={isLowPower ? 0.1 : 0.2} floatIntensity={isLowPower ? 0.2 : 0.5}>
      <group ref={groupRef} scale={scale}>
        {/* Chair seat */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.5, 0.15, 1.2]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Chair back */}
        <mesh position={[0, 1.2, -0.5]}>
          <boxGeometry args={[1.5, 1.2, 0.15]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Gold trim on back */}
        <mesh position={[0, 1.2, -0.42]}>
          <boxGeometry args={[1.4, 1.1, 0.02]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Armrests */}
        <mesh position={[-0.7, 0.8, 0]}>
          <boxGeometry args={[0.1, 0.1, 1]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.7, 0.8, 0]}>
          <boxGeometry args={[0.1, 0.1, 1]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Chair base */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Hydraulic cylinder */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
        </mesh>
        
        {/* Cushion */}
        <mesh position={[0, 0.62, 0]}>
          <boxGeometry args={[1.4, 0.1, 1.1]} />
          <meshStandardMaterial color="#2d1b4e" metalness={0.1} roughness={0.9} />
        </mesh>
      </group>
    </Float>
  )
}

function FloatingTool({ position, rotation, scale, color, isLowPower }) {
  const ref = useRef()
  
  // Skip floating tools on low power mode
  if (isLowPower) return null
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
      ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3 + position[2]) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
    </Float>
  )
}

function Scene({ isMobile, isLowPower }) {
  return (
    <>
      <ambientLight intensity={isLowPower ? 0.5 : 0.3} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={isLowPower ? 0.5 : 1}
        castShadow 
      />
      <pointLight position={[-10, -10, -10]} intensity={isLowPower ? 0.2 : 0.5} color="#d4af37" />
      
      <SalonChair isMobile={isMobile} isLowPower={isLowPower} />
      
      {/* Floating beauty tools - skip on mobile or low power */}
      {!isMobile && !isLowPower && (
        <>
          <FloatingTool position={[-2.5, 1, 0]} rotation={[0, 0, Math.PI / 4]} scale={0.4} color="#d4af37" isLowPower={isLowPower} />
          <FloatingTool position={[2.5, 1.5, 0.5]} rotation={[Math.PI / 4, 0, 0]} scale={0.35} color="#f4e4bc" isLowPower={isLowPower} />
          <FloatingTool position={[-1.8, 2.5, -0.5]} rotation={[0, Math.PI / 3, 0]} scale={0.3} color="#2d1b4e" isLowPower={isLowPower} />
          <FloatingTool position={[2, 0.5, -1]} rotation={[Math.PI / 6, Math.PI / 6, 0]} scale={0.25} color="#d4af37" isLowPower={isLowPower} />
        </>
      )}
      
      <Environment preset="studio" />
    </>
  )
}

function Hero({ isMobile, isLowPower }) {
  // Reduce animation duration on low power
  const animationDuration = isLowPower ? 0.5 : 1

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-luxury-charcoal to-luxury-purple/20" />
      
      {/* Animated circles - reduced on mobile */}
      {!isLowPower && <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute w-[600px] h-[600px] rounded-full bg-luxury-gold/5 -top-40 -right-40 blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute w-[500px] h-[500px] rounded-full bg-luxury-purple/10 -bottom-40 -left-40 blur-3xl"
        />
      </div>}

      {/* 3D Scene */}
      <div className="absolute inset-0 z-10">
        <Canvas 
          camera={{ position: [0, 0, isMobile ? 7 : 5], fov: isMobile ? 45 : 50 }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: isLowPower ? 'low-power' : 'high-performance' }}
        >
          <Suspense fallback={null}>
            <Scene isMobile={isMobile} isLowPower={isLowPower} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-20 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animationDuration, delay: isMobile ? 0.3 : 0.5 }}
        >
          <p className="text-luxury-gold tracking-[0.3em] uppercase text-sm mb-4">
            Premium Hair & Beauty
          </p>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animationDuration, delay: isMobile ? 0.4 : 0.7 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
        >
          <span className="gradient-text">Where Style</span>
          <br />
          <span className="text-luxury-cream">Becomes Art</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animationDuration, delay: isMobile ? 0.5 : 0.9 }}
          className="text-luxury-cream/70 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light"
        >
          Experience precision hair design and premium grooming in an atmosphere of refined elegance.
        </motion.p>

        <motion.a
          href="#booking"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animationDuration, delay: isMobile ? 0.6 : 1.1 }}
          whileHover={isLowPower ? {} : { scale: 1.05 }}
          whileTap={isLowPower ? {} : { scale: 0.98 }}
          className="inline-block px-10 py-4 bg-gradient-to-r from-luxury-gold via-luxury-goldLight to-luxury-gold text-luxury-black font-semibold text-lg rounded-full gold-glow gold-glow-hover btn-shine transition-all duration-300"
        >
          Book Your Appointment
        </motion.a>
      </div>

      {/* Scroll indicator - skip on low power */}
      {!isLowPower && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-luxury-gold/50 text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-luxury-gold to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default Hero
