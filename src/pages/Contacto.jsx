import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, ChevronDown, Mail, Phone, MapPin, Clock, Instagram, Linkedin } from 'lucide-react'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}>
      {children}
    </motion.div>
  )
}

const schema = z.object({
  name: z.string().min(2, 'Ingresa tu nombre'),
  whatsapp: z.string().min(7, 'Ingresa tu WhatsApp'),
  business: z.string().min(2, 'Cuéntanos qué hace tu negocio'),
  plan: z.string().min(1, 'Selecciona un plan'),
  message: z.string().optional(),
})

const WA_NUMBER = '593988515225'

function ContactForm() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = (data) => {
    // Build WhatsApp message
    const msg = [
      '🚀 *Nuevo lead - Arise Code*',
      '',
      `👤 *Nombre:* ${data.name}`,
      `📱 *WhatsApp:* ${data.whatsapp}`,
      `🏢 *Negocio:* ${data.business}`,
      `📋 *Plan interesado:* ${data.plan}`,
      data.message ? `💬 *Mensaje:* ${data.message}` : '',
    ].filter(Boolean).join('\n')

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion_contact', {
        event_category: 'lead',
        event_label: data.plan,
        value: 1,
        transport_type: 'beacon',
      })
    }
    setSent(true)
  }

  if (sent) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center py-14 gap-4">
      <CheckCircle size={52} style={{ color: '#22C55E' }} />
      <h3 className="font-syne font-bold text-xl" style={{ color: 'var(--text-primary)' }}>¡Listo! Abrimos WhatsApp</h3>
      <p className="font-dm text-sm max-w-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        Tu mensaje ya está listo para enviarnos. Solo presiona enviar en WhatsApp y te respondemos en menos de 24 horas.
      </p>
      <button onClick={() => setSent(false)} className="mt-2 font-dm text-sm transition-colors"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
        Enviar otro mensaje
      </button>
    </motion.div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-xs font-dm font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: 'var(--text-muted)' }}>Tu nombre *</label>
        <input {...register('name')} placeholder="Juan Pérez"
          className={`form-input ${errors.name ? 'error' : ''}`} />
        {errors.name && <p className="mt-1 text-xs text-red-400 font-dm">{errors.name.message}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <label className="block text-xs font-dm font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: 'var(--text-muted)' }}>Tu WhatsApp *</label>
        <input {...register('whatsapp')} type="tel" placeholder="+593 99 999 9999"
          className={`form-input ${errors.whatsapp ? 'error' : ''}`} />
        {errors.whatsapp && <p className="mt-1 text-xs text-red-400 font-dm">{errors.whatsapp.message}</p>}
      </div>

      {/* Business */}
      <div>
        <label className="block text-xs font-dm font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: 'var(--text-muted)' }}>¿Qué hace tu negocio? *</label>
        <input {...register('business')} placeholder="Soy dentista en Quito / Tengo una peluquería..."
          className={`form-input ${errors.business ? 'error' : ''}`} />
        {errors.business && <p className="mt-1 text-xs text-red-400 font-dm">{errors.business.message}</p>}
      </div>

      {/* Plan */}
      <div>
        <label className="block text-xs font-dm font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: 'var(--text-muted)' }}>¿Qué plan te interesa? *</label>
        <select {...register('plan')} className={`form-input ${errors.plan ? 'error' : ''}`} defaultValue="">
          <option value="" disabled>Selecciona un plan…</option>
          <option value="Básico — $7.99/mes">Básico — $7.99/mes</option>
          <option value="Profesional — $14.99/mes">Profesional — $14.99/mes</option>
          <option value="Empresarial — $29.99/mes">Empresarial — $29.99/mes</option>
          <option value="Software a medida — cotización">Software a medida — cotización</option>
          <option value="Plan Partners — $6.99/mes">Plan Partners — $6.99/mes</option>
          <option value="No sé aún, quiero orientación">No sé aún, quiero orientación</option>
        </select>
        {errors.plan && <p className="mt-1 text-xs text-red-400 font-dm">{errors.plan.message}</p>}
      </div>

      {/* Optional message */}
      <div>
        <label className="block text-xs font-dm font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: 'var(--text-muted)' }}>
          ¿Algo más que quieras contarnos?{' '}
          <span className="normal-case tracking-normal font-dm font-normal opacity-60">(opcional)</span>
        </label>
        <textarea {...register('message')} rows={3} placeholder="Cualquier detalle adicional..."
          className="form-input resize-none" />
      </div>

      {/* Submit — opens WhatsApp */}
      <button type="submit"
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-dm font-semibold text-base text-white mt-2 transition-all"
        style={{ background: '#25D366', boxShadow: '0 0 24px rgba(37,211,102,0.3)' }}>
        <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Enviar por WhatsApp
      </button>
      <p className="text-center text-xs font-dm" style={{ color: 'var(--text-muted)' }}>
        Se abrirá WhatsApp con tu mensaje listo · Respondemos en menos de 24h
      </p>
    </form>
  )
}

