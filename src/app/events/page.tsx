'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { getEvents } from '@/lib/supabase'
import { Calendar, Clock, MapPin, Users, Ticket, Search, Heart } from 'lucide-react'
import Link from 'next/link'

function LikeButton({ eventId }: { eventId: number }) {
  const key = `event_likes_${eventId}`
  const likedKey = `event_liked_${eventId}`

  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(0)
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem(key) || '0', 10)
    const savedLiked = localStorage.getItem(likedKey) === 'true'
    setCount(savedCount)
    setLiked(savedLiked)
  }, [key, likedKey])

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault() // don't navigate to event page
    e.stopPropagation()

    const newLiked = !liked
    const newCount = newLiked ? count + 1 : Math.max(0, count - 1)

    setLiked(newLiked)
    setCount(newCount)
    localStorage.setItem(key, String(newCount))
    localStorage.setItem(likedKey, String(newLiked))

    if (newLiked) {
      setBurst(true)
      setTimeout(() => setBurst(false), 600)
    }
  }

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-1.5 group focus:outline-none"
      aria-label={liked ? 'Unlike event' : 'Like event'}
    >
      <div className="relative">
        {/* Pop burst particles when liking */}
        <AnimatePresence>
          {burst && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-neon-pink"
                  style={{ top: '50%', left: '50%' }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((i / 6) * Math.PI * 2) * 18,
                    y: Math.sin((i / 6) * Math.PI * 2) * 18,
                    opacity: 0,
                    scale: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* The heart itself */}
        <motion.div
          animate={liked ? { scale: [1, 1.4, 0.9, 1.15, 1] } : { scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <Heart
            className={`w-6 h-6 transition-colors duration-200 ${
              liked
                ? 'text-neon-pink drop-shadow-[0_0_8px_#ff00ff]'
                : 'text-gray-500 group-hover:text-gray-300'
            }`}
            fill={liked ? 'currentColor' : 'none'}
            strokeWidth={liked ? 0 : 2}
          />
        </motion.div>
      </div>

      {/* Count */}
      <motion.span
        key={count}
        initial={{ y: liked ? -8 : 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`text-sm font-semibold tabular-nums ${liked ? 'text-neon-pink' : 'text-gray-500'}`}
      >
        {count}
      </motion.span>
    </button>
  )
}

const DEFAULT_EVENTS = [
  {
    id: 1,
    title: 'Community Launch Party',
    description: 'Join us for our very first community meetup! Let\'s get to know each other and plan future events together.',
    date: '2026-07-15',
    time: '18:00',
    endTime: '22:00',
    location: 'To Be Announced (Join WhatsApp for updates)',
    price: 500,
    capacity: 50,
    registered: 0,
    category: 'meetup',
    image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=600'
  }
]

export default function EventsPage() {
  const { language, t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [events, setEvents] = useState(DEFAULT_EVENTS)

  // Load events from Supabase (admin-created + default)
  useEffect(() => {
    async function loadEvents() {
      const supabaseEvents = await getEvents()
      if (supabaseEvents.length > 0) {
        const adminIds = new Set(supabaseEvents.map(e => e.id))
        const base = DEFAULT_EVENTS.filter(e => !adminIds.has(e.id))
        setEvents([...base, ...supabaseEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
      }
    }
    loadEvents()
  }, [])

  const categories = [
    { id: 'all', label: t('events.allEvents') },
    { id: 'meetup', label: t('events.meetups') },
  ]

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">{t('events.title')}</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('events.subtitle')}
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="bg-dark-card rounded-xl p-6 border border-dark-border mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder={t('events.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-neon-purple text-white'
                      : 'bg-dark-bg text-gray-400 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-card rounded-xl overflow-hidden border border-dark-border card-hover"
            >
              <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${event.image})` }}>
                <div className="absolute top-4 right-4 bg-neon-purple px-3 py-1 rounded-full text-sm font-medium">
                  {event.price === 0 ? t('events.free') : `${event.price} RSD`}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-neon-pink" />
                    {new Date(event.date).toLocaleDateString(language === 'sr' ? 'sr-RS' : 'en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neon-blue" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-neon-purple" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-neon-green" />
                    {event.registered}/{event.capacity} {t('events.registered')}
                  </div>
                </div>

                <div className="w-full bg-dark-border rounded-full h-2 mb-4">
                  <div
                    className="bg-neon-purple h-2 rounded-full"
                    style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                  />
                </div>

                {/* Bottom row: Like button + Get Tickets */}
                <div className="flex items-center gap-3">
                  <LikeButton eventId={event.id} />
                  <Link href={`/events/${event.id}`} className="btn-primary flex-1 text-center">
                    <Ticket className="inline mr-2 w-4 h-4" />
                    {t('events.getTickets')}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400 text-lg">{t('events.noEvents')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
