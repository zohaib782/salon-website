import { motion } from 'framer-motion'

function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-black"
    >
      {/* Animated Logo */}
      <div className="relative">
        {/* Outer ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border-2 border-luxury-gold/30 rounded-full absolute top-0 left-0"
          style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
        />
        
        {/* Middle ring */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-2 border-luxury-gold/50 rounded-full absolute top-4 left-4"
          style={{ borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}
        />
        
        {/* Inner ring */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 bg-gradient-to-br from-luxury-gold to-luxury-goldLight rounded-full absolute top-8 left-8"
        />
        
        {/* Brand name */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-2xl font-display font-bold gradient-text whitespace-nowrap"
        >
          LUXE
        </motion.p>
      </div>
      
      {/* Loading text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-20 text-luxury-gold/60 text-sm tracking-[0.3em] uppercase"
      >
        Crafting Your Experience
      </motion.p>
    </motion.div>
  )
}

export default LoadingScreen
