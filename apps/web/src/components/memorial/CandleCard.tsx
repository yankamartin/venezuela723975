'use client'

import { useState } from 'react'
import { analytics } from '../../lib/analytics'

interface CandleCardProps {
  candle: {
    id: string
    victimName: string
    victimAge?: number
    victimLocation?: string
    message?: string
    flameCount: number
  }
  onFlame?: (id: string, newCount: number) => void
}

export function CandleCard({ candle, onFlame }: CandleCardProps) {
  const [flameCount, setFlameCount] = useState(candle.flameCount)
  const [isLit, setIsLit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFlame = async () => {
    if (isLit || isLoading) return
    setIsLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/candles/${candle.id}/flame`,
        { method: 'POST' }
      )
      const data = await res.json()
      if (data.success && !data.alreadyLit) {
        setFlameCount(data.flameCount)
        setIsLit(true)
        onFlame?.(candle.id, data.flameCount)
        analytics.candleFlameIgnited(candle.id)
      } else if (data.alreadyLit) {
        setIsLit(true)
      }
    } catch {}
    finally { setIsLoading(false) }
  }

  return (
    <article style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: '1rem', padding: '1.5rem 1rem',
      border: '1px solid #1a1a1a',
      background: isLit ? '#0f0f0a' : '#0a0a0a',
      transition: 'all 0.3s ease',
    }}>
      <button onClick={handleFlame} disabled={isLit || isLoading}
        title={isLit ? 'Vela encendida' : 'Encender esta vela'}
        style={{ background: 'none', border: 'none',
          cursor: isLit ? 'default' : 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0 }}>
        <div style={{
          width: '12px', height: '18px',
          borderRadius: '50% 50% 40% 40%',
          background: isLit ? '#C9A227' : '#2a2a2a',
          boxShadow: isLit ? '0 0 12px 4px rgba(201,162,39,0.3)' : 'none',
          transition: 'all 0.5s ease',
        }} />
        <div style={{ width: '1px', height: '8px', background: '#2a2a2a' }} />
        <div style={{
          width: '28px', height: '56px',
          background: isLit ? 'rgba(201,162,39,0.08)' : '#111',
          borderRadius: '2px', transition: 'all 0.5s ease',
        }} />
        <div style={{ width: '36px', height: '4px', background: '#1a1a1a', borderRadius: '2px' }} />
      </button>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1rem',
          fontWeight: '400', color: '#f0ede8', lineHeight: '1.3', margin: 0 }}>
          {candle.victimName}
        </h3>
        {(candle.victimAge || candle.victimLocation) && (
          <p style={{ fontSize: '0.75rem', color: '#8a8a8a', marginTop: '0.25rem' }}>
            {candle.victimAge && `${candle.victimAge} años`}
            {candle.victimAge && candle.victimLocation && ' · '}
            {candle.victimLocation}
          </p>
        )}
      </div>
      {candle.message && (
        <blockquote style={{
          fontSize: '0.8rem', color: '#8a8a8a', fontStyle: 'italic',
          textAlign: 'center', lineHeight: '1.6',
          borderLeft: '2px solid rgba(201,162,39,0.3)',
          paddingLeft: '0.75rem', margin: 0,
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {candle.message}
        </blockquote>
      )}
      <p style={{
        fontSize: '0.7rem',
        color: isLit ? '#C9A227' : '#3d3d3d',
        letterSpacing: '0.05em', margin: 0,
        transition: 'color 0.3s ease',
      }}>
        {flameCount} {flameCount === 1 ? 'llama' : 'llamas'}
      </p>
    </article>
  )
}
