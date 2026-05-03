import { describe, it, expect } from 'vitest'
import { generateCoverLetter } from './generateCoverLetter'

describe('generateCoverLetter', () => {
  it('содержит приветствие с названием компании', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript', '')
    expect(result).toContain('Dear Acme Team,')
  })

  it('содержит название должности', () => {
    const result = generateCoverLetter('Acme', 'Frontend Engineer', 'React', '')
    expect(result).toContain('Frontend Engineer')
  })

  it('содержит перечисленные навыки', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript, React', '')
    expect(result).toContain('TypeScript, React')
  })

  it('включает дополнительные детали, если они переданы', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript', 'I love open source.')
    expect(result).toContain('I love open source.')
  })

  it('не включает пустую строку дополнительных деталей', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript', '')
    const lines = result.split('\n')
    // Последние строки — стандартное завершение, пустая строка additionalDetails не добавляется
    expect(result).not.toMatch(/\n\n\n/)
  })

  it('обрезает пробелы в дополнительных деталях', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript', '   trimmed   ')
    expect(result).toContain('trimmed')
    expect(result).not.toContain('   trimmed   ')
  })

  it('содержит стандартное завершение письма', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript', '')
    expect(result).toContain('Thank you for considering my application.')
  })

  it('содержит фразу об уверенности в навыках', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript', '')
    expect(result).toContain('I am confident that my skills')
  })

  it('возвращает строку', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript', '')
    expect(typeof result).toBe('string')
  })

  it('строки соединены через символ новой строки', () => {
    const result = generateCoverLetter('Acme', 'Engineer', 'TypeScript', '')
    expect(result).toContain('\n')
  })
})
