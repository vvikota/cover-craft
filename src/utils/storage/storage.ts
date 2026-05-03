export interface Application {
  id: string
  text: string
  createdAt: string
}

const STORAGE_KEY = 'cover-craft-applications'

export function getApplications(): Application[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Application[]) : []
  } catch {
    return []
  }
}

function dispatchStorageUpdated() {
  window.dispatchEvent(new Event('storage-updated'))
}

export function saveApplication(text: string): Application {
  const applications = getApplications()
  const newApp: Application = {
    id: crypto.randomUUID(),
    text,
    createdAt: new Date().toISOString(),
  }
  applications.unshift(newApp)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
  dispatchStorageUpdated()
  return newApp
}

export function deleteApplication(id: string): void {
  const applications = getApplications().filter((app) => app.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
  dispatchStorageUpdated()
}
