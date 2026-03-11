import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const galleryImages = [
  {
    id: 1,
    title: 'Precision Cut',
    category: 'Styling',
    color: '#2d1b4e',
  },
  {
    id: 2,
    title: 'Color Masterpiece',
    category: 'Coloring',
    color: '#d4af37',
  },
  {
    id: 3,
    title: 'Sculpted Beard',
    category: 'Grooming',
    color: '#aa8c2c',
  },
  {
    id: 4,
    title: 'Red Carpet Style',
    category: 'Styling',
    color: '#4a2c7a',
  },
  {
    id: 5,
    title: 'Luxury Treatment',
    category: 'Spa',
    color: '#f4e4bc',
  },
  {
    id: 6,
    title: 'Modern Fade',
    category: 'Cut',
    color: '#d4af37',
  },
]

function Gallery({ isMobile, isLowPower }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  // Longer interval on mobile or skip auto-advance on low power
  const intervalTime = isLowPower ? 8000 : (isMobile ? 5000 : 4000)

  useEffect(() => {
    if (isPaused || isLowPower) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    }, intervalTime)

    return () => clearInterval(interval)
  }, [isPaused, isLowPower, intervalTime])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  // Adjust transition based on device
  const transition = isLowPower 
    ? { duration: 0.1 } 
    : { type: "spring", stiffness: 300, damping: 30 }

  return (
    <section id="gallery" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-purple/10 to-luxury-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: isLowPower ? 0.3 : 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-luxury-gold tracking-[0.3em] uppercase text-sm mb-4">
            Our Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-luxury-cream mb-6">
            Style
            <span className="gradient-text"> Inspiration</span>
          </h2>
          <p className="text-luxury-cream/60 max-w-xl mx-auto">
            Explore our gallery of stunning transformations and discover your next look.
          </p>
        </motion.div>

        {/* Carousel container */}
        <motion.div 
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: isLowPower ? 0.3 : 1 }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main carousel */}
          <div className="overflow-hidden mb-8">
            <motion.div 
              className="flex"
              animate={{ x: `-${currentIndex * (100 / (isMobile ? 1 : 3))}%` }}
              transition={transition}
            >
              {galleryImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className={`w-full ${isMobile ? '' : 'md:w-1/3'} flex-shrink-0 px-2`}
                >
                  <motion.div
                    whileHover={isLowPower ? {} : { scale: 1.02 }}
                    className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group"
                    style={{ 
                      background: `linear-gradient(135deg, ${image.color}40 0%, ${image.color}10 100%)`
                    }}
                  >
                    {/* Image placeholder with pattern */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div 
                        className="w-24 h-24 rounded-full opacity-20 flex items-center justify-center"
                        style={{ 
                          background: `linear-gradient(135deg, ${image.color} 0%, transparent 100%)`,
                        }}
                      >
                        <span className="text-4xl opacity-50">✦</span>
                      </div>
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p 
                        className="text-xs tracking-wider uppercase mb-1"
                        style={{ color: image.color }}
                      >
                        {image.category}
                      </p>
                      <h3 className="text-xl font-display font-semibold text-luxury-cream">
                        {image.title}
                      </h3>
                    </div>

                    {/* Border effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ border: `1px solid ${image.color}40` }}
                    />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mb-8">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'w-8 bg-luxury-gold' 
                    : 'bg-luxury-gold/30 hover:bg-luxury-gold/50'
                }`}
              />
            ))}
          </div>

          {/* Arrow navigation */}
          <div className="flex justify-center gap-4">
            <button 
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-luxury-gold hover:bg-luxury-gold/10 transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={goToNext}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-luxury-gold hover:bg-luxury-gold/10 transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Gallery
