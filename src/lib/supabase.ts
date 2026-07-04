import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type for site settings rows
export type SiteSetting = {
  key: string
  value: string
  updated_at: string
}

export async function getSetting(key: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .single()

  if (error || !data) return null
  return data.value
}

export async function setSetting(key: string, value: string): Promise<boolean> {
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })

  return !error
}

export async function getAllSettings(): Promise<Record<string, string>> {
  const { data, error } = await supabase.from('site_settings').select('key, value')
  if (error || !data) return {}

  return data.reduce((acc, row) => {
    acc[row.key] = row.value
    return acc
  }, {} as Record<string, string>)
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const saved = await getSetting('admin_password')
  return saved ? password === saved : password === 'Aisha'
}

// Types for dynamic content
export type Announcement = {
  id: number
  title: string
  content: string
  date: string
  published: boolean
}

export type AdminEvent = {
  id: number
  title: string
  description: string
  date: string
  time: string
  endTime: string
  location: string
  price: number
  capacity: number
  registered: number
  category: string
  image: string
}

// Supabase stores the column as end_time, but the UI uses endTime
type AdminEventDbRow = Omit<AdminEvent, 'endTime'> & { end_time: string }

export type TicketPurchase = {
  bookingCode: string
  name: string
  email: string
  eventTitle: string
  eventDate: string
  amount: number
  purchaseTime: string
}

type TicketPurchaseDbRow = {
  booking_code: string
  name: string
  email: string
  event_title: string
  event_date: string
  amount: number
  purchase_time: string
}

// Announcements
export async function getAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })
  if (error || !data) return []
  return data as Announcement[]
}

export async function createAnnouncement(announcement: Announcement): Promise<boolean> {
  const { error } = await supabase.from('announcements').upsert(announcement, { onConflict: 'id' })
  return !error
}

export async function deleteAnnouncement(id: number): Promise<boolean> {
  const { error } = await supabase.from('announcements').delete().eq('id', id)
  return !error
}

// Events
export async function getEvents(): Promise<AdminEvent[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })
  if (error || !data) return []
  return (data as AdminEventDbRow[]).map(row => ({
    ...row,
    endTime: row.end_time,
  })) as AdminEvent[]
}

export async function createEvent(event: AdminEvent): Promise<boolean> {
  const dbRow: AdminEventDbRow = {
    ...event,
    end_time: event.endTime,
  }
  const { error } = await supabase.from('events').upsert(dbRow, { onConflict: 'id' })
  return !error
}

export async function deleteEvent(id: number): Promise<boolean> {
  const { error } = await supabase.from('events').delete().eq('id', id)
  return !error
}

// Ticket purchases
export async function getTicketPurchases(): Promise<TicketPurchase[]> {
  const { data, error } = await supabase
    .from('ticket_purchases')
    .select('*')
    .order('purchase_time', { ascending: false })
  if (error || !data) return []
  return (data as TicketPurchaseDbRow[]).map(row => ({
    bookingCode: row.booking_code,
    name: row.name,
    email: row.email,
    eventTitle: row.event_title,
    eventDate: row.event_date,
    amount: row.amount,
    purchaseTime: row.purchase_time,
  })) as TicketPurchase[]
}

export async function createTicketPurchase(purchase: TicketPurchase): Promise<boolean> {
  const dbRow: TicketPurchaseDbRow = {
    booking_code: purchase.bookingCode,
    name: purchase.name,
    email: purchase.email,
    event_title: purchase.eventTitle,
    event_date: purchase.eventDate,
    amount: purchase.amount,
    purchase_time: purchase.purchaseTime,
  }
  const { error } = await supabase.from('ticket_purchases').insert(dbRow)
  return !error
}
