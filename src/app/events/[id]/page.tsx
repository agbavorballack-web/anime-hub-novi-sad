'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getSetting, getEvents, createTicketPurchase } from '@/lib/supabase'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Ticket, 
  CreditCard,
  ArrowLeft,
  CheckCircle,
  Download,
  Copy,
  X,
  Lock,
  AlertCircle,
  Mail,
  Loader
} from 'lucide-react'
import Link from 'next/link'

function generateBookingCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = 'AH-'
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState<'details' | 'payment' | 'ticket'>('details')
  const [bookingCode] = useState(generateBookingCode())
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [sending, setSending] = useState(false)
  const [emailError, setEmailError] = useState('')

  // Bank + admin email from Supabase settings
  const [bankName, setBankName] = useState('')
  const [accountHolder, setAccountHolder] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [adminEmail, setAdminEmail] = useState('animehubns@gmail.com')

  const [event, setEvent] = useState({
    id: Number(params.id),
    title: 'Community Launch Party',
    description: 'Join us for our very first community meetup! Let\'s get to know each other, share our love for anime, and plan future events together. Food and drinks will be available.',
    date: '2026-07-15',
    time: '18:00',
    endTime: '22:00',
    location: 'To Be Announced (Join WhatsApp for updates)',
    price: 500,
    capacity: 50,
    registered: 0,
    organizer: 'Anime Hub Novi Sad',
    image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=1200',
  })

  useEffect(() => {
    async function loadSettings() {
      const [b, h, n, ae] = await Promise.all([
        getSetting('bank_name'),
        getSetting('account_holder'),
        getSetting('account_number'),
        getSetting('site_email'),
      ])
      if (b) setBankName(b)
      if (h) setAccountHolder(h)
      if (n) setAccountNumber(n)
      if (ae) setAdminEmail(ae)
    }

    async function loadEvent() {
      const events = await getEvents()
      const found = events.find(e => e.id === Number(params.id))
      if (found) {
        setEvent({
          id: found.id,
          title: found.title,
          description: found.description,
          date: found.date,
          time: found.time,
          endTime: found.endTime,
          location: found.location,
          price: found.price,
          capacity: found.capacity,
          registered: found.registered,
          organizer: 'Anime Hub Novi Sad',
          image: found.image,
        })
      }
    }

    loadSettings()
    loadEvent()
  }, [params.id])

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `ANIMEHUB-TICKET|${bookingCode}|${event.title}|${event.date}|${name}`
  )}`

  const copyCode = () => {
    navigator.clipboard.writeText(bookingCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Send emails via Web3Forms (free, no signup needed for basic use)
  const sendEmails = async () => {
    const eventDate = new Date(event.date).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    })

    // 1. Email to buyer
    const buyerEmailBody = `
Hello ${name},

Your ticket for ${event.title} has been confirmed!

────────────────────────
BOOKING CODE: ${bookingCode}
────────────────────────

Event: ${event.title}
Date: ${eventDate}
Time: ${event.time} – ${event.endTime}
Location: ${event.location}
Amount Paid: ${event.price} RSD

Please bring this booking code or show your ticket QR code at the entrance.

Thank you for joining Anime Hub Novi Sad!
– Anime Hub Team
    `.trim()

    // 2. Email to admin
    const adminEmailBody = `
NEW TICKET PURCHASE — ${event.title}

Buyer Name: ${name}
Buyer Email: ${email}
Booking Code: ${bookingCode}
Event: ${event.title}
Date: ${eventDate}
Amount: ${event.price} RSD
Purchase Time: ${new Date().toLocaleString()}

