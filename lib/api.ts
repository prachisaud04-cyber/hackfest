/**
 * HackFest 2026 API Client
 * Connects the Next.js frontend to the Express + MongoDB Atlas backend.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

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
    const netErr: any = new Error('Could not connect to backend server. Make sure it is running on port 5000.')
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
