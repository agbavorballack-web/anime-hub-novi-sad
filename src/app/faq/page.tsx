'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, HelpCircle, Calendar, User, CreditCard, Shield } from 'lucide-react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  const faqs = [
    {
      category: 'Getting Started',
      icon: User,
      questions: [
        {
          q: 'How do I join Anime Hub Novi Sad?',
          a: 'Joining is easy! Click the "Join WhatsApp Group" button on our homepage or navigate to our registration page to create an account. You can also join our WhatsApp community directly to connect with other members.'
        },
        {
          q: 'Is there a membership fee?',
          a: 'No! Joining Anime Hub Novi Sad is completely free. Some events may have ticket fees, but basic community membership is always free.'
        },
        {
          q: 'What are the benefits of joining?',
          a: 'Members can participate in forum discussions, attend events, earn rewards points, showcase their creative work, and connect with fellow anime enthusiasts in Serbia.'
        }
      ]
    },
    {
      category: 'Events & Tickets',
      icon: Calendar,
      questions: [
        {
          q: 'How do I buy event tickets?',
          a: 'Browse our Events page, select the event you want to attend, and click "Purchase Ticket." You\'ll be guided through secure payment via your preferred Serbian bank, and receive a QR code ticket immediately.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept payments through all major Serbian banks including OTP Banka Srbija, Intesa Banka, Erste Bank, AIK Banka, UniCredit Bank, Komercijalna Banka, and Raiffeisen Bank.'
        },
        {
          q: 'Are tickets refundable?',
          a: 'Refund policies vary by event. Please check the specific event details for refund information. Generally, refunds are available up to 7 days before the event.'
        },
        {
          q: 'How do I use my QR code ticket?',
          a: 'When you arrive at the event, show your QR code ticket on your phone to the event staff. They will scan it to verify your admission.'
        }
      ]
    },
    {
      category: 'Account & Profile',
      icon: User,
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click "Sign Up" on the homepage, fill in your username, email, and create a password. You can optionally add your location to help connect with nearby anime fans.'
        },
        {
          q: 'Can I change my username?',
          a: 'Currently, usernames cannot be changed after registration. Choose wisely when creating your account!'
        },
        {
          q: 'How do the rewards points work?',
          a: 'You earn points by participating in the community: attending events (+50), posting in forums (+10), writing reviews (+25), referring friends (+100), and more. Points unlock achievements and special perks.'
        },
        {
          q: 'What do the different user levels mean?',
          a: 'User levels reflect your engagement: New Member (0 pts), Fan (500 pts), Enthusiast (1500 pts), Expert (3000 pts), Master (5000 pts), and Legend (10000 pts). Higher levels unlock special privileges.'
        }
      ]
    },
    {
      category: 'Community Rules',
      icon: Shield,
      questions: [
        {
          q: 'What are the community guidelines?',
          a: 'We ask all members to be respectful, inclusive, and constructive. No harassment, hate speech, or inappropriate content. Check our Community Rules page for detailed guidelines.'
        },
        {
          q: 'How do I report inappropriate content?',
          a: 'Use the report button on any post or content, or contact our admin team directly. We take all reports seriously and address them promptly.'
        },
        {
          q: 'Can I promote my own anime-related content?',
          a: 'Yes! We encourage sharing creative work, but please do so in the appropriate sections (Showcase for fan art, Community for discussions). Self-promotion should be relevant and not excessive.'
        }
      ]
    },
    {
      category: 'Technical Support',
      icon: HelpCircle,
      questions: [
        {
          q: 'I\'m having trouble logging in. What should I do?',
          a: 'First, try resetting your password using the "Forgot Password" link. If that doesn\'t work, contact our support team through the WhatsApp group or email.'
        },
        {
          q: 'Is the website mobile-friendly?',
          a: 'Yes! Our website is fully responsive and works great on smartphones, tablets, and desktop computers.'
        },
        {
          q: 'My payment failed. What should I do?',
          a: 'Payment issues are usually handled by your bank. First, check with your bank to ensure the transaction wasn\'t blocked. If problems persist, contact us for assistance.'
        }
      ]
    }
  ]

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const newIndex = `${categoryIndex}-${questionIndex}`
    setOpenIndex(openIndex === newIndex ? null : newIndex)
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-400 text-lg">Find answers to common questions about Anime Hub Novi Sad</p>
        </motion.div>

        {faqs.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <category.icon className="w-8 h-8 text-neon-pink" />
              <h2 className="text-2xl font-bold">{category.category}</h2>
            </div>
            
            <div className="space-y-4">
              {category.questions.map((faq, questionIndex) => {
                const index = `${categoryIndex}-${questionIndex}`
                const isOpen = openIndex === index
                
                return (
                  <div
                    key={questionIndex}
                    className="bg-dark-card rounded-xl border border-dark-border overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-dark-bg transition-colors"
                    >
                      <span className="font-semibold text-white">{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-5 h-5 text-neon-purple" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-0 text-gray-300 leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border text-center"
        >
          <HelpCircle className="w-12 h-12 mx-auto mb-4 text-neon-purple" />
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-400 mb-6">
            Can't find the answer you're looking for? Join our WhatsApp community or contact us directly!
          </p>
          <a
            href="https://chat.whatsapp.com/KqoazdpQWWQGkxMBkBLR56"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            Ask in WhatsApp Group
          </a>
        </motion.div>
      </div>
    </div>
  )
}
