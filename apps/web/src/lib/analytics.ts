// Utilidades de analítica — disparar eventos desde cualquier componente
// Solo envía si el usuario aceptó cookies

const CONSENT_KEY = 'v723975_cookie_consent'

function hasConsent(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(CONSENT_KEY) === 'accepted'
}

function push(event: string, params?: Record<string, string | number | boolean>) {
  if (!hasConsent()) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

// Eventos del memorial
export const analytics = {
  // Velas
  candleFormViewed:   ()                          => push('candle_form_viewed'),
  candleSubmitted:    (location?: string)         => push('candle_submitted', { location: location ?? 'unknown' }),
  candleFlameIgnited: (candleId: string)          => push('candle_flame_ignited', { candle_id: candleId }),

  // Personas desaparecidas
  missingPersonViewed:    ()             => push('missing_person_viewed'),
  missingPersonReported:  (state: string) => push('missing_person_reported', { state }),

  // Ayuda
  helpLocationViewed:   (type: string)  => push('help_location_viewed', { type }),
  orgDonationClicked:   (orgName: string) => push('org_donation_clicked', { org: orgName }),

  // Navegación
  pageViewed: (page: string) => push('page_viewed', { page }),

  // Compartir
  pageShared: (method: string) => push('page_shared', { method }),
}
