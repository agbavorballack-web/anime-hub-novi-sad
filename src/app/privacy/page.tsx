'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Database, UserCheck, Cookie } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Privacy Policy</h1>
          <p className="text-gray-400 text-lg">Last updated: May 2026</p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-neon-purple" />
            <h2 className="text-2xl font-bold">Our Commitment to Privacy</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            At Anime Hub Novi Sad, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information. By using our website and community, you agree to the practices described in this policy.
          </p>
        </motion.div>

        {/* Information We Collect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-8 h-8 text-neon-blue" />
            <h2 className="text-2xl font-bold">Information We Collect</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="font-bold text-white mb-2">Account Information</h3>
              <ul className="list-disc list-inside space-y-1 ml-6 text-gray-400">
                <li>Username and display name</li>
                <li>Email address</li>
                <li>Optional: Location, profile picture</li>
                <li>Password (encrypted and stored securely)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Activity Data</h3>
              <ul className="list-disc list-inside space-y-1 ml-6 text-gray-400">
                <li>Forum posts and comments</li>
                <li>Event attendance and ticket purchases</li>
                <li>Rewards points and achievements</li>
                <li>Watchlist and favorites</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Technical Data</h3>
              <ul className="list-disc list-inside space-y-1 ml-6 text-gray-400">
                <li>IP address and location data</li>
                <li>Browser type and device information</li>
                <li>Pages visited and time spent on site</li>
                <li>Cookies and similar technologies</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* How We Use Your Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-8 h-8 text-neon-pink" />
            <h2 className="text-2xl font-bold">How We Use Your Information</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-6">
              <li>Provide and improve our services</li>
              <li>Process event registrations and ticket purchases</li>
              <li>Send important updates about events and community news</li>
              <li>Personalize your experience on the platform</li>
              <li>Prevent fraud and ensure platform security</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </motion.div>

        {/* Data Protection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-8 h-8 text-neon-green" />
            <h2 className="text-2xl font-bold">Data Protection & Security</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>We implement industry-standard security measures to protect your information:</p>
            <ul className="list-disc list-inside space-y-2 ml-6">
              <li><strong className="text-white">Encryption:</strong> All passwords are encrypted using industry-standard algorithms</li>
              <li><strong className="text-white">Secure Payments:</strong> Payment processing is handled directly by Serbian banks</li>
              <li><strong className="text-white">Access Control:</strong> Only authorized admin personnel can access sensitive data</li>
              <li><strong className="text-white">Regular Updates:</strong> We regularly update our security practices</li>
              <li><strong className="text-white">Data Minimization:</strong> We only collect information necessary for our services</li>
            </ul>
          </div>
        </motion.div>

        {/* Your Rights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="w-8 h-8 text-neon-purple" />
            <h2 className="text-2xl font-bold">Your Privacy Rights</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-6">
              <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
              <li><strong className="text-white">Correction:</strong> Update or correct inaccurate information</li>
              <li><strong className="text-white">Deletion:</strong> Request deletion of your account and personal data</li>
              <li><strong className="text-white">Opt-out:</strong> Opt out of marketing communications</li>
              <li><strong className="text-white">Portability:</strong> Request transfer of your data to another service</li>
            </ul>
            <p className="mt-4 text-gray-400">To exercise these rights, contact us through our WhatsApp group or email.</p>
          </div>
        </motion.div>

        {/* Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Cookie className="w-8 h-8 text-neon-pink" />
            <h2 className="text-2xl font-bold">Cookies & Tracking</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside space-y-2 ml-6">
              <li>Keep you logged in to your account</li>
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Improve user experience and functionality</li>
            </ul>
            <p className="mt-4 text-gray-400">You can manage cookie preferences through your browser settings.</p>
          </div>
        </motion.div>

        {/* Third-Party Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-8 h-8 text-neon-blue" />
            <h2 className="text-2xl font-bold">Third-Party Services</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>We may share data with the following third parties:</p>
            <ul className="list-disc list-inside space-y-2 ml-6">
              <li><strong className="text-white">Serbian Banks:</strong> For payment processing only</li>
              <li><strong className="text-white">Service Providers:</strong> For hosting, analytics, and technical support</li>
              <li><strong className="text-white">Legal Authorities:</strong> When required by law</li>
            </ul>
            <p className="mt-4 text-gray-400">We never sell your personal information to third parties.</p>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-neon-purple/30 text-center"
        >
          <Shield className="w-12 h-12 mx-auto mb-4 text-neon-purple" />
          <h2 className="text-2xl font-bold mb-4">Privacy Questions?</h2>
          <p className="text-gray-300 mb-6">
            If you have questions about this privacy policy or how we handle your data, please contact us.
          </p>
          <a
            href="https://chat.whatsapp.com/KqoazdpQWWQGkxMBkBLR56"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  )
}
