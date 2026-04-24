import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { X, ArrowUpRight, ExternalLink, Github, ChevronLeft, ChevronRight, Play, MessageCircle } from 'lucide-react'
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

/* ════════════════════════════════════════════════════════════
   PROJECTS DATA
   ─────────────────────────────────────────────────────────────
   images : array de rutas en /public/projects/<proyecto>/
            Ejemplo: ['/projects/botitas/cap1.jpg', '/projects/botitas/cap2.jpg']

   video  : ruta local o URL de YouTube
            Local    → '/projects/botitas/demo.mp4'
            YouTube  → 'https://www.youtube.com/watch?v=XXXXXXXXXXX'
            Dejar null si no hay video todavía.
════════════════════════════════════════════════════════════ */
const projects = [
  {
    id: 1,
    title: 'Sistema de Gestión de Calzado — Botitas',
    category: 'sistema',
    stack: ['JavaScript', 'Node.js', 'EJS', 'CSS', 'HTML'],
    description: 'Sistema completo para control y gestión de una distribuidora de calzado. Inventario en tiempo real, control de ingresos y salidas, gestión de clientes, ventas, kardex y reportes.',
    challenge: 'La distribuidora manejaba todo en hojas de cálculo. Los errores en inventario y la falta de visibilidad de ventas generaban pérdidas constantes.',
    solution: 'Sistema web con módulos de stock, kardex automático, panel de clientes y reportes exportables. El equipo lo adoptó en el primer día.',
    results: ['Inventario en tiempo real', 'Cero errores manuales', 'Reportes en 1 clic'],
    color: '#1E3A5F',
    accent: '#60A5FA',
    link: null,
    github: null,
    featured: true,
    images: [
      '/projects/botitas/cap1.jpg',
      '/projects/botitas/cap2.jpg',
      '/projects/botitas/cap3.jpg',
      '/projects/botitas/cap4.jpg',
      '/projects/botitas/cap5.jpg',
      '/projects/botitas/cap6.jpg',
      '/projects/botitas/cap7.jpg',
      '/projects/botitas/cap8.jpg',
      '/projects/botitas/cap9.jpg',
      '/projects/botitas/cap10.jpg',
      '/projects/botitas/cap11.jpg',
    ],
    video: '/projects/botitas/demo.mp4',
  },
  {
    id: 2,
    title: 'App de Pedidos de Agua a Domicilio',
    category: 'sistema',
    stack: ['PHP', 'Laravel', 'CSS', 'MySQL'],
    description: 'Plataforma de pedidos donde el cliente solicita agua, el sistema detecta su ubicación y el admin asigna el pedido al chofer más cercano.',
    challenge: 'Los pedidos se coordinaban por llamadas telefónicas. Muchos pedidos se perdían y la asignación de choferes era caótica.',
    solution: 'App con cuentas de usuario, geolocalización del cliente, panel de admin para asignación de choferes y control de inventario de cilindros.',
    results: ['Pedidos sin llamadas', 'Asignación automática', 'Control de stock'],
    color: '#0F2A3F',
    accent: '#38BDF8',
    link: null,
    github: null,
    featured: false,
    images: [
      '/projects/agua/cap1.jpeg',
      '/projects/agua/cap2.jpeg',
      '/projects/agua/cap3.jpeg',
      '/projects/agua/cap4.jpeg',
      '/projects/agua/cap5.jpeg',
      '/projects/agua/cap6.jpeg',
      '/projects/agua/cap7.jpeg',
      '/projects/agua/cap8.jpeg',
      '/projects/agua/cap9.jpeg',
      '/projects/agua/cap10.jpeg',
      '/projects/agua/cap11.jpeg',
    ],
    video: null,
  },
  {
    id: 3,
    title: 'VidMetrics — Análisis de YouTube',
    category: 'web',
    stack: ['Next.js', 'YouTube API', 'Tailwind', 'React'],
    description: 'Plataforma de inteligencia competitiva para YouTube. Interfaz que muestra métricas detalladas de cualquier canal, comparador empresa vs competidor, previews de video, gráficas de barras y análisis profundo.',
    challenge: 'Las empresas no tenían forma de analizar a sus competidores en YouTube de manera visual y accionable.',
    solution: 'Web app con scraping vía YouTube API, dashboard de métricas, comparador lado a lado y visualizaciones interactivas.',
    results: ['Análisis en segundos', 'Comparador competitivo', 'Dashboard visual'],
    color: '#1A0A2E',
    accent: '#A78BFA',
    link: 'https://vidmetrics.netlify.app/',
    github: null,
    featured: true,
    images: [
      '/projects/vidmetrics/cap1.jpg',
      '/projects/vidmetrics/cap2.jpg',
      '/projects/vidmetrics/cap3.jpg',
      '/projects/vidmetrics/cap4.jpg',
      '/projects/vidmetrics/cap5.jpg',
    ],
    video: '/projects/vidmetrics/demo.mp4',
  },
  {
    id: 4,
    title: 'Portfolio Personal 3D',
    category: 'web',
    stack: ['Three.js', 'React', 'Tailwind', 'Google AI Studio'],
    description: 'Currículum digital cinematográfico con efectos 3D en Three.js, iconos flotantes, animaciones fluidas y sección de proyectos interactiva.',
    challenge: 'Un CV tradicional no comunica las capacidades técnicas de un desarrollador moderno.',
    solution: 'Experiencia web inmersiva con escena 3D, partículas interactivas, timeline animado y efectos que demuestran las habilidades técnicas.',
    results: ['100% único', 'Impresión inmediata', 'Showcase técnico'],
    color: '#0A1628',
    accent: '#FF5C1A',
    link: 'https://edisongavilanes.dev',
    github: null,
    featured: false,
    images: [
      '/projects/portfolio3d/cap1.jpg',
      '/projects/portfolio3d/cap2.jpg',
      '/projects/portfolio3d/cap3.jpg',
      '/projects/portfolio3d/cap4.jpg',
    ],
    video: '/projects/portfolio3d/demo.mp4',
  },
  {
    id: 5,
    title: 'arise code — Este sitio web',
    category: 'web',
    stack: ['React', 'Framer Motion', 'Tailwind', 'Vite'],
    description: 'La página que estás viendo. Construida combinando psicología de ventas, diseño cinematográfico y las mejores prácticas técnicas. Videos de fondo, animaciones scroll-driven, diseño mobile-first.',
    challenge: 'Crear una web de agencia que no parezca hecha por IA ni sea genérica — que transmita confianza real al mercado ecuatoriano.',
    solution: 'Diseño warm dark con paleta naranja, tipografía editorial Syne, video showcase con 7 industrias, SEO completo y formulario directo a WhatsApp.',
    results: ['SEO optimizado', 'Mobile-first', 'Conversión real'],
    color: '#1A0F08',
    accent: '#FF5C1A',
    link: 'https://arisecode.dev',
    github: null,
    featured: true,
    images: [],
    video: '/projects/arisecode/demo.mp4',
  },
  {
    id: 6,
    title: 'Plataforma de Evaluación Psicotécnica',
    category: 'sistema',
    stack: ['EJS', 'Node.js', 'PostgreSQL'],
    description: 'Sistema completo de pruebas psicotécnicas y evaluación de talento humano. Banco de preguntas configurable, corrección automática, timer por sección y reportes individuales descargables.',
    challenge: 'El proceso de evaluación era en papel. La corrección manual tardaba días y los resultados no eran comparables entre candidatos.',
    solution: 'Plataforma web con roles admin/candidato, pruebas cronometradas, corrección automática y panel de resultados con comparativas y reportes PDF.',
    results: ['Corrección automática', 'Reportes PDF', 'Proceso 10x más rápido'],
    color: '#0F2A1A',
    accent: '#34D399',
    link: null,
    github: null,
    featured: false,
    images: [],
    video: '/projects/psicotecnica/demo.mp4',
  },
  {
    id: 7,
    title: 'YT Batch Downloader',
    category: 'herramienta',
    stack: ['Python', 'Flask', 'yt-dlp', 'HTML', 'JavaScript'],
    description: 'App web local para descargar múltiples videos de YouTube simultáneamente. Interfaz simple, descarga en paralelo y soporte de formatos.',
    challenge: 'Necesidad de descargar lotes de videos para proyectos de análisis sin herramientas confiables.',
    solution: 'Flask backend con yt-dlp, cola de descargas en paralelo y frontend en HTML/JS vanilla. Simple, rápido, funcional.',
    results: ['Descargas paralelas', 'Multi-formato', 'Open source'],
    color: '#1C1F10',
    accent: '#A3E635',
    link: null,
    github: 'https://github.com/sebasloO016',
    featured: false,
    images: ['/projects/ytdownloader/cap1.jpg'],
    video: null,
  },
  {
    id: 9,
    title: 'Tienda de Vinos — E-commerce MVP',
    category: 'web',
    stack: ['React', 'Tailwind', 'Vite'],
    description: 'E-commerce especializado para la venta de vinos. Catálogo con filtros por varietal, región y precio, fichas de producto detalladas, carrito y checkout. Diseño premium que transmite exclusividad.',
    challenge: 'El cliente necesitaba validar su propuesta de venta online de vinos antes de invertir en infraestructura de pagos y logística.',
    solution: 'MVP visual de alta fidelidad con React y Tailwind. Toda la experiencia de compra simulada — el cliente puede presentarlo a socios o inversores con confianza.',
    results: ['Catálogo completo', 'UX premium', 'Listo para producción'],
    color: '#2D0A1A',
    accent: '#C084FC',
    link: null,
    github: null,
    featured: true,
    images: [
      '/projects/vino/cap1.png',
      '/projects/vino/cap2.png',
      '/projects/vino/cap3.png',
      '/projects/vino/cap4.png',
      '/projects/vino/cap5.png',
      '/projects/vino/cap6.png',
      '/projects/vino/cap7.png',
      '/projects/vino/cap8.png',
      '/projects/vino/cap9.png',
      '/projects/vino/cap10.png',
      '/projects/vino/cap11.png',
      '/projects/vino/cap12.png',
      '/projects/vino/cap13.png',
    ],
    video: '/projects/vino/demo.mp4',
  },
  {
    id: 10,
    title: 'FitTrack — App de Gestión Deportiva',
    category: 'web',
    stack: ['React', 'Tailwind', 'Vite'],
    description: 'Plataforma web para la gestión de actividades deportivas. Diseño adaptable a gimnasios, torneos de tenis o planes de entrenamiento personalizados. Seguimiento de rutinas, progreso y estadísticas.',
    challenge: 'Los entrenadores y organizadores deportivos necesitan una herramienta centralizada que reemplace las planillas y el chat de WhatsApp para coordinar clientes y sesiones.',
    solution: 'MVP funcional con interfaz de dashboard, gestión de miembros/participantes, calendario de sesiones y visualización de métricas de progreso.',
    results: ['Multi-deporte', 'Dashboard completo', 'Adaptable a cualquier disciplina'],
    color: '#061A0F',
    accent: '#34D399',
    link: null,
    github: null,
    featured: false,
    images: [
      '/projects/gym/cap1.png',
      '/projects/gym/cap2.png',
      '/projects/gym/cap3.png',
      '/projects/gym/cap4.png',
      '/projects/gym/cap5.png',
      '/projects/gym/cap6.png',
      '/projects/gym/cap7.png',
    ],
    video: '/projects/gym/demo.mp4',
  },
  {
    id: 11,
    title: 'StreamLearn — Plataforma de Recursos Internos',
    category: 'web',
    stack: ['React', 'Tailwind', 'Vite'],
    description: 'Plataforma de streaming interna para organizaciones. Los empleados acceden a cursos, capacitaciones y recursos corporativos en un entorno privado. Ideal para onboarding, formación continua y gestión del conocimiento.',
    challenge: 'Las empresas comparten capacitaciones por email o carpetas de Drive sin ningún control de acceso ni seguimiento del progreso.',
    solution: 'MVP con interfaz estilo streaming, catálogo de cursos/recursos por categoría, reproductor integrado y acceso por credenciales corporativas. Perfecto para equipos que quieren centralizar su conocimiento.',
    results: ['Acceso corporativo', 'Catálogo organizado', 'Experiencia tipo streaming'],
    color: '#0A0A1A',
    accent: '#60A5FA',
    link: null,
    github: null,
    featured: false,
    images: [
      '/projects/stream/cap1.png',
      '/projects/stream/cap2.png',
      '/projects/stream/cap3.png',
      '/projects/stream/cap4.png',
      '/projects/stream/cap5.png',
      '/projects/stream/cap6.png',
      '/projects/stream/cap7.png',
      '/projects/stream/cap8.png',
    ],
    video: '/projects/stream/demo.mp4',
  },
  {
    id: 12,
    title: 'Diablada Pillareña — Web Cultural',
    category: 'web',
    stack: ['React', 'Tailwind', 'Vite', 'Framer Motion'],
    description: 'Sitio web oficial para la Diablada Pillareña, festividad icónica del cantón Pillaro, Tungurahua — Ecuador. Experiencia visual inmersiva que muestra la historia, los personajes, el calendario de eventos y la cultura detrás de esta celebración única.',
    challenge: 'Una de las festividades más importantes del Ecuador central no tenía presencia digital a la altura de su riqueza cultural e histórica.',
    solution: 'Web cultural con diseño cinematográfico, animaciones scroll-driven, galería de personajes, historia de la festividad y sección de eventos. Construida para transmitir la energía y tradición de la Diablada.',
    results: ['Identidad digital única', 'Patrimonio en línea', 'Diseño inmersivo'],
    color: '#1A0505',
    accent: '#EF4444',
    link: 'https://diablada.netlify.app/',
    github: null,
    featured: true,
    images: [
      '/projects/diablada/cap1.jpg',
      '/projects/diablada/cap2.jpg',
      '/projects/diablada/cap3.jpg',
      '/projects/diablada/cap4.jpg',
      '/projects/diablada/cap5.jpg',
      '/projects/diablada/cap6.jpg',
      '/projects/diablada/cap7.jpg',
      '/projects/diablada/cap8.jpg',
    ],
    video: '/projects/diablada/demo.mp4',
  },
  {
    id: 13,
    title: 'Restaurante & Reservas — Web Gastronómica',
    category: 'web',
    stack: ['React', 'Tailwind', 'Vite'],
    description: 'MVP de sitio web para restaurantes con menú digital por categorías, sistema de reservas en línea con fecha y hora, galería de platos y sección de reseñas. Diseño cálido que transmite la experiencia del local.',
    challenge: 'Los restaurantes dependen de llamadas o redes sociales para recibir reservas. Sin sistema propio, pierden mesas y clientes cuando el algoritmo falla.',
    solution: 'Web con menú visual interactivo, formulario de reservas, galería de ambiente y platos, y sección de testimonios. Lista para adaptar con la carta y datos reales del local.',
    results: ['Menú digital', 'Reservas en línea', 'Diseño apetitoso'],
    color: '#1A0E00',
    accent: '#F59E0B',
    link: null,
    github: null,
    featured: false,
    images: [
      '/projects/Menu/cap1.png',
      '/projects/Menu/cap2.png',
      '/projects/Menu/cap3.png',
      '/projects/Menu/cap4.png',
      '/projects/Menu/cap5.png',
      '/projects/Menu/cap6.png',
    ],
    video: '/projects/Menu/demo.mp4',
  },
  {
    id: 14,
    title: 'Consultorio Dental — Web Profesional',
    category: 'web',
    stack: ['React', 'Tailwind', 'Vite'],
    description: 'Sitio web informativo para consultorio dental con presentación de servicios, galería del consultorio, sección de preguntas frecuentes y sistema de agendamiento de citas en línea.',
    challenge: 'La mayoría de consultorios dentales no tienen presencia digital. Los pacientes buscan en Google y no los encuentran — o encuentran a la competencia.',
    solution: 'Web profesional con servicios detallados, galería de instalaciones, testimonios de pacientes y formulario de cita previa. Genera confianza antes de la primera visita.',
    results: ['Agenda en línea', 'Servicios claros', 'Genera confianza'],
    color: '#001A1A',
    accent: '#2DD4BF',
    link: null,
    github: null,
    featured: false,
    images: [
      '/projects/dentista/cap1.png',
      '/projects/dentista/cap2.png',
      '/projects/dentista/cap3.png',
      '/projects/dentista/cap4.png',
      '/projects/dentista/cap5.png',
      '/projects/dentista/cap6.png',
      '/projects/dentista/cap7.png',
    ],
    video: '/projects/dentista/demo.mp4',
  },
  {
    id: 15,
    title: 'Tienda de Ropa — E-commerce MVP',
    category: 'web',
    stack: ['React', 'Tailwind', 'Vite'],
    description: 'E-commerce completo para tienda de ropa con catálogo por categorías, filtros por talla y color, fichas de producto detalladas, carrito de compras y proceso de checkout. Diseño moderno enfocado en conversión.',
    challenge: 'Las tiendas de ropa dependen de Instagram y WhatsApp para vender — sin tienda propia pierden ventas cada vez que el algoritmo cambia o la cuenta tiene problemas.',
    solution: 'E-commerce visual con catálogo, página de producto, selector de talla y color, carrito y checkout completo. MVP listo para conectar con una pasarela de pagos real.',
    results: ['Catálogo completo', 'Carrito y checkout', 'Independiente de redes'],
    color: '#1A001A',
    accent: '#E879F9',
    link: null,
    github: null,
    featured: false,
    images: [
      '/projects/Tienda/cap1.png',
      '/projects/Tienda/cap2.png',
      '/projects/Tienda/cap3.png',
      '/projects/Tienda/cap4.png',
      '/projects/Tienda/cap5.png',
      '/projects/Tienda/cap6.png',
      '/projects/Tienda/cap7.png',
      '/projects/Tienda/cap8.png',
      '/projects/Tienda/cap9.png',
      '/projects/Tienda/cap10.png',
      '/projects/Tienda/cap11.png',
      '/projects/Tienda/cap12.png',
    ],
    video: '/projects/Tienda/demo.mp4',
  },
  {
    id: 8,
    title: 'SaaS para Ingenieros Civiles',
    category: 'en-desarrollo',
    stack: ['React', 'Tailwind', 'Vite', 'Node.js'],
    description: 'Plataforma SaaS para control financiero y medición de avance de obra en tiempo real. Pensado para ingenieros civiles que necesitan claridad total sobre el estado de sus proyectos.',
    challenge: 'Los ingenieros civiles gestionan proyectos de millones con Excel. Los errores de medición de obra cuestan caro.',
    solution: 'En desarrollo activo. Dashboard de avance vs presupuesto, control de partidas, alertas de desviación y reportes para clientes.',
    results: ['En desarrollo activo', 'Beta disponible pronto'],
    color: '#1C2010',
    accent: '#F59E0B',
    link: null,
    github: null,
    featured: false,
    images: [
      '/projects/saas-civil/cap1.jpg',
      '/projects/saas-civil/cap2.jpg',
      '/projects/saas-civil/cap3.jpg',
    ],
    video: '/projects/saas-civil/demo.mp4',
  },
]

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'web', label: 'Web' },
  { id: 'sistema', label: 'Sistemas' },
  { id: 'herramienta', label: 'Herramientas' },
  { id: 'en-desarrollo', label: 'En desarrollo 🔨' },
]

