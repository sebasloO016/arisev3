import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart2, Eye, Users, TrendingUp, RefreshCw, ExternalLink, Shield } from 'lucide-react'

const PAGE_LABELS = {
  '/': 'Home',
  '/planes': 'Planes',
  '/portafolio': 'Portafolio',
  '/nosotros': 'Nosotros',
  '/contacto': 'Contacto',
}

function StatCard({ icon: Icon, label, value, sub, color = '#FF5C1A' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-5"
      style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, color }}>
          <Icon size={16} />
        </div>
        <span className="font-dm text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--text-muted)' }}>{label}</span>
      </div>
      <div className="font-syne font-bold text-3xl mb-0.5" style={{ color: 'var(--text-primary)' }}>{value}</div>
      {sub && <div className="font-dm text-xs" style={{ color: 'var(--text-muted)' }}>{sub}</div>}
    </motion.div>
  )
}

export default function MetricasPanel() {
  const [stats, setStats] = useState(null)
  const [gaId, setGaId] = useState('')

  const loadStats = () => {
    const raw = localStorage.getItem('arise_visits')
    if (!raw) { setStats({}); return }
    setStats(JSON.parse(raw))
  }

  useEffect(() => {
    loadStats()
    const id = localStorage.getItem('arise_ga_id') || ''
    setGaId(id)
  }, [])

  const saveGaId = (id) => {
    localStorage.setItem('arise_ga_id', id)
    setGaId(id)
  }

  const clearStats = () => {
    if (window.confirm('¿Borrar todas las estadísticas locales?')) {
      localStorage.removeItem('arise_visits')
      setStats({})
    }
  }

  if (!stats) return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <div className="w-7 h-7 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
    </div>
  )

  const totalViews = Object.entries(stats)
    .filter(([k]) => k.endsWith('_total'))
    .reduce((sum, [, v]) => sum + v, 0)

  const sessions = stats['_sessions'] || 0

  const pageStats = Object.keys(PAGE_LABELS).map(path => ({
    path,
    label: PAGE_LABELS[path],
    total: stats[`${path}_total`] || 0,
  })).sort((a, b) => b.total - a.total)

  const maxViews = Math.max(...pageStats.map(p => p.total), 1)

  const todayKey = new Date().toISOString().split('T')[0]
  const todayTotal = Object.entries(stats)
    .filter(([k]) => k.includes(`_${todayKey}`))
    .reduce((sum, [, v]) => sum + v, 0)

  return (
    <div className="min-h-screen pt-24 pb-20 px-5 sm:px-8" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={14} style={{ color: 'var(--accent)' }} />
              <span className="text-xs font-dm font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Panel privado</span>
            </div>
            <h1 className="font-syne font-bold text-3xl" style={{ color: 'var(--text-primary)' }}>Métricas — Arise Code</h1>
            <p className="font-dm text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Solo visible para ustedes · Ruta: /arise-panel</p>
          </div>
          <button onClick={loadStats}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-dm text-sm transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            <RefreshCw size={13} /> Actualizar
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Eye} label="Vistas totales" value={totalViews} sub="Este navegador" color="#FF5C1A" />
          <StatCard icon={Users} label="Sesiones" value={sessions} sub="Cargas de página" color="#60A5FA" />
          <StatCard icon={TrendingUp} label="Vistas hoy" value={todayTotal} sub={todayKey} color="#34D399" />
          <StatCard icon={BarChart2} label="Páginas" value={pageStats.filter(p => p.total > 0).length} sub="Con visitas" color="#A78BFA" />
        </div>

        {/* Page breakdown */}
        <div className="rounded-2xl p-6 mb-8"
          style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="font-syne font-semibold text-lg mb-5" style={{ color: 'var(--text-primary)' }}>Vistas por página</h2>
          <div className="space-y-4">
            {pageStats.map(({ path, label, total }) => (
              <div key={path}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-dm text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</span>
                  <span className="font-dm text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{total}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(total / maxViews) * 100}%` }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ background: 'var(--accent)' }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="font-dm text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
            Estas métricas son locales (solo este navegador). Para datos reales de todos los visitantes, usa Google Analytics abajo.
          </p>
        </div>

        {/* Google Analytics section */}
        <div className="rounded-2xl p-6 mb-6"
          style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="font-syne font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Google Analytics 4</h2>
          <p className="font-dm text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
            Para saber quién visita (país, ciudad, dispositivo, tiempo en página), necesitas conectar Google Analytics.
            Es gratis y tarda 5 minutos.
          </p>

          <div className="rounded-xl p-4 mb-5 space-y-2"
            style={{ background: 'rgba(255,92,26,0.05)', border: '1px solid rgba(255,92,26,0.12)' }}>
            <p className="font-syne font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Pasos para activar Google Analytics:</p>
            {[
              '1. Entra a analytics.google.com → Crear cuenta → Crear propiedad',
              '2. En "Flujo de datos" → Web → Ingresa https://arisecode.dev',
              '3. Copia el ID de medición (formato G-XXXXXXXXXX)',
              '4. Pégalo en index.html donde dice YOUR_GA_MEASUREMENT_ID',
              '5. Haz deploy — listo, ya rastrea visitantes reales',
            ].map(s => (
              <p key={s} className="font-dm text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s}</p>
            ))}
          </div>

          <div className="flex gap-3">
            <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-dm text-sm font-semibold transition-all text-white"
              style={{ background: 'var(--accent)', boxShadow: '0 0 16px rgba(255,92,26,0.3)' }}>
              <ExternalLink size={13} /> Abrir Google Analytics
            </a>
            {gaId && (
              <a href={`https://analytics.google.com/analytics/web/#/p${gaId.replace('G-', '')}/reports/reportinghub`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-dm text-sm font-semibold transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text-secondary)' }}>
                Ver dashboard →
              </a>
            )}
          </div>
        </div>

        {/* Danger zone */}
        <div className="flex justify-end">
          <button onClick={clearStats}
            className="font-dm text-xs transition-colors px-3 py-1.5 rounded-lg"
            style={{ color: 'rgba(239,68,68,0.5)', border: '1px solid rgba(239,68,68,0.15)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgb(239,68,68)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(239,68,68,0.5)'}>
            Borrar estadísticas locales
          </button>
        </div>
      </div>
    </div>
  )
}