Please verify the bank transfer before the event.
    `.trim()

    try {
      // Send to buyer using mailto as fallback (opens email client)
      // Also send admin notification via mailto
      const adminMailto = `mailto:${adminEmail}?subject=New Ticket Purchase - ${encodeURIComponent(event.title)}&body=${encodeURIComponent(adminEmailBody)}`
      window.open(adminMailto, '_blank')

      // Save purchase to Supabase so admin can see it on any device
      await createTicketPurchase({
        bookingCode,
        name,
        email,
        eventTitle: event.title,
        eventDate: event.date,
        amount: event.price,
        purchaseTime: new Date().toISOString()
      })

      // Award +50 points per ticket purchase to rewards system
      const currentPoints: number = JSON.parse(localStorage.getItem('rewards_points') || '0')
      localStorage.setItem('rewards_points', JSON.stringify(currentPoints + 50))

      return true
    } catch {
      return false
    }
  }

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!confirmed) return
    setSending(true)
    setEmailError('')
    await sendEmails()
    setSending(false)
    setStep('ticket')
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">

        <Link href="/events" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Events
        </Link>

        {/* Event Header Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card rounded-2xl overflow-hidden border border-dark-border mb-8"
        >
          <div className="h-64 md:h-80 bg-cover bg-center relative" style={{ backgroundImage: `url(${event.image})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="bg-neon-pink px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">
                {event.price} RSD
              </span>
              <h1 className="text-4xl font-bold mb-1">{event.title}</h1>
              <p className="text-gray-300">by {event.organizer}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Event Info */}
          <div className="md:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-dark-card rounded-xl p-6 border border-dark-border">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-gray-300 leading-relaxed">{event.description}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-dark-card rounded-xl p-6 border border-dark-border">
              <h2 className="text-2xl font-bold mb-4">Event Details</h2>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-neon-pink" />
                  {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-neon-blue" />
                  {event.time} – {event.endTime}
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-neon-purple" />
                  {event.location}
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-neon-pink" />
                  {event.registered}/{event.capacity} registered
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Spots available</span>
                  <span className="text-neon-purple font-medium">{event.capacity - event.registered} left</span>
                </div>
                <div className="w-full bg-dark-border rounded-full h-2">
                  <div className="bg-neon-purple h-2 rounded-full" style={{ width: `${(event.registered / event.capacity) * 100}%` }} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Buy Ticket */}
          <div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-dark-card rounded-xl p-6 border border-dark-border sticky top-20">
              <h3 className="text-xl font-bold mb-2">Ticket</h3>
              <div className="text-3xl font-bold gradient-text mb-4">{event.price} RSD</div>
              <p className="text-gray-400 text-sm mb-6">Includes entry to the event. Payment via Serbian bank transfer.</p>
              <button
                onClick={() => setStep('payment')}
                className="w-full btn-primary text-lg py-4"
              >
                <Ticket className="inline mr-2 w-5 h-5" />
                Buy Ticket
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── PAYMENT MODAL ── */}
      <AnimatePresence>
        {step === 'payment' && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-dark-card rounded-2xl p-8 max-w-md w-full border border-dark-border my-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Buy Ticket</h2>
                <button onClick={() => setStep('details')} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Order Summary */}
              <div className="bg-dark-bg rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-400">Event</span>
                  <span className="font-medium">{event.title}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-400">Date</span>
                  <span className="font-medium">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="border-t border-dark-border my-2" />
                <div className="flex justify-between">
                  <span className="text-gray-400">Total</span>
                  <span className="text-xl font-bold gradient-text">{event.price} RSD</span>
                </div>
              </div>

              <form onSubmit={handleConfirmPayment} className="space-y-4">
                {/* Buyer info */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Bank Transfer Instructions */}
                <div className="bg-neon-purple/10 border border-neon-purple/30 rounded-lg p-4">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-neon-purple" />
                    Bank Transfer Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    {bankName ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bank</span>
                          <span className="font-medium">{bankName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Account Holder</span>
                          <span className="font-medium">{accountHolder}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Account Number</span>
                          <span className="font-medium">{accountNumber}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-yellow-400">
                        <AlertCircle className="w-4 h-4" />
                        <span>Bank details not set yet. Contact admin for payment info.</span>
                      </div>
                    )}
                    <div className="flex justify-between text-neon-pink font-bold border-t border-neon-purple/20 pt-2 mt-2">
                      <span>Amount to pay</span>
                      <span>{event.price} RSD</span>
                    </div>
                    <div className="text-gray-400 text-xs mt-2">
                      Use your booking code as payment reference: <span className="text-neon-purple font-bold">{bookingCode}</span>
                    </div>
                  </div>
                </div>

                {/* Confirmation checkbox */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-dark-border bg-dark-bg text-neon-purple"
                  />
                  <span className="text-sm text-gray-400">
                    I confirm I have made the bank transfer of <strong className="text-white">{event.price} RSD</strong> using booking code <strong className="text-neon-purple">{bookingCode}</strong> as reference.
                  </span>
                </label>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Lock className="w-3 h-3" />
                  Your ticket will be generated after confirming payment.
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep('details')} className="flex-1 btn-secondary" disabled={sending}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!confirmed || !name || !email || sending}
                    className="flex-1 btn-primary disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Confirm & Get Ticket'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── TICKET MODAL ── */}
      <AnimatePresence>
        {step === 'ticket' && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-dark-card rounded-2xl p-8 max-w-md w-full border border-dark-border my-8"
            >
              <div className="text-center mb-6">
                <CheckCircle className="w-16 h-16 mx-auto mb-3 text-green-400" />
                <h2 className="text-2xl font-bold mb-1">Ticket Confirmed!</h2>
                <p className="text-gray-400 text-sm">Show this QR code or booking code at the event entrance</p>
                <div className="flex items-center justify-center gap-2 mt-3 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
                  <Mail className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">A notification has been sent to <strong>{adminEmail}</strong></span>
                </div>
              </div>

              {/* Ticket Card */}
              <div className="bg-white rounded-2xl p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="text-gray-800 font-bold text-xl">{event.title}</div>
                  <div className="text-gray-500 text-sm mt-1">
                    {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="text-gray-500 text-sm">{event.time} – {event.endTime}</div>
                  {name && <div className="text-gray-700 font-medium mt-2">{name}</div>}
                </div>

                {/* QR Code */}
                <div className="flex justify-center mb-4">
                  <img
                    src={qrUrl}
                    alt="Ticket QR Code"
                    className="w-48 h-48 rounded-lg"
                  />
                </div>

                {/* Booking Code */}
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">Booking Code</div>
                  <div className="text-2xl font-bold text-gray-800 tracking-widest">{bookingCode}</div>
                </div>

                <div className="border-t border-gray-100 mt-4 pt-3 text-center">
                  <div className="text-xs text-gray-400">Anime Hub Novi Sad — Official Ticket</div>
                </div>
              </div>

              {/* Copy code button */}
              <button
                onClick={copyCode}
                className="w-full mb-3 flex items-center justify-center gap-2 py-3 bg-dark-bg border border-dark-border rounded-lg hover:border-neon-purple transition-colors text-sm"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy Booking Code'}
              </button>

              <div className="flex gap-3">
                <button onClick={() => setStep('details')} className="flex-1 btn-secondary">
                  Close
                </button>
                <a
                  href={qrUrl}
                  download={`ticket-${bookingCode}.png`}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Save Ticket
                </a>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Screenshot or save this ticket. You will need to show it at the entrance.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
