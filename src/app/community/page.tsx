'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  ThumbsUp, 
  MessageCircle, 
  Search, 
  Plus,
  TrendingUp,
  Clock,
  Eye,
  Pin
} from 'lucide-react'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('latest')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'latest', icon: Clock, label: 'Latest' },
    { id: 'trending', icon: TrendingUp, label: 'Trending' },
    { id: 'popular', icon: Eye, label: 'Popular' },
  ]

  const forumCategories = [
    { id: 'general', name: 'General Discussion', posts: 0, color: 'neon-pink' },
    { id: 'recommendations', name: 'Recommendations', posts: 0, color: 'neon-blue' },
    { id: 'theories', name: 'Theories & Speculation', posts: 0, color: 'neon-purple' },
    { id: 'news', name: 'Anime News', posts: 0, color: 'neon-green' },
    { id: 'help', name: 'Help & Support', posts: 0, color: 'neon-red' },
  ]

  const forumPosts: any[] = []

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Community Forum</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join discussions, share theories, and connect with fellow anime enthusiasts!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Create */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
                />
              </div>
              <button className="btn-primary flex items-center gap-2">
                <Plus className="w-5 h-5" />
                New Post
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-dark-card rounded-lg p-2 border border-dark-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-neon-purple text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Forum Posts */}
            <div className="space-y-4">
              {forumPosts.length === 0 ? (
                <div className="bg-dark-card rounded-xl p-12 border border-dark-border text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <h3 className="text-xl font-bold mb-2">No discussions yet</h3>
                  <p className="text-gray-400 mb-6">Be the first to start a conversation! Our community is just getting started.</p>
                  <button className="btn-primary">
                    <Plus className="inline mr-2 w-5 h-5" />
                    Create First Post
                  </button>
                </div>
              ) : (
                forumPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-card rounded-xl p-6 border border-dark-border card-hover"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {post.pinned && <Pin className="w-4 h-4 text-neon-pink" />}
                          <h3 className="text-xl font-bold hover:text-neon-purple cursor-pointer">
                            {post.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                          <span className="text-neon-blue">{post.author}</span>
                          <span>•</span>
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{post.timestamp}</span>
                        </div>
                        <p className="text-gray-300 mb-4 line-clamp-2">{post.content}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                          <button className="flex items-center gap-2 hover:text-neon-pink transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            {post.likes}
                          </button>
                          <button className="flex items-center gap-2 hover:text-neon-blue transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            {post.replies} replies
                          </button>
                          <button className="flex items-center gap-2 hover:text-neon-purple transition-colors">
                            <Eye className="w-4 h-4" />
                            {post.views} views
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-dark-card rounded-xl p-6 border border-dark-border"
            >
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {forumCategories.map((category) => (
                  <button
                    key={category.id}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-dark-bg transition-colors text-left"
                  >
                    <span className="text-gray-300">{category.name}</span>
                    <span className={`text-sm text-${category.color}`}>{category.posts}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Active Users */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-card rounded-xl p-6 border border-dark-border"
            >
              <h3 className="text-lg font-bold mb-4">Active Now</h3>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=50`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-neon-purple"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-3">+124 more online</p>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-card rounded-xl p-6 border border-dark-border"
            >
              <h3 className="text-lg font-bold mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {['Attack on Titan Ending', 'Frieren Analysis', 'New Season Picks', 'Manga vs Anime'].map((topic, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-neon-pink font-bold">#{i + 1}</span>
                    <span className="text-gray-300 text-sm">{topic}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
