const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } })
  if (!response.ok) throw new Error('Request failed')
  return response.json() as Promise<T>
}

export type RegistrationPayload = { name: string; email: string; phone: string; college: string; team: string; size: string; role: string; track: string }
export const api = {
  events: () => request('/api/events'),
  register: (payload: RegistrationPayload) => request('/api/registrations', { method: 'POST', body: JSON.stringify(payload) }),
  registrationStatus: (email: string) => request(`/api/registrations/${encodeURIComponent(email)}`),
}
