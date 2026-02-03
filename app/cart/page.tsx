'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/lib/store'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice, getTotalItems } = useCartStore()
  const [isClearing, setIsClearing] = useState(false)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
      toast.success('Item removed from cart')
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id)
    toast.success(`${name} removed from cart`)
  }

  const handleClearCart = () => {
    setIsClearing(true)
    setTimeout(() => {
      clearCart()
      setIsClearing(false)
      toast.success('Cart cleared')
    }, 500)
  }

  const subtotal = getTotalPrice()
  const tax = Math.round(subtotal * 0.18) // 18% GST
  const shipping = subtotal > 50000 ? 0 : 999 // Free shipping above ₹50,000
  const total = subtotal + tax + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <Navbar />
        
        <main className="pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="glass rounded-2xl p-12">
                <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Your Cart is Empty
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Looks like you haven't added any items to your cart yet. 
                  Start shopping to fill it up!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/rooms">
                    <Button size="lg">
                      Browse Furniture
                    </Button>
                  </Link>
                  <Link href="/colors">
                    <Button variant="outline" size="lg">
                      Explore Paint Packs
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    )
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
            className="mb-8"
          >
            <Link href="/rooms" className="inline-flex items-center text-primary-500 hover:text-primary-600 mb-6 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  Shopping
                  <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                    {" "}Cart
                  </span>
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
              
              {items.length > 0 && (
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  loading={isClearing}
                  className="mt-4 md:mt-0"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {item.type === 'paint_pack' ? 'Paint Pack' : 'Furniture'}
                            {item.category && ` • ${item.category.replace('-', ' ')}`}
                          </p>
                          <div className="text-xl font-bold text-primary-500 mt-1">
                            ₹{item.price.toLocaleString()}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2 glass rounded-lg p-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-1 w-8 h-8"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-1 w-8 h-8"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id, item.name)}
                            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Item Total:
                          </span>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass rounded-xl p-6 sticky top-24"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal ({getTotalItems()} items)
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      GST (18%)
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ₹{tax.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Shipping
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {shipping === 0 ? (
                        <span className="text-green-500">Free</span>
                      ) : (
                        `₹${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  
                  {shipping > 0 && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Add ₹{(50000 - subtotal).toLocaleString()} more for free shipping
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-primary-500">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full mb-4"
                  onClick={() => router.push('/checkout')}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </Button>

                <div className="text-center">
                  <Link href="/rooms" className="text-primary-500 hover:text-primary-600 text-sm transition-colors">
                    Continue Shopping
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span>Secure Checkout with Stripe</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}