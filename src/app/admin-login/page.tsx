'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Lock, Shield, AlertCircle, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      // Read saved password from localStorage, fall back to default
      const ADMIN_PASSWORD = localStorage.getItem('admin_password') || 'animehub2026'

      if (password === ADMIN_PASSWORD) {
        // Set cookie first, then do a full page navigation so middleware sees it
        document.cookie = 'admin_session=anime_hub_admin_2026; path=/; max-age=86400; SameSite=Lax'
        // Small extra delay to ensure cookie is committed before navigation
        setTimeout(() => {
          window.location.href = '/admin'
        }, 100)
      } else {
        setError('Incorrect password. Please try again.')
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-dark-card rounded-2xl p-8 border border-dark-border shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-neon-purple" />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Admin Access</h1>
            <p className="text-gray-400">Secure login for Anime Hub Novi Sad administrators</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Access Admin Dashboard'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
            <p className="text-sm text-gray-400 text-center">
              🔒 This area is restricted to authorized administrators only.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
