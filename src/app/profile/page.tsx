'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Award, 
  Settings,
  Edit,
  MapPin,
  Camera,
  LogOut,
  Ticket
} from 'lucide-react'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('events')
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const user = {
    username: 'AnimeFan2026',
    email: 'animefan@example.com',
    location: 'Novi Sad, Serbia',
    joinDate: 'May 2026',
    points: 0,
    level: 'New Member',
    stats: {
      eventsAttended: 0,
      ticketsPurchased: 0
    }
  }

  const eventHistory: any[] = []

  const tabs = [
    { id: 'events', icon: Calendar, label: 'Event History' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* Avatar — click to change */}
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <img
                src={avatar}
                alt={user.username}
                className="w-32 h-32 rounded-full border-4 border-neon-purple object-cover"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 rounded-full bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white mb-1" />
                <span className="text-white text-xs font-medium">Change</span>
              </div>
              {/* Edit badge */}
              <div className="absolute bottom-0 right-0 p-2 bg-neon-purple rounded-full border-2 border-dark-card">
                <Edit className="w-4 h-4 text-white" />
              </div>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold gradient-text mb-2">{user.username}</h1>
              <p className="text-gray-400 mb-4">{user.email}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {user.joinDate}
                </span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-1">{user.points}</div>
              <div className="text-sm text-gray-400 mb-2">Community Points</div>
              <div className="inline-flex items-center px-3 py-1 bg-neon-purple/20 rounded-full text-neon-purple text-sm">
                <Award className="w-4 h-4 mr-1" />
                {user.level}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-dark-bg rounded-lg p-4 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-neon-blue" />
              <div className="text-2xl font-bold">{user.stats.eventsAttended}</div>
              <div className="text-sm text-gray-400">Events Attended</div>
            </div>
            <div className="bg-dark-bg rounded-lg p-4 text-center">
              <Ticket className="w-8 h-8 mx-auto mb-2 text-neon-pink" />
              <div className="text-2xl font-bold">{user.stats.ticketsPurchased}</div>
              <div className="text-sm text-gray-400">Tickets Purchased</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-neon-purple text-white'
                  : 'bg-dark-card text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card rounded-2xl p-6 border border-dark-border"
        >
          {activeTab === 'events' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Event History</h2>
              {eventHistory.length === 0 ? (
                <div className="text-center py-16">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <h3 className="text-xl font-bold mb-2 text-gray-300">No events attended yet</h3>
                  <p className="text-gray-500">Events you attend will appear here. Check our upcoming events!</p>
                </div>
              ) : eventHistory.map((event) => (
                <div key={event.id} className="flex items-center justify-between bg-dark-bg rounded-lg p-4">
                  <div>
                    <h3 className="font-bold">{event.title}</h3>
                    <div className="text-sm text-gray-400">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${event.attended ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {event.attended ? 'Attended' : 'Missed'}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    defaultValue={user.location}
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                  />
                </div>
                <button className="btn-primary">Save Changes</button>
              </div>
              <div className="border-t border-dark-border pt-6">
                <button className="flex items-center gap-2 text-red-400 hover:text-red-300">
                  <LogOut className="w-5 h-5" />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
