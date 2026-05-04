import { useState } from 'react'
import { generateCoverLetter } from '../utils/generateCoverLetter'
import { getApplications, saveApplication } from '../utils/storage'

const COVER_LETTERS_GOAL = 5
const MIN_LETTER_FIELD_WIDTH = 20

interface FormValues {
  jobTitle: string
  company: string
  skills: string
  details: string
}

export function useCoverLetter(reset: () => void, fieldWidth: number) {
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [coverLettersCount, setCoverLettersCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(data: FormValues) {
    setIsLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      const safeFieldWidth = Number.isFinite(fieldWidth)
        ? Math.max(MIN_LETTER_FIELD_WIDTH, Math.floor(fieldWidth))
        : MIN_LETTER_FIELD_WIDTH
      const letter = generateCoverLetter(
        data.company,
        data.jobTitle,
        data.skills,
        data.details,
        safeFieldWidth
      )
      setGeneratedLetter(letter)
      saveApplication(letter, data)
      setCopied(false)

      const count = getApplications().length
      setCoverLettersCount(count)
      if (count < COVER_LETTERS_GOAL) {
        setShowBanner(true)
      }
    } catch (err) {
      console.error('Failed to generate cover letter:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCopy() {
    if (!generatedLetter) return
    await navigator.clipboard.writeText(generatedLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleTryAgain() {
    reset()
    setGeneratedLetter('')
    setCopied(false)
    setShowBanner(false)
    setError(null)
  }

  return {
    generatedLetter,
    copied,
    isLoading,
    showBanner,
    coverLettersCount,
    coverLettersGoal: COVER_LETTERS_GOAL,
    error,
    onSubmit,
    handleCopy,
    handleTryAgain,
  }
}
