'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { roomTypes } from '@/lib/data'
import { ArrowRight, Eye } from 'lucide-react'

export default function RoomsPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Room
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                {" "}Categories
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our curated collection of interior designs for every room in your home. 
              From modern minimalist to traditional elegance.
            </p>
          </motion.div>

          {/* Room Grid */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {roomTypes.map((room, index) => (
              <motion.div
                key={room.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link href={`/rooms/${room.id}`}>
                  <div className="glass rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Count Badge */}
                      <div className="absolute top-4 right-4 glass rounded-full px-4 py-2 text-sm font-semibold text-white">
                        {room.count} designs
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="glass rounded-lg px-6 py-3 text-white font-semibold flex items-center space-x-2 transform scale-90 group-hover:scale-100 transition-transform">
                          <Eye className="w-5 h-5" />
                          <span>View Designs</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">
                        {room.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {room.description}
                      </p>
                      <div className="flex items-center text-primary-500 font-semibold group-hover:translate-x-2 transition-transform">
                        Explore Designs
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our expert designers can create custom solutions for any space. 
                Book a consultation to discuss your unique requirements.
              </p>
              <Link href="/designers">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Consult with Designers
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}