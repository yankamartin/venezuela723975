'use client'

import { useState } from 'react'

export function NewCandleForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState({ victimName: '', victimAge: '', victimLocation: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const inputStyle = {
    width: '100%', background: 'transparent',
    border: '1px solid #2a2a2a', color: '#f0ede8',
    padding: '0.75rem 1rem', fontSize: '0.9rem',
    outline: 'none', fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    display: 'block', fontSize: '0.65rem',
    letterSpacing: '0.2em', textTransform: 'uppercase' as const,
    color: '#8a8a8a', marginBottom: '0.5rem',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.victimName.trim()) return
    setIsSubmitting(true)
    setError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          victimName: form.victimName,
          victimAge: form.victimAge ? Number(form.victimAge) : undefined,
          victimLocation: form.victimLocation || undefined,
          message: form.message || undefined,
        }),
      })
      if (res.ok) { setSubmitted(true); onSuccess?.() }
      else setError('Hubo un problema. Por favor intenta de nuevo.')
    } catch {
      setError('Error de conexión. Por favor intenta de nuevo.')
    } finally { setIsSubmitting(false) }
  }

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🕯</div>
      <h3 style={{ fontFamily: 'Georgia, serif', color: '#C9A227',
        fontSize: '1.1rem', fontWeight: '400', marginBottom: '0.75rem' }}>
        Tu tributo ha sido recibido
      </h3>
      <p style={{ color: '#8a8a8a', fontSize: '0.85rem', lineHeight: '1.7',
        maxWidth: '360px', margin: '0 auto' }}>
        Será revisado y publicado en el muro en breve. Gracias por honrar su memoria.
      </p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label style={labelStyle}>Nombre completo *</label>
        <input type="text" required maxLength={200}
          value={form.victimName}
          onChange={e => setForm(f => ({ ...f, victimName: e.target.value }))}
          placeholder="Nombre de quien quieres recordar"
          style={inputStyle} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Edad</label>
          <input type="number" min={0} max={150}
            value={form.victimAge}
            onChange={e => setForm(f => ({ ...f, victimAge: e.target.value }))}
            placeholder="Ej: 45" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Estado / Ciudad</label>
          <input type="text" maxLength={200}
            value={form.victimLocation}
            onChange={e => setForm(f => ({ ...f, victimLocation: e.target.value }))}
            placeholder="Ej: Caracas" style={inputStyle} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Mensaje de recuerdo</label>
        <textarea rows={4} maxLength={2000}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Comparte un recuerdo, un mensaje de amor..."
          style={{ ...inputStyle, resize: 'none', lineHeight: '1.6' }} />
        <p style={{ fontSize: '0.65rem', color: '#3d3d3d',
          textAlign: 'right', marginTop: '0.25rem' }}>
          {form.message.length}/2000
        </p>
      </div>
      {error && <p style={{ color: '#CC1B1B', fontSize: '0.8rem' }}>{error}</p>}
      <button type="submit"
        disabled={isSubmitting || !form.victimName.trim()}
        style={{
          background: 'transparent', border: '1px solid #C9A227',
          color: '#C9A227', padding: '1rem',
          fontSize: '0.7rem', letterSpacing: '0.2em',
          textTransform: 'uppercase',
          cursor: isSubmitting || !form.victimName.trim() ? 'not-allowed' : 'pointer',
          opacity: isSubmitting || !form.victimName.trim() ? 0.4 : 1,
          fontFamily: 'Inter, sans-serif',
        }}>
        {isSubmitting ? 'Enviando...' : 'Encender su vela'}
      </button>
      <p style={{ fontSize: '0.65rem', color: '#3d3d3d',
        textAlign: 'center', lineHeight: '1.6' }}>
        Tu tributo será revisado antes de publicarse para proteger la dignidad de los recordados.
      </p>
    </form>
  )
}
