'use client'

import { motion } from 'framer-motion'
import { Shield, Heart, AlertTriangle, Users, MessageSquare, Eye } from 'lucide-react'

export default function RulesPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Community Rules</h1>
          <p className="text-gray-400 text-lg">Guidelines for a respectful and welcoming community</p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-neon-pink" />
            <h2 className="text-2xl font-bold">Our Community Philosophy</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Anime Hub Novi Sad is built on respect, inclusivity, and shared passion. These rules help ensure our community remains a welcoming space for all anime fans, regardless of their background, experience level, or preferences. By participating in our community, you agree to follow these guidelines.
          </p>
        </motion.div>

        {/* Core Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-neon-purple" />
            <h2 className="text-2xl font-bold">Core Principles</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-neon-pink/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-neon-pink font-bold">1</span>
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Respect Everyone</h3>
                <p className="text-gray-400">Treat all community members with dignity and respect, regardless of their opinions, background, or experience level with anime.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-neon-purple/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-neon-purple font-bold">2</span>
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Be Inclusive</h3>
                <p className="text-gray-400">Welcome newcomers and experienced fans alike. Different opinions and perspectives make our community richer.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-neon-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-neon-blue font-bold">3</span>
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Constructive Dialogue</h3>
                <p className="text-gray-400">Disagreements are natural, but keep discussions civil. Focus on ideas, not personal attacks.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-neon-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-neon-green font-bold">4</span>
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Protect Privacy</h3>
                <p className="text-gray-400">Never share personal information about others without consent. Respect everyone's privacy boundaries.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Specific Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-neon-red" />
            <h2 className="text-2xl font-bold">Prohibited Behavior</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-neon-red" />
                Harassment & Bullying
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-400 ml-6">
                <li>No personal attacks, threats, or harassment of any kind</li>
                <li>No stalking or unwanted attention toward other members</li>
                <li>No hate speech, slurs, or discriminatory language</li>
                <li>No doxxing or sharing private information</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-neon-red" />
                Inappropriate Content
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-400 ml-6">
                <li>No NSFW or explicit content unless clearly marked and in appropriate sections</li>
                <li>No spam, excessive self-promotion, or commercial advertising</li>
                <li>No illegal content or links to illegal activities</li>
                <li>No malware, viruses, or harmful links</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5 text-neon-red" />
                Event Misconduct
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-400 ml-6">
                <li>No disruption of events or meetups</li>
                <li>No harassment of event staff or attendees</li>
                <li>No unauthorized recording or photography where prohibited</li>
                <li>No theft or vandalism at event venues</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Content Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-8 h-8 text-neon-blue" />
            <h2 className="text-2xl font-bold">Content Guidelines</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-neon-green rounded-full mt-2"></div>
              <div>
                <h3 className="font-bold text-white mb-1">Fan Art & Creative Content</h3>
                <p className="text-gray-400">Share your creative work in the Showcase section. Always credit original creators and respect copyright laws.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-neon-green rounded-full mt-2"></div>
              <div>
                <h3 className="font-bold text-white mb-1">Discussion Posts</h3>
                <p className="text-gray-400">Keep discussions relevant to anime and community interests. Use appropriate categories and tags.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-neon-green rounded-full mt-2"></div>
              <div>
                <h3 className="font-bold text-white mb-1">Spoilers</h3>
                <p className="text-gray-400">Always use spoiler tags for major plot points. Be considerate of those who haven't seen the latest episodes.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-neon-green rounded-full mt-2"></div>
              <div>
                <h3 className="font-bold text-white mb-1">Self-Promotion</h3>
                <p className="text-gray-400">Limited self-promotion of anime-related content is allowed in appropriate sections. Excessive promotion will be removed.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enforcement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-neon-purple" />
            <h2 className="text-2xl font-bold">Enforcement & Consequences</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>Our admin team reserves the right to enforce these rules through:</p>
            <ul className="list-disc list-inside space-y-2 ml-6">
              <li><strong className="text-white">Warnings:</strong> First violations typically receive a warning</li>
              <li><strong className="text-white">Content Removal:</strong> Inappropriate content will be removed</li>
              <li><strong className="text-white">Temporary Bans:</strong> Repeated violations may result in temporary suspension</li>
              <li><strong className="text-white">Permanent Bans:</strong> Severe or repeated violations may result in permanent removal</li>
            </ul>
            <p className="mt-4 text-gray-400">Appeals can be submitted to the admin team through our WhatsApp group or email.</p>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-neon-purple/30 text-center"
        >
          <Heart className="w-12 h-12 mx-auto mb-4 text-neon-pink" />
          <h2 className="text-2xl font-bold mb-4">Questions About Rules?</h2>
          <p className="text-gray-300 mb-6">
            If you're unsure about whether something is allowed, or if you need to report a violation, please contact our admin team.
          </p>
          <a
            href="https://chat.whatsapp.com/KqoazdpQWWQGkxMBkBLR56"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            Contact Admin Team
          </a>
        </motion.div>
      </div>
    </div>
  )
}
