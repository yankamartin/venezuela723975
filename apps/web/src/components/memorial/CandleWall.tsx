'use client'

import { useState, useEffect } from 'react'
import { CandleCard } from './CandleCard'

interface Candle {
  id: string
  victimName: string
  victimAge?: number
  victimLocation?: string
  message?: string
  flameCount: number
  isFeatured: boolean
  createdAt: string
}

export function CandleWall() {
  const [candles, setCandles] = useState<Candle[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const fetchCandles = async (p: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/candles?page=${p}&limit=20`
      )
      const data = await res.json()
      if (p === 1) setCandles(data.data)
      else setCandles(prev => [...prev, ...data.data])
      setTotal(data.total)
      setHasMore(data.hasMore)
    } catch {}
    finally { setLoading(false) }
  }

  useEffect(() => { fetchCandles(1) }, [])

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '3rem', color: '#3d3d3d' }}>
      Cargando velas...
    </div>
  )

  if (candles.length === 0) return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🕯</div>
      <p style={{ color: '#8a8a8a', fontStyle: 'italic' }}>
        Sé el primero en encender una vela
      </p>
    </div>
  )

  return (
    <div>
      <p style={{ textAlign: 'center', color: '#3d3d3d', fontSize: '0.75rem',
        marginBottom: '2rem', letterSpacing: '0.1em' }}>
        {total} {total === 1 ? 'vela encendida' : 'velas encendidas'}
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1.5rem',
      }}>
        {candles.map(candle => (
          <CandleCard key={candle.id} candle={candle}
            onFlame={(id, count) => {
              setCandles(prev => prev.map(c => c.id === id ? { ...c, flameCount: count } : c))
            }}
          />
        ))}
      </div>
      {hasMore && (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button onClick={() => { setPage(p => p + 1); fetchCandles(page + 1) }}
            style={{
              background: 'transparent', border: '1px solid #3d3d3d',
              color: '#8a8a8a', padding: '0.75rem 2rem',
              fontSize: '0.75rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', cursor: 'pointer',
            }}>
            Ver más velas
          </button>
        </div>
      )}
    </div>
  )
}
