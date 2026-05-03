import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getApplications, saveApplication, deleteApplication } from './storage'

const STORAGE_KEY = 'cover-craft-applications'

beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('getApplications', () => {
  it('возвращает пустой массив, если localStorage пуст', () => {
    const result = getApplications()
    expect(result).toEqual([])
  })

  it('возвращает сохранённые заявки из localStorage', () => {
    const apps = [{ id: '1', text: 'Hello', createdAt: '2024-01-01T00:00:00.000Z' }]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps))
    const result = getApplications()
    expect(result).toEqual(apps)
  })

  it('возвращает пустой массив при невалидном JSON в localStorage', () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json')
    const result = getApplications()
    expect(result).toEqual([])
  })
})

describe('saveApplication', () => {
  it('сохраняет новую заявку и возвращает её', () => {
    const app = saveApplication('My cover letter text')
    expect(app.text).toBe('My cover letter text')
    expect(app.id).toBeDefined()
    expect(app.createdAt).toBeDefined()
  })

  it('сохранённая заявка появляется в getApplications', () => {
    saveApplication('First letter')
    const apps = getApplications()
    expect(apps).toHaveLength(1)
    expect(apps[0].text).toBe('First letter')
  })

  it('новая заявка добавляется в начало списка', () => {
    saveApplication('First')
    saveApplication('Second')
    const apps = getApplications()
    expect(apps[0].text).toBe('Second')
    expect(apps[1].text).toBe('First')
  })

  it('возвращаемый объект содержит поля id, text, createdAt', () => {
    const app = saveApplication('Test')
    expect(app).toHaveProperty('id')
    expect(app).toHaveProperty('text')
    expect(app).toHaveProperty('createdAt')
  })

  it('генерирует уникальные id для разных заявок', () => {
    const app1 = saveApplication('First')
    const app2 = saveApplication('Second')
    expect(app1.id).not.toBe(app2.id)
  })

  it('диспатчит событие storage-updated', () => {
    const listener = vi.fn()
    window.addEventListener('storage-updated', listener)
    saveApplication('Test')
    expect(listener).toHaveBeenCalledTimes(1)
    window.removeEventListener('storage-updated', listener)
  })
})

describe('deleteApplication', () => {
  it('удаляет заявку по id', () => {
    const app = saveApplication('To be deleted')
    deleteApplication(app.id)
    const apps = getApplications()
    expect(apps.find((a) => a.id === app.id)).toBeUndefined()
  })

  it('не удаляет другие заявки', () => {
    const app1 = saveApplication('Keep me')
    const app2 = saveApplication('Delete me')
    deleteApplication(app2.id)
    const apps = getApplications()
    expect(apps).toHaveLength(1)
    expect(apps[0].id).toBe(app1.id)
  })

  it('не выбрасывает ошибку при удалении несуществующего id', () => {
    expect(() => deleteApplication('non-existent-id')).not.toThrow()
  })

  it('диспатчит событие storage-updated', () => {
    const app = saveApplication('Test')
    const listener = vi.fn()
    window.addEventListener('storage-updated', listener)
    deleteApplication(app.id)
    expect(listener).toHaveBeenCalledTimes(1)
    window.removeEventListener('storage-updated', listener)
  })

  it('после удаления всех заявок getApplications возвращает пустой массив', () => {
    const app = saveApplication('Only one')
    deleteApplication(app.id)
    expect(getApplications()).toEqual([])
  })
})
