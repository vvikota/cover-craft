import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../components/Input'
import { Spinner } from '../components/Spinner'
import { CoverLetterPreview } from '../components/CoverLetterPreview'
import { GoalBanner } from '../components/GoalBanner'
import { useCoverLetter } from '../hooks/useCoverLetter'

const MAX_DETAILS_LENGTH = 1200
const DEFAULT_LETTER_FIELD_WIDTH = 80

interface FormValues {
  jobTitle: string
  company: string
  skills: string
  details: string
}

export function CreateApplication() {
  const [fieldWidth, setFieldWidth] = useState(DEFAULT_LETTER_FIELD_WIDTH)
  const {
    register,
    handleSubmit,
    watch,
    reset,
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

  const {
    generatedLetter,
    copied,
    isLoading,
    showBanner,
    coverLettersCount,
    coverLettersGoal,
    error,
    onSubmit,
    handleCopy,
    handleTryAgain,
  } = useCoverLetter(reset, fieldWidth)

  const jobTitle = watch('jobTitle')
  const company = watch('company')
  const details = watch('details')

  const isCompleted = !!generatedLetter && !isLoading

  return (
    <main
      className="mx-auto px-4 py-6 sm:px-8 sm:py-8"
      style={{ maxWidth: 'var(--content-width)' }}
    >
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="min-w-0 sm:w-1/2">
          <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h1 className="mb-3 break-words text-3xl font-semibold text-gray-900 sm:text-5xl">
                {jobTitle && company ? `${jobTitle}, ${company}` : jobTitle || 'New application'}
              </h1>

              <hr className="mb-2 border-gray-200" />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
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
                className={`resize-none rounded-[var(--control-border-radius)] border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none ${
                  (details ?? '').length > MAX_DETAILS_LENGTH
                    ? 'border-red-300 focus:border-red-300 focus:ring-4 focus:ring-red-100'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                }`}
              />
              <span
                className={`text-xs ${
                  (details ?? '').length > MAX_DETAILS_LENGTH ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                {(details ?? '').length}/{MAX_DETAILS_LENGTH}
              </span>
            </div>

            {isCompleted ? (
              <button
                type="button"
                onClick={handleTryAgain}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--control-border-radius)] border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
              >
                <img src="/icons/refresh.svg" alt="refresh icon" width={16} height={16} />
                Try Again
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="w-full rounded-[var(--control-border-radius)] py-3 text-sm font-semibold"
                style={{
                  backgroundColor: isValid ? 'var(--dark-green)' : 'var(--color-gray-300)',
                  color: isValid ? 'var(--color-white)' : 'var(--color-gray-400)',
                  cursor: isValid && !isLoading ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.2s, color 0.2s',
                }}
              >
                {isLoading ? <Spinner /> : 'Generate Now'}
              </button>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </div>

        <div className="min-w-0 sm:flex sm:w-1/2">
          <CoverLetterPreview
            generatedLetter={generatedLetter}
            copied={copied}
            isLoading={isLoading}
            onCopy={handleCopy}
            onFieldWidthChange={setFieldWidth}
          />
        </div>
      </div>

      {showBanner && (
        <div className="mt-8">
          <GoalBanner
            coverLettersGoal={coverLettersGoal}
            coverLettersGenerated={coverLettersCount}
          />
        </div>
      )}
    </main>
  )
}
