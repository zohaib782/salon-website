import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'James Mitchell',
    role: 'Business Executive',
    text: 'The attention to detail is unmatched. My haircut here is always perfect, and the atmosphere is incredibly relaxing.',
    rating: 5,
    color: '#d4af37',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Fashion Designer',
    text: 'LUXE has completely transformed my look. The stylists truly understand what works for each individual face shape and lifestyle.',
    rating: 5,
    color: '#f4e4bc',
  },
  {
    id: 3,
    name: 'Michael Roberts',
    role: 'Actor',
    text: 'When I need to look my best for a premiere, LUXE is my go-to. Professional, skilled, and always delivers exceptional results.',
    rating: 5,
    color: '#aa8c2c',
  },
  {
    id: 4,
    name: 'Emily Watson',
    role: 'Social Media Influencer',
    text: 'The color treatments are absolutely stunning. I always get so many compliments on my hair after visiting LUXE.',
    rating: 5,
    color: '#2d1b4e',
  },
]

function TestimonialCard({ testimonial, index, isLowPower }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  // Reduced animation on low power
  const duration = isLowPower ? 0.3 : 0.8
  const delay = isLowPower ? 0 : index * 0.2

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration, delay, ease: "easeOut" }}
      whileHover={isLowPower ? {} : { y: -5 }}
      className="flex-shrink-0 w-80 md:w-96"
    >
      <div className="glass-dark p-8 rounded-2xl h-full relative overflow-hidden">
        {/* Gradient background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(135deg, ${testimonial.color}10 0%, transparent 100%)`,
          }}
        />

        <div className="relative z-10">
          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <svg 
                key={i} 
                className="w-5 h-5" 
                fill={testimonial.color}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <p className="text-luxury-cream/80 leading-relaxed mb-6 italic">
            "{testimonial.text}"
          </p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold"
              style={{ 
                background: `linear-gradient(135deg, ${testimonial.color}30 0%, ${testimonial.color}10 100%)`,
                color: testimonial.color
              }}
            >
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <p className="text-luxury-cream font-semibold">{testimonial.name}</p>
              <p className="text-luxury-cream/50 text-sm">{testimonial.role}</p>
            </div>
          </div>
        </div>

        {/* Decorative quote icon */}
        <div 
          className="absolute bottom-4 right-6 text-6xl opacity-10"
          style={{ color: testimonial.color }}
        >
          "
        </div>
      </div>
    </motion.div>
  )
}

function Testimonials({ isMobile, isLowPower }) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-charcoal/50 to-luxury-black" />

      {/* Diagonal breaks */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-luxury-black transform -skew-y-2 origin-top-left -mt-16" />

      <div className="relative z-10">
        {/* Section header */}
        <motion.div 
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isLowPower ? 0.3 : 0.8 }}
          className="text-center mb-16 px-6"
        >
          <p className="text-luxury-gold tracking-[0.3em] uppercase text-sm mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-luxury-cream mb-6">
            What Clients
            <span className="gradient-text"> Say</span>
          </h2>
          <p className="text-luxury-cream/60 max-w-xl mx-auto">
            Don't just take our word for it. Here's what our distinguished clients have to say about their LUXE experience.
          </p>
        </motion.div>

        {/* Testimonials carousel - horizontal scroll */}
        <div className="flex gap-6 overflow-x-auto pb-8 px-6 md:px-20 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="snap-center">
              <TestimonialCard testimonial={testimonial} index={index} isLowPower={isLowPower} />
            </div>
          ))}
          
          {/* Extra space at end for scrolling */}
          <div className="w-6 md:w-20 flex-shrink-0" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-luxury-black transform -skew-y-2 origin-bottom-right -mb-16" />
    </section>
  )
}

export default Testimonials
