'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCartStore } from '@/lib/store'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { CheckCircle, Package, Truck, ArrowRight, Home } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function OrderSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clearCart } = useCartStore()
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    // Clear cart on successful order
    clearCart()
    
    // Generate order number from session ID
    if (sessionId) {
      setOrderNumber(sessionId.slice(-8).toUpperCase())
    }

    // Trigger confetti animation
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [sessionId, clearCart])

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
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Order
                  <span className="bg-gradient-to-r from-green-500 to-primary-500 bg-clip-text text-transparent">
                    {" "}Confirmed!
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Thank you for your purchase! Your order has been successfully placed.
                </p>

                {orderNumber && (
                  <div className="glass rounded-lg p-6 mb-8 max-w-md mx-auto">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Order Number
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      #{orderNumber}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              >
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Order Processing
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We're preparing your items for shipment
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Shipping
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your order will be shipped within 2-3 business days
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Delivery
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enjoy your new furniture and decor!
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  onClick={() => router.push('/orders')}
                >
                  <Package className="w-5 h-5 mr-2" />
                  Track Your Order
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.push('/')}
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      What's Next?
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>• You'll receive an email confirmation shortly</li>
                      <li>• Track your order in the Orders section</li>
                      <li>• We'll notify you when your order ships</li>
                      <li>• Delivery typically takes 5-7 business days</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Need Help?
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>• Contact us at support@dreaminteriors.com</li>
                      <li>• Call us at +91-9876543210</li>
                      <li>• WhatsApp support available 24/7</li>
                      <li>• Visit our FAQ section for quick answers</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}