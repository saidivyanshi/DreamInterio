'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Home, Users, Heart, Package } from 'lucide-react'

const stats = [
  {
    icon: Home,
    number: 5000,
    suffix: '+',
    label: 'Interior Designs',
    description: 'Curated collection of stunning room designs'
  },
  {
    icon: Users,
    number: 100,
    suffix: '+',
    label: 'Expert Designers',
    description: 'Professional interior designers ready to help'
  },
  {
    icon: Heart,
    number: 50000,
    suffix: '+',
    label: 'Happy Customers',
    description: 'Satisfied customers across India'
  },
  {
    icon: Package,
    number: 1000,
    suffix: '+',
    label: 'Premium Products',
    description: 'High-quality furniture and decor items'
  }
]

function CountUp({ end, duration = 2000, inView }: { end: number; duration?: number; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, inView])

  return <span>{count.toLocaleString()}</span>
}

export function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <section className="py-20 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Trusted by
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              {" "}Thousands
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join the growing community of homeowners who have transformed their spaces with DreamInteriors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center group"
            >
              <div className="glass rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  <CountUp end={stat.number} inView={inView} />
                  <span className="text-primary-500">{stat.suffix}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  {stat.label}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional visual elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-4 glass rounded-full px-8 py-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 border-2 border-white flex items-center justify-center text-white font-semibold text-sm"
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                4.9/5 Rating
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Based on 10,000+ reviews
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}