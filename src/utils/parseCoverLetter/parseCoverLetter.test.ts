import { describe, it, expect } from 'vitest'
import { parseCoverLetter } from './parseCoverLetter'

describe('parseCoverLetter', () => {
  it('корректно разбивает приветствие и тело письма', () => {
    const text = 'Dear Acme Team,\n\nI am writing to express my interest.'
    const result = parseCoverLetter(text)
    expect(result.greeting).toBe('Dear Acme Team,')
    expect(result.body).toBe('I am writing to express my interest.')
  })

  it('приветствие заканчивается запятой', () => {
    const text = 'Dear Company Team,\n\nSome body text.'
    const result = parseCoverLetter(text)
    expect(result.greeting.endsWith(',')).toBe(true)
  })

  it('тело письма не начинается с пробела', () => {
    const text = 'Dear Team, body text here.'
    const result = parseCoverLetter(text)
    expect(result.body.startsWith(' ')).toBe(false)
  })

  it('корректно обрабатывает несколько запятых в теле письма', () => {
    const text = 'Dear Team, first part, second part, third part.'
    const result = parseCoverLetter(text)
    expect(result.greeting).toBe('Dear Team,')
    expect(result.body).toBe('first part, second part, third part.')
  })

  it('возвращает объект с полями greeting и body', () => {
    const result = parseCoverLetter('Hello, world.')
    expect(result).toHaveProperty('greeting')
    expect(result).toHaveProperty('body')
  })

  it('корректно обрабатывает текст с одной запятой', () => {
    const text = 'Hello, world.'
    const result = parseCoverLetter(text)
    expect(result.greeting).toBe('Hello,')
    expect(result.body).toBe('world.')
  })

  it('тело письма обрезается от ведущих пробелов', () => {
    const text = 'Dear Team,   body with leading spaces.'
    const result = parseCoverLetter(text)
    expect(result.body).toBe('body with leading spaces.')
  })
})
