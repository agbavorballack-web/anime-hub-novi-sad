'use client'

import { motion } from 'framer-motion'
import { FileText, AlertTriangle, Shield, Users, Gavel, CheckCircle } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Terms of Service</h1>
          <p className="text-gray-400 text-lg">Last updated: May 2026</p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-neon-purple" />
            <h2 className="text-2xl font-bold">Agreement to Terms</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            By accessing and using Anime Hub Novi Sad, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or community. These terms may be updated periodically, and continued use of the platform constitutes acceptance of any changes.
          </p>
        </motion.div>

        {/* User Responsibilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-neon-blue" />
            <h2 className="text-2xl font-bold">User Responsibilities</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>As a user of Anime Hub Novi Sad, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-6">
              <li>Provide accurate and complete information when creating your account</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect the rights and privacy of other community members</li>
              <li>Follow our Community Rules and Guidelines</li>
            </ul>
          </div>
        </motion.div>

        {/* Acceptable Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-neon-green" />
            <h2 className="text-2xl font-bold">Acceptable Use</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>You may use Anime Hub Novi Sad for:</p>
            <ul className="list-disc list-inside space-y-2 ml-6">
              <li>Personal enjoyment and community engagement</li>
              <li>Sharing anime-related content and discussions</li>
              <li>Participating in events and community activities</li>
              <li>Connecting with other anime enthusiasts</li>
              <li>Creating and sharing fan art, cosplay, and creative content</li>
            </ul>
          </div>
        </motion.div>

        {/* Prohibited Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-neon-red" />
            <h2 className="text-2xl font-bold">Prohibited Activities</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 ml-6">
              <li>Use the platform for any illegal purposes</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Post spam, viruses, or harmful code</li>
              <li>Infringe on intellectual property rights</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated tools to scrape or exploit the platform</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the service or servers</li>
            </ul>
          </div>
        </motion.div>

        {/* Content & Intellectual Property */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-neon-purple" />
            <h2 className="text-2xl font-bold">Content & Intellectual Property</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="font-bold text-white mb-2">Your Content</h3>
              <p className="text-gray-400">You retain ownership of content you post. By posting, you grant us a license to use, display, and distribute your content on our platform. You represent that you have the right to post such content.</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Anime & Intellectual Property</h3>
              <p className="text-gray-400">Anime characters, series, and related content are property of their respective creators and studios. Our community respects intellectual property rights. Fan art and creative content should be transformative and credit original creators.</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Platform Content</h3>
              <p className="text-gray-400">Website design, code, and original content are protected by copyright. You may not reproduce, modify, or distribute our platform content without permission.</p>
            </div>
          </div>
        </motion.div>

        {/* Events & Payments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Gavel className="w-8 h-8 text-neon-pink" />
            <h2 className="text-2xl font-bold">Events & Payments</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="font-bold text-white mb-2">Event Registration</h3>
              <p className="text-gray-400">Event registration is subject to availability. We reserve the right to cancel or modify events. In case of cancellation, refunds will be processed according to the event's refund policy.</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Payment Terms</h3>
              <p className="text-gray-400">Payments are processed through Serbian banks. By purchasing tickets, you agree to the bank's terms and conditions. All payments are final unless otherwise specified in the event's refund policy.</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Event Conduct</h3>
              <p className="text-gray-400">Attendees must follow event rules and venue policies. We reserve the right to remove individuals who disrupt events or violate rules.</p>
            </div>
          </div>
        </motion.div>

        {/* Account Termination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-neon-red" />
            <h2 className="text-2xl font-bold">Account Termination</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>We reserve the right to suspend or terminate accounts that:</p>
            <ul className="list-disc list-inside space-y-2 ml-6">
              <li>Violate these Terms of Service</li>
              <li>Violate our Community Rules</li>
              <li>Engage in fraudulent or illegal activities</li>
              <li>Compromise the security or integrity of the platform</li>
            </ul>
            <p className="mt-4 text-gray-400">You may delete your account at any time through your profile settings. Upon deletion, your personal data will be removed according to our Privacy Policy.</p>
          </div>
        </motion.div>

        {/* Disclaimers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-neon-yellow" />
            <h2 className="text-2xl font-bold">Disclaimers</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <ul className="list-disc list-inside space-y-2 ml-6">
              <li>The platform is provided "as is" without warranties of any kind</li>
              <li>We are not responsible for user-generated content</li>
              <li>We do not guarantee uninterrupted or error-free service</li>
              <li>External links are provided for convenience; we are not responsible for their content</li>
              <li>Anime recommendations and discussions reflect user opinions, not official endorsements</li>
            </ul>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-neon-purple/30 text-center"
        >
          <FileText className="w-12 h-12 mx-auto mb-4 text-neon-purple" />
          <h2 className="text-2xl font-bold mb-4">Questions About Terms?</h2>
          <p className="text-gray-300 mb-6">
            If you have questions about these Terms of Service, please contact us through our WhatsApp group or email.
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
