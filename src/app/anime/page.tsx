'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  Calendar, 
  Clock, 
  Search, 
  Play,
  Heart,
  TrendingUp,
  Plus
} from 'lucide-react'

export default function AnimePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')

  const genres = [
    { id: 'all', label: 'All Genres' },
    { id: 'action', label: 'Action' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'comedy', label: 'Comedy' },
    { id: 'drama', label: 'Drama' },
    { id: 'fantasy', label: 'Fantasy' },
    { id: 'horror', label: 'Horror' },
    { id: 'romance', label: 'Romance' },
    { id: 'sci-fi', label: 'Sci-Fi' },
    { id: 'slice-of-life', label: 'Slice of Life' },
  ]

  const years = [
    { id: 'all', label: 'All Years' },
    { id: '2024', label: '2024' },
    { id: '2023', label: '2023' },
    { id: '2022', label: '2022' },
    { id: '2021', label: '2021' },
    { id: '2020', label: '2020' },
  ]

  const animeList = [
    {
      id: 1,
      title: 'Attack on Titan: Final Season',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400',
      rating: 9.1,
      episodes: 87,
      status: 'Completed',
      genre: ['action', 'drama', 'fantasy'],
      year: 2023,
      description: 'The final season of the epic anime series about humanity\'s fight against Titans.',
      studios: ['MAPPA', 'Wit Studio']
    },
    {
      id: 2,
      title: 'Demon Slayer: Swordsmith Arc',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400',
      rating: 8.9,
      episodes: 11,
      status: 'Completed',
      genre: ['action', 'supernatural'],
      year: 2023,
      description: 'Tanjiro journeys to the Swordsmith Village to repair his sword.',
      studios: ['ufotable']
    },
    {
      id: 3,
      title: 'Jujutsu Kaisen Season 2',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400',
      rating: 9.2,
      episodes: 23,
      status: 'Completed',
      genre: ['action', 'supernatural'],
      year: 2023,
      description: 'The Shibuya Incident arc - the most intense season yet.',
      studios: ['MAPPA']
    },
    {
      id: 4,
      title: 'Frieren: Beyond Journey\'s End',
      image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400',
      rating: 9.0,
      episodes: 28,
      status: 'Ongoing',
      genre: ['adventure', 'fantasy', 'drama'],
      year: 2024,
      description: 'An elf mage reflects on her journey after the hero\'s death.',
      studios: ['Madhouse']
    },
    {
      id: 5,
      title: 'Spy x Family Season 2',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
      rating: 8.7,
      episodes: 12,
      status: 'Ongoing',
      genre: ['action', 'comedy'],
      year: 2023,
      description: 'The Forger family continues their hilarious secret mission.',
      studios: ['Wit Studio', 'CloverWorks']
    },
    {
      id: 6,
      title: 'One Piece',
      image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400',
      rating: 9.0,
      episodes: 1089,
      status: 'Ongoing',
      genre: ['action', 'adventure', 'fantasy'],
      year: 1999,
      description: 'Monkey D. Luffy and his crew search for the ultimate treasure.',
      studios: ['Toei Animation']
    },
    {
      id: 7,
      title: 'Chainsaw Man',
      image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=400',
      rating: 8.8,
      episodes: 12,
      status: 'Completed',
      genre: ['action', 'horror'],
      year: 2022,
      description: 'Denji, a young man fused with a chainsaw devil, hunts devils.',
      studios: ['MAPPA']
    },
    {
      id: 8,
      title: 'My Hero Academia Season 6',
      image: 'https://images.unsplash.com/photo-1528360983277-13d9b152c6d1?w=400',
      rating: 8.5,
      episodes: 25,
      status: 'Completed',
      genre: ['action', 'superhero'],
      year: 2022,
      description: 'The final war between heroes and villains begins.',
      studios: ['Bones']
    }
  ]

  const filteredAnime = animeList.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         anime.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || anime.genre.includes(selectedGenre)
    const matchesYear = selectedYear === 'all' || anime.year.toString() === selectedYear
    return matchesSearch && matchesGenre && matchesYear
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
          <h1 className="text-5xl font-bold gradient-text mb-4">Anime Database</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our extensive collection of anime series and movies!
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="bg-dark-card rounded-xl p-6 border border-dark-border mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
              >
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-purple text-white"
              >
                {years.map(year => (
                  <option key={year.id} value={year.id}>{year.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-dark-card rounded-lg p-4 text-center border border-dark-border">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-neon-pink" />
            <div className="text-2xl font-bold">{animeList.length}</div>
            <div className="text-sm text-gray-400">Total Anime</div>
          </div>
          <div className="bg-dark-card rounded-lg p-4 text-center border border-dark-border">
            <Play className="w-8 h-8 mx-auto mb-2 text-neon-blue" />
            <div className="text-2xl font-bold">{animeList.filter(a => a.status === 'Ongoing').length}</div>
            <div className="text-sm text-gray-400">Ongoing</div>
          </div>
          <div className="bg-dark-card rounded-lg p-4 text-center border border-dark-border">
            <Star className="w-8 h-8 mx-auto mb-2 text-neon-purple" />
            <div className="text-2xl font-bold">
              {(animeList.reduce((acc, a) => acc + a.rating, 0) / animeList.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-400">Avg Rating</div>
          </div>
          <div className="bg-dark-card rounded-lg p-4 text-center border border-dark-border">
            <Heart className="w-8 h-8 mx-auto mb-2 text-neon-green" />
            <div className="text-2xl font-bold">12.5K</div>
            <div className="text-sm text-gray-400">Favorites</div>
          </div>
        </div>

        {/* Anime Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAnime.map((anime, index) => (
            <motion.div
              key={anime.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-card rounded-xl overflow-hidden border border-dark-border card-hover group"
            >
              <div className="h-64 bg-cover bg-center relative" style={{ backgroundImage: `url(${anime.image})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-neon-purple px-3 py-1 rounded-full text-sm font-medium">
                  {anime.status}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-bold">{anime.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold mb-2 line-clamp-1 group-hover:text-neon-purple transition-colors">
                  {anime.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{anime.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{anime.episodes} eps</span>
                  <span>{anime.year}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {anime.genre.slice(0, 2).map(g => (
                    <span key={g} className="text-xs bg-dark-bg px-2 py-1 rounded capitalize">
                      {g}
                    </span>
                  ))}
                </div>

                <button className="w-full btn-primary text-sm py-2">
                  <Play className="inline mr-1 w-4 h-4" />
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAnime.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400 text-lg">No anime found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
