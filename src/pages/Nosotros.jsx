import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { useModal } from '../App.jsx'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}>
      {children}
    </motion.div>
  )
}

/* ── Animated number ── */
function BigNumber({ n, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div ref={ref} className="text-center"
      initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      <div className="font-syne font-bold text-4xl mb-1" style={{ color: 'var(--accent)' }}>{n}</div>
      <div className="font-dm text-xs" style={{ color: 'var(--text-muted)' }}>{label}</div>
    </motion.div>
  )
}

/* ── Team card with photo ── */
function TeamCard({ name, role, bio, photo, initials, color, skills, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -6 }}
      className="relative rounded-2xl overflow-hidden group"
      style={{ background: 'var(--bg-elevated)', border: `1px solid ${color}22` }}>

      {/* Animated accent line on hover */}
      <motion.div className="absolute top-0 left-0 h-0.5 z-20 rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.45 }} />

      {/* Photo */}
      <div className="relative h-64 overflow-hidden">
        {photo ? (
          <motion.img
            src={photo} alt={name}
            className="w-full h-full object-cover object-top"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-syne font-bold text-4xl text-white"
            style={{ background: `linear-gradient(135deg, ${color}55, ${color}99)` }}>
            {initials}
          </div>
        )}
        {/* Gradient fade into card */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--bg-elevated) 0%, transparent 100%)' }} />
        {/* Ambient color tint on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, ${color}18 0%, transparent 60%)` }} />
      </div>

      {/* Info */}
      <div className="relative z-10 px-6 pb-6 -mt-2">
        <h3 className="font-syne font-bold text-xl mb-0.5" style={{ color: 'var(--text-primary)' }}>{name}</h3>
        <p className="font-dm text-xs font-semibold uppercase tracking-widest mb-3" style={{ color }}>{role}</p>
        <p className="font-dm text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{bio}</p>
        <div className="flex flex-wrap gap-2">
          {skills.map(s => (
            <span key={s} className="text-xs font-dm px-2.5 py-1 rounded-lg"
              style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Nosotros() {
  const { setOpen } = useModal()

  const stack = [
    { name: 'React', color: '#61DAFB' }, { name: 'Next.js', color: '#FFFFFF' },
    { name: 'Node.js', color: '#68A063' }, { name: 'Python', color: '#F7CA3E' },
    { name: 'PostgreSQL', color: '#336791' }, { name: 'Laravel', color: '#FF2D20' },
    { name: 'TypeScript', color: '#3178C6' }, { name: 'Tailwind', color: '#38BDF8' },
    { name: 'Vite', color: '#646CFF' }, { name: 'Netlify', color: '#00C7B7' },
    { name: 'Three.js', color: '#FFFFFF' }, { name: 'IA Tools', color: '#FF5C1A' },
  ]

  return (
    <>
      <Helmet>
        <title>Nosotros | Arise Code — Quiénes somos</title>
        <meta name="description" content="Somos dos ingenieros en sistemas de Ambato, Ecuador. Creamos páginas web que realmente funcionan para negocios reales." />
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-5 sm:px-8 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.35 }}>
          <svg width="100%" height="100%"><defs><pattern id="gn" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 0 0 60" fill="none" stroke="rgba(255,92,26,0.07)" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#gn)" /></svg>
        </div>
        <div className="absolute pointer-events-none" style={{ bottom: 0, left: '10%', width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(255,92,26,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-dm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Nosotros</p>
            <h1 className="font-syne font-bold mb-6 leading-tight"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', color: 'var(--text-primary)' }}>
              Dos ingenieros de Ambato<br />
              que <span style={{ color: 'var(--accent)' }}>entienden tu negocio.</span>
            </h1>
            <p className="font-dm text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              No somos una agencia grande con decenas de empleados y procesos lentos.
              Somos dos personas que aman lo que hacen — y eso se nota en cada página que entregamos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-20 px-5 sm:px-8" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <p className="text-xs font-dm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Nuestra historia</p>
              <h2 className="font-syne font-bold text-3xl mb-5 leading-tight" style={{ color: 'var(--text-primary)' }}>
                Nacimos de una frustración real.
              </h2>
              <div className="space-y-4 font-dm text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  Vimos cómo negocios buenos — con productos reales, con clientes fieles —
                  perdían oportunidades todos los días porque no tenían presencia digital.
                  O peor: pagaban fortunas por páginas genéricas que no les conseguían ni un cliente.
                </p>
                <p>
                  Decidimos hacer algo diferente. Nada de plantillas. Nada de agencias que
                  te tratan como número. Solo diseño real, tecnología moderna y alguien
                  que responde el WhatsApp ese mismo día.
                </p>
                <p>
                  Hoy ayudamos a negocios de Ambato, Quito, Riobamba y más ciudades a
                  tener presencia digital que realmente convierte visitantes en clientes.
                </p>
              </div>
              <motion.button onClick={() => setOpen(true)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-dm font-semibold text-sm text-white"
                style={{ background: 'var(--accent)', boxShadow: '0 0 20px rgba(255,92,26,0.3)', cursor: 'pointer' }}>
                Trabaja con nosotros <ArrowUpRight size={14} />
              </motion.button>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: '50+', label: 'Proyectos entregados', color: 'var(--accent)' },
                  { n: '100%', label: 'Clientes satisfechos', color: '#22C55E' },
                  { n: '3+', label: 'Años de experiencia', color: '#60A5FA' },
                  { n: '24h', label: 'Tiempo de respuesta', color: '#F59E0B' },
                ].map(({ n, label, color }) => (
                  <div key={label} className="rounded-2xl p-5 text-center"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="font-syne font-bold text-3xl mb-1" style={{ color }}>{n}</div>
                    <div className="font-dm text-xs" style={{ color: 'var(--text-muted)' }}>{label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl p-4 text-center"
                style={{ background: 'rgba(255,92,26,0.06)', border: '1px solid rgba(255,92,26,0.18)' }}>
                <p className="font-dm text-sm" style={{ color: 'var(--accent)' }}>📍 Base de operaciones</p>
                <p className="font-syne font-bold mt-1" style={{ color: 'var(--text-primary)' }}>Ambato, Tungurahua, Ecuador 🇪🇨</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-20 px-5 sm:px-8" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-12">
            <p className="text-xs font-dm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>El equipo</p>
            <h2 className="font-syne font-bold text-3xl leading-tight" style={{ color: 'var(--text-primary)' }}>
              Las personas detrás de tu página.
            </h2>
            <p className="font-dm text-base mt-3 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              Cuando nos contratas, hablas con nosotros directamente. Sin intermediarios, sin "te paso con el área correspondiente".
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TeamCard
              delay={0.1}
              name="Sebastián Gavilanes"
              role="Fundador · Desarrollo & Diseño"
              bio="Ingeniero en sistemas apasionado por crear experiencias digitales que no parecen hechas por máquinas. Experto en uso de IA aplicada al desarrollo real — no para reemplazar el criterio humano, sino para amplificarlo. Si puedes imaginarlo, probablemente puede construirlo."
              photo="/Fotos/sebastiangavilanes.jpg"
              initials="SG"
              color="#FF5C1A"
              skills={['React', 'Next.js', 'Node.js', 'IA Tools', 'UI/UX', 'Three.js']}
            />
            <TeamCard
              delay={0.2}
              name="Ricardo Amores"
              role="Co-fundador · Mantenimiento & Soporte"
              bio="Ingeniero en sistemas especializado en mantener todo funcionando sin que el cliente tenga que preocuparse. El que responde el WhatsApp cuando algo necesita atención. Garantiza que tu página esté siempre actualizada, rápida y sin sorpresas."
              photo="/Fotos/ricardoamo.jpg"
              initials="RA"
              color="#60A5FA"
              skills={['Node.js', 'PHP', 'Laravel', 'PostgreSQL', 'Soporte técnico']}
            />
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {[
              { emoji: '🤝', title: 'Honestidad', body: 'Te decimos lo que se puede hacer y lo que no. Sin promesas vacías.' },
              { emoji: '⚡', title: 'Rapidez', body: 'Entregamos en días, no en meses. Y cumplimos los plazos.' },
              { emoji: '🎯', title: 'Precisión', body: 'Los detalles importan. Una página mal hecha aleja clientes.' },
              { emoji: '🔒', title: 'Compromiso', body: 'El proyecto no termina cuando lo lanzamos. Seguimos contigo.' },
            ].map(({ emoji, title, body }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="rounded-2xl p-5 h-full"
                  style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-2xl mb-3 block">{emoji}</span>
                  <h3 className="font-syne font-semibold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                  <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-20 px-5 sm:px-8" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-10">
            <p className="text-xs font-dm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Tecnologías</p>
            <h2 className="font-syne font-bold text-3xl" style={{ color: 'var(--text-primary)' }}>
              Las herramientas que usamos
            </h2>
            <p className="font-dm text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              Las mismas que usan las empresas más grandes del mundo — al alcance de tu negocio local.
            </p>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-3 justify-center">
              {stack.map(({ name, color }, i) => (
                <motion.div key={name}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-dm text-sm cursor-default"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--text-secondary)' }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                  {name}
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 px-5 sm:px-8 overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,92,26,0.07) 0%, transparent 65%)', filter: 'blur(40px)' }} />
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <Reveal>
            <h2 className="font-syne font-bold text-3xl mb-4" style={{ color: 'var(--text-primary)' }}>
              ¿Listo para trabajar juntos?
            </h2>
            <p className="font-dm mb-8" style={{ color: 'var(--text-secondary)' }}>
              Primera consulta gratis. Sin compromiso. Te respondemos ese mismo día.
            </p>
            <motion.button onClick={() => setOpen(true)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-dm font-semibold text-base text-white"
              style={{ background: 'var(--accent)', boxShadow: '0 0 40px rgba(255,92,26,0.4)', cursor: 'pointer' }}>
              Hablemos por WhatsApp <ArrowUpRight size={16} />
            </motion.button>
          </Reveal>
        </div>
      </section>
    </>
  )
}