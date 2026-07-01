'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Calendar, Target, Sparkles, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">About Us</h1>
          <p className="text-gray-400 text-lg">Building Serbia's largest anime community together</p>
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-neon-pink" />
            <h2 className="text-3xl font-bold">Our Story</h2>
          </div>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Anime Hub Novi Sad was founded in May 2026 with a simple yet powerful vision: to create the largest and most vibrant anime community in Serbia, starting right here in Novi Sad.
            </p>
            <p>
              What began as a small WhatsApp group of passionate anime fans has grown into a comprehensive platform designed to bring together enthusiasts from all over the country. We believe that anime is more than just entertainment – it's a cultural phenomenon that connects people, sparks creativity, and builds lasting friendships.
            </p>
            <p>
              Our community is built on the foundation of shared passion, mutual respect, and the joy of discovering new stories together. Whether you're a long-time otaku or just starting your anime journey, you'll find a welcoming home here at Anime Hub Novi Sad.
            </p>
          </div>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-neon-purple" />
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </div>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p className="text-xl font-semibold text-white">
              To create the largest anime community in Serbia where fans can connect, share, and celebrate their passion together.
            </p>
            <p>
              We strive to provide a safe, inclusive, and engaging space where anime enthusiasts can:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Connect with fellow fans and make lasting friendships</li>
              <li>Discover new anime series and share recommendations</li>
              <li>Participate in exciting events and meetups</li>
              <li>Showcase their creativity through fan art and cosplay</li>
              <li>Engage in meaningful discussions about their favorite shows</li>
            </ul>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-neon-blue" />
            <h2 className="text-3xl font-bold">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-dark-bg rounded-xl p-6">
              <Users className="w-10 h-10 mb-4 text-neon-pink" />
              <h3 className="text-xl font-bold mb-2">Community First</h3>
              <p className="text-gray-400">Every member matters. We build our community together, one connection at a time.</p>
            </div>
            <div className="bg-dark-bg rounded-xl p-6">
              <Heart className="w-10 h-10 mb-4 text-neon-purple" />
              <h3 className="text-xl font-bold mb-2">Passion & Respect</h3>
              <p className="text-gray-400">We celebrate our shared love for anime while respecting diverse opinions and backgrounds.</p>
            </div>
            <div className="bg-dark-bg rounded-xl p-6">
              <Calendar className="w-10 h-10 mb-4 text-neon-blue" />
              <h3 className="text-xl font-bold mb-2">Real Connections</h3>
              <p className="text-gray-400">We prioritize meaningful interactions and real friendships over superficial engagement.</p>
            </div>
            <div className="bg-dark-bg rounded-xl p-6">
              <Globe className="w-10 h-10 mb-4 text-neon-green" />
              <h3 className="text-xl font-bold mb-2">Inclusive Growth</h3>
              <p className="text-gray-400">Everyone is welcome, from casual viewers to dedicated collectors, from Serbia and beyond.</p>
            </div>
          </div>
        </motion.div>

        {/* What We Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-8 h-8 text-neon-green" />
            <h2 className="text-3xl font-bold">What We Offer</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-neon-pink rounded-full mt-2"></div>
              <div>
                <h3 className="font-bold text-white mb-1">Events & Meetups</h3>
                <p className="text-gray-400">Regular anime screenings, cosplay competitions, workshops, and social gatherings in Novi Sad.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-neon-purple rounded-full mt-2"></div>
              <div>
                <h3 className="font-bold text-white mb-1">Discussion Forums</h3>
                <p className="text-gray-400">Engaging discussions about anime, theories, recommendations, and industry news.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-neon-blue rounded-full mt-2"></div>
              <div>
                <h3 className="font-bold text-white mb-1">Creative Showcase</h3>
                <p className="text-gray-400">A platform to share fan art, cosplay photos, and creative reviews with the community.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-neon-green rounded-full mt-2"></div>
              <div>
                <h3 className="font-bold text-white mb-1">Rewards & Recognition</h3>
                <p className="text-gray-400">Points system and achievements to celebrate active community members.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Join Us CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-neon-purple/30 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="text-gray-300 mb-6">
            Be part of something special from the very beginning. Your voice and passion will help shape the future of anime community in Serbia!
          </p>
          <a
            href="https://chat.whatsapp.com/KqoazdpQWWQGkxMBkBLR56"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            Join Our WhatsApp Group
          </a>
        </motion.div>
      </div>
    </div>
  )
}
