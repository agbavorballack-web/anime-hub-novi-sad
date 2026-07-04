'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Heart, Users, Calendar, Target, Sparkles, Globe } from 'lucide-react'

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">{t('about.title')}</h1>
          <p className="text-gray-400 text-lg">{t('about.subtitle')}</p>
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-neon-pink" />
            <h2 className="text-3xl font-bold">{t('about.ourStory')}</h2>
          </div>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>{t('about.ourStoryText1')}</p>
            <p>{t('about.ourStoryText2')}</p>
            <p>{t('about.ourStoryText3')}</p>
          </div>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-neon-purple" />
            <h2 className="text-3xl font-bold">{t('about.ourMission')}</h2>
          </div>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p className="text-xl font-semibold text-white">
              {t('about.ourMissionStatement')}
            </p>
            <p>
              {t('about.ourMissionIntro')}
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('about.missionItem1')}</li>
              <li>{t('about.missionItem2')}</li>
              <li>{t('about.missionItem3')}</li>
              <li>{t('about.missionItem4')}</li>
              <li>{t('about.missionItem5')}</li>
            </ul>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-neon-blue" />
            <h2 className="text-3xl font-bold">{t('about.ourValues')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-dark-bg rounded-xl p-6">
              <Users className="w-10 h-10 mb-4 text-neon-pink" />
              <h3 className="text-xl font-bold mb-2">{t('about.valueCommunityTitle')}</h3>
              <p className="text-gray-400">{t('about.valueCommunityText')}</p>
            </div>
            <div className="bg-dark-bg rounded-xl p-6">
              <Heart className="w-10 h-10 mb-4 text-neon-purple" />
              <h3 className="text-xl font-bold mb-2">{t('about.valuePassionTitle')}</h3>
              <p className="text-gray-400">{t('about.valuePassionText')}</p>
            </div>
            <div className="bg-dark-bg rounded-xl p-6">
              <Calendar className="w-10 h-10 mb-4 text-neon-blue" />
              <h3 className="text-xl font-bold mb-2">{t('about.valueConnectionsTitle')}</h3>
              <p className="text-gray-400">{t('about.valueConnectionsText')}</p>
            </div>
            <div className="bg-dark-bg rounded-xl p-6">
              <Globe className="w-10 h-10 mb-4 text-neon-green" />
              <h3 className="text-xl font-bold mb-2">{t('about.valueGrowthTitle')}</h3>
              <p className="text-gray-400">{t('about.valueGrowthText')}</p>
            </div>
          </div>
        </motion.div>

        {/* What We Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-8 h-8 text-neon-green" />
            <h2 className="text-3xl font-bold">{t('about.whatWeOffer')}</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-neon-pink rounded-full mt-2"></div>
              <div>
                <h3 className="font-bold text-white mb-1">{t('about.offerEventsTitle')}</h3>
                <p className="text-gray-400">{t('about.offerEventsText')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-neon-purple rounded-full mt-2"></div>
              <div>
                <h3 className="font-bold text-white mb-1">{t('about.offerForumsTitle')}</h3>
                <p className="text-gray-400">{t('about.offerForumsText')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-neon-blue rounded-full mt-2"></div>
              <div>
                <h3 className="font-bold text-white mb-1">{t('about.offerShowcaseTitle')}</h3>
                <p className="text-gray-400">{t('about.offerShowcaseText')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-neon-green rounded-full mt-2"></div>
              <div>
                <h3 className="font-bold text-white mb-1">{t('about.offerRewardsTitle')}</h3>
                <p className="text-gray-400">{t('about.offerRewardsText')}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Join Us CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-neon-purple/30 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">{t('about.joinCommunity')}</h2>
          <p className="text-gray-300 mb-6">
            {t('about.joinCommunityText')}
          </p>
          <a
            href="https://chat.whatsapp.com/KqoazdpQWWQGkxMBkBLR56"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            {t('about.joinWhatsapp')}
          </a>
        </motion.div>
      </div>
    </div>
  )
}
