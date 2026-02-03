'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedRooms } from '@/components/home/FeaturedRooms'
import { StatsSection } from '@/components/home/StatsSection'
import { ColorPalettePreview } from '@/components/home/ColorPalettePreview'

export default function HomePage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <Navbar />
      
      <main className="pt-16">
        <HeroSection />
        
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FeaturedRooms />
          <StatsSection />
          <ColorPalettePreview />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  )
}