'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Calendar } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Large 404 */}
          <div className="mb-6">
            <span
              className="text-9xl font-black"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              404
            </span>
          </div>

          {/* Anime-style subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <p className="text-2xl font-bold text-white mb-2">
              Page Not Found
            </p>
            <p className="text-gray-400 text-base">
              Looks like this page went on a filler arc and never came back.
            </p>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="h-px my-8 mx-auto w-48"
            style={{ background: 'linear-gradient(90deg, transparent, #a855f7, transparent)' }}
          />

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/events"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white border border-purple-500/50 transition-all duration-200 hover:border-purple-400 hover:bg-purple-500/10"
            >
              <Calendar className="w-4 h-4" />
              View Events
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
