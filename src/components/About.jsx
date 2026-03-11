import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function About({ isMobile, isLowPower }) {
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const isLeftInView = useInView(leftRef, { once: true, margin: "-100px" })
  const isRightInView = useInView(rightRef, { once: true, margin: "-100px" })

  // Reduced animation duration on low power
  const duration = isLowPower ? 0.3 : 1

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-charcoal to-luxury-black" />
      
      {/* Decorative elements - reduced on mobile */}
      {!isLowPower && (
        <>
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-luxury-gold/5 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-luxury-purple/10 blur-3xl" />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left side - Images */}
          <motion.div 
            ref={leftRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isLeftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration, ease: "easeOut" }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #2d1b4e 0%, #1a1a1a 100%)',
                }}
              >
                {/* Decorative pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border border-luxury-gold/20 rounded-full" />
                  <div className="absolute w-48 h-48 border border-luxury-gold/10 rounded-full" />
                  <div className="absolute w-64 h-64 border border-luxury-gold/5 rounded-full" />
                </div>
                
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl opacity-20">♛</span>
                </div>
              </div>
              
              {/* Glass overlay */}
              <div className="absolute inset-0 glass" />
            </div>

            {/* Floating image card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isLeftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: isLowPower ? 0.1 : 0.5, duration: isLowPower ? 0.2 : 0.8 }}
              className="absolute -bottom-8 -right-4 md:right-8 w-40 h-48 rounded-xl overflow-hidden glass-dark gold-glow"
            >
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%)',
                }}
              >
                <div className="text-center">
                  <p className="text-4xl font-display font-bold text-luxury-black">15+</p>
                  <p className="text-sm text-luxury-black/70">Years Experience</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative corner */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-luxury-gold/30 rounded-tl-2xl" />
          </motion.div>

          {/* Right side - Content */}
          <motion.div 
            ref={rightRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isRightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration, delay: isLowPower ? 0.1 : 0.3, ease: "easeOut" }}
          >
            <p className="text-luxury-gold tracking-[0.3em] uppercase text-sm mb-4">
              About Us
            </p>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-luxury-cream mb-6">
              A Legacy of
              <span className="gradient-text"> Excellence</span>
            </h2>

            <div className="glass-dark p-8 rounded-2xl mb-8">
              <p className="text-luxury-cream/70 leading-relaxed mb-6">
                For over fifteen years, LUXE has been the destination for those who demand nothing less than perfection. Our team of master stylists combines traditional craftsmanship with cutting-edge techniques to create looks that transcend trends.
              </p>
              <p className="text-luxury-cream/70 leading-relaxed">
                Every visit to LUXE is an experience curated for your unique style and personality. We believe that great hair is the foundation of confidence, and we're here to help you discover yours.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { number: '10K+', label: 'Happy Clients' },
                { number: '25+', label: 'Awards Won' },
                { number: '98%', label: 'Satisfaction' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isRightInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: isLowPower ? 0.1 : 0.6 + index * 0.1, duration: isLowPower ? 0.2 : 0.6 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-display font-bold gradient-text mb-1">
                    {stat.number}
                  </p>
                  <p className="text-xs text-luxury-cream/50 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
