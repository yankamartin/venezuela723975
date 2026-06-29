import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      fontFamily: 'Inter, sans-serif',
    }}>
      <header style={{
        borderBottom: '1px solid #1a1a1a',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#0a0a0a',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <p style={{
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#3d3d3d',
            margin: 0,
          }}>
            venezuela723975 · Admin
          </p>
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/admin/velas" style={{
              color: '#8a8a8a',
              textDecoration: 'none',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
            }}>
              Velas pendientes
            </a>
            <a href="/memorial" target="_blank" style={{
              color: '#3d3d3d',
              textDecoration: 'none',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
            }}>
              Ver sitio →
            </a>
          </nav>
        </div>
        <a href="/api/v1/admin/logout" style={{
          color: '#3d3d3d',
          textDecoration: 'none',
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          Salir
        </a>
      </header>
      <main style={{ padding: '2rem' }}>
        {children}
      </main>
    </div>
  )
}
