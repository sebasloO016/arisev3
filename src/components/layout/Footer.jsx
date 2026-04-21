import { NavLink } from 'react-router-dom'
import { Mail, Phone, Instagram, Linkedin } from 'lucide-react'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-base)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm font-dm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Páginas web profesionales para negocios ecuatorianos. Sin pago inicial, sin complicaciones.
            </p>
            <p className="mt-3 text-sm font-dm" style={{ color: 'var(--text-muted)' }}>
              Hecho con ☕ en Ambato, Ecuador 🇪🇨
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 flex items-center justify-center rounded-lg transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-dm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Navegación</h4>
            <ul className="space-y-2.5">
              {[['/', 'Inicio'], ['/planes', 'Planes y precios'], ['/portafolio', 'Proyectos'], ['/nosotros', 'Nosotros'], ['/contacto', 'Contacto']].map(([to, label]) => (
                <li key={to}>
                  <NavLink to={to} className="text-sm font-dm transition-colors" style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >{label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-dm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Contacto</h4>
            <ul className="space-y-3">
              {[
                { Icon: Mail,  text: 'esgavilanes@arisecode.dev', href: 'mailto:esgavilanes@arisecode.dev' },
                { Icon: Mail,  text: 'raamores@arisecode.dev',    href: 'mailto:raamores@arisecode.dev' },
                { Icon: Phone, text: '+593 988 515 225',           href: 'https://wa.me/593988515225' },
              ].map(({ Icon, text, href }) => (
                <li key={text}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-dm transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <Icon size={14} style={{ color: 'var(--accent)' }} />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-xs font-dm" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Arise Code. Todos los derechos reservados.
          </p>
          <p className="text-xs font-dm" style={{ color: 'var(--text-muted)' }}>
            Ambato, Tungurahua, Ecuador
          </p>
        </div>
      </div>
    </footer>
  )
}
