import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'arise_consent'

function grantConsent() {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    })
  }
  if (typeof window.fbq === 'function') {
    window.fbq('consent', 'grant')
  }
}

function denyConsent() {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
  }
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      setVisible(true)
    } else if (saved === 'granted') {
      grantConsent()
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'granted')
    grantConsent()
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'denied')
    denyConsent()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-5"
        >
          <div
            className="max-w-3xl mx-auto rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{
              background: 'rgba(20,16,12,0.97)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 -4px 40px rgba(0,0,0,0.5)',
            }}
          >
            <div className="flex-1">
              <p className="font-syne font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                Usamos cookies 🍪
              </p>
              <p className="font-dm text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Utilizamos cookies de análisis para entender cómo usas nuestro sitio y mejorar tu experiencia. No vendemos tus datos.{' '}
              </p>
            </div>

            <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={decline}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-dm font-medium text-sm transition-all"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-muted)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              >
                Rechazar
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-dm font-semibold text-sm text-white transition-all"
                style={{
                  background: 'var(--accent)',
                  boxShadow: '0 0 16px rgba(255,92,26,0.3)',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 24px rgba(255,92,26,0.5)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 16px rgba(255,92,26,0.3)'}
              >
                Aceptar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
