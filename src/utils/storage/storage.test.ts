import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getApplications, saveApplication, deleteApplication } from './storage'

const STORAGE_KEY = 'cover-craft-applications'

beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('getApplications', () => {
  it('returns empty array when localStorage is empty', () => {
    const result = getApplications()
    expect(result).toEqual([])
  })

  it('returns saved applications from localStorage', () => {
    const apps = [{ id: '1', text: 'Hello', createdAt: '2024-01-01T00:00:00.000Z' }]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps))
    const result = getApplications()
    expect(result).toEqual(apps)
  })

  it('returns empty array when localStorage contains invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json')
    const result = getApplications()
    expect(result).toEqual([])
  })
})

describe('saveApplication', () => {
  it('saves a new application and returns it', () => {
    const app = saveApplication('My cover letter text')
    expect(app.text).toBe('My cover letter text')
    expect(app.id).toBeDefined()
    expect(app.createdAt).toBeDefined()
  })

  it('saved application appears in getApplications', () => {
    saveApplication('First letter')
    const apps = getApplications()
    expect(apps).toHaveLength(1)
    expect(apps[0].text).toBe('First letter')
  })

  it('new application is added to the beginning of the list', () => {
    saveApplication('First')
    saveApplication('Second')
    const apps = getApplications()
    expect(apps[0].text).toBe('Second')
    expect(apps[1].text).toBe('First')
  })

  it('returned object contains id, text, createdAt fields', () => {
    const app = saveApplication('Test')
    expect(app).toHaveProperty('id')
    expect(app).toHaveProperty('text')
    expect(app).toHaveProperty('createdAt')
  })

  it('generates unique ids for different applications', () => {
    const app1 = saveApplication('First')
    const app2 = saveApplication('Second')
    expect(app1.id).not.toBe(app2.id)
  })

  it('dispatches storage-updated event', () => {
    const listener = vi.fn()
    window.addEventListener('storage-updated', listener)
    saveApplication('Test')
    expect(listener).toHaveBeenCalledTimes(1)
    window.removeEventListener('storage-updated', listener)
  })
})

describe('deleteApplication', () => {
  it('deletes application by id', () => {
    const app = saveApplication('To be deleted')
    deleteApplication(app.id)
    const apps = getApplications()
    expect(apps.find((a) => a.id === app.id)).toBeUndefined()
  })

  it('does not delete other applications', () => {
    const app1 = saveApplication('Keep me')
    const app2 = saveApplication('Delete me')
    deleteApplication(app2.id)
    const apps = getApplications()
    expect(apps).toHaveLength(1)
    expect(apps[0].id).toBe(app1.id)
  })

  it('does not throw when deleting a non-existent id', () => {
    expect(() => deleteApplication('non-existent-id')).not.toThrow()
  })

  it('dispatches storage-updated event', () => {
    const app = saveApplication('Test')
    const listener = vi.fn()
    window.addEventListener('storage-updated', listener)
    deleteApplication(app.id)
    expect(listener).toHaveBeenCalledTimes(1)
    window.removeEventListener('storage-updated', listener)
  })

  it('getApplications returns empty array after all applications are deleted', () => {
    const app = saveApplication('Only one')
    deleteApplication(app.id)
    expect(getApplications()).toEqual([])
  })
})
