import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, CheckCircle } from 'lucide-react'
import { useModal } from '../../App.jsx'

const WA_NUMBER = '593988515225'

const schema = z.object({
  name: z.string().min(2, 'Ingresa tu nombre'),
  whatsapp: z.string().min(7, 'Ingresa tu WhatsApp'),
  business: z.string().min(2, 'Cuéntanos qué hace tu negocio'),
  plan: z.string().min(1, 'Selecciona un plan'),
  message: z.string().optional(),
})

export default function ContactModal() {
  const { open, setOpen } = useModal()
  const [sent, setSent] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema)
  })

  // Lock scroll + reset on close
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) setTimeout(() => { reset(); setSent(false) }, 300)
    return () => { document.body.style.overflow = '' }
  }, [open, reset])

  // Close on Escape
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [setOpen])

  const onSubmit = (data) => {
    const msg = [
      '🚀 *Nuevo lead - Arise Code*',
      '',
      `👤 *Nombre:* ${data.name}`,
      `📱 *WhatsApp:* ${data.whatsapp}`,
      `🏢 *Negocio:* ${data.business}`,
      `📋 *Plan interesado:* ${data.plan}`,
      data.message ? `💬 *Mensaje:* ${data.message}` : '',
    ].filter(Boolean).join('\n')

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
    setSent(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
          style={{ background: 'rgba(10,8,6,0.88)', backdropFilter: 'blur(5px)' }}>

          <motion.div
            className="w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar rounded-2xl p-6 sm:p-7"
            style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.1)' }}
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="font-syne font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
                  Hablemos por WhatsApp
                </h2>
                <p className="text-sm font-dm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Primera consulta gratis · Te respondemos hoy
                </p>
              </div>
              <button onClick={() => setOpen(false)}
                className="p-2 rounded-lg transition-colors flex-shrink-0"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                <X size={18} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {sent ? (
                /* Success state */
                <motion.div key="ok"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-10 gap-4">
                  <CheckCircle size={52} style={{ color: '#22C55E' }} />
                  <h3 className="font-syne font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
                    ¡Listo! Abrimos WhatsApp
                  </h3>
                  <p className="font-dm text-sm max-w-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Tu mensaje ya está redactado. Solo presiona enviar en WhatsApp y te respondemos en menos de 24 horas.
                  </p>
                  <button onClick={() => setOpen(false)}
                    className="mt-2 px-6 py-2.5 rounded-xl text-sm font-dm font-semibold transition-all"
                    style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
                    Cerrar
                  </button>
                </motion.div>
              ) : (
                /* Form */
                <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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
                    <input {...register('business')} placeholder="Soy dentista / Tengo una peluquería..."
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
                      <option value="No sé aún, quiero orientación">No sé aún, quiero orientación</option>
                    </select>
                    {errors.plan && <p className="mt-1 text-xs text-red-400 font-dm">{errors.plan.message}</p>}
                  </div>

                  {/* Optional message */}
                  <div>
                    <label className="block text-xs font-dm font-semibold uppercase tracking-widest mb-1.5"
                      style={{ color: 'var(--text-muted)' }}>
                      Algo más{' '}
                      <span className="normal-case tracking-normal font-dm font-normal opacity-60">(opcional)</span>
                    </label>
                    <textarea {...register('message')} rows={2}
                      placeholder="Cualquier detalle adicional..."
                      className="form-input resize-none" />
                  </div>

                  {/* Submit */}
                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-dm font-semibold text-base text-white mt-1 transition-all"
                    style={{ background: '#25D366', boxShadow: '0 0 24px rgba(37,211,102,0.3)' }}>
                    <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Enviar por WhatsApp
                  </button>
                  <p className="text-center text-xs font-dm" style={{ color: 'var(--text-muted)' }}>
                    Se abre WhatsApp con el mensaje listo · Sin compromiso
                  </p>

                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}