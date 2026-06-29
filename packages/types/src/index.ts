export type UserRole = 'visitor' | 'contributor' | 'moderator' | 'admin'
export type MediaType = 'image' | 'video' | 'audio' | 'document'
export type MissingStatus = 'searching' | 'found_alive' | 'found_deceased' | 'closed'
export type HelpLocationType = 'shelter' | 'hospital' | 'water' | 'food' | 'rescue' | 'evacuation'
export type OrganizationType = 'ngo' | 'government' | 'religious' | 'community' | 'international'

export interface Candle {
  id: string
  userId?: string
  victimName: string
  victimAge?: number
  victimLocation?: string
  message?: string
  photoUrl?: string
  isApproved: boolean
  isFeatured: boolean
  flameCount: number
  createdAt: string
  updatedAt: string
}

export interface CreateCandleInput {
  victimName: string
  victimAge?: number
  victimLocation?: string
  message?: string
  photoUrl?: string
  authorName?: string
}

export interface FlameResponse {
  success: boolean
  flameCount: number
  alreadyLit: boolean
}

export interface Testimony {
  id: string
  userId?: string
  authorName?: string
  content: string
  mediaUrl?: string
  mediaType?: MediaType
  locationName?: string
  state?: string
  latitude?: number
  longitude?: number
  isApproved: boolean
  isFeatured: boolean
  createdAt: string
}

export interface HelpLocation {
  id: string
  name: string
  type: HelpLocationType
  address?: string
  state?: string
  city?: string
  latitude: number
  longitude: number
  description?: string
  phone?: string
  isActive: boolean
  isVerified: boolean
  updatedAt: string
}

export interface Organization {
  id: string
  name: string
  type: OrganizationType
  website?: string
  description: string
  logoUrl?: string
  isVerified: boolean
  donationUrl?: string
  createdAt: string
}

export interface MissingPerson {
  id: string
  fullName: string
  age?: number
  lastSeenLocation?: string
  photoUrl?: string
  description?: string
  contactInfo?: string
  status: MissingStatus
  createdAt: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface SiteStats {
  totalCandles: number
  totalFlames: number
  totalTestimonies: number
  totalHelpLocations: number
  totalOrganizations: number
  totalMissingSearching: number
}
