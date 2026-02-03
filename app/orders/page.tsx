'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { createClient } from '@/lib/supabase'
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin,
  Calendar,
  CreditCard,
  ArrowRight
} from 'lucide-react'

interface Order {
  id: string
  created_at: string
  items: any[]
  customer_info: any
  total_amount: number
  status: string
  session_id: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const user = useUser()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }

    fetchOrders()
  }, [user, router])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Your
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                {" "}Orders
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track and manage your DreamInteriors orders
            </p>
          </motion.div>

          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass rounded-xl p-6">
                  <LoadingSkeleton className="h-6 w-1/4 mb-4" />
                  <LoadingSkeleton className="h-4 w-1/2 mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <LoadingSkeleton className="h-20" />
                    <LoadingSkeleton className="h-20" />
                    <LoadingSkeleton className="h-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="glass rounded-2xl p-12">
                <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No Orders Yet
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  You haven't placed any orders yet. Start shopping to see your orders here.
                </p>
                <button
                  onClick={() => router.push('/rooms')}
                  className="btn-primary"
                >
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="w-4 h-4 mr-1" />
                          ₹{order.total_amount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <button className="text-primary-500 hover:text-primary-600 font-medium transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {order.items.slice(0, 3).map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold text-primary-500">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {order.items.length > 3 && (
                      <div className="flex items-center justify-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400">
                          +{order.items.length - 3} more items
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Shipping Info */}
                  {order.customer_info && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {order.customer_info.name}
                          </div>
                          <div>
                            {order.customer_info.address}, {order.customer_info.city}
                          </div>
                          <div>
                            {order.customer_info.state} - {order.customer_info.pincode}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}