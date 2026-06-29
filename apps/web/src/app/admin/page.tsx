import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acceso administración',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '360px',
        padding: '2.5rem',
        border: '1px solid #1a1a1a',
        background: '#0f0f0f',
      }}>
        <p style={{
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#3d3d3d',
          marginBottom: '1.5rem',
        }}>
          venezuela723975.com · Administración
        </p>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '1.3rem',
          fontWeight: 400,
          color: '#f0ede8',
          marginBottom: '2rem',
        }}>
          Acceso restringido
        </h1>
        <form action="/api/v1/admin/login" method="POST">
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8a8a8a',
              marginBottom: '0.5rem',
            }}>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              style={{
                width: '100%',
                background: 'transparent',
                border: '1px solid #2a2a2a',
                color: '#f0ede8',
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              background: 'transparent',
              border: '1px solid #C9A227',
              color: '#C9A227',
              padding: '0.85rem',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  )
}
