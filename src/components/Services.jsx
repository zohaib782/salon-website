import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    id: 1,
    title: 'Haircut',
    description: 'Precision cuts tailored to your unique features and lifestyle, crafted by master stylists.',
    icon: '✂️',
    price: 'From $45',
    color: '#d4af37',
  },
  {
    id: 2,
    title: 'Hair Styling',
    description: 'Stunning styles for any occasion, from everyday elegance to red-carpet glamour.',
    icon: '💇',
    price: 'From $55',
    color: '#f4e4bc',
  },
  {
    id: 3,
    title: 'Beard Grooming',
    description: 'Expert beard sculpting and grooming to enhance your distinguished look.',
    icon: '🪒',
    price: 'From $30',
    color: '#aa8c2c',
  },
  {
    id: 4,
    title: 'Hair Coloring',
    description: 'Premium color treatments, from subtle highlights to bold transformations.',
    icon: '🎨',
    price: 'From $85',
    color: '#2d1b4e',
  },
  {
    id: 5,
    title: 'Spa & Treatment',
    description: 'Rejuvenating scalp treatments and luxury spa services for total relaxation.',
    icon: '💆',
    price: 'From $65',
    color: '#4a2c7a',
  },
]

function ServiceCard({ service, index, isLowPower }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  // Reduce animation duration on low power
  const duration = isLowPower ? 0.3 : 0.8
  const delay = isLowPower ? 0 : index * 0.15

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: "easeOut" }}
      whileHover={isLowPower ? {} : { y: -10, transition: { duration: 0.3 } }}
      className="relative group"
    >
      <div className="glass-dark p-8 rounded-2xl h-full card-tilt transition-all duration-500 gold-glow-hover">
        {/* Gradient border on hover */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ 
            background: `linear-gradient(135deg, ${service.color}20 0%, transparent 50%, ${service.color}10 100%)`,
            padding: '1px'
          }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <div 
            className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 ${isLowPower ? '' : 'transition-transform duration-500 group-hover:scale-110'}`}
            style={{ 
              background: `linear-gradient(135deg, ${service.color}30 0%, ${service.color}10 100%)`,
              border: `1px solid ${service.color}30`
            }}
          >
            {service.icon}
          </div>

          {/* Content */}
          <h3 className="text-2xl font-display font-semibold text-luxury-cream mb-3 group-hover:text-luxury-gold transition-colors duration-300">
            {service.title}
          </h3>
           
          <p className="text-luxury-cream/60 mb-4 leading-relaxed">
            {service.description}
          </p>

          <p 
            className="text-sm font-semibold tracking-wider"
            style={{ color: service.color }}
          >
            {service.price}
          </p>
        </div>

        {/* Decorative corner elements */}
        <div 
          className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${service.color}10 50%)`,
            borderRadius: '0 1rem 0 0'
          }}
        />
      </div>
    </motion.div>
  )
}

function Services({ isMobile, isLowPower }) {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-charcoal/50 to-luxury-black" />
      
      {/* Diagonal break top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-luxury-black transform -skew-y-2 origin-top-left -mt-16" />

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
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-luxury-cream mb-6">
            Crafted with
            <span className="gradient-text"> Precision</span>
          </h2>
          <p className="text-luxury-cream/60 max-w-xl mx-auto">
            Each service is tailored to bring out your unique beauty, using only the finest products and techniques.
          </p>
        </motion.div>

        {/* Services grid - staggered layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={index === 4 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}
            >
              <ServiceCard service={service} index={index} isLowPower={isLowPower} />
            </div>
          ))}
        </div>
      </div>

      {/* Diagonal break bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-luxury-black transform -skew-y-2 origin-bottom-right -mb-16" />
    </section>
  )
}

export default Services