function getYouTubeId(url) {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

/* ── Full-screen lightbox ── */
function Lightbox({ images, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx)
  const [dir, setDir] = useState(1)

  const go = (next) => { setDir(next > idx ? 1 : -1); setIdx(next) }
  const prev = () => go(idx === 0 ? images.length - 1 : idx - 1)
  const next = () => go(idx === images.length - 1 ? 0 : idx + 1)

  // Close on Escape
  const handleKey = (e) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next() }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={-1}
      ref={el => el?.focus()}>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.img
          key={idx}
          src={images[idx]}
          alt={`Captura ${idx + 1}`}
          custom={dir}
          variants={{
            enter: d => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.97 }),
            center: { x: 0, opacity: 1, scale: 1 },
            exit: d => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.97 }),
          }}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[92vw] max-h-[88vh] object-contain rounded-xl shadow-2xl"
          onClick={e => e.stopPropagation()}
        />
      </AnimatePresence>

      {/* Close */}
      <button onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
        style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
        <X size={16} />
      </button>

      {images.length > 1 && (
        <>
          <button onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-dm text-sm"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            {idx + 1} / {images.length}
          </div>
        </>
      )}
    </motion.div>
  )
}

/* ── Image + video carousel for modal ── */
function MediaCarousel({ images, video, color, accent }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [lightbox, setLightbox] = useState(null) // index or null

  const hasVideo = Boolean(video)
  const mediaCount = images.length + (hasVideo ? 1 : 0)
  const isVideoSlide = hasVideo && idx === mediaCount - 1

  const go = (next) => {
    setDir(next > idx ? 1 : -1)
    setIdx(next)
    setVideoPlaying(false)
  }
  const prev = () => go(idx === 0 ? mediaCount - 1 : idx - 1)
  const next = () => go(idx === mediaCount - 1 ? 0 : idx + 1)

  if (images.length === 0 && !hasVideo) {
    return (
      <div className="h-52 relative overflow-hidden rounded-t-2xl flex items-end p-5"
        style={{ background: color }}>
        <div className="flex gap-3">
          {[65, 45, 80, 55].map((h, i) => (
            <div key={i} className="w-10 rounded-lg flex items-end p-1.5" style={{ height: 60, background: 'rgba(255,255,255,0.06)' }}>
              <div className="w-full rounded-sm" style={{ height: `${h}%`, background: accent, opacity: 0.5 }} />
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 right-5">
          <span className="font-dm text-xs opacity-40" style={{ color: 'white' }}>Sin capturas aún</span>
        </div>
      </div>
    )
  }

  const youtubeId = hasVideo && video.includes('youtube') ? getYouTubeId(video) : null
  const isLocalVideo = hasVideo && !video.includes('youtube') && !video.includes('youtu.be')

  return (
    <div className="relative overflow-hidden rounded-t-2xl" style={{ height: 280, background: '#000' }}>
      <AnimatePresence mode="wait" custom={dir}>
        {isVideoSlide ? (
          <motion.div key="video-slide" custom={dir}
            variants={{ enter: d => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }), center: { x: 0, opacity: 1 }, exit: d => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }) }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: '#0a0a0a' }}>
            {youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : isLocalVideo ? (
              <video
                src={video}
                controls
                autoPlay
                className="w-full h-full object-contain"
                style={{ maxHeight: 280 }}
              />
            ) : null}
            {!videoPlaying && !youtubeId && (
              <button onClick={() => setVideoPlaying(true)}
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.5)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: accent }}>
                  <Play size={24} fill="white" color="white" />
                </div>
              </button>
            )}
          </motion.div>
        ) : (
          <motion.img
            key={idx}
            src={images[idx]}
            alt={`Captura ${idx + 1}`}
            custom={dir}
            variants={{
              enter: d => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: d => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
            onClick={() => setLightbox(idx)}
          />
        )}
      </AnimatePresence>

      {mediaCount > 1 && (
        <>
          <button onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full transition-all z-10"
            style={{ background: 'rgba(0,0,0,0.55)', color: 'white', backdropFilter: 'blur(4px)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.85)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.55)'}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full transition-all z-10"
            style={{ background: 'rgba(0,0,0,0.55)', color: 'white', backdropFilter: 'blur(4px)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.85)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.55)'}>
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {Array.from({ length: mediaCount }).map((_, i) => (
              <button key={i} onClick={() => go(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === idx ? 20 : 6, height: 6,
                  background: i === idx ? accent : 'rgba(255,255,255,0.4)',
                }} />
            ))}
          </div>

          <div className="absolute top-3 right-3 text-xs font-dm px-2 py-1 rounded-lg z-10"
            style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}>
            {isVideoSlide ? '▶ Video' : `${idx + 1} / ${images.length}`}
          </div>
        </>
      )}

      {hasVideo && !isVideoSlide && (
        <button onClick={() => go(mediaCount - 1)}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-dm font-semibold z-10 transition-all"
          style={{ background: `${accent}cc`, color: 'white', backdropFilter: 'blur(4px)' }}>
          <Play size={11} fill="white" /> Ver demo
        </button>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox images={images} startIdx={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Project detail modal ── */
function DetailModal({ p, onClose }) {
  const { setOpen } = useModal()

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ background: 'rgba(10,8,6,0.92)', backdropFilter: 'blur(6px)' }}>
      <motion.div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-2xl"
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}>

        {/* Media */}
        <div className="relative">
          <MediaCarousel images={p.images} video={p.video} color={p.color} accent={p.accent} />
          {p.category === 'en-desarrollo' && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-dm font-bold z-10"
              style={{ background: 'rgba(245,158,11,0.2)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)' }}>
              🔨 En desarrollo
            </div>
          )}
          {p.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-dm font-bold z-10"
              style={{ background: `${p.accent}25`, color: p.accent, border: `1px solid ${p.accent}35` }}>
              ✦ Destacado
            </div>
          )}
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full z-10 transition-colors"
            style={{ background: 'rgba(0,0,0,0.55)', color: 'white', backdropFilter: 'blur(4px)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.85)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.55)'}>
            <X size={14} />
          </button>
        </div>

        <div className="p-6 sm:p-7">
          {/* Stack badges */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {p.stack.map(s => (
              <span key={s} className="text-xs font-dm px-2 py-0.5 rounded-md"
                style={{ background: `${p.accent}15`, color: p.accent, border: `1px solid ${p.accent}25` }}>{s}</span>
            ))}
          </div>

          <h2 className="font-syne font-bold text-xl mb-2" style={{ color: 'var(--text-primary)' }}>{p.title}</h2>
          <p className="font-dm text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>{p.description}</p>

          {/* Results chips */}
          {p.results && p.results.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {p.results.map(r => (
                <span key={r} className="flex items-center gap-1.5 text-xs font-dm px-3 py-1.5 rounded-full font-medium"
                  style={{ background: `${p.accent}12`, color: p.accent, border: `1px solid ${p.accent}20` }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.accent }} />
                  {r}
                </span>
              ))}
            </div>
          )}

          {/* Problem / Solution */}
          <div className="space-y-3 mb-5">
            <div className="rounded-xl p-4" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.1)' }}>
              <h4 className="font-syne font-semibold text-sm mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />El problema
              </h4>
              <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.challenge}</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: `${p.accent}08`, border: `1px solid ${p.accent}18` }}>
              <h4 className="font-syne font-semibold text-sm mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.accent }} />La solución
              </h4>
              <p className="font-dm text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.solution}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-1">
            <motion.button
              onClick={() => { onClose(); setOpen(true) }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-dm font-semibold text-sm text-white flex-1 justify-center sm:flex-none"
              style={{ background: 'var(--accent)', boxShadow: '0 0 20px rgba(255,92,26,0.35)', cursor: 'pointer' }}>
              <MessageCircle size={14} /> Quiero algo así
            </motion.button>
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl font-dm font-semibold text-sm transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text-secondary)' }}>
                <ExternalLink size={13} /> Ver sitio
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl font-dm font-semibold text-sm transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text-secondary)' }}>
                <Github size={13} /> GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Video thumbnail — carga lazy cuando entra al viewport ── */
