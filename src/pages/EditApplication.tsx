import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { generateCoverLetter } from '../utils/generateCoverLetter'
import { saveApplication } from '../utils/storage'
import { Input } from '../components/Input'
import { Spinner } from '../components/Spinner'
import { CoverLetterPreview } from '../components/CoverLetterPreview'

const MAX_DETAILS_LENGTH = 1200

interface FormValues {
  jobTitle: string
  company: string
  skills: string
  details: string
}

export function EditApplication() {
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      jobTitle: '',
      company: '',
      skills: '',
      details: '',
    },
  })

  const jobTitle = watch('jobTitle')
  const company = watch('company')
  const details = watch('details')

  async function onSubmit(data: FormValues) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const letter = generateCoverLetter(data.company, data.jobTitle, data.skills, data.details)
    setGeneratedLetter(letter)
    saveApplication(letter)
    setCopied(false)
    setIsLoading(false)
  }

  async function handleCopy() {
    if (!generatedLetter) return
    await navigator.clipboard.writeText(generatedLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="mx-auto px-8 py-8" style={{ maxWidth: 'var(--content-width)' }}>
      <h1 className="mb-1 font-semibold text-gray-900" style={{ fontSize: '48px' }}>
        {jobTitle && company ? `${jobTitle}, ${company}` : jobTitle || 'New application'}
      </h1>

      <hr className="mb-6 border-gray-200" />

      <div className="flex gap-6">
        <form className="flex flex-1 flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                id="job-title"
                label="Job title"
                type="text"
                placeholder="Product manager"
                {...register('jobTitle', { required: true })}
              />
            </div>

            <div className="flex-1">
              <Input
                id="company"
                label="Company"
                type="text"
                placeholder="Apple"
                {...register('company', { required: true })}
              />
            </div>
          </div>

          <Input
            id="skills"
            label="I am good at..."
            type="text"
            placeholder="HTML, CSS and doing things in time"
            {...register('skills', { required: true })}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="details">
              Additional details
            </label>
            <textarea
              id="details"
              placeholder="Describe why you are a great fit or paste your bio"
              rows={10}
              {...register('details', { maxLength: MAX_DETAILS_LENGTH })}
              className="resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-400">
              {(details ?? '').length}/{MAX_DETAILS_LENGTH}
            </span>
          </div>

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full rounded-lg py-3 text-sm font-semibold transition-colors"
            style={{
              backgroundColor: isValid && !isLoading ? 'var(--dark-green)' : '#d1d5db',
              color: isValid && !isLoading ? '#fff' : '#9ca3af',
              cursor: isValid && !isLoading ? 'pointer' : 'not-allowed',
            }}
          >
            {isLoading ? <Spinner /> : 'Generate Now'}
          </button>
        </form>

        <CoverLetterPreview generatedLetter={generatedLetter} copied={copied} onCopy={handleCopy} />
      </div>
    </main>
  )
}
