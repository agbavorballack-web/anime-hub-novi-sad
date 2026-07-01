'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Award,
  Star,
  Trophy,
  Calendar,
  Lock,
  CheckCircle,
  Medal,
  Crown,
  Ticket,
  Gift,
  Share2,
  ExternalLink,
  PartyPopper,
  X
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Achievement {
  id: number
  title: string
  description: string
  icon: React.ElementType
  points: number
  type: 'auto_ticket' | 'auto_attend' | 'referral'
  /** For auto types: how many purchases/attendances needed */
  threshold?: number
  actionLabel: string
  actionHint: string
}

const WHATSAPP_GROUP = 'https://chat.whatsapp.com/KqoazdpQWWQGkxMBkBLR56'

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: 'First Event',
    description: 'Purchase a ticket to your first Anime Hub event',
    icon: Calendar,
    points: 100,
    type: 'auto_ticket',
    threshold: 1,
    actionLabel: 'Buy a Ticket',
    actionHint: 'Head to our Events page and purchase your first ticket.',
  },
  {
    id: 2,
    title: 'Ticket Collector',
    description: 'Purchase tickets for 3 different events',
    icon: Ticket,
    points: 200,
    type: 'auto_ticket',
    threshold: 3,
    actionLabel: 'Browse Events',
    actionHint: 'You need 3 ticket purchases total to unlock this.',
  },
  {
    id: 3,
    title: 'Event Enthusiast',
    description: 'Purchase tickets for 5 events',
    icon: Trophy,
    points: 400,
    type: 'auto_ticket',
    threshold: 5,
    actionLabel: 'Browse Events',
    actionHint: 'Keep buying tickets — 5 purchases unlocks this badge.',
  },
  {
    id: 4,
    title: 'Community Veteran',
    description: 'Purchase tickets for 10 events',
    icon: Medal,
    points: 800,
    type: 'auto_ticket',
    threshold: 10,
    actionLabel: 'Browse Events',
    actionHint: '10 ticket purchases earns you Veteran status.',
  },
  {
    id: 5,
    title: 'VIP Member',
    description: 'Purchase tickets for 20 events — exclusive early-access perks',
    icon: Crown,
    points: 2000,
    type: 'auto_ticket',
    threshold: 20,
    actionLabel: 'Browse Events',
    actionHint: 'The ultimate milestone — 20 ticket purchases.',
  },
  {
    id: 6,
    title: 'Refer a Friend',
    description: 'Share your referral link and bring a friend to the community',
    icon: Gift,
    points: 150,
    type: 'referral',
    actionLabel: 'Share on WhatsApp',
    actionHint: 'Click "Share on WhatsApp" to send your referral link. Points are awarded after you share.',
  },
]

const LEVELS = [
  { name: 'New Member', points: 0, icon: Lock },
  { name: 'Fan', points: 300, icon: Star },
  { name: 'Enthusiast', points: 800, icon: Trophy },
  { name: 'Veteran', points: 1800, icon: Medal },
  { name: 'VIP', points: 3500, icon: Crown },
  { name: 'Legend', points: 7000, icon: Award },
]