/* ── FAQ ── */
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

export default function Contacto() {
  return (
    <>
      <Helmet>
        <title>Contacto | Arise Code — Hablemos por WhatsApp</title>
        <meta name="description" content="Contáctanos por WhatsApp. Primera consulta gratis. Respondemos en menos de 24 horas. Página web desde $7.99/mes en Ecuador." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-5 sm:px-8 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
        <div className="absolute pointer-events-none" style={{ top: '-10%', right: '-5%', width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(255,92,26,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-dm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Contacto</p>
            <h1 className="font-syne font-bold mb-5 leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: 'var(--text-primary)' }}>
              Hablemos por WhatsApp.
            </h1>
            <p className="font-dm text-lg" style={{ color: 'var(--text-secondary)' }}>
              Primera consulta gratis · Sin compromiso · Respondemos en menos de 24h
            </p>
          </motion.div>
        </div>
      </section>

      {/* Split layout */}
      <section className="py-12 pb-20 px-5 sm:px-8" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left: info */}
          <Reveal>
            <div className="space-y-6">
              <div>
                <h2 className="font-syne font-bold text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>
                  ¿Por qué elegirnos?
                </h2>
                <ul className="space-y-2.5">
                  {[
                    'Primera consulta 100% gratuita',
                    'Respuesta en menos de 24 horas',
                    'Precio claro antes de empezar — sin sorpresas',
                    'Sin contratos abusivos',
                    'Hablas con quien hace tu página, no con un vendedor',
                  ].map(t => (
                    <li key={t} className="flex items-center gap-3 font-dm text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent)', fontSize: 16 }}>✓</span>{t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                {[
                  { Icon: Phone, text: '+593 988 515 225', href: `https://wa.me/${WA_NUMBER}` },
                  { Icon: Mail, text: 'esgavilanes@arisecode.dev', href: 'mailto:esgavilanes@arisecode.dev' },
                  { Icon: Mail, text: 'raamores@arisecode.dev', href: 'mailto:raamores@arisecode.dev' },
                  { Icon: MapPin, text: 'Ambato, Ecuador 🇪🇨', href: '#' },
                  { Icon: Clock, text: 'Lun–Vie 9:00–18:00', href: '#' },
                ].map(({ Icon, text, href }) => (
                  <a key={text} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 font-dm text-sm transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <Icon size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />{text}
                  </a>
                ))}
              </div>

              <div className="flex gap-3">
                {[Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#"
                    className="w-9 h-9 flex items-center justify-center rounded-lg transition-all"
                    style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,92,26,0.3)'; e.currentTarget.style.color = 'var(--accent)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
                    <Icon size={15} />
                  </a>
                ))}
              </div>

              {/* WhatsApp direct link */}
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                onClick={() => typeof window.gtag === 'function' && window.gtag('event', 'whatsapp_direct_click', { event_category: 'lead', value: 1, transport_type: 'beacon' })}
                className="flex items-center gap-3 px-5 py-4 rounded-2xl font-dm font-semibold text-sm text-white transition-all"
                style={{ background: '#25D366', boxShadow: '0 0 20px rgba(37,211,102,0.2)' }}>
                <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escribir directo por WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.15}>
            <div className="rounded-2xl p-6 sm:p-8"
              style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <h3 className="font-syne font-bold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                Cuéntanos qué necesitas
              </h3>
              <p className="font-dm text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                Llenamos el mensaje por ti y lo abrimos en WhatsApp listo para enviar.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
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
                { q: '¿Cuánto cuesta una página web?', a: 'Nuestros planes arrancan desde $7.99/mes sin pago inicial. En la primera consulta gratuita analizamos tu negocio y te decimos qué plan te conviene más — sin compromiso.' },
                { q: '¿Cuánto tiempo tarda?', a: 'El plan Básico puede estar listo en 5–7 días. El Profesional entre 7 y 14 días. El Empresarial entre 14 y 21 días. Depende principalmente de qué tan rápido nos entregas el contenido (textos, fotos, logo).' },
                { q: '¿Puedo ver cómo quedaría antes de pagar?', a: 'Sí. Te mostramos un diseño previo antes de que pagues un solo centavo. Si no te convence, sin cobros y sin presión.' },
                { q: '¿Necesito saber de tecnología?', a: 'Para nada. Solo necesitas contarnos qué hace tu negocio. Nosotros nos encargamos de todo lo técnico — tú solo apruebas el diseño.' },
              ].map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

