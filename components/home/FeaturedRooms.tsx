'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { roomTypes } from '@/lib/data'
import { ArrowRight, Eye } from 'lucide-react'

export function FeaturedRooms() {
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
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Explore Room
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              {" "}Categories
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            From cozy bedrooms to modern kitchens, discover designs that match your style and budget
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
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
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Count Badge */}
                    <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 text-sm font-semibold text-white">
                      {room.count} designs
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button variant="secondary" size="sm" className="transform scale-90 group-hover:scale-100 transition-transform">
                        <Eye className="w-4 h-4 mr-2" />
                        View Designs
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {room.description}
                    </p>
                    <div className="flex items-center text-primary-500 font-semibold group-hover:translate-x-2 transition-transform">
                      Explore Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <Link href="/rooms">
            <Button size="lg" className="group">
              View All Room Categories
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}