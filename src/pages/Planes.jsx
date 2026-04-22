import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Check, X, ChevronDown, ArrowUpRight, Zap, Star, Building2, Code2, Handshake, Globe, HelpCircle, TrendingUp, MousePointerClick } from 'lucide-react'
import { useModal } from '../App.jsx'

/* ── helpers ── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}>
      {children}
    </motion.div>
  )
}

function FAQItem({ q, a }) {
  const [o, setO] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
      <button onClick={() => setO(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 min-h-[52px] transition-colors"
        style={{ background: o ? 'rgba(255,92,26,0.05)' : 'var(--bg-elevated)' }}>
        <span className="font-dm font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{q}</span>
        <motion.span animate={{ rotate: o ? 180 : 0 }} transition={{ duration: 0.22 }}
          style={{ color: 'var(--accent)', flexShrink: 0 }}>
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

/* ── Domain explanation box ── */
function DomainBox() {
  return (
    <div className="rounded-2xl p-5 flex gap-4 items-start"
      style={{ background: 'rgba(255,92,26,0.05)', border: '1px solid rgba(255,92,26,0.18)' }}>
      <Globe size={22} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
      <div>
        <p className="font-syne font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
          🌐 ¿Qué es el dominio y por qué se paga aparte?
        </p>
        <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          El dominio es la dirección de tu página — por ejemplo <span className="font-dm font-medium" style={{ color: 'var(--accent)' }}>tunegocio.com</span>.
          Se paga una vez al año directamente donde se registra, generalmente entre <strong style={{ color: 'var(--text-primary)' }}>$12 y $20/año</strong> según
          disponibilidad (algunos nombres ya están tomados o cuestan más).
          Nosotros te guiamos en la compra, o si prefieres nos encargas el trámite y tú solo cubres el costo exacto.
          El dominio siempre queda a <strong style={{ color: 'var(--text-primary)' }}>tu nombre</strong>, no al nuestro.
        </p>
      </div>
    </div>
  )
}

