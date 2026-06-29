'use client'

import { useState, useEffect } from 'react'

interface Candle {
  id: string
  victimName: string
  victimAge?: number
  victimLocation?: string
  message?: string
  createdAt: string
  ipHash?: string
}

export default function AdminVelasPage() {
  const [candles, setCandles] = useState<Candle[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState<string | null>(null)
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 })

  const fetchPending = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/candles/pending`, {
        credentials: 'include',
      })
      if (res.status === 401) {
        window.location.href = '/admin'
        return
      }
      const data = await res.json()
      setCandles(data.data || [])
      setStats(data.stats || { pending: 0, approved: 0, rejected: 0 })
    } catch {
      // error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPending() }, [])

  const handleAction = async (id: string, action: 'approve' | 'reject', reason?: string) => {
    setProcessing(id)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/candles/${id}/${action}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      })
      setCandles(prev => prev.filter(c => c.id !== id))
      setStats(prev => ({
        ...prev,
        pending: prev.pending - 1,
        [action === 'approve' ? 'approved' : 'rejected']:
          prev[action === 'approve' ? 'approved' : 'rejected'] + 1,
      }))
    } catch {
      // error
    } finally {
      setProcessing(null)
    }
  }

  const cardStyle: React.CSSProperties = {
    border: '1px solid #1a1a1a',
    background: '#0f0f0f',
    padding: '1.5rem',
    marginBottom: '1rem',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.6rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#3d3d3d',
    marginBottom: '0.25rem',
    display: 'block',
  }

  const valueStyle: React.CSSProperties = {
    color: '#f0ede8',
    fontSize: '0.9rem',
    marginBottom: '0.75rem',
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {[
          { label: 'Pendientes', value: stats.pending, color: '#C9A227' },
          { label: 'Aprobadas', value: stats.approved, color: '#4a7c59' },
          { label: 'Rechazadas', value: stats.rejected, color: '#CC1B1B' },
        ].map(s => (
          <div key={s.label} style={{
            border: '1px solid #1a1a1a',
            background: '#0f0f0f',
            padding: '1rem 1.5rem',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '1.8rem', color: s.color, margin: 0, fontFamily: 'Georgia, serif' }}>
              {s.value}
            </p>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3d3d3d', margin: '0.25rem 0 0' }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Lista de velas pendientes */}
      <h2 style={{
        fontSize: '0.65rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#3d3d3d',
        marginBottom: '1.5rem',
      }}>
        Velas pendientes de revisión
      </h2>

      {loading && (
        <p style={{ color: '#3d3d3d', fontSize: '0.85rem' }}>Cargando...</p>
      )}

      {!loading && candles.length === 0 && (
        <div style={{ ...cardStyle, textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: '#3d3d3d', fontSize: '0.85rem' }}>
            No hay velas pendientes de revisión
          </p>
        </div>
      )}

      {candles.map(candle => (
        <div key={candle.id} style={cardStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <span style={labelStyle}>Nombre</span>
              <p style={{ ...valueStyle, fontFamily: 'Georgia, serif', fontSize: '1.1rem' }}>
                {candle.victimName}
              </p>
            </div>
            <div>
              <span style={labelStyle}>Recibida</span>
              <p style={{ ...valueStyle, fontSize: '0.8rem', color: '#8a8a8a' }}>
                {new Date(candle.createdAt).toLocaleString('es-ES')}
              </p>
            </div>
            {candle.victimAge && (
              <div>
                <span style={labelStyle}>Edad</span>
                <p style={valueStyle}>{candle.victimAge} años</p>
              </div>
            )}
            {candle.victimLocation && (
              <div>
                <span style={labelStyle}>Ubicación</span>
                <p style={valueStyle}>{candle.victimLocation}</p>
              </div>
            )}
          </div>

          {candle.message && (
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={labelStyle}>Mensaje</span>
              <p style={{
                color: '#8a8a8a',
                fontSize: '0.85rem',
                lineHeight: '1.7',
                fontStyle: 'italic',
                borderLeft: '2px solid #1a1a1a',
                paddingLeft: '1rem',
                margin: 0,
              }}>
                {candle.message}
              </p>
            </div>
          )}

          {/* Acciones */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={() => handleAction(candle.id, 'approve')}
              disabled={processing === candle.id}
              style={{
                background: 'transparent',
                border: '1px solid #4a7c59',
                color: '#4a7c59',
                padding: '0.5rem 1.5rem',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                opacity: processing === candle.id ? 0.4 : 1,
              }}
            >
              {processing === candle.id ? '...' : 'Aprobar'}
            </button>
            <button
              onClick={() => {
                const reason = prompt('Motivo del rechazo (opcional):') ?? undefined
                handleAction(candle.id, 'reject', reason)
              }}
              disabled={processing === candle.id}
              style={{
                background: 'transparent',
                border: '1px solid #CC1B1B',
                color: '#CC1B1B',
                padding: '0.5rem 1.5rem',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                opacity: processing === candle.id ? 0.4 : 1,
              }}
            >
              Rechazar
            </button>
            <span style={{ fontSize: '0.6rem', color: '#1a1a1a', marginLeft: 'auto' }}>
              {candle.id.slice(0, 8)}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
