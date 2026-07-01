'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Palette, 
  Heart, 
  Eye, 
  Search,
  Star,
  User,
  Award,
  Download,
  Share2
} from 'lucide-react'

export default function ShowcasePage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'fanart', label: 'Fan Art' },
    { id: 'cosplay', label: 'Cosplay' },
    { id: 'reviews', label: 'Reviews' },
  ]

  const showcaseItems: any[] = []

  const filteredItems = showcaseItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || item.type === activeTab
    return matchesSearch && matchesTab
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
          <h1 className="text-5xl font-bold gradient-text mb-4">Creative Showcase</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover amazing fan art, cosplay, and reviews from our talented community!
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search creations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-neon-purple text-white'
                    : 'bg-dark-card text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Showcase Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full bg-dark-card rounded-xl p-12 border border-dark-border text-center">
              <Palette className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-bold mb-2">No creations yet</h3>
              <p className="text-gray-400 mb-6">Our showcase is waiting for your amazing fan art, cosplay, and reviews! Be the first to share your creativity.</p>
              <button className="btn-primary">
                <Award className="inline mr-2 w-5 h-5" />
                Submit Your Work
              </button>
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-card rounded-xl overflow-hidden border border-dark-border card-hover"
              >
                <div className="h-64 bg-cover bg-center relative" style={{ backgroundImage: `url(${item.image})` }}>
                  <div className="absolute top-4 right-4 bg-dark-bg/80 px-3 py-1 rounded-full text-sm capitalize">
                    {item.type}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <img src={item.avatar} alt={item.artist} className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="font-medium text-sm">{item.artist}</div>
                      <div className="text-xs text-gray-500">Artist</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-neon-pink" />
                        {item.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-neon-blue" />
                        {item.views}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 btn-primary text-sm py-2">
                      <Heart className="inline mr-1 w-4 h-4" />
                      Like
                    </button>
                    <button className="flex-1 btn-secondary text-sm py-2">
                      <Share2 className="inline mr-1 w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Palette className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400 text-lg">No creations found matching your search.</p>
          </div>
        )}

        {/* Submit CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-neon-purple/30 text-center"
        >
          <Palette className="w-12 h-12 mx-auto mb-4 text-neon-pink" />
          <h2 className="text-2xl font-bold mb-2">Share Your Creativity</h2>
          <p className="text-gray-300 mb-6">
            Submit your fan art, cosplay photos, or anime reviews to be featured in our showcase!
          </p>
          <button className="btn-primary">
            <Award className="inline mr-2 w-5 h-5" />
            Submit Your Work
          </button>
        </motion.div>
      </div>
    </div>
  )
}
