'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings,
  Plus,
  Trash2,
  Bell,
  TrendingUp,
  Eye,
  EyeOff,
  LogOut,
  Lock,
  Save,
  Shield,
  Globe,
  CheckCircle,
  AlertCircle,
  Key,
  CreditCard,
  Link as LinkIcon,
  Info,
  Ticket,
  Mail
} from 'lucide-react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  // Announcements state
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Welcome to Anime Hub Novi Sad!',
      content: 'We just launched! Join our WhatsApp group to help us build the community.',
      date: '2026-06-28',
      published: true
    }
  ])
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' })

  // Events state
  const [adminEvents, setAdminEvents] = useState<{
    id: number
    title: string
    description: string
    date: string
    time: string
    endTime: string
    location: string
    price: number
    capacity: number
    category: string
    image: string
  }[]>([])
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '18:00',
    endTime: '22:00',
    location: '',
    price: 0,
    capacity: 50,
    category: 'meetup',
    image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=600'
  })
  const [eventSaved, setEventSaved] = useState(false)

  // Settings state
  const [whatsappLink, setWhatsappLink] = useState('https://chat.whatsapp.com/KqoazdpQWWQGkxMBkBLR56')
  const [instagramLink, setInstagramLink] = useState('')
  const [siteName, setSiteName] = useState('Anime Hub Novi Sad')
  const [siteEmail, setSiteEmail] = useState('info@animehub.rs')
  const [phoneNumber, setPhoneNumber] = useState('+381 21 XXX XXX')
  const [bankName, setBankName] = useState('')
  const [accountHolder, setAccountHolder] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [settingsSaved, setSettingsSaved] = useState(false)
  const [gaId, setGaId] = useState('')
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920')

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [adminPassword, setAdminPassword] = useState('animehub2026')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // Ticket purchases state
  const [ticketPurchases, setTicketPurchases] = useState<{
    bookingCode: string
    name: string
    email: string
    eventTitle: string
    eventDate: string
    amount: number
    purchaseTime: string
  }[]>([])

  // Load ALL saved settings from localStorage on mount
  useEffect(() => {
    const savedPassword = localStorage.getItem('admin_password')
    if (savedPassword) setAdminPassword(savedPassword)

    const savedWhatsapp = localStorage.getItem('setting_whatsapp')
    if (savedWhatsapp) setWhatsappLink(savedWhatsapp)

    const savedInstagram = localStorage.getItem('setting_instagram')
    if (savedInstagram) setInstagramLink(savedInstagram)

    const savedSiteName = localStorage.getItem('setting_siteName')
    if (savedSiteName) setSiteName(savedSiteName)

    const savedEmail = localStorage.getItem('setting_email')
    if (savedEmail) setSiteEmail(savedEmail)

    const savedPhone = localStorage.getItem('setting_phone')
    if (savedPhone) setPhoneNumber(savedPhone)

    const savedBank = localStorage.getItem('setting_bankName')
    if (savedBank) setBankName(savedBank)

    const savedHolder = localStorage.getItem('setting_accountHolder')
    if (savedHolder) setAccountHolder(savedHolder)

    const savedAccount = localStorage.getItem('setting_accountNumber')
    if (savedAccount) setAccountNumber(savedAccount)

    const savedGaId = localStorage.getItem('setting_ga_id')
    if (savedGaId) setGaId(savedGaId)

    const savedHeroImage = localStorage.getItem('setting_hero_image')
    if (savedHeroImage) setHeroImage(savedHeroImage)

    const savedPurchases = localStorage.getItem('ticket_purchases')
    if (savedPurchases) setTicketPurchases(JSON.parse(savedPurchases))

    const savedEvents = localStorage.getItem('admin_events')
    if (savedEvents) setAdminEvents(JSON.parse(savedEvents))
  }, [])

  const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'announcements', icon: Bell, label: 'Announcements' },
    { id: 'tickets', icon: Ticket, label: 'Tickets' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'events', icon: Calendar, label: 'Events' },

    { id: 'settings', icon: Settings, label: 'Settings' },
  ]



  const handlePublishAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      setAnnouncements([
        {
          id: Date.now(),
          title: newAnnouncement.title,
          content: newAnnouncement.content,
          date: new Date().toISOString().split('T')[0],
          published: true
        },
        ...announcements
      ])
      setNewAnnouncement({ title: '', content: '' })
    }
  }

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id))
  }

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date) return
    const event = { ...newEvent, id: Date.now() }
    const updated = [...adminEvents, event]
    setAdminEvents(updated)
    localStorage.setItem('admin_events', JSON.stringify(updated))
    setNewEvent({ title: '', description: '', date: '', time: '18:00', endTime: '22:00', location: '', price: 0, capacity: 50, category: 'meetup', image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=600' })
    setEventSaved(true)
    setTimeout(() => setEventSaved(false), 3000)
  }

  const handleDeleteEvent = (id: number) => {
    const updated = adminEvents.filter(e => e.id !== id)
    setAdminEvents(updated)
    localStorage.setItem('admin_events', JSON.stringify(updated))
  }

  const handleSaveSettings = () => {
    // Save everything to localStorage so it persists after refresh
    localStorage.setItem('setting_whatsapp', whatsappLink)
    localStorage.setItem('setting_instagram', instagramLink)
    localStorage.setItem('setting_siteName', siteName)
    localStorage.setItem('setting_email', siteEmail)
    localStorage.setItem('setting_phone', phoneNumber)
    localStorage.setItem('setting_bankName', bankName)
    localStorage.setItem('setting_accountHolder', accountHolder)
    localStorage.setItem('setting_accountNumber', accountNumber)
    localStorage.setItem('setting_ga_id', gaId)
    localStorage.setItem('setting_hero_image', heroImage)
    setSettingsSaved(true)
    setTimeout(() => setSettingsSaved(false), 3000)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMsg(null)
    if (currentPassword !== adminPassword) {
      setPasswordMsg({ type: 'error', text: 'Current password is incorrect.' })
      return
    }
    if (newPassword.length < 8) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 8 characters.' })
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' })
      return
    }
    // Save new password to localStorage so it persists after refresh
    localStorage.setItem('admin_password', newPassword)
    setAdminPassword(newPassword)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setPasswordMsg({ type: 'success', text: 'Password changed successfully! Use your new password next time you log in.' })
  }

  const handleLogout = () => {
    document.cookie = 'admin_session=; path=/; max-age=0'
    window.location.href = '/admin-login'
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-1">Admin Dashboard</h1>
            <p className="text-gray-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-neon-purple" />
              Anime Hub Novi Sad — Admin Panel
            </p>
          </div>
          <button onClick={handleLogout} className="btn-secondary flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-dark-card rounded-xl p-4 border border-dark-border sticky top-20">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">Navigation</p>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                    activeTab === tab.id
                      ? 'bg-neon-purple text-white shadow-lg shadow-neon-purple/20'
                      : 'text-gray-400 hover:text-white hover:bg-dark-bg'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
              <div className="border-t border-dark-border mt-4 pt-4">
                <div className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-xs text-green-400 font-medium">System Status</p>
                  <p className="text-xs text-gray-400 mt-1">All systems operational</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">

            {/* ── OVERVIEW ── */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-bold mb-6">Overview</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {/* Ticket Purchases — click to go to Tickets tab */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
                    onClick={() => setActiveTab('tickets')}
                    className="bg-dark-card rounded-xl p-6 border border-dark-border text-left hover:border-neon-pink transition-all group"
                  >
                    <Ticket className="w-8 h-8 mb-4 text-neon-pink group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold mb-1">{ticketPurchases.length}</div>
                    <div className="text-gray-400 text-sm mb-1">Ticket Purchases</div>
                    <div className="text-neon-pink text-xs">→ View all tickets</div>
                  </motion.button>

                  {/* Events — click to go to Events tab */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    onClick={() => setActiveTab('events')}
                    className="bg-dark-card rounded-xl p-6 border border-dark-border text-left hover:border-neon-purple transition-all group"
                  >
                    <Calendar className="w-8 h-8 mb-4 text-neon-purple group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold mb-1">{adminEvents.length + 1}</div>
                    <div className="text-gray-400 text-sm mb-1">Events Created</div>
                    <div className="text-neon-purple text-xs">→ Manage events</div>
                  </motion.button>

                  {/* Announcements — click to go to Announcements tab */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    onClick={() => setActiveTab('announcements')}
                    className="bg-dark-card rounded-xl p-6 border border-dark-border text-left hover:border-neon-blue transition-all group"
                  >
                    <Bell className="w-8 h-8 mb-4 text-neon-blue group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold mb-1">{announcements.length}</div>
                    <div className="text-gray-400 text-sm mb-1">Announcements</div>
                    <div className="text-neon-blue text-xs">→ Manage announcements</div>
                  </motion.button>

                  {/* Page Views — if GA set up, open GA dashboard; otherwise go to Settings */}
                  {gaId ? (
                    <motion.a
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      href="https://analytics.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-dark-card rounded-xl p-6 border border-green-500/40 text-left hover:border-green-400 transition-all group"
                    >
                      <Eye className="w-8 h-8 mb-4 text-green-400 group-hover:scale-110 transition-transform" />
                      <div className="text-xl font-bold mb-1 text-green-400">Live ✓</div>
                      <div className="text-gray-400 text-sm mb-1">Page Views</div>
                      <div className="text-green-400 text-xs">→ Open Google Analytics</div>
                    </motion.a>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      onClick={() => setActiveTab('settings')}
                      className="bg-dark-card rounded-xl p-6 border border-yellow-500/40 text-left hover:border-yellow-400 transition-all group"
                    >
                      <Eye className="w-8 h-8 mb-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                      <div className="text-xl font-bold mb-1 text-yellow-400">Not set up</div>
                      <div className="text-gray-400 text-sm mb-1">Page Views</div>
                      <div className="text-yellow-400 text-xs">→ Click to set up in Settings</div>
                    </motion.button>
                  )}
                </div>

                <div className="bg-dark-card rounded-xl p-6 border border-dark-border mb-6">
                  <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button onClick={() => setActiveTab('announcements')} className="btn-primary flex items-center justify-center gap-2">
                      <Bell className="w-5 h-5" /> New Announcement
                    </button>
                    <button onClick={() => setActiveTab('events')} className="btn-secondary flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5" /> Create Event
                    </button>
                    <button onClick={() => setActiveTab('settings')} className="btn-secondary flex items-center justify-center gap-2">
                      <Settings className="w-5 h-5" /> Settings
                    </button>
                  </div>
                </div>

                {/* ── Real Activity Feed ── */}
                <div className="bg-dark-card rounded-xl border border-dark-border overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border">
                    <h3 className="text-xl font-bold">Recent Activity</h3>
                    <span className="text-xs text-gray-500">Live — from your site data</span>
                  </div>

                  {(() => {
                    // Build a unified activity list from all localStorage sources
                    const items: { type: string; label: string; sub: string; time: string; color: string; dot: string }[] = []

                    // Ticket purchases
                    ticketPurchases.forEach(p => {
                      items.push({
                        type: 'ticket',
                        label: `🎟️ Ticket purchased — ${p.name}`,
                        sub: `${p.eventTitle} · ${p.amount} RSD · Code: ${p.bookingCode}`,
                        time: p.purchaseTime,
                        color: 'text-neon-pink',
                        dot: 'bg-neon-pink',
                      })
                    })

                    // Admin-created events
                    adminEvents.forEach(e => {
                      items.push({
                        type: 'event',
                        label: `📅 Event created — ${e.title}`,
                        sub: `${e.date} · ${e.time} · ${e.price === 0 ? 'Free' : `${e.price} RSD`}`,
                        time: new Date(e.id).toISOString(), // id = Date.now()
                        color: 'text-neon-purple',
                        dot: 'bg-neon-purple',
                      })
                    })

                    // Announcements (skip default seeded one)
                    announcements.filter(a => a.id !== 1).forEach(a => {
                      items.push({
                        type: 'announcement',
                        label: `📢 Announcement published — ${a.title}`,
                        sub: a.content.length > 60 ? a.content.slice(0, 60) + '…' : a.content,
                        time: new Date(a.date).toISOString(),
                        color: 'text-neon-blue',
                        dot: 'bg-neon-blue',
                      })
                    })

                    // Sort newest first
                    items.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())

                    const recent = items.slice(0, 8)

                    if (recent.length === 0) {
                      return (
                        <div className="text-gray-400 text-center py-12">
                          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                          <p className="font-medium mb-1">No activity yet</p>
                          <p className="text-sm text-gray-500">Activity will appear here as soon as tickets are bought, events are created, or announcements are published.</p>
                        </div>
                      )
                    }

                    return (
                      <ul className="divide-y divide-dark-border">
                        {recent.map((item, i) => {
                          const date = new Date(item.time)
                          const formatted = isNaN(date.getTime())
                            ? '—'
                            : date.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                          return (
                            <li key={i} className="flex items-start gap-4 px-6 py-4 hover:bg-dark-bg/50 transition-colors">
                              <span className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.dot}`} />
                              <div className="flex-1 min-w-0">
                                <p className={`font-semibold text-sm ${item.color}`}>{item.label}</p>
                                <p className="text-gray-400 text-xs mt-0.5 truncate">{item.sub}</p>
                              </div>
                              <span className="text-gray-500 text-xs whitespace-nowrap flex-shrink-0">{formatted}</span>
                            </li>
                          )
                        })}
                      </ul>
                    )
                  })()}
                </div>
              </motion.div>
            )}

            {/* ── ANNOUNCEMENTS ── */}
            {activeTab === 'announcements' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-bold mb-6">Announcements</h2>

                <div className="bg-dark-card rounded-xl p-6 border border-dark-border mb-8">
                  <h3 className="text-lg font-bold mb-4">Create New Announcement</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                      <input
                        type="text"
                        value={newAnnouncement.title}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                        placeholder="Announcement title..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                      <textarea
                        value={newAnnouncement.content}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white h-32 resize-none"
                        placeholder="What's your announcement?"
                      />
                    </div>
                    <button onClick={handlePublishAnnouncement} className="btn-primary">
                      <Bell className="inline mr-2 w-5 h-5" />
                      Publish Announcement
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold mb-2">Published Announcements</h3>
                  {announcements.length === 0 && (
                    <div className="text-center text-gray-400 py-8">No announcements yet.</div>
                  )}
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="bg-dark-card rounded-xl p-6 border border-dark-border">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-lg mb-1">{announcement.title}</h4>
                          <p className="text-gray-400 text-sm mb-2">{announcement.content}</p>
                          <div className="text-xs text-gray-500">{announcement.date}</div>
                        </div>
                        <button onClick={() => handleDeleteAnnouncement(announcement.id)} className="text-red-400 hover:text-red-300 ml-4">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">Published</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── TICKETS ── */}
            {activeTab === 'tickets' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-bold mb-6">Ticket Purchases</h2>

                {ticketPurchases.length === 0 ? (
                  <div className="bg-dark-card rounded-xl p-12 border border-dark-border text-center">
                    <Ticket className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                    <h3 className="text-xl font-bold mb-2">No ticket purchases yet</h3>
                    <p className="text-gray-400">When users buy tickets, their booking details will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-dark-card rounded-xl p-4 border border-dark-border">
                      <p className="text-sm text-gray-400">Total purchases: <span className="text-white font-bold">{ticketPurchases.length}</span></p>
                    </div>
                    {ticketPurchases.map((purchase, i) => (
                      <div key={i} className="bg-dark-card rounded-xl p-6 border border-dark-border">
                        <div className="flex justify-between items-start flex-wrap gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-mono text-neon-blue font-bold text-sm">{purchase.bookingCode}</span>
                              <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs">Confirmed</span>
                            </div>
                            <p className="font-bold text-lg mb-1">{purchase.name}</p>
                            <p className="text-gray-400 text-sm flex items-center gap-1">
                              <Mail className="w-4 h-4" /> {purchase.email}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-neon-purple font-bold text-lg">{purchase.amount.toLocaleString()} RSD</p>
                            <p className="text-gray-400 text-sm">{purchase.eventTitle}</p>
                            <p className="text-gray-500 text-xs mt-1">{new Date(purchase.purchaseTime).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── USERS ── */}
            {activeTab === 'users' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-bold mb-6">User Management</h2>
                <div className="bg-dark-card rounded-xl p-12 border border-dark-border text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <h3 className="text-xl font-bold mb-2">No users yet</h3>
                  <p className="text-gray-400 mb-6">Your community just launched! Share your website to get your first members.</p>
                  <button className="btn-primary">
                    <Plus className="inline mr-2 w-5 h-5" />
                    Invite Users
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── EVENTS ── */}
            {activeTab === 'events' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-bold mb-6">Event Management</h2>

                {eventSaved && (
                  <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg mb-6">
                    <CheckCircle className="w-5 h-5" />
                    Event created! It now appears on the Events page and homepage countdown.
                  </div>
                )}

                <div className="bg-dark-card rounded-xl p-6 border border-dark-border mb-6">
                  <h3 className="text-lg font-bold mb-4">Create New Event</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Event Title *</label>
                        <input
                          type="text"
                          value={newEvent.title}
                          onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                          placeholder="e.g. Anime Night Vol. 2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Date *</label>
                        <input
                          type="date"
                          value={newEvent.date}
                          onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Start Time</label>
                        <input
                          type="time"
                          value={newEvent.time}
                          onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">End Time</label>
                        <input
                          type="time"
                          value={newEvent.endTime}
                          onChange={e => setNewEvent({ ...newEvent, endTime: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                        <input
                          type="text"
                          value={newEvent.location}
                          onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                          placeholder="Novi Sad, Serbia..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Ticket Price (RSD)</label>
                        <input
                          type="number"
                          value={newEvent.price}
                          onChange={e => setNewEvent({ ...newEvent, price: Number(e.target.value) })}
                          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                          placeholder="0 for free"
                          min={0}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Capacity</label>
                        <input
                          type="number"
                          value={newEvent.capacity}
                          onChange={e => setNewEvent({ ...newEvent, capacity: Number(e.target.value) })}
                          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                          min={1}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image URL</label>
                        <input
                          type="text"
                          value={newEvent.image}
                          onChange={e => setNewEvent({ ...newEvent, image: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                      <textarea
                        value={newEvent.description}
                        onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white h-24 resize-none"
                        placeholder="Describe the event..."
                      />
                    </div>
                    <button
                      onClick={handleCreateEvent}
                      disabled={!newEvent.title || !newEvent.date}
                      className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Plus className="inline mr-2 w-5 h-5" />
                      Publish Event
                    </button>
                  </div>
                </div>

                {/* Published events list */}
                <h3 className="text-lg font-bold mb-4">Published Events ({adminEvents.length})</h3>
                {adminEvents.length === 0 ? (
                  <div className="bg-dark-card rounded-xl p-8 border border-dark-border text-center text-gray-400">
                    <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                    No events created yet. Fill in the form above to publish your first event.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {adminEvents.map(event => (
                      <div key={event.id} className="bg-dark-card rounded-xl p-5 border border-dark-border flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-lg mb-1">{event.title}</h4>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{event.date}</span>
                            <span className="flex items-center gap-1"><Save className="w-4 h-4" />{event.time} – {event.endTime}</span>
                            {event.location && <span>{event.location}</span>}
                            <span className="text-neon-purple font-semibold">{event.price === 0 ? 'Free' : `${event.price} RSD`}</span>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteEvent(event.id)} className="text-red-400 hover:text-red-300 flex-shrink-0">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── SETTINGS ── */}
            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-bold mb-6">Settings</h2>

                {/* Save success message */}
                {settingsSaved && (
                  <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg mb-6">
                    <CheckCircle className="w-5 h-5" />
                    Settings saved successfully!
                  </div>
                )}

                {/* Site Info */}
                <div className="bg-dark-card rounded-xl p-6 border border-dark-border mb-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-neon-blue" />
                    Site Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Site Name</label>
                      <input
                        type="text"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email</label>
                      <input
                        type="email"
                        value={siteEmail}
                        onChange={(e) => setSiteEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                        placeholder="+381 21 XXX XXX"
                      />
                      <p className="text-xs text-gray-500 mt-1">This number will be shown in the footer contact section.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Homepage Hero Image URL</label>
                      <input
                        type="text"
                        value={heroImage}
                        onChange={(e) => setHeroImage(e.target.value)}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                        placeholder="https://images.unsplash.com/..."
                      />
                      <p className="text-xs text-gray-500 mt-1">Paste any image URL here to change the background image on the homepage hero section. Get free images from unsplash.com.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-neon-blue" />
                        Google Analytics Measurement ID
                      </label>
                      <input
                        type="text"
                        value={gaId}
                        onChange={(e) => setGaId(e.target.value)}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white font-mono"
                        placeholder="G-XXXXXXXXXX"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Get this free from{' '}
                        <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">
                          analytics.google.com
                        </a>
                        {' '}→ Create account → Create Property → Web → copy the G-XXXXXXX ID. Once saved, real visitor data will appear in your Google Analytics dashboard.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links Settings */}
                <div className="bg-dark-card rounded-xl p-6 border border-dark-border mb-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-green-400" />
                    Social Media Links
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        WhatsApp Group Link
                      </label>
                      <input
                        type="text"
                        value={whatsappLink}
                        onChange={(e) => setWhatsappLink(e.target.value)}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                        placeholder="https://chat.whatsapp.com/..."
                      />
                      <p className="text-xs text-gray-500 mt-1">Update this whenever you reset your WhatsApp group invite link.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="url(#ig)" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#f09433"/>
                              <stop offset="25%" stopColor="#e6683c"/>
                              <stop offset="50%" stopColor="#dc2743"/>
                              <stop offset="75%" stopColor="#cc2366"/>
                              <stop offset="100%" stopColor="#bc1888"/>
                            </linearGradient>
                          </defs>
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                        Instagram Page Link
                      </label>
                      <input
                        type="text"
                        value={instagramLink}
                        onChange={(e) => setInstagramLink(e.target.value)}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                        placeholder="https://instagram.com/yourpage"
                      />
                      <p className="text-xs text-gray-500 mt-1">Add your Instagram page or group link here whenever you create one.</p>
                    </div>
                  </div>
                </div>

                {/* Bank Account Settings */}
                <div className="bg-dark-card rounded-xl p-6 border border-dark-border mb-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-neon-pink" />
                    Bank Account (Ticket Payments)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Bank Name</label>
                      <select
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                      >
                        <option value="">Select your bank...</option>
                        <option value="Banca Intesa">Banca Intesa</option>
                        <option value="Raiffeisen Bank">Raiffeisen Bank</option>
                        <option value="UniCredit Bank">UniCredit Bank</option>
                        <option value="Erste Bank">Erste Bank</option>
                        <option value="OTP Bank">OTP Bank</option>
                        <option value="Komercijalna Banka">Komercijalna Banka</option>
                        <option value="NLB Bank">NLB Bank</option>
                        <option value="Poštanska Štedionica">Poštanska Štedionica</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Account Holder Name</label>
                      <input
                        type="text"
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                        placeholder="Full name on account..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Account Number</label>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                        placeholder="XXX-XXXXXXXXXXXXXXXXX-XX"
                      />
                    </div>
                  </div>
                </div>

                <button onClick={handleSaveSettings} className="btn-primary mb-10">
                  <Save className="inline mr-2 w-5 h-5" />
                  Save All Settings
                </button>

                {/* Change Password */}
                <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
                  <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                    <Key className="w-5 h-5 text-neon-purple" />
                    Change Admin Password
                  </h3>
                  <p className="text-gray-400 text-sm mb-5">Update your admin login password. Must be at least 8 characters.</p>

                  {passwordMsg && (
                    <div className={`flex items-center gap-2 px-4 py-3 rounded-lg mb-4 text-sm ${
                      passwordMsg.type === 'success'
                        ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                        : 'bg-red-500/10 border border-red-500/30 text-red-400'
                    }`}>
                      {passwordMsg.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                      {passwordMsg.text}
                    </div>
                  )}

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type={showCurrent ? 'text' : 'password'}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full pl-10 pr-12 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                          placeholder="Enter current password"
                          required
                        />
                        <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors" tabIndex={-1}>
                          {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type={showNew ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full pl-10 pr-12 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                          placeholder="Enter new password"
                          required
                        />
                        <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors" tabIndex={-1}>
                          {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type={showConfirm ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-10 pr-12 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                          placeholder="Confirm new password"
                          required
                        />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors" tabIndex={-1}>
                          {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <button type="submit" className="btn-primary">
                      <Key className="inline mr-2 w-5 h-5" />
                      Update Password
                    </button>
                  </form>
                </div>

              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
