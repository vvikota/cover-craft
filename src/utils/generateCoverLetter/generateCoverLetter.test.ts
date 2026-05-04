import { describe, it, expect } from 'vitest'
import { generateCoverLetter } from './generateCoverLetter'

const FIELD_WIDTH = 80

describe('generateCoverLetter', () => {
  it('contains greeting with company name', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript', '', FIELD_WIDTH)
    expect(result).toContain('Dear Acme Team,')
  })

  it('contains job title', () => {
    const result = generateCoverLetter('Acme', 'Frontend Engineer', 'React', '', FIELD_WIDTH)
    expect(result).toContain('Frontend Engineer')
  })

  it('contains listed skills', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript, React', '', FIELD_WIDTH)
    expect(result).toContain('TypeScript, React')
  })

  it('includes additional details when provided', () => {
    const result = generateCoverLetter(
      'Acme',
      'Engineer',
      'TypeScript',
      'I love open source.',
      FIELD_WIDTH
    )
    expect(result).toContain('I love open source.')
  })

  it('does not include empty additional details line', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript', '', FIELD_WIDTH)
    expect(result).not.toMatch(/\n\n\n/)
  })

  it('trims whitespace from additional details', () => {
    const result = generateCoverLetter(
      'Acme',
      'Engineer',
      'TypeScript',
      '   trimmed   ',
      FIELD_WIDTH
    )
    expect(result).toContain('trimmed')
    expect(result).not.toContain('   trimmed   ')
  })

  it('contains standard letter closing', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript', '', FIELD_WIDTH)
    expect(result).toContain('Thank you for considering my application.')
  })

  it('contains confidence phrase about skills', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript', '', FIELD_WIDTH)
    expect(result).toContain('I am confident that my skills')
  })

  it('returns a string', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript', '', FIELD_WIDTH)
    expect(typeof result).toBe('string')
  })

  it('lines are joined with newline character', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript', '', FIELD_WIDTH)
    expect(result).toContain('\n')
  })
})