// ─── Main Component ────────────────────────────────────────────────────────────
export default function RewardsPage() {
  const [ticketCount, setTicketCount] = useState(0)
  const [completedIds, setCompletedIds] = useState<number[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [toast, setToast] = useState<{ title: string; points: number } | null>(null)
  const [activeHint, setActiveHint] = useState<number | null>(null)

  // ── Load state from localStorage on mount ──────────────────────────────────
  useEffect(() => {
    const purchases: unknown[] = JSON.parse(localStorage.getItem('ticket_purchases') || '[]')
    setTicketCount(purchases.length)

    const saved: number[] = JSON.parse(localStorage.getItem('rewards_completed') || '[]')
    const savedPoints: number = JSON.parse(localStorage.getItem('rewards_points') || '0')
    setCompletedIds(saved)
    setTotalPoints(savedPoints)
  }, [])

  // ── Auto-check ticket achievements whenever ticketCount changes ────────────
  useEffect(() => {
    const ticketAchievements = ACHIEVEMENTS.filter(a => a.type === 'auto_ticket')
    ticketAchievements.forEach(a => {
      if (!completedIds.includes(a.id) && ticketCount >= (a.threshold ?? 0)) {
        unlockAchievement(a)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketCount])

  // ── Unlock helper ──────────────────────────────────────────────────────────
  const unlockAchievement = (achievement: Achievement) => {
    setCompletedIds(prev => {
      if (prev.includes(achievement.id)) return prev
      const updated = [...prev, achievement.id]
      localStorage.setItem('rewards_completed', JSON.stringify(updated))
      return updated
    })
    setTotalPoints(prev => {
      const updated = prev + achievement.points
      localStorage.setItem('rewards_points', JSON.stringify(updated))
      return updated
    })
    setToast({ title: achievement.title, points: achievement.points })
    setTimeout(() => setToast(null), 4000)
  }

  // ── Handle referral share ──────────────────────────────────────────────────
  const handleReferral = () => {
    const referralAchievement = ACHIEVEMENTS.find(a => a.type === 'referral')!
    const message = encodeURIComponent(
      `Hey! I found this awesome anime community in Novi Sad — Anime Hub NS! 🎌\n\nJoin us here: ${WHATSAPP_GROUP}\n\nCome to our events, it's going to be amazing! 🎉`
    )
    window.open(`https://wa.me/?text=${message}`, '_blank')
    // Award points after click — we trust the user shared it
    if (!completedIds.includes(referralAchievement.id)) {
      setTimeout(() => unlockAchievement(referralAchievement), 1500)
    }
  }

  // ── Derived values ─────────────────────────────────────────────────────────
  const currentLevelIndex = LEVELS.reduce((best, l, i) =>
    totalPoints >= l.points ? i : best, 0)
  const currentLevel = LEVELS[currentLevelIndex]
  const nextLevel = LEVELS[currentLevelIndex + 1]
  const progressToNext = nextLevel
    ? Math.min(((totalPoints - currentLevel.points) / (nextLevel.points - currentLevel.points)) * 100, 100)
    : 100

  const completedCount = completedIds.length

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ── Toast notification ── */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -60, scale: 0.9 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-neon-purple text-white px-6 py-4 rounded-2xl shadow-2xl shadow-neon-purple/40 flex items-center gap-3"
            >
              <PartyPopper className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-bold">Achievement Unlocked: {toast.title}!</p>
                <p className="text-sm opacity-90">+{toast.points} points added to your profile</p>
              </div>
              <button onClick={() => setToast(null)} className="ml-2 opacity-70 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Rewards & Achievements</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every ticket you buy and friend you bring unlocks real rewards. Take action — the points are yours.
          </p>
        </motion.div>

        {/* ── User Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">{totalPoints}</div>
              <div className="text-gray-400">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-purple mb-2">{currentLevel.name}</div>
              <div className="text-gray-400">Current Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-pink mb-2">{ticketCount}</div>
              <div className="text-gray-400">Tickets Purchased</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">{completedCount}/{ACHIEVEMENTS.length}</div>
              <div className="text-gray-400">Achievements Unlocked</div>
            </div>
          </div>

          {/* Level Progress */}
          {nextLevel && (
            <div className="mt-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progress to <span className="text-white font-semibold">{nextLevel.name}</span></span>
                <span className="text-neon-purple">{Math.round(progressToNext)}%</span>
              </div>
              <div className="w-full bg-dark-border rounded-full h-4 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-neon-purple to-neon-pink h-4 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNext}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{currentLevel.points} pts</span>
                <span>{nextLevel.points} pts</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Achievements — each is actionable ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Achievements</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {ACHIEVEMENTS.map((achievement) => {
              const isCompleted = completedIds.includes(achievement.id)
              const isReferral = achievement.type === 'referral'
              const isTicket = achievement.type === 'auto_ticket'
              const progress = isTicket ? Math.min(ticketCount, achievement.threshold ?? 0) : undefined
              const showHint = activeHint === achievement.id

              return (
                <motion.div
                  key={achievement.id}
                  layout
                  className={`bg-dark-card rounded-xl border transition-all ${
                    isCompleted
                      ? 'border-neon-purple shadow-lg shadow-neon-purple/10'
                      : 'border-dark-border'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`p-3 rounded-lg flex-shrink-0 ${isCompleted ? 'bg-neon-purple/20' : 'bg-dark-bg'}`}>
                        {isCompleted
                          ? <CheckCircle className="w-8 h-8 text-neon-purple" />
                          : <achievement.icon className="w-8 h-8 text-gray-500" />
                        }
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold">{achievement.title}</h3>
                          <span className="text-neon-purple font-bold text-sm whitespace-nowrap">+{achievement.points} pts</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>

                        {/* Ticket progress bar */}
                        {isTicket && !isCompleted && (
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>{progress}/{achievement.threshold} tickets</span>
                            </div>
                            <div className="w-full bg-dark-border rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-neon-purple to-neon-pink h-2 rounded-full transition-all"
                                style={{ width: `${((progress ?? 0) / (achievement.threshold ?? 1)) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Status / Action */}
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 bg-neon-purple/20 text-neon-purple text-xs px-3 py-1.5 rounded-full font-semibold">
                            <CheckCircle className="w-3 h-3" /> Unlocked
                          </span>
                        ) : isReferral ? (
                          <button
                            onClick={handleReferral}
                            className="btn-primary text-sm flex items-center gap-2 py-2 px-4"
                          >
                            <Share2 className="w-4 h-4" />
                            Share on WhatsApp
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Link
                              href="/events"
                              className="btn-primary text-sm flex items-center gap-2 py-2 px-4"
                            >
                              <ExternalLink className="w-4 h-4" />
                              {achievement.actionLabel}
                            </Link>
                            <button
                              onClick={() => setActiveHint(showHint ? null : achievement.id)}
                              className="text-gray-500 hover:text-gray-300 text-xs underline"
                            >
                              How?
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hint dropdown */}
                    <AnimatePresence>
                      {showHint && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-dark-border text-sm text-gray-400 flex items-start gap-2">
                            <span>💡</span>
                            <span>{achievement.actionHint}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* ── How to earn (informational) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">How Points Work</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Ticket, title: 'Buy a Ticket', points: '+50 per ticket', desc: 'Points are added automatically every time you buy a ticket.' },
              { icon: Calendar, title: 'Attend an Event', points: '+100 per event', desc: 'Verified at the door — bring your booking code or QR.' },
              { icon: Gift, title: 'Refer a Friend', points: '+150 per referral', desc: 'Share your WhatsApp referral link. Points unlock after you share.' },
              { icon: Trophy, title: 'Win a Contest', points: '+300', desc: 'Contests happen at live events. Win one and points are added by the admin.' },
            ].map((item, i) => (
              <div key={i} className="bg-dark-card rounded-xl p-6 border border-dark-border">
                <item.icon className="w-10 h-10 mb-4 text-neon-pink" />
                <h3 className="font-bold mb-1">{item.title}</h3>
                <div className="text-neon-purple font-bold text-sm mb-2">{item.points}</div>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Rank Levels ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">Rank Levels</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {LEVELS.map((level) => {
              const isUnlocked = totalPoints >= level.points
              return (
                <div
                  key={level.name}
                  className={`bg-dark-card rounded-xl p-4 border text-center transition-all ${
                    isUnlocked ? 'border-neon-purple shadow-md shadow-neon-purple/10' : 'border-dark-border opacity-50'
                  }`}
                >
                  <level.icon className={`w-8 h-8 mx-auto mb-2 ${isUnlocked ? 'text-neon-purple' : 'text-gray-600'}`} />
                  <div className={`font-bold text-sm mb-1 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>{level.name}</div>
                  <div className="text-xs text-gray-500">{level.points.toLocaleString()} pts</div>
                  {isUnlocked && <div className="text-xs text-neon-purple mt-1 font-semibold">✓ Unlocked</div>}
                </div>
              )
            })}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
