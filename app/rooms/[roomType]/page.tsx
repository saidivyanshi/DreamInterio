'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { DesignModal } from '@/components/rooms/DesignModal'
import { roomTypes, roomImages, furnitureProducts } from '@/lib/data'
import { ArrowLeft, Grid, List, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import Masonry from 'react-masonry-css'

export default function RoomDetailPage() {
  const params = useParams()
  const roomType = params.roomType as string
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry')
  const [savedDesigns, setSavedDesigns] = useState<Set<string>>(new Set())

  const room = roomTypes.find(r => r.id === roomType)
  const images = roomImages[roomType as keyof typeof roomImages] || []
  const roomFurniture = furnitureProducts.filter(p => p.category === roomType)

  if (!room) {
    return <div>Room not found</div>
  }

  const toggleSaved = (imageUrl: string) => {
    const newSaved = new Set(savedDesigns)
    if (newSaved.has(imageUrl)) {
      newSaved.delete(imageUrl)
    } else {
      newSaved.add(imageUrl)
    }
    setSavedDesigns(newSaved)
  }

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
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
            className="mb-12"
          >
            <Link href="/rooms" className="inline-flex items-center text-primary-500 hover:text-primary-600 mb-6 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Rooms
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {room.name}
                  <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                    {" "}Designs
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  {room.description} • {images.length} designs available
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center glass rounded-lg p-1">
                  <Button
                    variant={viewMode === 'masonry' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('masonry')}
                    className="px-3 py-2"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-3 py-2"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {viewMode === 'masonry' ? (
              <Masonry
                breakpointCols={breakpointColumns}
                className="flex w-auto -ml-4"
                columnClassName="pl-4 bg-clip-padding"
              >
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="mb-4 group cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative overflow-hidden rounded-xl glass hover:shadow-2xl transition-all duration-500">
                      <Image
                        src={image}
                        alt={`${room.name} design ${index + 1}`}
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleSaved(image)
                            }}
                            className={savedDesigns.has(image) ? 'text-red-500' : ''}
                          >
                            <Heart className={`w-4 h-4 ${savedDesigns.has(image) ? 'fill-current' : ''}`} />
                          </Button>
                          <Button variant="secondary" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Furniture highlights */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="glass rounded-lg p-3">
                          <div className="text-white text-sm font-semibold mb-1">
                            Featured Items:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {roomFurniture.slice(0, 3).map((item) => (
                              <span key={item.id} className="text-xs bg-white/20 rounded px-2 py-1 text-white">
                                {item.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Masonry>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative h-64 overflow-hidden rounded-xl glass hover:shadow-2xl transition-all duration-500">
                      <Image
                        src={image}
                        alt={`${room.name} design ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Same overlay content as masonry */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleSaved(image)
                            }}
                            className={savedDesigns.has(image) ? 'text-red-500' : ''}
                          >
                            <Heart className={`w-4 h-4 ${savedDesigns.has(image) ? 'fill-current' : ''}`} />
                          </Button>
                          <Button variant="secondary" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Featured Furniture */}
          {roomFurniture.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-20"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Featured Furniture for {room.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {roomFurniture.slice(0, 4).map((item) => (
                  <div key={item.id} className="glass rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {item.name}
                    </h3>
                    <div className="text-2xl font-bold text-primary-500 mb-3">
                      ₹{item.price.toLocaleString()}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Design Modal */}
      <AnimatePresence>
        {selectedImage && (
          <DesignModal
            image={selectedImage}
            roomType={roomType}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  )
}