import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Logo from './Logo.jsx'
import { useModal } from '../../App.jsx'

const links = [
  { to: '/',           label: 'Inicio' },
  { to: '/planes',     label: 'Planes', hot: true },
  { to: '/portafolio', label: 'Proyectos' },
  { to: '/nosotros',   label: 'Nosotros' },
  { to: '/contacto',   label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { setOpen }  = useModal()
  const location     = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-400"
      style={{
        background: scrolled ? 'rgba(15,13,10,0.94)' : 'rgba(15,13,10,0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)'}`,
        height: scrolled ? '64px' : '72px',
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,92,26,0.6), transparent)', opacity: scrolled ? 0.8 : 0.3 }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-full flex items-center justify-between">
        <NavLink to="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
          <Logo />
        </NavLink>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map(({ to, label, hot }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-dm font-medium rounded-lg transition-all duration-200 group
                ${hot
                  ? isActive ? 'text-accent' : 'text-orange-300 hover:text-accent'
                  : isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(255,255,255,0.03)' }} />
                  <span className="relative z-10 flex items-center gap-1.5">
                    {label}
                    {hot && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md leading-none tracking-wide"
                        style={{ background: 'rgba(255,92,26,0.15)', color: '#FF5C1A', border: '1px solid rgba(255,92,26,0.3)' }}>
                        NUEVO
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-lg"
                      style={{ background: hot ? 'rgba(255,92,26,0.08)' : 'rgba(255,255,255,0.05)', border: `1px solid ${hot ? 'rgba(255,92,26,0.25)' : 'rgba(255,255,255,0.1)'}` }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                  )}
                </>
              )}
            </NavLink>
          ))}

          <div className="w-px h-5 mx-2" style={{ background: 'rgba(255,255,255,0.08)' }} />

          <motion.button onClick={() => setOpen(true)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-dm font-semibold text-white overflow-hidden group relative"
            style={{ background: 'var(--accent)', boxShadow: '0 0 24px rgba(255,92,26,0.35)' }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)' }} />
            <span className="relative z-10">Quiero mi página</span>
            <ArrowUpRight size={14} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(v => !v)}
          className="md:hidden p-2 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--text-muted)' }}
        >
          <AnimatePresence mode="wait">
            {mobileOpen
              ? <motion.span key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={18} /></motion.span>
              : <motion.span key="ham" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} /></motion.span>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0"
            style={{ background: 'rgba(15,13,10,0.97)', borderBottom: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}
          >
            <nav className="flex flex-col px-5 py-4 gap-1">
              {links.map(({ to, label, hot }) => (
                <NavLink key={to} to={to} end={to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-dm font-medium transition-all min-h-[44px] flex items-center gap-2
                    ${isActive
                      ? hot ? 'text-accent bg-orange-500/8 border border-orange-500/20' : 'text-text-primary bg-white/5 border border-white/10'
                      : hot ? 'text-orange-300 hover:text-accent' : 'text-text-muted hover:text-text-secondary hover:bg-white/3'
                    }`
                  }
                >
                  {label}
                  {hot && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(255,92,26,0.15)', color: '#FF5C1A' }}>NUEVO</span>}
                </NavLink>
              ))}
              <div className="pt-3 mt-1 border-t border-white/5">
                <motion.button onClick={() => { setOpen(true); setMobileOpen(false) }} whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-dm font-semibold text-sm text-white"
                  style={{ background: 'var(--accent)', boxShadow: '0 0 20px rgba(255,92,26,0.3)' }}
                >
                  Quiero mi página web <ArrowUpRight size={14} />
                </motion.button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
