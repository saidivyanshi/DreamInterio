'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { designers } from '@/lib/data'
import { Star, MessageCircle, Phone, Mail, Award, Users, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'

export default function DesignersPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleBookConsultation = (designer: any) => {
    toast.success(`Consultation request sent to ${designer.name}!`)
  }

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank')
  }

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_blank')
  }

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, '_blank')
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
              Expert
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                {" "}Designers
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Connect with India's top interior designers. Get personalized consultations 
              and transform your space with professional expertise.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              { icon: Users, number: '100+', label: 'Expert Designers' },
              { icon: Award, number: '4.9', label: 'Average Rating' },
              { icon: Calendar, number: '24/7', label: 'Support Available' },
            ].map((stat, index) => (
              <div key={index} className="text-center glass rounded-xl p-6">
                <stat.icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Designers Grid */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {designers.map((designer, index) => (
              <motion.div
                key={designer.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 group hover:scale-105"
              >
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary-200 dark:border-primary-800">
                    <Image
                      src={designer.image}
                      alt={designer.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {designer.specialty}
                  </div>
                </div>

                {/* Designer Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {designer.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(designer.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
                        {designer.rating}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {designer.experience}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Experience
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {designer.projects}+
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Projects
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-bold text-primary-500 mb-4">
                    ₹{designer.price.toLocaleString()}
                    <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                      /consultation
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => handleBookConsultation(designer)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Consultation
                  </Button>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleWhatsApp(designer.whatsapp)}
                      className="p-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCall(designer.phone)}
                      className="p-2"
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEmail(designer.email)}
                      className="p-2"
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Need a Custom Design Solution?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our designers can work with any budget and style preference. 
                Get a free initial consultation to discuss your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Free Consultation
                </Button>
                <Button variant="outline" size="lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call +91-9876543210
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}