'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSetting, getAnnouncements, Announcement } from '@/lib/supabase'
import { 
  Sparkles, 
  Calendar, 
  Users, 
  Zap,
  ArrowRight,
  Ticket,
  Clock,
  MapPin,
  Heart,
  Megaphone,
  X
} from 'lucide-react'

function LikeButton({ eventId }: { eventId: number }) {
  const key = `event_likes_${eventId}`
  const likedKey = `event_liked_${eventId}`
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(0)
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    setCount(parseInt(localStorage.getItem(key) || '0', 10))
    setLiked(localStorage.getItem(likedKey) === 'true')
  }, [key, likedKey])

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newLiked = !liked
    const newCount = newLiked ? count + 1 : Math.max(0, count - 1)
    setLiked(newLiked)
    setCount(newCount)
    localStorage.setItem(key, String(newCount))
    localStorage.setItem(likedKey, String(newLiked))
    if (newLiked) { setBurst(true); setTimeout(() => setBurst(false), 600) }
  }

  return (
    <button onClick={handleLike} className="flex items-center gap-1.5 group focus:outline-none" aria-label={liked ? 'Unlike' : 'Like'}>
      <div className="relative">
        <AnimatePresence>
          {burst && [...Array(6)].map((_, i) => (
            <motion.span key={i} className="absolute w-1.5 h-1.5 rounded-full bg-neon-pink"
              style={{ top: '50%', left: '50%' }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: Math.cos((i / 6) * Math.PI * 2) * 18, y: Math.sin((i / 6) * Math.PI * 2) * 18, opacity: 0, scale: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
        <motion.div animate={liked ? { scale: [1, 1.4, 0.9, 1.15, 1] } : { scale: 1 }} transition={{ duration: 0.4 }}>
          <Heart className={`w-6 h-6 transition-colors duration-200 ${liked ? 'text-neon-pink drop-shadow-[0_0_8px_#ff00ff]' : 'text-gray-500 group-hover:text-gray-300'}`}
            fill={liked ? 'currentColor' : 'none'} strokeWidth={liked ? 0 : 2} />
        </motion.div>
      </div>
      <motion.span key={count} initial={{ y: liked ? -8 : 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}
        className={`text-sm font-semibold tabular-nums ${liked ? 'text-neon-pink' : 'text-gray-500'}`}>
        {count}
      </motion.span>
    </button>
  )
}

// Fallback event shown when no admin events exist yet
const DEFAULT_EVENT = {
  id: 1,
  title: "Launch Party — Be Our First Members!",
  date: "2026-07-15",
  time: "18:00",
  location: "To Be Announced",
  price: 500,
  image: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=400"
}

function useCountdown(targetDate: string) {
  const calculate = () => {
    const target = new Date(`${targetDate}T00:00:00`).getTime()
    const now = Date.now()
    const diff = target - now
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculate)

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculate()), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-dark-bg border border-neon-purple/40 rounded-xl w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-2 shadow-lg shadow-neon-purple/10">
        <span className="text-3xl md:text-4xl font-bold gradient-text tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
  )
}

export default function Home() {
  const { language, t } = useLanguage()

  // Load the soonest upcoming event — prefer admin-created, fall back to default
  const [nextEvent, setNextEvent] = useState(DEFAULT_EVENT)
  const [eventCount, setEventCount] = useState(1)
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920')
  const [latestAnnouncement, setLatestAnnouncement] = useState<Announcement | null>(null)
  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    getSetting('hero_image').then(img => {
      if (img) setHeroImage(img)
    })
  }, [])

  useEffect(() => {
    async function loadAnnouncement() {
      const announcements = await getAnnouncements()
      const published = announcements.filter(a => a.published)
      if (published.length > 0) setLatestAnnouncement(published[0])
    }
    loadAnnouncement()
  }, [])

  useEffect(() => {
    async function loadEvents() {
      const { getEvents } = await import('@/lib/supabase')
      const supabaseEvents = await getEvents()
      const now = new Date().toISOString().split('T')[0]
      const upcoming = supabaseEvents
        .filter(e => e.date >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      // Total = default (1) + admin created
      setEventCount(1 + supabaseEvents.length)
      if (upcoming.length > 0) {
        setNextEvent({
          id: upcoming[0].id,
          title: upcoming[0].title,
          date: upcoming[0].date,
          time: upcoming[0].time,
          location: upcoming[0].location,
          price: upcoming[0].price,
          image: upcoming[0].image,
        })
      }
    }
    loadEvents()
  }, [])

  const countdown = useCountdown(nextEvent.date)

  const stats = [
    { icon: Users, label: t('home.statCommunity'), value: t('home.statCommunityValue') },
    { icon: Calendar, label: t('home.statEvents'), value: `${eventCount} ${t('home.statEventsValue')}` },
    { icon: Sparkles, label: t('home.statFounded'), value: "2026" },
    { icon: Ticket, label: t('home.statTickets'), value: t('home.statTicketsValue') }
  ]

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20" />
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${heroImage})` }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Anime Hub Novi Sad
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t('home.heroSubtitle')}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/events" className="btn-primary">
              <Zap className="inline mr-2" />
              {t('home.exploreEvents')}
            </Link>
            <Link href={`/events/${nextEvent.id}`} className="btn-secondary">
              <Ticket className="inline mr-2" />
              {t('home.getTickets')}
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating blobs */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-neon-pink rounded-full blur-3xl opacity-30"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-neon-blue rounded-full blur-3xl opacity-30"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </section>

      {/* ── Latest Announcement Banner ── */}
      {latestAnnouncement && showBanner && (
        <section className="py-4 px-4 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 border-y border-neon-purple/30">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <Megaphone className="w-6 h-6 text-neon-purple flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">{latestAnnouncement.title}</h3>
                <p className="text-gray-300 text-sm line-clamp-2">{latestAnnouncement.content}</p>
              </div>
              <Link href="/announcements" className="btn-primary text-sm whitespace-nowrap px-4 py-2">
                {t('home.readMore')}
              </Link>
              <button
                onClick={() => setShowBanner(false)}
                className="text-gray-400 hover:text-white"
                aria-label="Close announcement"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── Countdown Timer ── */}
      <section className="py-16 px-4 bg-dark-card/80 border-y border-dark-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-neon-pink uppercase tracking-widest text-sm font-semibold mb-2">{t('home.nextEvent')}</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{nextEvent.title}</h2>
            <div className="flex items-center justify-center gap-6 text-gray-400 text-sm mb-8">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(nextEvent.date).toLocaleDateString(language === 'sr' ? 'sr-RS' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {nextEvent.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {nextEvent.location}
              </span>
            </div>

            {countdown.expired ? (
              <p className="text-2xl font-bold text-neon-purple">{t('home.eventStarted')}</p>
            ) : (
              <div className="flex items-center justify-center gap-4 md:gap-6">
                <CountdownUnit value={countdown.days} label={t('home.days')} />
                <span className="text-3xl font-bold text-neon-purple pb-6">:</span>
                <CountdownUnit value={countdown.hours} label={t('home.hours')} />
                <span className="text-3xl font-bold text-neon-purple pb-6">:</span>
                <CountdownUnit value={countdown.minutes} label={t('home.minutes')} />
                <span className="text-3xl font-bold text-neon-purple pb-6">:</span>
                <CountdownUnit value={countdown.seconds} label={t('home.seconds')} />
              </div>
            )}

            <div className="mt-8">
              <Link href={`/events/${nextEvent.id}`} className="btn-primary inline-flex items-center gap-2">
                <Ticket className="w-5 h-5" />
                {t('home.secureSpot')} — {nextEvent.price} RSD
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Mission Statement ── */}
      <section className="py-20 px-4 bg-dark-card/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 neon-text">{t('home.mission')}</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              {t('home.missionText')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-dark-bg rounded-xl border border-dark-border card-hover"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-neon-pink" />
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12"
          >
            <h2 className="text-4xl font-bold neon-text">{t('home.upcomingEvents')}</h2>
            <Link href="/events" className="btn-secondary flex items-center">
              {t('home.viewAll')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark-card rounded-xl overflow-hidden border border-dark-border card-hover"
            >
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${nextEvent.image})` }} />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{nextEvent.title}</h3>
                <div className="space-y-2 text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(nextEvent.date).toLocaleDateString(language === 'sr' ? 'sr-RS' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4" />
                    {nextEvent.price} RSD
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <LikeButton eventId={nextEvent.id} />
                  <Link href={`/events/${nextEvent.id}`} className="btn-primary flex-1 text-center">
                    {t('home.getTickets')}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA ── */}
      <section className="py-20 px-4 bg-dark-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-12 border border-neon-purple/30"
          >
            <Ticket className="w-16 h-16 mx-auto mb-6 text-neon-pink" />
            <h2 className="text-4xl font-bold mb-4">{t('home.stayInLoop')}</h2>
            <p className="text-gray-300 text-lg mb-8">
              {t('home.stayInLoopText')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://chat.whatsapp.com/KqoazdpQWWQGkxMBkBLR56"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('home.joinWhatsapp')}
              </a>
              <Link href="/events" className="btn-secondary inline-flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                {t('home.browseEvents')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
