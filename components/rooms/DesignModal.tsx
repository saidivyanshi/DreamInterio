'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/lib/store'
import { furnitureProducts, paintPacks } from '@/lib/data'
import { X, ZoomIn, ZoomOut, ShoppingCart, Palette, Copy, Heart, Share2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface DesignModalProps {
  image: string
  roomType: string
  onClose: () => void
}

export function DesignModal({ image, roomType, onClose }: DesignModalProps) {
  const [zoom, setZoom] = useState(1)
  const [showFurniture, setShowFurniture] = useState(true)
  const addItem = useCartStore(state => state.addItem)

  // Mock AI-detected furniture and colors
  const detectedFurniture = furnitureProducts.filter(p => p.category === roomType).slice(0, 4)
  const detectedColors = ['#8B4513', '#F5DEB3', '#FFFFFF', '#2F4F4F', '#D2691E', '#F0E68C']
  const suggestedPaintPack = paintPacks[0]

  const handleAddToCart = (item: any) => {
    addItem(item)
    toast.success(`${item.name} added to cart!`)
  }

  const handleCopyPalette = () => {
    const colorString = detectedColors.join(', ')
    navigator.clipboard.writeText(colorString)
    toast.success('Color palette copied to clipboard!')
  }

  const handleBuyPaintPack = () => {
    addItem(suggestedPaintPack)
    toast.success('Paint pack added to cart!')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full">
          {/* Image Section */}
          <div className="flex-1 relative bg-gray-100 dark:bg-gray-800">
            <div className="absolute top-4 left-4 z-10 flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                disabled={zoom >= 3}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <Button variant="secondary" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="h-full overflow-auto flex items-center justify-center p-8">
              <motion.div
                animate={{ scale: zoom }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative"
              >
                <Image
                  src={image}
                  alt="Room design"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </motion.div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Design Details
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  AI-detected furniture and color analysis
                </p>
              </div>

              {/* Toggle Buttons */}
              <div className="flex space-x-2">
                <Button
                  variant={showFurniture ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setShowFurniture(true)}
                  className="flex-1"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Furniture
                </Button>
                <Button
                  variant={!showFurniture ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setShowFurniture(false)}
                  className="flex-1"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Colors
                </Button>
              </div>

              {showFurniture ? (
                /* Furniture Section */
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Detected Furniture
                  </h3>
                  {detectedFurniture.map((item) => (
                    <div key={item.id} className="glass rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {item.name}
                          </h4>
                          <p className="text-primary-500 font-bold">
                            ₹{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                /* Colors Section */
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Detected Colors
                    </h3>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {detectedColors.map((color, index) => (
                        <div key={index} className="text-center">
                          <div
                            className="w-full h-16 rounded-lg border-2 border-gray-200 dark:border-gray-600 mb-2 cursor-pointer hover:scale-105 transition-transform"
                            style={{ backgroundColor: color }}
                            onClick={() => {
                              navigator.clipboard.writeText(color)
                              toast.success(`Color ${color} copied!`)
                            }}
                          />
                          <div className="text-xs font-mono text-gray-600 dark:text-gray-400">
                            {color}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mb-4"
                      onClick={handleCopyPalette}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Color Palette
                    </Button>
                  </div>

                  {/* Paint Pack Suggestion */}
                  <div className="glass rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Matching Paint Pack
                    </h4>
                    <div className="mb-3">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {suggestedPaintPack.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {suggestedPaintPack.description}
                      </div>
                      <div className="flex space-x-1 mb-3">
                        {suggestedPaintPack.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="text-xl font-bold text-primary-500 mb-3">
                        ₹{suggestedPaintPack.price.toLocaleString()}
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={handleBuyPaintPack}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Paint Pack
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}