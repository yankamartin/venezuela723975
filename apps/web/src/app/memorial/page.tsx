import { Suspense } from 'react'
import { CandleWall } from '../../components/memorial/CandleWall'
import { NewCandleForm } from '../../components/memorial/NewCandleForm'

export const metadata = {
  title: 'Muro de Velas — Memorial',
  description: 'Enciende una vela en memoria de las víctimas del doble terremoto de Venezuela.',
}

export default function MemorialPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#f0ede8',
      fontFamily: 'Inter, sans-serif',
      padding: '3rem 1.5rem',
    }}>

      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#3d3d3d',
          marginBottom: '1rem',
        }}>
          Memorial · Venezuela 7.2 · 39s · 7.5
        </p>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: '400',
          color: '#f0ede8',
          lineHeight: '1.3',
          marginBottom: '1rem',
        }}>
          Muro de Velas
        </h1>
        <p style={{
          color: '#8a8a8a',
          fontStyle: 'italic',
          fontSize: '1rem',
          maxWidth: '480px',
          margin: '0 auto',
          lineHeight: '1.7',
        }}>
          Cada vela es un nombre. Cada llama es un recuerdo que no se apaga.
        </p>
        <div style={{
          width: '60px',
          height: '1px',
          background: '#C9A227',
          margin: '1.5rem auto',
          opacity: 0.6,
        }} />
      </header>

      {/* Formulario nueva vela */}
      <section style={{
        maxWidth: '520px',
        margin: '0 auto 4rem',
        padding: '2rem',
        border: '1px solid #1a1a1a',
        background: '#0f0f0f',
      }}>
        <h2 style={{
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#C9A227',
          marginBottom: '1.5rem',
        }}>
          Encender una vela
        </h2>
        <NewCandleForm />
      </section>

      {/* Muro de velas */}
      <section style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#3d3d3d',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          Velas encendidas
        </h2>
        <Suspense fallback={
          <p style={{ textAlign: 'center', color: '#3d3d3d' }}>Cargando velas...</p>
        }>
          <CandleWall />
        </Suspense>
      </section>

    </main>
  )
}