/* ── Traffic note ── */
function TrafficNote() {
  return (
    <div className="rounded-xl px-5 py-4 flex gap-3 items-start"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <HelpCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--text-muted)' }} />
      <p className="font-dm text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <strong style={{ color: 'var(--text-secondary)' }}>¿Qué pasa si tu negocio crece mucho?</strong>{' '}
        Si tu página recibe miles de visitas por un evento especial o temporada alta,
        te avisamos con anticipación y lo manejamos juntos — sin que tu sitio se caiga ni haya sorpresas.
      </p>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   PLAN DATA
══════════════════════════════════════════════════ */
const plans = [
  {
    id: 'basico',
    Icon: Zap,
    name: 'Básico',
    price: 7.99,
    priceAnual: 5.99,
    tagline: 'Para empezar con presencia real',
    featured: false,
    accentColor: '#60A5FA',
    cta: 'Empezar ahora',
    features: [
      { t: 'Página de hasta 3 secciones', ok: true },
      { t: 'Diseño personalizado a tu negocio', ok: true },
      { t: 'Formulario de contacto directo a WhatsApp', ok: true },
      { t: 'SEO bien optimizado desde el primer día', ok: true },
      { t: 'Tu página siempre en línea', ok: true },
      { t: 'Hasta 3 cambios por mes — nosotros los hacemos', ok: true },
      { t: 'Tú te enfocas en tu negocio, nosotros en tu página', ok: true },
      { t: 'Dominio (~$12–20/año, te guiamos o gestionamos)', ok: true, note: true },
      { t: 'Google Maps / perfil de empresa', ok: false },
      { t: 'Catálogo con pedidos a WhatsApp', ok: false },
      { t: 'Actualizaciones ilimitadas', ok: false },
    ],
  },
  {
    id: 'profesional',
    Icon: Star,
    name: 'Profesional',
    price: 14.99,
    priceAnual: 11.99,
    tagline: 'El más elegido por nuestros clientes',
    featured: true,
    accentColor: '#FF5C1A',
    cta: 'Quiero el Profesional',
    features: [
      { t: 'Página completa, hasta 6 secciones', ok: true },
      { t: 'Diseño personalizado a tu negocio', ok: true },
      { t: 'Galería de servicios o productos', ok: true },
      { t: 'SEO bien optimizado desde el primer día', ok: true },
      { t: 'Tu página siempre en línea', ok: true },
      { t: 'Hasta 5 cambios por mes — nosotros los hacemos', ok: true },
      { t: 'Tú te enfocas en tu negocio, nosotros en tu página', ok: true },
      { t: 'Sección de opiniones de clientes', ok: true },
      { t: 'Informe mensual de visitas', ok: true },
      { t: 'Google Analytics — ve quién visita tu web y desde dónde', ok: true },
      { t: 'Píxel de Meta (Facebook & Instagram)', ok: true },
      { t: 'Dominio (~$12–20/año, te guiamos o gestionamos)', ok: true, note: true },
      { t: 'Google Maps / perfil de empresa', ok: false },
      { t: 'Catálogo con pedidos a WhatsApp', ok: false },
    ],
  },
  {
    id: 'empresarial',
    Icon: Building2,
    name: 'Empresarial',
    price: 29.99,
    priceAnual: 23.99,
    tagline: 'Domina tu mercado local',
    featured: false,
    accentColor: '#A78BFA',
    cta: 'Hablar con un asesor',
    features: [
      { t: 'Página completa a tu medida', ok: true },
      { t: 'Diseño premium exclusivo', ok: true },
      { t: 'Catálogo con pedidos directo a WhatsApp', ok: true },
      { t: 'SEO máximo — apareces primero en búsquedas locales', ok: true },
      { t: 'Tu página siempre en línea', ok: true },
      { t: 'Actualizaciones ilimitadas*', ok: true, soft: true },
      { t: 'Tú te enfocas en tu negocio, nosotros en todo', ok: true },
      { t: 'Google Maps — te ponemos en el mapa', ok: true },
      { t: 'Gestionamos tus reseñas de Google', ok: true },
      { t: 'Los clientes te encuentran en búsquedas y mapas', ok: true },
      { t: 'Informe mensual de visitas', ok: true },
      { t: 'Google Analytics + píxeles de Meta y TikTok', ok: true },
      { t: 'Eventos de conversión configurados (formularios y WhatsApp)', ok: true },
      { t: 'Soporte prioritario — respondemos ese mismo día', ok: true },
      { t: 'Dominio (~$12–20/año, te guiamos o gestionamos)', ok: true, note: true },
    ],
  },
]

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Planes() {
  const [annual, setAnnual] = useState(false)
  const { setOpen } = useModal()

  return (
    <>
      <Helmet>
        <title>Planes | Arise Code — Página web desde $7.99/mes Ecuador</title>
        <meta name="description" content="Elige el plan que más se adapta a tu negocio. Páginas web profesionales desde $7.99/mes. Sin pago inicial, sin permanencia." />
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 px-5 sm:px-8 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.35 }}>
          <svg width="100%" height="100%"><defs><pattern id="pg" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 0 0 60" fill="none" stroke="rgba(255,92,26,0.07)" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#pg)" /></svg>
        </div>
        <div className="absolute pointer-events-none" style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '50%', background: 'radial-gradient(ellipse, rgba(255,92,26,0.09) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Eslogan */}
            <p className="text-xs font-dm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Planes y precios</p>
            <h1 className="font-syne font-bold mb-4 leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text-primary)' }}>
              Ponemos tu negocio en internet.<br />
              <span style={{ color: 'var(--accent)' }}>Sin complicaciones, sin sorpresas.</span>
            </h1>
            <p className="font-dm text-lg mb-8 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Sin pago inicial. Sin permanencia forzada. Cancela cuando quieras.
            </p>

            {/* Billing toggle — only Pro and Empresarial */}
            <div className="inline-flex items-center gap-1 p-1 rounded-xl mb-2"
              style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {[{ label: 'Mensual', val: false }, { label: 'Anual −25%', val: true }].map(({ label, val }) => (
                <button key={label} onClick={() => setAnnual(val)}
                  className="px-5 py-2 rounded-lg text-sm font-dm font-medium transition-all"
                  style={annual === val
                    ? { background: 'var(--accent)', color: 'white', boxShadow: '0 0 16px rgba(255,92,26,0.3)' }
                    : { color: 'var(--text-muted)' }}>
                  {label}
                </button>
              ))}
            </div>
            {annual && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs font-dm mt-2" style={{ color: '#86EFAC' }}>
                ✓ Descuento aplicado en planes Profesional y Empresarial — el Básico mantiene precio fijo para garantizar la calidad del servicio
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── PLANS GRID ── */}
      <section className="pb-12 px-5 sm:px-8" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {plans.map((plan, i) => {
              const { Icon } = plan
              const price = (annual && plan.id !== 'basico') ? plan.priceAnual : plan.price
              const showAnnual = annual && plan.id !== 'basico'
              return (
                <motion.div key={plan.id}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative rounded-2xl overflow-hidden flex flex-col ${plan.featured ? 'md:-mt-4 md:mb-0' : ''}`}
                  style={{
                    background: plan.featured ? 'linear-gradient(160deg, var(--bg-elevated), var(--bg-card))' : 'var(--bg-elevated)',
                    border: plan.featured ? `1px solid rgba(255,92,26,0.4)` : '1px solid rgba(255,255,255,0.07)',
                    boxShadow: plan.featured ? '0 0 60px rgba(255,92,26,0.15)' : 'none',
                  }}>

                  {/* Top accent line */}
                  {plan.featured && (
                    <div className="h-0.5" style={{ background: 'linear-gradient(90deg,#FF5C1A,#FF8C5A)' }} />
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    {plan.featured && (
                      <span className="self-start text-xs font-dm font-bold px-3 py-1 rounded-full mb-4"
                        style={{ background: 'rgba(255,92,26,0.15)', color: 'var(--accent)', border: '1px solid rgba(255,92,26,0.35)' }}>
                        ✦ El más elegido
                      </span>
                    )}

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${plan.accentColor}18` }}>
                        <Icon size={18} style={{ color: plan.accentColor }} />
                      </div>
                      <div>
                        <div className="font-syne font-bold text-base" style={{ color: 'var(--text-primary)' }}>{plan.name}</div>
                        <div className="font-dm text-xs" style={{ color: 'var(--text-muted)' }}>{plan.tagline}</div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-5">
                      <div className="flex items-end gap-1">
                        <AnimatePresence mode="wait">
                          <motion.span key={price}
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}
                            className="font-syne font-bold text-5xl" style={{ color: 'var(--text-primary)' }}>
                            ${price.toFixed(2)}
                          </motion.span>
                        </AnimatePresence>
                        <div className="pb-2">
                          <div className="font-dm text-sm" style={{ color: 'var(--text-muted)' }}>/mes</div>
                          {showAnnual && <div className="font-dm text-xs" style={{ color: '#86EFAC' }}>facturado anual</div>}
                        </div>
                      </div>
                      {showAnnual && (
                        <p className="text-xs font-dm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          antes <span className="line-through">${plan.price.toFixed(2)}</span>/mes
                        </p>
                      )}
                    </div>

                    {/* CTA */}
                    <button onClick={() => setOpen(true)}
                      className="w-full py-3 rounded-xl font-dm font-semibold text-sm mb-5 transition-all flex items-center justify-center gap-2"
                      style={plan.featured
                        ? { background: 'var(--accent)', color: 'white', boxShadow: '0 0 22px rgba(255,92,26,0.4)' }
                        : { border: `1px solid ${plan.accentColor}44`, color: plan.accentColor }}>
                      {plan.cta} <ArrowUpRight size={13} />
                    </button>

                    {/* Divider */}
                    <div className="border-t mb-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

                    {/* Features */}
                    <ul className="space-y-2.5 flex-1">
                      {plan.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2.5">
                          {f.ok
                            ? <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: plan.accentColor }} />
                            : <X size={13} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.12)' }} />
                          }
                          <span className="font-dm text-sm leading-snug"
                            style={{ color: f.ok ? (f.soft ? 'var(--text-muted)' : 'var(--text-secondary)') : 'rgba(255,255,255,0.2)' }}>
                            {f.t}
                            {f.note && <sup style={{ color: 'var(--accent)', opacity: 0.7, marginLeft: 2 }}>*</sup>}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Code unlock note */}
                    <div className="mt-5 pt-4 border-t flex items-center gap-2"
                      style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                      <span className="text-xs">🔐</span>
                      <span className="font-dm text-xs" style={{ color: 'var(--text-muted)' }}>
                        Código fuente disponible por <strong style={{ color: 'var(--text-secondary)' }}>
                          {plan.id === 'basico' ? '$180' : plan.id === 'profesional' ? '$280' : '$480'}
                        </strong> — desbloquéalo cuando quieras.
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Domain note + traffic note */}
          <div className="mt-8 space-y-4 max-w-3xl mx-auto">
            <DomainBox />
            <TrafficNote />
          </div>

          {/* Actualizaciones ilimitadas asterisk */}
          <Reveal className="mt-4 max-w-3xl mx-auto">
            <p className="text-xs font-dm text-center" style={{ color: 'var(--text-muted)' }}>
              * Actualizaciones ilimitadas en el plan Empresarial aplica para cambios de contenido razonables (textos, fotos, precios, productos).
              Nuevas secciones o funcionalidades grandes se cotizan aparte antes de realizarse.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── WHY WEB + INSTAGRAM ── */}
      <section className="py-16 px-5 sm:px-8" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              {/* Instagram side */}
              <div className="p-8" style={{ background: 'var(--bg-elevated)' }}>
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-syne font-bold text-lg mb-3" style={{ color: 'var(--text-primary)' }}>
                  "¿Para qué una página web si ya tengo Instagram?"
                </h3>
                <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Instagram es increíble para <strong style={{ color: 'var(--text-secondary)' }}>atraer clientes</strong> — mostrar tu trabajo, conectar con tu audiencia, crear comunidad.
                  Pero cuando alguien quiere contratarte, necesita más que fotos.
                </p>
              </div>
              {/* Web side */}
              <div className="p-8" style={{ background: 'rgba(255,92,26,0.05)', borderLeft: '1px solid rgba(255,92,26,0.15)' }}>
                <div className="text-3xl mb-3">🌐</div>
                <h3 className="font-syne font-bold text-lg mb-3" style={{ color: 'var(--text-primary)' }}>
                  La web es donde <span style={{ color: 'var(--accent)' }}>se cierran</span> los clientes
                </h3>
                <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Tu página genera confianza, aparece en Google cuando alguien busca tu servicio,
                  y permite que te contacten directo — sin que tengan que buscar entre tus publicaciones.
                  <strong style={{ color: 'var(--text-secondary)' }}> Instagram atrae. La web convierte.</strong>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-20 px-5 sm:px-8" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="font-syne font-bold text-3xl mb-3" style={{ color: 'var(--text-primary)' }}>
              ¿Por qué mensualidad y no un pago único?
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Reveal delay={0.1}>
              <div className="rounded-2xl p-7 h-full" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}>
                <h3 className="font-syne font-bold text-lg mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  😓 Pago único tradicional
                </h3>
                <ul className="space-y-3">
                  {[
                    '$500–$2,000 por adelantado',
                    'La página queda sola, nadie la actualiza',
                    'Cada cambio tiene costo adicional',
                    'Nadie sabe si funciona o no',
                    'A los 2 años parece desactualizada',
                  ].map(t => (
                    <li key={t} className="flex items-start gap-3 font-dm text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <X size={13} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(239,68,68,0.6)' }} />{t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-2xl p-7 h-full" style={{ background: 'rgba(255,92,26,0.04)', border: '1px solid rgba(255,92,26,0.18)' }}>
                <h3 className="font-syne font-bold text-lg mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  🚀 Con Arise Code
                </h3>
                <ul className="space-y-3">
                  {[
                    'Sin pago inicial — desde $7.99/mes',
                    'Tu página siempre actualizada y en línea',
                    'Cambios incluidos cada mes',
                    'Informe mensual de visitas (plan Pro+)',
                    'Soporte directo con quien hizo tu página',
                  ].map(t => (
                    <li key={t} className="flex items-start gap-3 font-dm text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />{t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SOFTWARE A MEDIDA — cinematic ── */}
      <section className="relative py-24 px-5 sm:px-8 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
        {/* Cinematic background */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '70%', height: '80%', background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 65%)', filter: 'blur(80px)' }} />
          <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.2 }}>
            <defs><pattern id="sgrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="1" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#sgrid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-xs font-dm font-semibold uppercase tracking-widest mb-3" style={{ color: '#818CF8' }}>
              ¿Necesitas algo más específico?
            </p>
            <h2 className="font-syne font-bold mb-4 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-primary)' }}>
              Software a medida
            </h2>
            <p className="font-dm text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              ¿Tienes un proceso en tu negocio que todavía se hace a mano o en Excel?
              Lo digitalizamos — y si funciona bien, lo convertimos en una herramienta que te genera ingresos.
            </p>
          </Reveal>

          {/* 3 use cases — cinematic cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              {
                icon: '🏥', title: 'Consultorios médicos y dentales',
                body: 'Historias clínicas, agendamiento de citas, seguimiento de pacientes. Sin papeles, sin Excel, sin caos.',
                glow: 'rgba(52,211,153,0.08)',
                border: 'rgba(52,211,153,0.15)',
                accent: '#34D399',
              },
              {
                icon: '📦', title: 'Inventarios y ventas',
                body: 'Control de stock, facturación y reportes en tiempo real. Para distribuidoras, tiendas y negocios que manejan productos.',
                glow: 'rgba(99,102,241,0.1)',
                border: 'rgba(99,102,241,0.2)',
                accent: '#818CF8',
              },
              {
                icon: '📅', title: 'Reservas y agendas',
                body: 'Citas en línea con recordatorios automáticos. Para peluquerías, spas, estudios y cualquier negocio por citas.',
                glow: 'rgba(251,146,60,0.08)',
                border: 'rgba(251,146,60,0.15)',
                accent: '#FB923C',
              },
            ].map(({ icon, title, body, glow, border, accent }, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="rounded-2xl p-6 h-full relative overflow-hidden"
                  style={{ background: `${glow}`, border: `1px solid ${border}` }}>
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)`, filter: 'blur(16px)', transform: 'translate(30%, -30%)' }} />
                  <span className="text-3xl mb-4 block">{icon}</span>
                  <h4 className="font-syne font-bold text-base mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h4>
                  <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Bottom CTA bar */}
          <Reveal>
            <motion.div whileHover={{ scale: 1.005 }}
              className="rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(99,102,241,0.03))', border: '1px solid rgba(99,102,241,0.2)', boxShadow: '0 0 40px rgba(99,102,241,0.06)' }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">⚡</span>
                  <p className="font-syne font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                    Precio por cotización — sin compromiso
                  </p>
                </div>
                <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Si la solución funciona bien para tu negocio, la podemos ofrecer también como mensualidad — convirtiéndola en un activo que sigue trabajando para ti.
                </p>
              </div>
              <button onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-dm font-semibold text-sm text-white flex-shrink-0 transition-all"
                style={{ background: 'linear-gradient(135deg, #6366F1, #818CF8)', boxShadow: '0 0 24px rgba(99,102,241,0.35)' }}>
                Cuéntanos tu caso <ArrowUpRight size={14} />
              </button>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="py-20 px-5 sm:px-8" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-10">
            <p className="text-xs font-dm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
              Para agencias y profesionales del marketing
            </p>
            <h2 className="font-syne font-bold text-3xl mb-3" style={{ color: 'var(--text-primary)' }}>
              Plan Partners
            </h2>
            <p className="font-dm text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              ¿Consigues los clientes y nosotros nos encargamos del desarrollo?
              Tú te llevas el margen, nosotros hacemos el trabajo técnico — y tu marca queda al frente.
            </p>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="p-8" style={{ background: 'var(--bg-elevated)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div>
                    <div className="flex items-end gap-1 mb-1">
                      <span className="font-dm text-base font-medium" style={{ color: 'var(--text-muted)' }}>desde</span>
                      <span className="font-syne font-bold text-5xl" style={{ color: 'var(--text-primary)' }}>$6.99</span>
                      <span className="font-dm text-sm pb-2" style={{ color: 'var(--text-muted)' }}>/mes por sitio</span>
                    </div>
                    <p className="font-dm text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                      Páginas estándar desde $6.99/mes · Páginas completas o con funcionalidades avanzadas se cotizan según el alcance.
                    </p>
                    <p className="font-dm text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
                      Tú cobras lo que consideres a tu cliente. Nosotros hacemos el trabajo técnico.
                      Tu marca al frente, nuestra tecnología detrás.
                    </p>
                    <button onClick={() => setOpen(true)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-dm font-semibold text-sm text-white transition-all"
                      style={{ background: 'var(--accent)', boxShadow: '0 0 20px rgba(255,92,26,0.3)' }}>
                      Quiero ser Partner <ArrowUpRight size={14} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <p className="font-syne font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                      Requisitos para aplicar:
                    </p>
                    {[
                      'Ser agencia de marketing o profesional del área',
                      'Comprometerse con mínimo 3 clientes activos',
                      'Tu marca aparece, la nuestra no — total confidencialidad',
                      'Acceso a soporte técnico directo',
                      'Sin contratos largos — mes a mes',
                    ].map(r => (
                      <div key={r} className="flex items-start gap-2.5">
                        <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                        <span className="font-dm text-sm" style={{ color: 'var(--text-secondary)' }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ADICIONALES ── */}
      <section className="py-20 px-5 sm:px-8" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-xs font-dm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Servicios adicionales</p>
            <h2 className="font-syne font-bold text-3xl mb-3" style={{ color: 'var(--text-primary)' }}>
              Potencia tu plan
            </h2>
            <p className="font-dm" style={{ color: 'var(--text-secondary)' }}>
              Súmalos a cualquier plan. Sin contrato adicional.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Google Ads */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl p-6 h-full flex flex-col"
                style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                  style={{ background: 'rgba(255,92,26,0.12)', border: '1px solid rgba(255,92,26,0.2)' }}>
                  <TrendingUp size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-syne font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                      Gestión de Google Ads
                    </h3>
                    <div className="text-right flex-shrink-0">
                      <span className="font-syne font-bold text-2xl" style={{ color: 'var(--accent)' }}>$25</span>
                      <span className="font-dm text-xs block" style={{ color: 'var(--text-muted)' }}>/mes</span>
                    </div>
                  </div>
                  <p className="font-dm text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                    Aparece en los primeros resultados de Google cuando alguien busca tu servicio. Nosotros creamos, optimizamos y monitoreamos la campaña cada semana.
                  </p>
                  <ul className="space-y-2 mb-5">
                    {['Investigación de palabras clave', 'Creación y diseño de anuncios', 'Optimización semanal', 'Reporte mensual de resultados'].map(item => (
                      <li key={item} className="flex items-center gap-2 font-dm text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <Check size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="font-dm text-xs px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    💡 El presupuesto de inversión en Google lo pagas tú directo a Google — recomendamos mínimo $30–50/mes para ver resultados.
                  </p>
                </div>
                <motion.button
                  onClick={() => setOpen(true)}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="mt-5 w-full py-3 rounded-xl font-dm font-semibold text-sm text-white flex items-center justify-center gap-2"
                  style={{ background: 'var(--accent)', boxShadow: '0 0 20px rgba(255,92,26,0.25)', cursor: 'pointer' }}>
                  Quiero este adicional <ArrowUpRight size={14} />
                </motion.button>
              </div>
            </Reveal>

            {/* Pixel instalación */}
            <Reveal delay={0.2}>
              <div className="rounded-2xl p-6 h-full flex flex-col"
                style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                  style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.2)' }}>
                  <MousePointerClick size={20} style={{ color: '#A78BFA' }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-syne font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                      Instalación de Píxel
                    </h3>
                    <div className="text-right flex-shrink-0">
                      <span className="font-syne font-bold text-2xl" style={{ color: '#A78BFA' }}>$10</span>
                      <span className="font-dm text-xs block" style={{ color: 'var(--text-muted)' }}>pago único</span>
                    </div>
                  </div>
                  <p className="font-dm text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                    Instalamos el píxel de seguimiento de Meta (Facebook & Instagram) o TikTok en tu web para que puedas correr anuncios que le aparezcan exactamente a tus clientes ideales.
                  </p>
                  <ul className="space-y-2 mb-5">
                    {['Píxel de Meta (Facebook & Instagram)', 'Píxel de TikTok', 'Verificación de que funciona correctamente', 'Listo para correr anuncios desde el día 1'].map(item => (
                      <li key={item} className="flex items-center gap-2 font-dm text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <Check size={13} style={{ color: '#A78BFA', flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="font-dm text-xs px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    💡 Necesitas una cuenta de Meta Ads o TikTok Ads activa para aprovechar el píxel.
                  </p>
                </div>
                <motion.button
                  onClick={() => setOpen(true)}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="mt-5 w-full py-3 rounded-xl font-dm font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                  style={{ border: '1px solid rgba(167,139,250,0.3)', color: '#A78BFA', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(167,139,250,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  Quiero este adicional <ArrowUpRight size={14} />
                </motion.button>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-5 sm:px-8" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="font-syne font-bold text-3xl" style={{ color: 'var(--text-primary)' }}>
              Preguntas frecuentes
            </h2>
          </Reveal>
          <Reveal>
            <div className="space-y-3">
              {[
                { q: '¿Hay contrato de permanencia?', a: 'No en los planes Profesional y Empresarial. El plan Básico tiene un período mínimo de 5 meses para garantizar la calidad del servicio — después puedes continuar mes a mes o cancelar sin penalización.' },
                { q: '¿Qué pasa si quiero cancelar?', a: 'Nos avisas y tu suscripción termina al final del mes pagado. Sin cobros extra, sin preguntas incómodas. Si cumpliste el período mínimo, te entregamos el código fuente de tu página.' },
                { q: '¿Por qué se entrega el código después de varios meses?', a: 'Porque el desarrollo, el diseño y la configuración tienen un costo real. El período mínimo nos asegura que el servicio fue aprovechado correctamente — y a ti te garantiza que estaremos disponibles para acompañarte durante ese tiempo.' },
                { q: '¿Qué es un "cambio menor"?', a: 'Actualizar un texto, cambiar un precio, agregar una foto, cambiar el número de teléfono. Cambios que toman menos de 30 minutos. Nuevas secciones o funcionalidades grandes se cotizan aparte — siempre antes de hacerlos.' },
                { q: '¿El SEO está incluido en todos los planes?', a: 'Sí. Todos los planes incluyen SEO bien configurado desde el primer día — estructura correcta, velocidad, descripción para Google y configuración de tu negocio para búsquedas locales. El plan Empresarial además incluye apoyo en Google Maps.' },
                { q: '¿Qué incluye el apoyo en Google Maps?', a: 'Creamos o actualizamos tu perfil de empresa en Google, subimos fotos, respondemos reseñas con los textos que tú nos proporciones y optimizamos la información para que aparezcas cuando alguien busca tu servicio cerca de ti.' },
              ].map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative py-24 px-5 sm:px-8 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,92,26,0.09) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-syne font-bold mb-4 leading-tight"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)', color: 'var(--text-primary)' }}>
              ¿Cuál plan es el tuyo?
            </h2>
            <p className="font-dm text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
              Primera consulta gratis. Te orientamos sin compromiso.
            </p>
            <motion.button onClick={() => setOpen(true)}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-dm font-semibold text-base text-white"
              style={{ background: 'var(--accent)', boxShadow: '0 0 40px rgba(255,92,26,0.45)', cursor: 'pointer' }}>
              <Zap size={16} /> Hablemos <ArrowUpRight size={16} />
            </motion.button>
            <p className="mt-4 text-sm font-dm" style={{ color: 'var(--text-muted)' }}>
              Desde $7.99/mes · Sin pago inicial · Respuesta en menos de 24h
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}