function VideoThumb({ src, className, style }) {
  const ref = useRef(null)
  const [activeSrc, setActiveSrc] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActiveSrc(src); observer.disconnect() } },
      { rootMargin: '120px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [src])

  useEffect(() => {
    const el = ref.current
    if (!el || !activeSrc) return
    const onMeta = () => { el.currentTime = 0.1 }
    el.addEventListener('loadedmetadata', onMeta)
    return () => el.removeEventListener('loadedmetadata', onMeta)
  }, [activeSrc])

  return <video ref={ref} src={activeSrc || undefined} preload={activeSrc ? 'metadata' : 'none'} muted playsInline className={className} style={style} />
}

/* ── Project card ── */
function ProjectCard({ p, onClick }) {
  const hasImage = p.images && p.images.length > 0

  return (
    <motion.div layout
      initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="rounded-2xl overflow-hidden cursor-pointer group"
      style={{ background: 'var(--bg-elevated)', border: p.featured ? `1px solid ${p.accent}30` : '1px solid rgba(255,255,255,0.07)' }}
      onClick={() => onClick(p)}>

      {/* Thumbnail — real image if available, else mock visual */}
      <div className="h-40 relative overflow-hidden" style={{ background: p.color }}>
        {p.video && !p.video.includes('youtube') ? (
          <VideoThumb
            src={p.video}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : hasImage ? (
          <img
            src={p.images[0]}
            alt={p.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 p-3 flex flex-col justify-end">
            <div className="flex gap-2 mb-1.5">
              <div className="h-3 w-14 rounded" style={{ background: p.accent, opacity: 0.6 }} />
              <div className="h-3 w-8 rounded bg-white/10" />
            </div>
            <div className="flex gap-1.5">
              {[50, 75, 40, 65, 85].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 0.38}px`, background: p.accent, opacity: i === 4 ? 0.8 : 0.2 }} />
              ))}
            </div>
          </div>
        )}

        {/* Badges */}
        {p.featured && (
          <div className="absolute top-3 left-3 text-xs font-dm font-bold px-2 py-0.5 rounded-full z-10"
            style={{ background: `${p.accent}25`, color: p.accent, border: `1px solid ${p.accent}35`, backdropFilter: 'blur(4px)' }}>
            ✦ Destacado
          </div>
        )}
        {p.category === 'en-desarrollo' && (
          <div className="absolute top-3 right-3 text-xs font-dm font-bold px-2 py-0.5 rounded-full z-10"
            style={{ background: 'rgba(245,158,11,0.2)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)', backdropFilter: 'blur(4px)' }}>
            🔨
          </div>
        )}
        {p.video && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-dm font-semibold px-2 py-1 rounded-lg z-10"
            style={{ background: 'rgba(0,0,0,0.65)', color: 'white', backdropFilter: 'blur(4px)' }}>
            <Play size={10} fill="white" /> Demo
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20"
          style={{ background: 'rgba(10,8,6,0.65)' }}>
          <span className="font-dm text-sm font-medium text-white flex items-center gap-1.5 rounded-lg px-3 py-1.5"
            style={{ border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>
            Ver detalle <ArrowUpRight size={12} />
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-dm px-2 py-0.5 rounded-md capitalize"
            style={{ background: 'rgba(255,92,26,0.1)', color: 'var(--accent)' }}>
            {p.category === 'en-desarrollo' ? 'En desarrollo' : p.category}
          </span>
          {p.images.length > 0 && (
            <span className="text-xs font-dm" style={{ color: 'var(--text-muted)' }}>
              {p.images.length} cap.{p.images.length > 1 ? '' : ''}
            </span>
          )}
        </div>
        <h3 className="font-syne font-semibold text-sm mb-2 leading-tight" style={{ color: 'var(--text-primary)' }}>
          {p.title}
        </h3>
        <div className="flex flex-wrap gap-1">
          {p.stack.slice(0, 3).map(s => (
            <span key={s} className="text-xs font-dm px-1.5 py-0.5 rounded"
              style={{ color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.07)' }}>{s}</span>
          ))}
          {p.stack.length > 3 && (
            <span className="text-xs font-dm px-1.5 py-0.5 rounded" style={{ color: 'var(--text-muted)' }}>
              +{p.stack.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState('all')
  const [detail, setDetail] = useState(null)
  const { setOpen } = useModal()

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <>
      <Helmet>
        <title>Proyectos | Arise Code — Trabajo real en Ecuador</title>
        <meta name="description" content="Sistemas web, plataformas y páginas desarrolladas por Arise Code. Trabajo real para negocios reales en Ecuador." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-5 sm:px-8 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
        <div className="absolute pointer-events-none" style={{ top: 0, right: 0, width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(255,92,26,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-dm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Portafolio</p>
            <h1 className="font-syne font-bold mb-5 leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: 'var(--text-primary)' }}>
              Trabajo real.<br />
              <span style={{ color: 'var(--accent)' }}>Resultados medibles.</span>
            </h1>
            <p className="font-dm text-lg" style={{ color: 'var(--text-secondary)' }}>
              Cada proyecto resolvió un problema real de un negocio real.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-5 sm:px-8" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-6xl mx-auto">

          {/* Filters */}
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {filters.map(f => (
                <motion.button key={f.id} onClick={() => setActive(f.id)} whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-xl text-sm font-dm font-medium transition-all min-h-[44px]"
                  style={active === f.id
                    ? { background: 'var(--accent)', color: 'white', boxShadow: '0 0 16px rgba(255,92,26,0.3)' }
                    : { border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}>
                  {f.label}
                </motion.button>
              ))}
            </div>
          </Reveal>

          {/* Cards */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filtered.map(p => <ProjectCard key={p.id} p={p} onClick={setDetail} />)}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <Reveal className="text-center mt-14">
            <p className="font-dm mb-2" style={{ color: 'var(--text-secondary)' }}>
              ¿Quieres tu web o sistema personalizado?
            </p>
            <p className="font-dm text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
              Cuéntanos tu idea y te decimos cómo lo construimos.
            </p>
            <motion.button onClick={() => setOpen(true)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-dm font-semibold text-sm text-white"
              style={{ background: 'var(--accent)', boxShadow: '0 0 24px rgba(255,92,26,0.35)', cursor: 'pointer' }}>
              Hablemos de tu proyecto <ArrowUpRight size={15} />
            </motion.button>
          </Reveal>
        </div>
      </section>

      {/* Detail modal */}
      <AnimatePresence>
        {detail && <DetailModal p={detail} onClose={() => setDetail(null)} />}
      </AnimatePresence>
    </>
  )
}
