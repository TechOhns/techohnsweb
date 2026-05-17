'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasConsent = localStorage.getItem('techohns-cookie-consent')
    if (!hasConsent) {
      // Delay showing it slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('techohns-cookie-consent', 'true')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 sm:max-w-[400px]"
        >
          <div className="bg-[#1a1a1a] text-white p-5 rounded-2xl shadow-2xl border border-white/10 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="p-2 bg-white/10 rounded-lg h-fit flex-shrink-0">
                  <Cookie className="w-5 h-5 text-[#FFCC00]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: 'var(--font-syne, sans-serif)' }}>We value your privacy</h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-white/40 hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 bg-[#007ACC] hover:bg-[#007ACC]/90 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
              >
                Essential Only
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
