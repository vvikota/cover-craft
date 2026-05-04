import { describe, it, expect } from 'vitest'
import { parseCoverLetter } from './parseCoverLetter'

describe('parseCoverLetter', () => {
  it('correctly splits greeting and letter body', () => {
    const text = 'Dear Acme Team,\n\nI am writing to express my interest.'
    const result = parseCoverLetter(text)
    expect(result.greeting).toBe('Dear Acme Team,')
    expect(result.body).toBe('I am writing to express my interest.')
  })

  it('greeting ends with a comma', () => {
    const text = 'Dear Company Team,\n\nSome body text.'
    const result = parseCoverLetter(text)
    expect(result.greeting.endsWith(',')).toBe(true)
  })

  it('body does not start with a space', () => {
    const text = 'Dear Team, body text here.'
    const result = parseCoverLetter(text)
    expect(result.body.startsWith(' ')).toBe(false)
  })

  it('correctly handles multiple commas in the letter body', () => {
    const text = 'Dear Team, first part, second part, third part.'
    const result = parseCoverLetter(text)
    expect(result.greeting).toBe('Dear Team,')
    expect(result.body).toBe('first part, second part, third part.')
  })

  it('returns an object with greeting and body fields', () => {
    const result = parseCoverLetter('Hello, world.')
    expect(result).toHaveProperty('greeting')
    expect(result).toHaveProperty('body')
  })

  it('correctly handles text with a single comma', () => {
    const text = 'Hello, world.'
    const result = parseCoverLetter(text)
    expect(result.greeting).toBe('Hello,')
    expect(result.body).toBe('world.')
  })

  it('body is trimmed of leading spaces', () => {
    const text = 'Dear Team,   body with leading spaces.'
    const result = parseCoverLetter(text)
    expect(result.body).toBe('body with leading spaces.')
  })
})
