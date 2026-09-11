/**
 * HackFest 2026 API Client
 * Connects the Next.js frontend to the Express + MongoDB Atlas backend.
 */

const DEFAULT_BACKEND_URL = 'https://backend-gamma-indol-14.vercel.app'

function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_BACKEND_URL
  const cleaned = envUrl.trim().replace(/\/+$/, '')
  return cleaned.endsWith('/api') ? cleaned : `${cleaned}/api`
}

const API_BASE_URL = getApiBaseUrl()

interface ApiResponse<T = any> {
  success: boolean
  message?: string
  registration?: T
  registrations?: T[]
  count?: number
  event?: any
  [key: string]: any
}

async function request<T = any>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${path}`
  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      const error: any = new Error(data.message || `Request failed with status ${response.status}`)
      error.status = response.status
      error.data = data
      throw error
    }

    return data as ApiResponse<T>
  } catch (error: any) {
    if (error.status) throw error
    // Network or offline error
    const netErr: any = new Error(
      'Could not connect to the backend server. Please check your network connection or backend server status.'
    )
    netErr.status = 0
    throw netErr
  }
}

export interface RegistrationInput {
  fullName: string
  email: string
  phone: string
  college: string
  teamName: string
  teamSize: number
  role: string
  track: string
}

export interface BackendRegistration {
  registrationId: string
  fullName: string
  email: string
  phone: string
  college: string
  teamName: string
  teamSize: number
  role: string
  track: string
  status: string
  createdAt: string
  updatedAt?: string
}

export const api = {
  // Health check
  checkHealth: () => request('/health'),

  // Event metadata
  getEvents: () => request('/events'),

  // Register new team / participant
  register: (payload: RegistrationInput) =>
    request<BackendRegistration>('/registrations', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Lookup registration by email
  getRegistration: (email: string) =>
    request<BackendRegistration>(`/registrations/${encodeURIComponent(email)}`),

  // Organizer: fetch all registrations
  getAllRegistrations: () =>
    request<BackendRegistration>('/admin/registrations'),
}
