export function generateCoverLetter(
  company: string,
  jobTitle: string,
  skills: string,
  additionalDetails: string,
  fieldWidth: number
): string {
  const lines = [
    `Dear ${company} Team,`,
    '',
    `I am writing to express my interest in the ${jobTitle} position.`,
    '',
    `My experience in the realm combined with my skills in ${skills} make me a strong candidate for this role.`,
  ]

  if (additionalDetails.trim()) {
    lines.push('', additionalDetails.trim())
  }

  lines.push(
    '',
    'I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.',
    '',
    'Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.'
  )

  return wrapByWidth(lines.join('\n'), fieldWidth)
}

function wrapByWidth(text: string, fieldWidth: number): string {
  if (fieldWidth <= 0) {
    return text
  }

  return text
    .split('\n')
    .map((line) => wrapLine(line, fieldWidth))
    .join('\n')
}

function wrapLine(line: string, fieldWidth: number): string {
  if (!line.trim()) {
    return line
  }

  const words = line.split(/\s+/)
  const wrappedLines: string[] = []
  let currentLine = ''

  for (const word of words) {
    if (!currentLine) {
      if (word.length <= fieldWidth) {
        currentLine = word
      } else {
        wrappedLines.push(...splitLongWord(word, fieldWidth))
      }
      continue
    }

    const candidate = `${currentLine} ${word}`
    if (candidate.length <= fieldWidth) {
      currentLine = candidate
      continue
    }

    wrappedLines.push(currentLine)
    if (word.length <= fieldWidth) {
      currentLine = word
    } else {
      wrappedLines.push(...splitLongWord(word, fieldWidth))
      currentLine = ''
    }
  }

  if (currentLine) {
    wrappedLines.push(currentLine)
  }

  return wrappedLines.join('\n')
}

function splitLongWord(word: string, fieldWidth: number): string[] {
  const chunks: string[] = []
  let index = 0

  while (index < word.length) {
    chunks.push(word.slice(index, index + fieldWidth))
    index += fieldWidth
  }

  return chunks
}
