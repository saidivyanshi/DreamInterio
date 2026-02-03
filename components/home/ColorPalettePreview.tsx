'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { paintPacks } from '@/lib/data'
import { Palette, ArrowRight, Sparkles } from 'lucide-react'

export function ColorPalettePreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-accent-500" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              AI-Powered Color Detection
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Perfect Color
            <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">
              {" "}Palettes
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Upload your room photo and get AI-generated color suggestions. 
            Buy matching paint packs delivered to your door.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {paintPacks.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 group hover:scale-105"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {pack.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {pack.description}
                </p>
              </div>
              
              {/* Color Swatches */}
              <div className="flex space-x-2 mb-4">
                {pack.colors.map((color, colorIndex) => (
                  <motion.div
                    key={colorIndex}
                    whileHover={{ scale: 1.2 }}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-lg cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{pack.price.toLocaleString()}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {[
            {
              icon: '📸',
              title: 'Upload Photo',
              description: 'Take a photo of your room or upload from gallery'
            },
            {
              icon: '🎨',
              title: 'AI Analysis',
              description: 'Our AI detects colors and suggests perfect palettes'
            },
            {
              icon: '🚚',
              title: 'Quick Delivery',
              description: 'Premium paint packs delivered in 2-3 days'
            }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center"
        >
          <Link href="/colors">
            <Button size="lg" className="group">
              <Palette className="w-5 h-5 mr-2" />
              Try Color Generator
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}