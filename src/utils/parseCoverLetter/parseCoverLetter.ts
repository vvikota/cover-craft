export function parseCoverLetter(text: string): { greeting: string; body: string } {
  const parts = text.split(',')
  const greeting = parts[0] + ','
  const body = parts.slice(1).join(',').trimStart()
  return { greeting, body }
}
