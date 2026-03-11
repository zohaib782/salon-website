import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  'Haircut',
  'Hair Styling',
  'Beard Grooming',
  'Hair Coloring',
  'Spa & Treatment',
  'Consultation',
]

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
]

function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 500)
  }

  return (
    <section id="booking" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-purple/10 to-luxury-black" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-luxury-gold tracking-[0.3em] uppercase text-sm mb-4">
            Book Now
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-luxury-cream mb-6">
            Your Appointment
            <span className="gradient-text"> Awaits</span>
          </h2>
          <p className="text-luxury-cream/60 max-w-xl mx-auto">
            Reserve your spot at LUXE and experience the pinnacle of hair care and styling.
          </p>
        </motion.div>

        {/* Booking form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark p-12 rounded-2xl text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-luxury-gold/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-luxury-cream mb-4">
                Appointment Requested!
              </h3>
              <p className="text-luxury-cream/70 mb-6">
                Thank you for choosing LUXE. We'll confirm your appointment within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-luxury-gold hover:text-luxury-goldLight transition-colors"
              >
                Book Another Appointment
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-dark p-8 md:p-12 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-luxury-cream/70 text-sm mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-luxury-black/50 border border-luxury-gold/20 rounded-lg text-luxury-cream focus:border-luxury-gold/50 transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-luxury-cream/70 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-luxury-black/50 border border-luxury-gold/20 rounded-lg text-luxury-cream focus:border-luxury-gold/50 transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-luxury-cream/70 text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-luxury-black/50 border border-luxury-gold/20 rounded-lg text-luxury-cream focus:border-luxury-gold/50 transition-colors duration-300"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-luxury-cream/70 text-sm mb-2">Service</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-luxury-black/50 border border-luxury-gold/20 rounded-lg text-luxury-cream focus:border-luxury-gold/50 transition-colors duration-300 appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23d4af37\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                  >
                    <option value="" className="bg-luxury-black">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service} className="bg-luxury-black">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-luxury-cream/70 text-sm mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-luxury-black/50 border border-luxury-gold/20 rounded-lg text-luxury-cream focus:border-luxury-gold/50 transition-colors duration-300"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-luxury-cream/70 text-sm mb-2">Time</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-luxury-black/50 border border-luxury-gold/20 rounded-lg text-luxury-cream focus:border-luxury-gold/50 transition-colors duration-300 appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23d4af37\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                  >
                    <option value="" className="bg-luxury-black">Select a time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time} className="bg-luxury-black">
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="mt-6">
                <label className="block text-luxury-cream/70 text-sm mb-2">Additional Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-luxury-black/50 border border-luxury-gold/20 rounded-lg text-luxury-cream focus:border-luxury-gold/50 transition-colors duration-300 resize-none"
                  placeholder="Any special requests or notes..."
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-luxury-gold via-luxury-goldLight to-luxury-gold text-luxury-black font-semibold text-lg rounded-lg gold-glow gold-glow-hover btn-shine transition-all duration-300"
              >
                Request Appointment
              </motion.button>

              <p className="text-center text-luxury-cream/40 text-sm mt-4">
                We'll contact you within 24 hours to confirm your booking.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Booking
