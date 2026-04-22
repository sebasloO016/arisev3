import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowUpRight, Check, Star, ArrowRight, ChevronDown, Zap, Search } from 'lucide-react'
import { useModal } from '../App.jsx'

/* ── Reveal ───────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}>
      {children}
    </motion.div>
  )
}

/* ── Magnetic button ──────────────────────────────── */
function MagBtn({ children, onClick, style = {}, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })
  const mv = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  return (
    <motion.button ref={ref} onClick={onClick}
      onMouseMove={mv} onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ x: sx, y: sy, cursor: 'pointer', ...style }}
      whileTap={{ scale: 0.96 }} className={className}>
      {children}
    </motion.button>
  )
}

/* ── Glow card ────────────────────────────────────── */
function GCard({ children, className = '' }) {
  const ref = useRef(null)
  const [p, setP] = useState({ x: 0, y: 0 })
  const [h, setH] = useState(false)
  return (
    <div ref={ref}
      onMouseMove={e => { const r = ref.current.getBoundingClientRect(); setP({ x: e.clientX - r.left, y: e.clientY - r.top }) }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${h ? 'scale-[1.015]' : ''} ${className}`}
      style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.07)' }}>
      {h && <div className="absolute pointer-events-none rounded-full"
        style={{ width: 200, height: 200, left: p.x - 100, top: p.y - 100, background: 'radial-gradient(circle, rgba(255,92,26,0.13) 0%, transparent 70%)', transition: 'none' }} />}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/* ── CountUp ──────────────────────────────────────── */
function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  const done = useRef(false)
  useEffect(() => {
    if (!inView || done.current) return
    done.current = true
    let s = null
    const step = ts => {
      if (!s) s = ts
      const p = Math.min((ts - s) / 1800, 1)
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * to))
      if (p < 1) requestAnimationFrame(step); else setN(to)
    }
    requestAnimationFrame(step)
  }, [inView, to])
  return <span ref={ref}>{n}{suffix}</span>
}

/* ── Ticker — CSS-only for smooth GPU animation on mobile ── */
function Ticker({ items, dur = 28, dir = 1 }) {
  const doubled = [...items, ...items]
  const animName = dir > 0 ? 'tickerFwd' : 'tickerBwd'
  return (
    <div className="overflow-hidden" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `${animName} ${dur}s linear infinite`,
          willChange: 'transform',
        }}>
        {doubled.map((it, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="text-sm">{it.icon}</span>
            <span className="font-dm text-sm whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── FAQ ──────────────────────────────────────────── */
function FAQ({ q, a }) {
  const [o, setO] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
      <button onClick={() => setO(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 min-h-[52px] transition-colors"
        style={{ background: o ? 'rgba(255,92,26,0.05)' : 'var(--bg-elevated)' }}>
        <span className="font-dm font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{q}</span>
        <motion.span animate={{ rotate: o ? 180 : 0 }} transition={{ duration: 0.22 }} style={{ color: 'var(--accent)', flexShrink: 0 }}>
          <ChevronDown size={15} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {o && (
          <motion.div key="b" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.26 }} className="overflow-hidden">
            <p className="px-5 pb-5 pt-3 font-dm text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'var(--bg-card)' }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Browser mockup ───────────────────────────────── */
function BrowserMockup() {
  const [step, setStep] = useState(0)
  const steps = [
    { label: 'Diseñando tu página...', pct: 28 },
    { label: 'Agregando tu información...', pct: 55 },
    { label: 'Optimizando para Google...', pct: 79 },
    { label: '¡Tu página está lista! 🎉', pct: 100 },
  ]
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % steps.length), 2400)
    return () => clearInterval(t)
  }, [])
  const cur = steps[step]
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute -inset-6 rounded-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(255,92,26,0.2) 0%, transparent 68%)', filter: 'blur(24px)' }} />
      <motion.div initial={{ opacity: 0, y: 40, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{ border: '1px solid rgba(255,255,255,0.1)', background: '#0F0D0A' }}>
        <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#161310', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex gap-1.5">
            {['#FF5F57', '#FFBD2E', '#28C840'].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
          </div>
          <div className="flex-1 mx-3 px-3 py-1.5 rounded-md flex items-center gap-2" style={{ background: '#0F0D0A', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: 'rgba(255,92,26,0.6)' }} />
            <span className="text-xs font-dm truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>minegocio.com</span>
            <div className="ml-auto w-2 h-2 rounded-full flex-shrink-0 bg-green-500" style={{ opacity: 0.7 }} />
          </div>
        </div>
        <div className="p-5 space-y-4" style={{ minHeight: 300 }}>
          <div className="flex items-center justify-between">
            <div className="h-5 w-20 rounded-lg" style={{ background: 'rgba(255,92,26,0.4)' }} />
            <div className="flex gap-2">
              {[38, 32, 42].map((w, i) => <div key={i} className="h-3 rounded" style={{ width: w, background: 'rgba(255,255,255,0.07)' }} />)}
              <div className="h-6 w-16 rounded-lg" style={{ background: 'rgba(255,92,26,0.5)' }} />
            </div>
          </div>
          <div className="rounded-xl p-5" style={{ background: 'rgba(255,92,26,0.06)', border: '1px solid rgba(255,92,26,0.12)' }}>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }} className="space-y-2">
                <div className="h-7 rounded-lg" style={{ width: '82%', background: 'rgba(255,255,255,0.14)' }} />
                <div className="h-7 rounded-lg" style={{ width: '68%', background: 'rgba(255,255,255,0.09)' }} />
                <div className="h-3 rounded mt-3" style={{ width: '90%', background: 'rgba(255,255,255,0.06)' }} />
                <div className="h-3 rounded" style={{ width: '74%', background: 'rgba(255,255,255,0.04)' }} />
                <div className="flex gap-2 mt-3">
                  <div className="h-9 w-28 rounded-xl" style={{ background: 'rgba(255,92,26,0.7)' }} />
                  <div className="h-9 w-24 rounded-xl" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[['⚖️', 'Servicios'], ['📞', 'Contacto'], ['⭐', 'Reseñas']].map(([ic, lb]) => (
              <div key={lb} className="rounded-lg p-2.5 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="text-base mb-0.5">{ic}</div>
                <div className="text-xs font-dm" style={{ color: 'rgba(255,255,255,0.3)' }}>{lb}</div>
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <AnimatePresence mode="wait">
                <motion.span key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-xs font-dm" style={{ color: 'rgba(255,92,26,0.85)' }}>{cur.label}</motion.span>
              </AnimatePresence>
              <span className="text-xs font-dm" style={{ color: 'rgba(255,255,255,0.25)' }}>{cur.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div className="h-full rounded-full"
                animate={{ width: `${cur.pct}%` }} transition={{ duration: 0.9, ease: 'easeOut' }}
                style={{ background: 'linear-gradient(90deg,#FF5C1A,#FF8C5A)' }} />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }}
        className="absolute -right-3 top-20 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{ background: 'rgba(26,22,18,0.96)', border: '1px solid rgba(40,200,64,0.3)', backdropFilter: 'blur(12px)' }}>
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-dm whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.75)' }}>Página en línea</span>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6 }}
        className="absolute -left-3 bottom-20 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{ background: 'rgba(26,22,18,0.96)', border: '1px solid rgba(255,92,26,0.25)', backdropFilter: 'blur(12px)' }}>
        <Search size={12} style={{ color: 'var(--accent)', flexShrink: 0 }} />
        <span className="text-xs font-dm whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.75)' }}>Visible en Google</span>
      </motion.div>
    </div>
  )
}

/* ════════════════════════════════════════
   VIDEO SHOWCASE — like Squarespace/SLS
════════════════════════════════════════ */
function VideoShowcase() {
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const desktopRefs = useRef([])
  const mobileRef = useRef(null)

  const slides = [
    { src: '/videos/vid1.mp4', label: 'Mecánico', headline: 'Tu taller, visible las 24 horas.', sub: 'Tus clientes te encuentran cuando te necesitan.' },
    { src: '/videos/vid2.mp4', label: 'Abogado', headline: 'Presencia profesional que genera confianza.', sub: 'Casos ganados empiezan con una buena primera impresión.' },
    { src: '/videos/vid3.mp4', label: 'Restaurante', headline: 'Llena mesas antes de que abras la puerta.', sub: 'Tu menú, reservas y reseñas al alcance de un clic.' },
    { src: '/videos/vid4.mp4', label: 'Flores', headline: 'Vende ramos antes del mediodía.', sub: 'Pedidos desde el celular, entregas a tiempo.' },
    { src: '/videos/vid5.mp4', label: 'Negocio', headline: 'Tu negocio, siempre abierto.', sub: 'Clientes nuevos cada día, sin esfuerzo extra.' },
    { src: '/videos/vid6.mp4', label: 'Servicio', headline: 'El servicio que mereces, la web que necesitas.', sub: 'Diseño profesional desde $7.99 al mes.' },
    { src: '/videos/vid7.mp4', label: 'Empresa', headline: 'Crece con una presencia digital real.', sub: 'Sin pago inicial. Sin permanencia.' },
  ]

  // Detect mobile once
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [])

  // MOBILE: swap src on single video element
  useEffect(() => {
    if (!isMobile || !mobileRef.current) return
    const v = mobileRef.current
    v.src = slides[active].src
    v.load()
    v.play().catch(() => { })
  }, [active, isMobile])

  // DESKTOP: play active, pause others
  useEffect(() => {
    if (isMobile) return
    desktopRefs.current.forEach((v, i) => {
      if (!v) return
      v.muted = true
      if (i === active) { v.currentTime = 0; v.play().catch(() => { }) }
      else v.pause()
    })
  }, [active, isMobile])

  // Unlock on first touch (iOS)
  useEffect(() => {
    const unlock = () => {
      const v = isMobile ? mobileRef.current : desktopRefs.current[active]
      if (v) { v.muted = true; v.play().catch(() => { }) }
    }
    window.addEventListener('touchstart', unlock, { once: true, passive: true })
    return () => window.removeEventListener('touchstart', unlock)
  }, [isMobile, active])

  const { setOpen } = useModal()

  return (
    <section className="relative overflow-hidden" style={{ height: '85vh', minHeight: 500, maxHeight: 800 }}>

      {/* ── MOBILE: single video, swap src ── */}
      {isMobile && (
        <video ref={mobileRef} muted playsInline loop
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}>
          <source src={slides[0].src} type="video/mp4" />
        </video>
      )}

      {/* ── DESKTOP: all videos, CSS crossfade ── */}
      {!isMobile && slides.map((slide, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}>
          <video ref={el => { desktopRefs.current[i] = el }}
            muted playsInline loop preload={i === 0 ? 'auto' : 'metadata'}
            className="absolute inset-0 w-full h-full object-cover">
            <source src={slide.src} type="video/mp4" />
          </video>
        </div>
      ))}

      {/* Gradient overlays — above videos */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 10, background: 'linear-gradient(to bottom, rgba(15,13,10,0.55) 0%, rgba(15,13,10,0.15) 35%, rgba(15,13,10,0.55) 70%, rgba(15,13,10,0.93) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 10, background: 'linear-gradient(to right, rgba(15,13,10,0.75) 0%, transparent 65%)' }} />

      {/* Content — above gradients */}
      <div className="absolute inset-0 flex flex-col justify-end pb-12 px-5 sm:px-10 lg:px-16" style={{ zIndex: 20 }}>
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>

              {/* Category pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-dm font-semibold uppercase tracking-widest"
                style={{ background: 'rgba(255,92,26,0.25)', border: '1px solid rgba(255,92,26,0.4)', color: 'var(--accent)', backdropFilter: 'blur(8px)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-current animate-pulse" style={{ background: 'var(--accent)' }} />
                {slides[active].label}
              </div>

              <h2 className="font-syne font-bold mb-3 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', color: '#F5F0E8', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                {slides[active].headline}
              </h2>
              <p className="font-dm text-lg mb-6" style={{ color: 'rgba(245,240,232,0.75)', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
                {slides[active].sub}
              </p>

              <MagBtn onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-dm font-semibold text-sm text-white"
                style={{ background: 'var(--accent)', boxShadow: '0 0 30px rgba(255,92,26,0.5)', backdropFilter: 'blur(4px)' }}>
                Quiero una página así <ArrowUpRight size={15} />
              </MagBtn>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-8">
          {slides.map((s, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="group flex items-center gap-2 transition-all"
              style={{ cursor: 'pointer' }}>
              {/* Progress bar */}
              <div className="h-0.5 rounded-full overflow-hidden transition-all duration-300"
                style={{ width: active === i ? 48 : 20, background: 'rgba(255,255,255,0.2)' }}>
                {active === i && (
                  <motion.div className="h-full rounded-full" style={{ background: 'var(--accent)' }}
                    initial={{ width: '0%' }} animate={{ width: '100%' }}
                    transition={{ duration: 6, ease: 'linear' }} />
                )}
              </div>
              <span className="text-xs font-dm hidden sm:block transition-all"
                style={{ color: active === i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)', fontSize: '11px' }}>
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price badge — top right */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="absolute top-8 right-6 sm:right-10 flex flex-col items-end gap-1 text-right pointer-events-none"
        style={{ zIndex: 20 }}>
        <div className="px-3 py-1.5 rounded-xl"
          style={{ background: 'rgba(15,13,10,0.7)', border: '1px solid rgba(255,92,26,0.3)', backdropFilter: 'blur(12px)' }}>
          <span className="font-syne font-bold text-lg" style={{ color: 'var(--accent)' }}>$7.99</span>
          <span className="font-dm text-xs ml-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>/mes</span>
        </div>
        <span className="text-xs font-dm" style={{ color: 'rgba(255,255,255,0.35)' }}>Sin pago inicial</span>
      </motion.div>
    </section>
  )
}

/* ════════════════════════════════════════
   FEATURES TAB SECTION
════════════════════════════════════════ */
function ScrollFeatures() {
  const features = [
    {
      icon: '🎨', title: 'Diseño único para tu negocio',
      body: 'No plantillas. No genérico. Cada página la construimos desde cero con tus colores, tu estilo y lo que hace especial a tu negocio.',
      card: (
        <div className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex-shrink-0" style={{ background: 'rgba(255,92,26,0.25)' }} />
            <div className="space-y-2 flex-1">
              <div className="h-3 rounded" style={{ background: 'rgba(255,255,255,0.15)', width: '70%' }} />
              <div className="h-2 rounded" style={{ background: 'rgba(255,255,255,0.07)', width: '50%' }} />
            </div>
          </div>
          {['#FF5C1A', '#FF8C5A', '#FFAA85'].map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-lg flex-shrink-0" style={{ background: c, opacity: 1 - i * 0.25 }} />
              <div className="flex-1 h-2 rounded" style={{ background: 'rgba(255,255,255,0.07)', width: `${80 - i * 15}%` }} />
            </div>
          ))}
          <div className="rounded-xl p-3" style={{ background: 'rgba(255,92,26,0.08)', border: '1px solid rgba(255,92,26,0.15)' }}>
            <div className="h-2 w-32 rounded mb-2" style={{ background: 'rgba(255,92,26,0.4)' }} />
            <div className="h-2 w-24 rounded" style={{ background: 'rgba(255,92,26,0.2)' }} />
          </div>
        </div>
      ),
    },
    {
      icon: '🔍', title: 'Tus clientes te encuentran en Google',
      body: 'Cuando alguien busca tu servicio en tu ciudad, tu página aparece. Lo configuramos correctamente desde el primer día.',
      card: (
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <Search size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
              <span className="text-xs font-dm" style={{ color: 'rgba(255,255,255,0.35)' }}>dentista en ambato</span>
            </div>
            {[{ n: 'Tu negocio', u: 'tunegocio.com', top: true }, { n: 'Competidor A', u: 'dental123.com', top: false }, { n: 'Competidor B', u: 'clinica-xyz.com', top: false }].map(({ n, u, top }, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg"
                style={{ background: top ? 'rgba(255,92,26,0.07)' : 'transparent', border: top ? '1px solid rgba(255,92,26,0.15)' : '1px solid transparent' }}>
                <span className="text-xs font-dm font-bold mt-0.5" style={{ color: top ? 'var(--accent)' : 'rgba(255,255,255,0.18)', width: 14 }}>{i + 1}</span>
                <div className="flex-1">
                  <div className="text-xs font-dm font-medium" style={{ color: top ? 'var(--accent)' : 'rgba(255,255,255,0.35)' }}>{n}</div>
                  <div className="text-xs font-dm" style={{ color: 'rgba(255,255,255,0.18)' }}>{u}</div>
                </div>
                {top && <span className="text-xs" style={{ color: 'var(--accent)' }}>⭐ #1</span>}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: '📱', title: 'Perfecta en el celular',
      body: 'El 80% de tus clientes te buscan desde el teléfono. Tu página se adapta a cualquier pantalla y siempre se ve increíble.',
      card: (
        <div className="flex items-end justify-center gap-5">
          <div className="rounded-2xl overflow-hidden flex-shrink-0" style={{ width: 110, background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="h-3 flex justify-center items-center" style={{ background: '#161310' }}>
              <div className="w-8 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
            </div>
            <div className="p-2.5 space-y-2">
              <div className="h-12 rounded-lg" style={{ background: 'rgba(255,92,26,0.2)' }} />
              <div className="h-2 rounded" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <div className="h-2 rounded" style={{ width: '75%', background: 'rgba(255,255,255,0.05)' }} />
              <div className="h-6 rounded-lg" style={{ background: 'rgba(255,92,26,0.45)' }} />
            </div>
          </div>
          <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ width: 190, background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="h-5 flex items-center px-2 gap-1.5" style={{ background: '#161310' }}>
              {['#FF5F57', '#FFBD2E', '#28C840'].map(c => <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />)}
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-center gap-2 mb-2.5">
                <div className="h-3.5 w-14 rounded" style={{ background: 'rgba(255,92,26,0.45)' }} />
                <div className="ml-auto flex gap-1">
                  {[22, 18, 24].map((w, i) => <div key={i} className="h-2 rounded" style={{ width: w, background: 'rgba(255,255,255,0.07)' }} />)}
                </div>
              </div>
              <div className="rounded-lg" style={{ height: 64, background: 'rgba(255,92,26,0.12)', border: '1px solid rgba(255,92,26,0.15)' }} />
              <div className="grid grid-cols-3 gap-1">
                {[1, 2, 3].map(i => <div key={i} className="h-9 rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />)}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: '💬', title: 'Un clic y tus clientes te escriben',
      body: 'El botón de WhatsApp está siempre visible. Sin formularios complicados — tu cliente hace un clic y ya está hablando contigo.',
      card: (
        <div className="space-y-3">
          <div className="rounded-2xl p-4 space-y-3" style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <div className="px-3 py-2 rounded-2xl rounded-bl-sm" style={{ background: 'rgba(255,255,255,0.07)', maxWidth: '80%' }}>
                <p className="text-xs font-dm" style={{ color: 'rgba(255,255,255,0.55)' }}>Hola, vi su página y me interesa...</p>
              </div>
            </div>
            <div className="flex items-end justify-end gap-2">
              <div className="px-3 py-2 rounded-2xl rounded-br-sm" style={{ background: 'rgba(255,92,26,0.22)', border: '1px solid rgba(255,92,26,0.2)', maxWidth: '80%' }}>
                <p className="text-xs font-dm" style={{ color: 'rgba(255,255,255,0.8)' }}>¡Hola! Con gusto le atiendo 😊</p>
              </div>
            </div>
          </div>
          <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-dm font-semibold text-sm text-white"
            style={{ background: '#25D366', boxShadow: '0 0 24px rgba(37,211,102,0.28)' }}>
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Escribir por WhatsApp
          </motion.div>
        </div>
      ),
    },
  ]

  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % features.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="py-8 pb-20 px-5 sm:px-8" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Mobile */}
        <div className="lg:hidden space-y-14">
          {features.map(({ icon, title, body, card }, i) => (
            <Reveal key={i}>
              <div className="space-y-5">
                <div>
                  <span className="text-3xl mb-3 block">{icon}</span>
                  <h3 className="font-syne font-bold text-xl mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                  <p className="font-dm text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{body}</p>
                </div>
                {card}
              </div>
            </Reveal>
          ))}
        </div>
        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-2 gap-16 items-start">
          <div className="space-y-2 pt-4">
            {features.map(({ icon, title, body }, i) => (
              <motion.button key={i} onClick={() => setActive(i)}
                className="w-full text-left p-5 rounded-2xl transition-all duration-300 cursor-pointer"
                style={{ background: active === i ? 'rgba(255,92,26,0.08)' : 'transparent', border: active === i ? '1px solid rgba(255,92,26,0.25)' : '1px solid transparent' }}
                whileHover={{ x: active === i ? 0 : 4 }}>
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1 pt-1 flex-shrink-0">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg"
                      style={{ background: active === i ? 'rgba(255,92,26,0.15)' : 'rgba(255,255,255,0.04)' }}>
                      {icon}
                    </div>
                    {active === i && (
                      <motion.div className="w-0.5 rounded-full overflow-hidden" style={{ height: 40, background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div className="w-full rounded-full" style={{ background: 'var(--accent)' }}
                          initial={{ height: '0%' }} animate={{ height: '100%' }}
                          transition={{ duration: 3.5, ease: 'linear' }} />
                      </motion.div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-lg mb-1 transition-colors"
                      style={{ color: active === i ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                      {title}
                    </h3>
                    <AnimatePresence>
                      {active === i && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                          className="font-dm text-sm leading-relaxed overflow-hidden"
                          style={{ color: 'var(--text-secondary)' }}>
                          {body}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          <div className="relative sticky top-24" style={{ height: 420 }}>
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center">
                <div className="w-full">{features[active].card}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */
export default function Home() {
  const { setOpen } = useModal()
  const navigate = useNavigate()

  const professions = [
    { icon: '⚖️', label: 'Abogados' }, { icon: '🦷', label: 'Dentistas' },
    { icon: '🍽️', label: 'Restaurantes' }, { icon: '💪', label: 'Coaches' },
    { icon: '✂️', label: 'Peluquerías' }, { icon: '🏥', label: 'Médicos' },
    { icon: '📊', label: 'Contadores' }, { icon: '🛍️', label: 'Tiendas' },
    { icon: '🏨', label: 'Hoteles' }, { icon: '📸', label: 'Fotógrafos' },
    { icon: '🎓', label: 'Consultoras' }, { icon: '🔧', label: 'Técnicos' },
    { icon: '🌺', label: 'Floristerías' }, { icon: '🏋️', label: 'Gimnasios' },
    { icon: '🚗', label: 'Talleres' }, { icon: '🎵', label: 'Artistas' },
  ]

  return (
    <>
      <Helmet>
        <title>Arise Code | Tu página web desde $7.99/mes — Ecuador</title>
        <meta name="description" content="Páginas web profesionales para negocios en Ecuador desde $7.99/mes. Sin pago inicial. Consulta gratis." />
      </Helmet>

      {/* ══ HERO ════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20" style={{ background: 'var(--bg-base)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.35 }}>
          <svg width="100%" height="100%"><defs><pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 0 0 60" fill="none" stroke="rgba(255,92,26,0.07)" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#g)" /></svg>
        </div>
        <div className="absolute pointer-events-none" style={{ top: '-8%', left: '-4%', width: '50%', height: '70%', background: 'radial-gradient(ellipse, rgba(255,92,26,0.1) 0%, transparent 65%)', filter: 'blur(70px)' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '5%', right: '-5%', width: '40%', height: '55%', background: 'radial-gradient(ellipse, rgba(255,140,80,0.06) 0%, transparent 65%)', filter: 'blur(90px)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="font-dm font-medium text-xs uppercase tracking-[0.2em] mb-7"
                style={{ color: 'var(--text-muted)' }}>
                Ambato · Ecuador · Est. 2024
              </motion.p>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
                className="font-syne font-bold leading-[1.05] mb-5"
                style={{ fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', color: 'var(--text-primary)' }}>
                Tu negocio merece<br />
                una página web<br />
                que{' '}
                <span className="relative inline-block">
                  <span style={{ color: 'var(--accent)' }}>trabaje</span>
                  <motion.svg initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.9, ease: 'easeOut' }}
                    className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 8" fill="none">
                    <motion.path d="M2 6 Q30 2 60 6 Q90 10 118 4"
                      stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" fill="none"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1, duration: 0.9 }} />
                  </motion.svg>
                </span>{' '}
                por ti.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
                className="font-dm text-lg leading-relaxed mb-5" style={{ color: 'var(--text-secondary)', maxWidth: 480 }}>
                Eres <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>abogado, dentista, chef o dueño de negocio</strong> — te hacemos tu página profesional para que tus clientes te encuentren en Google y te escriban directo.
              </motion.p>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl mb-7"
                style={{ background: 'rgba(255,92,26,0.08)', border: '1px solid rgba(255,92,26,0.22)' }}>
                <span className="font-syne font-bold text-2xl" style={{ color: 'var(--accent)' }}>$7.99</span>
                <div>
                  <div className="font-dm font-medium text-sm" style={{ color: 'var(--text-primary)' }}>al mes, todo incluido</div>
                  <div className="font-dm text-xs" style={{ color: 'var(--text-muted)' }}>Sin pago inicial · Sin permanencia</div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58 }}
                className="flex flex-col sm:flex-row gap-3">
                <MagBtn onClick={() => setOpen(true)}
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-dm font-semibold text-base text-white"
                  style={{ background: 'var(--accent)', boxShadow: '0 0 32px rgba(255,92,26,0.4)' }}>
                  Quiero mi página web <ArrowUpRight size={16} />
                </MagBtn>
                <motion.button onClick={() => navigate('/planes')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-dm font-medium text-base transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
                  Ver precios
                </motion.button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
                className="flex items-center gap-3 mt-6">
                <div className="flex -space-x-2">
                  {[['#FF5C1A', 'V'], ['#7C3AED', 'C'], ['#0891B2', 'D'], ['#059669', 'M']].map(([c, l], i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-syne font-bold text-white"
                      style={{ background: c, borderColor: 'var(--bg-base)', zIndex: 4 - i }}>{l}</div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#FF5C1A" style={{ color: '#FF5C1A' }} />)}</div>
                  <div className="font-dm text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>+50 negocios confían en nosotros</div>
                </div>
              </motion.div>

              {/* Mobile stats */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                className="lg:hidden mt-10 grid grid-cols-2 gap-3">
                {[{ v: '50+', label: 'Páginas creadas', c: 'var(--accent)' }, { v: '100%', label: 'Clientes satisfechos', c: '#22C55E' }, { v: '$7.99', label: 'Desde al mes', c: 'var(--accent)' }, { v: '24h', label: 'Te respondemos en', c: '#F59E0B' }].map(({ v, label, c }) => (
                  <div key={label} className="rounded-2xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="font-syne font-bold text-2xl mb-1" style={{ color: c }}>{v}</div>
                    <div className="font-dm text-xs leading-tight" style={{ color: 'var(--text-muted)' }}>{label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="flex items-center justify-center">
              <BrowserMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROFESSIONS TICKERS ═════════════════════════ */}
      <div className="py-5 space-y-3 overflow-hidden" style={{ background: 'var(--bg-surface)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Ticker items={professions.slice(0, 8)} dur={26} dir={1} />
        <Ticker items={professions.slice(8)} dur={21} dir={-1} />
      </div>

      {/* ══ VIDEO SHOWCASE ══════════════════════════════ */}
      <VideoShowcase />

      {/* ══ TRUST SECTION ═══════════════════════════════ */}
      <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="max-w-2xl mb-14">
            <p className="text-xs font-dm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>La pregunta que todos tienen</p>
            <h2 className="font-syne font-bold leading-tight" style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: 'var(--text-primary)' }}>
              "¿Por qué tan barato si otros cobran $500 o más?"
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { n: '01', t: 'Tecnología moderna', b: 'Usamos herramientas que nos permiten trabajar rápido sin sacrificar calidad. Ese ahorro te lo pasamos a ti en el precio.' },
              { n: '02', t: 'Una inversión accesible desde el primer día', b: 'En lugar de un desembolso inicial de $500 o más, pagas una mensualidad fija y predecible. El resultado es exactamente el mismo — sin comprometer tu capital.' },
              { n: '03', t: 'Nos interesa que te quedes', b: 'Un cliente feliz que se queda años vale mucho más para nosotros que uno que paga mucho y desaparece. Por eso te cuidamos.' },
            ].map(({ n, t, b }, i) => (
              <Reveal key={n} delay={i * 0.12}>
                <GCard className="p-6 h-full">
                  <span className="font-syne font-bold text-5xl block mb-4 select-none" style={{ color: 'rgba(255,92,26,0.14)' }}>{n}</span>
                  <h3 className="font-syne font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>{t}</h3>
                  <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{b}</p>
                </GCard>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
              style={{ background: 'rgba(255,92,26,0.05)', border: '1px solid rgba(255,92,26,0.2)' }}>
              <div className="text-4xl flex-shrink-0">🤝</div>
              <div>
                <h4 className="font-syne font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>Si no te gusta el resultado, no pagas nada.</h4>
                <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Te mostramos exactamente cómo quedaría tu página antes de que pongas un solo centavo. Si no te convence — sin cobros, sin presión.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FEATURES TITLE + TABS ═══════════════════════ */}
      <div className="pt-16 pb-8 px-5 sm:px-8" style={{ background: 'var(--bg-base)' }}>
        <Reveal className="text-center">
          <p className="text-xs font-dm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Todo incluido</p>
          <h2 className="font-syne font-bold" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text-primary)' }}>Qué incluye tu página</h2>
        </Reveal>
      </div>
      <ScrollFeatures />

      {/* ══ STATS ═══════════════════════════════════════ */}
      <section className="py-16 px-5 sm:px-8" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              {[{ to: 50, sf: '+', lb: 'páginas creadas' }, { to: 100, sf: '%', lb: 'clientes satisfechos' }, { to: 3, sf: '+', lb: 'años de experiencia' }, { to: 24, sf: 'h', lb: 'tiempo de respuesta' }].map(({ to, sf, lb }, i) => (
                <div key={i} className="p-6 text-center" style={{ background: 'var(--bg-elevated)', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div className="font-syne font-bold text-3xl sm:text-4xl mb-1" style={{ color: 'var(--accent)' }}>
                    <CountUp to={to} suffix={sf} />
                  </div>
                  <div className="font-dm text-xs" style={{ color: 'var(--text-muted)' }}>{lb}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════ */}
      <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-xs font-dm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Proceso</p>
            <h2 className="font-syne font-bold mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text-primary)' }}>Del "me interesa" a tu página publicada</h2>
            <p className="font-dm" style={{ color: 'var(--text-muted)' }}>No necesitas saber nada de tecnología.</p>
          </Reveal>
          <div className="relative">
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px hidden lg:block"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,92,26,0.3), rgba(255,92,26,0.3), transparent)' }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { s: '1', e: '💬', t: 'Nos escribes', b: 'Nos cuentas qué hace tu negocio. Por WhatsApp o formulario — como prefieras.' },
                { s: '2', e: '🎨', t: 'Diseñamos tu página', b: 'Creamos el diseño, tú lo revisas y apruebas antes de publicar.' },
                { s: '3', e: '🌐', t: 'La ponemos en internet', b: 'Queda en línea con tu nombre y aparece en Google.' },
                { s: '4', e: '🔄', t: 'La mantenemos por ti', b: '¿Necesitas un cambio? Nos avisas y listo. Incluido en tu plan.' },
              ].map(({ s, e, t, b }, i) => (
                <Reveal key={s} delay={i * 0.1}>
                  <GCard className="p-6 h-full text-center">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
                      style={{ background: 'rgba(255,92,26,0.1)', border: '1px solid rgba(255,92,26,0.2)' }}>{e}</div>
                    <div className="font-syne font-bold text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,92,26,0.5)' }}>Paso {s}</div>
                    <h3 className="font-syne font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>{t}</h3>
                    <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{b}</p>
                  </GCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PLANS ═══════════════════════════════════════ */}
      <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-xs font-dm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Precios</p>
            <h2 className="font-syne font-bold mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text-primary)' }}>Elige tu plan y empieza hoy</h2>
            <p className="font-dm" style={{ color: 'var(--text-muted)' }}>Sin pago inicial. Sin permanencia. Tú enfócate en tu negocio — nosotros en tu página.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: 'Básico', price: '$7.99', featured: false,
                desc: 'Para arrancar con presencia real.',
                feats: [
                  'Página de hasta 3 secciones',
                  'Diseño personalizado a tu negocio',
                  'Formulario de contacto a WhatsApp',
                  'Apareces en Google desde el día 1',
                  'Tu página siempre en línea',
                  'Hasta 3 cambios por mes',
                  'Nosotros nos encargamos de todo',
                ],
              },
              {
                name: 'Profesional', price: '$14.99', featured: true,
                desc: 'El más elegido por nuestros clientes.',
                feats: [
                  'Página completa, hasta 6 secciones',
                  'Galería de servicios o productos',
                  'Mejor posición en Google',
                  'Tu página siempre en línea',
                  'Hasta 5 cambios por mes',
                  'Sección de opiniones de clientes',
                  'Informe mensual de visitas',
                  'Nosotros nos encargamos de todo',
                ],
              },
              {
                name: 'Empresarial', price: '$29.99', featured: false,
                desc: 'Domina tu mercado local.',
                feats: [
                  'Página completa a tu medida',
                  'Catálogo con pedidos a WhatsApp',
                  'Máxima visibilidad en Google',
                  'Tu página siempre en línea',
                  'Actualizaciones ilimitadas*',
                  'Google Maps — te encontramos en el mapa',
                  'Gestionamos tus reseñas de Google',
                  'Informe mensual de visitas',
                  'Soporte prioritario',
                  'Nosotros nos encargamos de todo',
                ],
                highlight: true,
              },
            ].map((pl, i) => (
              <Reveal key={pl.name} delay={i * 0.1}>
                <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  className="rounded-2xl overflow-hidden flex flex-col h-full relative"
                  style={{
                    background: pl.featured ? 'linear-gradient(160deg,var(--bg-elevated),var(--bg-card))' : 'var(--bg-elevated)',
                    border: pl.featured ? '1px solid rgba(255,92,26,0.4)' : pl.highlight ? '1px solid rgba(167,139,250,0.3)' : '1px solid rgba(255,255,255,0.07)',
                    boxShadow: pl.featured ? '0 0 50px rgba(255,92,26,0.12)' : pl.highlight ? '0 0 40px rgba(167,139,250,0.08)' : 'none',
                  }}>
                  {pl.featured && <div className="h-0.5" style={{ background: 'linear-gradient(90deg,#FF5C1A,#FF8C5A)' }} />}
                  {pl.highlight && !pl.featured && <div className="h-0.5" style={{ background: 'linear-gradient(90deg,#A78BFA,#7C3AED)' }} />}
                  <div className="p-6 flex flex-col flex-1">
                    {pl.featured && (
                      <span className="self-start text-xs font-dm font-bold px-2.5 py-1 rounded-full mb-3"
                        style={{ background: 'rgba(255,92,26,0.15)', color: 'var(--accent)', border: '1px solid rgba(255,92,26,0.3)' }}>
                        ✦ El más elegido
                      </span>
                    )}
                    {pl.highlight && !pl.featured && (
                      <span className="self-start text-xs font-dm font-bold px-2.5 py-1 rounded-full mb-3"
                        style={{ background: 'rgba(167,139,250,0.12)', color: '#A78BFA', border: '1px solid rgba(167,139,250,0.25)' }}>
                        🗺️ Incluye Google Maps
                      </span>
                    )}
                    <h3 className="font-syne font-bold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>{pl.name}</h3>
                    <p className="font-dm text-xs mb-4" style={{ color: 'var(--text-muted)' }}>{pl.desc}</p>
                    <div className="flex items-end gap-1 mb-5">
                      <span className="font-syne font-bold text-5xl" style={{ color: 'var(--text-primary)' }}>{pl.price}</span>
                      <span className="font-dm text-sm pb-2" style={{ color: 'var(--text-muted)' }}>/mes</span>
                    </div>
                    <button onClick={() => setOpen(true)} className="w-full py-3 rounded-xl font-dm font-semibold text-sm mb-5 transition-all"
                      style={pl.featured
                        ? { background: 'var(--accent)', color: 'white', boxShadow: '0 0 20px rgba(255,92,26,0.3)' }
                        : pl.highlight
                          ? { background: 'rgba(167,139,250,0.15)', color: '#A78BFA', border: '1px solid rgba(167,139,250,0.3)' }
                          : { border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text-secondary)' }}>
                      Quiero este plan
                    </button>
                    <ul className="space-y-2 flex-1">
                      {pl.feats.map(f => (
                        <li key={f} className="flex items-start gap-2 font-dm text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <Check size={13} className="mt-0.5 flex-shrink-0"
                            style={{ color: pl.featured ? 'var(--accent)' : pl.highlight ? '#A78BFA' : 'rgba(255,255,255,0.25)' }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-4">
            <p className="text-xs font-dm mb-4" style={{ color: 'var(--text-muted)' }}>
              * Actualizaciones ilimitadas aplica para cambios de contenido razonables. ¿Quieres el código fuente? Desbloquéalo: Básico $180 · Profesional $280 · Empresarial $480.
            </p>
            <button onClick={() => navigate('/planes')} className="inline-flex items-center gap-2 font-dm text-sm transition-colors" style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              Ver todos los detalles de cada plan <ArrowRight size={14} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════ */}
      <section className="py-24 px-5 sm:px-8" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-xs font-dm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Testimonios</p>
            <h2 className="font-syne font-bold" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text-primary)' }}>Lo que dicen quienes ya tienen su página</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { in: 'VS', co: '#7C3AED', nm: 'Verónica S.', ro: 'Consultora de RRHH', ci: 'Quito', qu: 'Nunca pensé que iba a tener una página tan profesional. Desde que la tengo me llegan consultas por WhatsApp casi todos los días.' },
              { in: 'CM', co: 'var(--accent)', nm: 'Carlos M.', ro: 'Propietario, distribuidora', ci: 'Ambato', qu: 'No sé nada de tecnología y no tuve que aprender nada. Les dije qué necesitaba y en una semana ya tenía mi página funcionando.' },
              { in: 'DR', co: '#0891B2', nm: 'Diego R.', ro: 'Dueño de tienda de ropa', ci: 'Riobamba', qu: 'Siempre hablé con la misma persona. Me explicó todo claramente, cumplió el plazo y cuando necesito algo me responden ese mismo día.' },
            ].map(({ in: ini, co, nm, ro, ci, qu }, i) => (
              <Reveal key={nm} delay={i * 0.1}>
                <GCard className="p-6 h-full flex flex-col gap-4">
                  <div className="flex gap-0.5">{[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#FF5C1A" style={{ color: '#FF5C1A' }} />)}</div>
                  <p className="font-dm text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>"{qu}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-syne font-bold text-sm text-white flex-shrink-0" style={{ background: co }}>{ini}</div>
                    <div>
                      <div className="font-dm font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{nm}</div>
                      <div className="font-dm text-xs" style={{ color: 'var(--text-muted)' }}>{ro} · {ci}</div>
                    </div>
                  </div>
                </GCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════ */}
      <section className="py-20 px-5 sm:px-8" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="font-syne font-bold text-3xl" style={{ color: 'var(--text-primary)' }}>Preguntas frecuentes</h2>
          </Reveal>
          <Reveal>
            <div className="space-y-3">
              {[
                { q: '¿Necesito saber de tecnología?', a: 'Para nada. Tú nos dices qué quieres y nosotros lo hacemos. Solo necesitas tener claro qué hace tu negocio.' },
                { q: '¿Qué significa "sin pago inicial"?', a: 'Que no tienes que pagar $300, $500 o más por adelantado. Empiezas a pagar desde el primer mes que tu página esté activa.' },
                { q: '¿Qué pasa si quiero cancelar?', a: 'Nada malo. Sin multas ni cobros extra. Nos avisas y tu suscripción termina al final del mes. Sin preguntas incómodas.' },
                { q: '¿Por qué debo pagar el dominio aparte?', a: 'El dominio es la dirección de tu página (ej: minegocio.com). Lo pagas tú directamente (~$12/año) y queda 100% a tu nombre. Si cambias de proveedor, el dominio es tuyo.' },
                { q: '¿Cuánto tiempo tarda?', a: 'Entre 5 y 14 días según el plan. Te pedimos tus datos y fotos — nosotros construimos el resto.' },
              ].map(faq => <FAQ key={faq.q} {...faq} />)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FINAL CTA ═══════════════════════════════════ */}
      <section className="relative py-28 px-5 sm:px-8 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.4 }}>
          <svg width="100%" height="100%"><defs><pattern id="g2" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 0 0 60" fill="none" stroke="rgba(255,92,26,0.07)" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#g2)" /></svg>
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,92,26,0.1) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-sm font-dm"
              style={{ background: 'rgba(255,92,26,0.08)', border: '1px solid rgba(255,92,26,0.22)', color: 'var(--text-secondary)' }}>
              <Zap size={13} style={{ color: 'var(--accent)' }} />
              Primera consulta 100% gratis
            </div>
            <h2 className="font-syne font-bold mb-5 leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', color: 'var(--text-primary)' }}>
              Tu negocio necesita<br />una página web hoy.
            </h2>
            <p className="font-dm text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
              Te mostramos cómo quedaría antes de que pagues algo. Sin compromiso.
            </p>
            <MagBtn onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-9 py-5 rounded-2xl font-dm font-semibold text-lg text-white"
              style={{ background: 'var(--accent)', boxShadow: '0 0 60px rgba(255,92,26,0.5)' }}>
              Quiero mi página web <ArrowUpRight size={20} />
            </MagBtn>
            <p className="mt-5 text-sm font-dm" style={{ color: 'var(--text-muted)' }}>
              Desde $7.99/mes · Sin pago inicial · Sin permanencia
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}