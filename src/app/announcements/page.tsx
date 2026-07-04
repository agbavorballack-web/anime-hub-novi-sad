'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Megaphone, Calendar } from 'lucide-react'
import { getAnnouncements, Announcement } from '@/lib/supabase'

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAnnouncements() {
      const data = await getAnnouncements()
      setAnnouncements(data.filter(a => a.published))
      setLoading(false)
    }
    loadAnnouncements()
  }, [])

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Announcements</h1>
          <p className="text-gray-400 text-lg">Latest news and updates from Anime Hub Novi Sad</p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-purple mx-auto"></div>
          </div>
        )}

        {/* Announcements list */}
        {!loading && announcements.length === 0 && (
          <div className="text-center py-12 bg-dark-card rounded-2xl border border-dark-border">
            <Megaphone className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400 text-lg">No announcements yet.</p>
          </div>
        )}

        {!loading && announcements.length > 0 && (
          <div className="space-y-6">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-card rounded-2xl p-8 border border-dark-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Megaphone className="w-6 h-6 text-neon-purple" />
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(announcement.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-4">{announcement.title}</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{announcement.content}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
