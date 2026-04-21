import React, { Suspense, lazy, useState, createContext, useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import ContactModal from './components/modals/ContactModal.jsx'

const Home           = lazy(() => import('./pages/Home.jsx'))
const Planes         = lazy(() => import('./pages/Planes.jsx'))
const Portfolio      = lazy(() => import('./pages/Portfolio.jsx'))
const Nosotros       = lazy(() => import('./pages/Nosotros.jsx'))
const Contacto       = lazy(() => import('./pages/Contacto.jsx'))
const MetricasPanel  = lazy(() => import('./pages/MetricasPanel.jsx'))

export const ModalContext = createContext({ open: false, setOpen: () => {} })
export const useModal = () => useContext(ModalContext)

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    // Track page view in localStorage for the private metrics panel
    try {
      const visits = JSON.parse(localStorage.getItem('arise_visits') || '{}')
      const today = new Date().toISOString().split('T')[0]
      visits[`${pathname}_${today}`] = (visits[`${pathname}_${today}`] || 0) + 1
      visits[`${pathname}_total`] = (visits[`${pathname}_total`] || 0) + 1
      visits['_sessions'] = (visits['_sessions'] || 0) + 1
      localStorage.setItem('arise_visits', JSON.stringify(visits))
    } catch {}
  }, [pathname])
  return null
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.22, ease: 'easeIn' } },
}

function PageWrapper({ children }) {
  return <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">{children}</motion.div>
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/planes"     element={<PageWrapper><Planes /></PageWrapper>} />
        <Route path="/portafolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
        <Route path="/nosotros"   element={<PageWrapper><Nosotros /></PageWrapper>} />
        <Route path="/contacto"   element={<PageWrapper><Contacto /></PageWrapper>} />
        {/* Ruta privada — no está en el navbar */}
        <Route path="/arise-panel" element={<PageWrapper><MetricasPanel /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <ModalContext.Provider value={{ open: modalOpen, setOpen: setModalOpen }}>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--bg-base)' }}>
            <div className="w-7 h-7 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
          </div>
        }>
          <AnimatedRoutes />
        </Suspense>
        <Footer />
        <ContactModal />
      </BrowserRouter>
    </ModalContext.Provider>
  )
}
