import Link from 'next/link'

export default function HomePage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: '#0a0a0a',
      color: '#f0ede8',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '520px' }}>
        <img
          src="/assets/venezuela723975-logo.png"
          alt="Venezuela 723975 Memorial"
          style={{ width: '100%', maxWidth: '400px', borderRadius: '50%' }}
        />
        <p style={{
          marginTop: '2rem',
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          color: '#8a8a8a',
          fontSize: '1.2rem',
          lineHeight: '1.6',
        }}>
          <strong style={{ color: '#C9A227', fontStyle: 'normal' }}>
            No olvidamos. Honramos. Seguimos unidos.
          </strong>
        </p>
        <div style={{
          width: '60px',
          height: '1px',
          background: '#C9A227',
          margin: '1.5rem auto',
          opacity: 0.6,
        }} />
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/memorial" style={{
            padding: '0.75rem 2rem',
            border: '1px solid #C9A227',
            color: '#C9A227',
            textDecoration: 'none',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            Encender una vela
          </Link>
          <Link href="/apoyo" style={{
            padding: '0.75rem 2rem',
            border: '1px solid #3d3d3d',
            color: '#8a8a8a',
            textDecoration: 'none',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            Buscar ayuda
          </Link>
        </div>
      </div>
    </main>
  )
}
