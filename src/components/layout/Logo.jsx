export default function Logo({ size = 'default' }) {
  const h = { small: 28, default: 34, large: 42 }[size] || 34
  const s = h / 34

  return (
    <svg width={Math.round(130 * s)} height={h} viewBox="0 0 130 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Arise Code">
      {/* Open-arc isotipo */}
      <circle cx="17" cy="17" r="15.5" fill="#1A1612" />
      <path d="M 27 8.5 A 13 13 0 1 0 27 25.5" stroke="#FF5C1A" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* rs inside */}
      <text x="16.5" y="21.5" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="11" fill="#F5F0E8" textAnchor="middle" letterSpacing="-0.5">rs</text>
      {/* arise */}
      <text x="40" y="22" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="15.5" fill="#F5F0E8" letterSpacing="-0.3">arise</text>
      {/* Code */}
      <text x="83" y="22" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="15.5" fill="#FF5C1A" letterSpacing="-0.3">Code</text>
      {/* underline under Code only */}
      <rect x="83" y="26" width="44" height="2.5" rx="1.25" fill="#FF5C1A"/>
    </svg>
  )
}
