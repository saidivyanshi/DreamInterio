'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/lib/store'
import { paintPacks } from '@/lib/data'
import { 
  Upload, 
  Camera, 
  Palette, 
  Download, 
  Copy, 
  ShoppingCart,
  Sparkles,
  RefreshCw,
  Eye,
  Heart
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function ColorsPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [extractedColors, setExtractedColors] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedPalette, setSelectedPalette] = useState<string[]>([])
  const addItem = useCartStore(state => state.addItem)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedImage(reader.result as string)
        analyzeImage()
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false
  })

  const analyzeImage = () => {
    setIsAnalyzing(true)
    // Simulate AI color extraction
    setTimeout(() => {
      const mockColors = [
        '#8B4513', '#F5DEB3', '#FFFFFF', '#2F4F4F', '#D2691E', '#F0E68C'
      ]
      setExtractedColors(mockColors)
      setSelectedPalette(mockColors.slice(0, 4))
      setIsAnalyzing(false)
      toast.success('Colors extracted successfully!')
    }, 2000)
  }

  const handleColorClick = (color: string) => {
    if (selectedPalette.includes(color)) {
      setSelectedPalette(selectedPalette.filter(c => c !== color))
    } else if (selectedPalette.length < 6) {
      setSelectedPalette([...selectedPalette, color])
    }
  }

  const copyPalette = () => {
    const colorString = selectedPalette.join(', ')
    navigator.clipboard.writeText(colorString)
    toast.success('Color palette copied to clipboard!')
  }

  const downloadPalette = () => {
    // Create a simple palette image
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 400
    canvas.height = 100
    
    const colorWidth = canvas.width / selectedPalette.length
    
    selectedPalette.forEach((color, index) => {
      ctx.fillStyle = color
      ctx.fillRect(index * colorWidth, 0, colorWidth, canvas.height)
    })

    const link = document.createElement('a')
    link.download = 'color-palette.png'
    link.href = canvas.toDataURL()
    link.click()
    
    toast.success('Palette downloaded!')
  }

  const buyPaintPack = (pack: any) => {
    addItem(pack)
    toast.success(`${pack.name} added to cart!`)
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
            <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-accent-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                AI-Powered Color Extraction
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Color Palette
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                {" "}Generator
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Upload your room photo and let our AI extract the perfect color palette. 
              Get matching paint packs delivered to your door.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Upload Room Photo
              </h2>
              
              <div
                {...getRootProps()}
                className={`glass rounded-2xl p-8 border-2 border-dashed transition-all duration-300 cursor-pointer ${
                  isDragActive 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                }`}
              >
                <input {...getInputProps()} />
                
                {uploadedImage ? (
                  <div className="relative">
                    <Image
                      src={uploadedImage}
                      alt="Uploaded room"
                      width={500}
                      height={300}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button variant="secondary" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Change Photo
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      {isDragActive ? (
                        <Download className="w-8 h-8 text-white" />
                      ) : (
                        <Upload className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {isDragActive ? 'Drop your image here' : 'Upload Room Photo'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Drag and drop or click to select
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button variant="outline" size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Browse Files
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {uploadedImage && (
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={analyzeImage}
                    loading={isAnalyzing}
                    disabled={isAnalyzing}
                    size="lg"
                  >
                    <Palette className="w-5 h-5 mr-2" />
                    {isAnalyzing ? 'Analyzing Colors...' : 'Extract Colors'}
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Extracted Colors
              </h2>

              {extractedColors.length > 0 ? (
                <div className="space-y-6">
                  {/* Color Grid */}
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Detected Colors
                    </h3>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {extractedColors.map((color, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`cursor-pointer rounded-lg border-2 transition-all ${
                            selectedPalette.includes(color)
                              ? 'border-primary-500 ring-2 ring-primary-200'
                              : 'border-gray-200 dark:border-gray-600'
                          }`}
                          onClick={() => handleColorClick(color)}
                        >
                          <div
                            className="w-full h-16 rounded-t-lg"
                            style={{ backgroundColor: color }}
                          />
                          <div className="p-2 text-center">
                            <div className="text-xs font-mono text-gray-600 dark:text-gray-400">
                              {color}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Click colors to add/remove from your palette
                    </p>
                  </div>

                  {/* Selected Palette */}
                  {selectedPalette.length > 0 && (
                    <div className="glass rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Your Palette ({selectedPalette.length}/6)
                      </h3>
                      <div className="flex space-x-2 mb-4">
                        {selectedPalette.map((color, index) => (
                          <div
                            key={index}
                            className="flex-1 h-16 rounded-lg border-2 border-white shadow-lg"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={copyPalette}>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={downloadPalette}>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="glass rounded-2xl p-8 text-center">
                  <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No Colors Extracted Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Upload a room photo to get started with color extraction
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Paint Packs Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Curated Paint Packs
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Professional color combinations ready for your walls
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paintPacks.map((pack, index) => (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
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
                  <div className="flex space-x-1 mb-4">
                    {pack.colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="flex-1 h-12 rounded-lg border border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{pack.price.toLocaleString()}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="p-2">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => buyPaintPack(pack)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}