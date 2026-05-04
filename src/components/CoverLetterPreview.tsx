import { EllipseLoader } from './EllipseLoader'

interface CoverLetterPreviewProps {
  generatedLetter: string
  copied: boolean
  isLoading?: boolean
  onCopy: () => void
}

export function CoverLetterPreview({
  generatedLetter,
  copied,
  isLoading,
  onCopy,
}: CoverLetterPreviewProps) {
  return (
    <div
      className="flex flex-1 flex-col justify-between rounded-xl p-6"
      style={{ backgroundColor: 'var(--color-gray-100)', minHeight: '480px' }}
    >
      {isLoading ? (
        <EllipseLoader />
      ) : generatedLetter ? (
        <p className="whitespace-pre-wrap text-sm text-gray-900">{generatedLetter}</p>
      ) : (
        <p className="text-sm text-gray-400">
          Your personalized job application will appear here...
        </p>
      )}

      {!isLoading && (
        <div className="flex justify-end">
          <button
            onClick={onCopy}
            disabled={!generatedLetter}
            className="flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{
              color: generatedLetter
                ? copied
                  ? 'var(--dark-green)'
                  : 'var(--color-gray-700)'
                : 'var(--color-gray-400)',
              cursor: generatedLetter ? 'pointer' : 'not-allowed',
            }}
          >
            {copied ? 'Copied!' : 'Copy to clipboard'}
            <img src="/icons/copy.svg" alt="copy icon" />
          </button>
        </div>
      )}
    </div>
  )
}
