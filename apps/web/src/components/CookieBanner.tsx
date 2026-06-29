'use client'

import { useState, useEffect } from 'react'

type ConsentState = 'pending' | 'accepted' | 'rejected'

const CONSENT_KEY = 'v723975_cookie_consent'
const GTM_ID = 'GTM-NFJQHTP7'

function loadGTM() {
  if (typeof window === 'undefined') return
  if (document.getElementById('gtm-script')) return

  // Inicializar dataLayer
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })

  // Cargar GTM
  const script = document.createElement('script')
  script.id = 'gtm-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)
}

export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>('pending')
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentState | null
    if (stored === 'accepted') {
      setConsent('accepted')
      loadGTM()
    } else if (stored === 'rejected') {
      setConsent('rejected')
    } else {
      // Mostrar banner con pequeño delay para no bloquear LCP
      setTimeout(() => setVisible(true), 800)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setConsent('accepted')
    setVisible(false)
    loadGTM()
    // Disparar evento de consentimiento aceptado
    window.dataLayer?.push({ event: 'consent_accepted' })
  }

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setConsent('rejected')
    setVisible(false)
  }

  const handleReset = () => {
    localStorage.removeItem(CONSENT_KEY)
    setVisible(true)
    setConsent('pending')
  }

  if (!visible) {
    // Botón flotante pequeño para reabrir preferencias
    if (consent !== 'pending') {
      return (
        <button
          onClick={handleReset}
          aria-label="Gestionar preferencias de cookies"
          style={{
            position: 'fixed',
            bottom: '1rem',
            left: '1rem',
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            color: '#3d3d3d',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0.4rem 0.75rem',
            cursor: 'pointer',
            zIndex: 9998,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Cookies
        </button>
      )
    }
    return null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Aviso de cookies"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#0f0f0f',
        borderTop: '1px solid #1a1a1a',
        padding: '1.5rem',
        zIndex: 9999,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '1rem',
        }}>
          {/* Texto principal */}
          <div>
            <p style={{
              color: '#f0ede8',
              fontSize: '0.85rem',
              lineHeight: '1.6',
              margin: 0,
            }}>
              Usamos cookies analíticas para entender cómo las personas interactúan con este memorial y mejorar la experiencia.
              No usamos cookies publicitarias ni compartimos tus datos con terceros.{' '}
              <a
                href="/legal/politica-de-cookies"
                style={{ color: '#C9A227', textDecoration: 'underline' }}
              >
                Política de cookies
              </a>
              {' · '}
              <a
                href="/legal/privacidad"
                style={{ color: '#C9A227', textDecoration: 'underline' }}
              >
                Privacidad
              </a>
            </p>

            {/* Detalles expandibles */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              style={{
                background: 'none',
                border: 'none',
                color: '#8a8a8a',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
                padding: '0.5rem 0 0',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {showDetails ? '− Ocultar detalles' : '+ Ver qué cookies usamos'}
            </button>

            {showDetails && (
              <div style={{
                marginTop: '0.75rem',
                padding: '1rem',
                background: '#0a0a0a',
                border: '1px solid #1a1a1a',
                fontSize: '0.75rem',
                color: '#8a8a8a',
                lineHeight: '1.7',
              }}>
                <p style={{ margin: '0 0 0.5rem', color: '#f0ede8' }}>Cookies que utilizamos:</p>
                <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                  <li>
                    <strong style={{ color: '#f0ede8' }}>Google Analytics 4 (G-HQHNGSSTD2)</strong> —
                    Mide visitas, países de origen y páginas más visitadas. Sin datos personales identificables.
                  </li>
                  <li style={{ marginTop: '0.5rem' }}>
                    <strong style={{ color: '#f0ede8' }}>Microsoft Clarity (xet5oamrqw)</strong> —
                    Mapas de calor y grabaciones de sesión anónimas para mejorar la usabilidad.
                  </li>
                  <li style={{ marginTop: '0.5rem' }}>
                    <strong style={{ color: '#f0ede8' }}>Cookie de consentimiento</strong> —
                    Guarda tu preferencia en este dispositivo. Esencial, no requiere consentimiento.
                  </li>
                </ul>
                <p style={{ margin: '0.75rem 0 0', fontSize: '0.7rem' }}>
                  Nunca vendemos ni compartimos datos. Puedes retirar tu consentimiento en cualquier momento.
                  Base legal: consentimiento (Art. 6.1.a RGPD / LOPDGDD).
                </p>
              </div>
            )}
          </div>

          {/* Botones */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap' as const,
            alignItems: 'center',
          }}>
            <button
              onClick={handleAccept}
              style={{
                background: '#C9A227',
                border: 'none',
                color: '#0a0a0a',
                padding: '0.65rem 1.75rem',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
              }}
            >
              Aceptar analíticas
            </button>
            <button
              onClick={handleReject}
              style={{
                background: 'transparent',
                border: '1px solid #2a2a2a',
                color: '#8a8a8a',
                padding: '0.65rem 1.75rem',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Solo esenciales
            </button>
            <span style={{ fontSize: '0.65rem', color: '#3d3d3d', marginLeft: 'auto' }}>
              RGPD · LOPD · LSSI
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook para disparar eventos desde cualquier componente
export function trackEvent(eventName: string, params?: Record<string, string | number>) {
  if (typeof window === 'undefined') return
  const consent = localStorage.getItem('v723975_cookie_consent')
  if (consent !== 'accepted') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: eventName, ...params })
}
