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
