interface CoverLetterPreviewProps {
  generatedLetter: string
  copied: boolean
  onCopy: () => void
}

export function CoverLetterPreview({ generatedLetter, copied, onCopy }: CoverLetterPreviewProps) {
  return (
    <div
      className="flex flex-1 flex-col justify-between rounded-xl p-6"
      style={{ backgroundColor: '#f2f4f7', minHeight: '480px' }}
    >
      {generatedLetter ? (
        <p className="whitespace-pre-wrap text-sm text-gray-900">{generatedLetter}</p>
      ) : (
        <p className="text-sm text-gray-400">
          Your personalized job application will appear here...
        </p>
      )}

      <div className="flex justify-end">
        <button
          onClick={onCopy}
          disabled={!generatedLetter}
          className="flex items-center gap-2 text-sm font-semibold transition-colors"
          style={{
            color: generatedLetter ? (copied ? 'var(--dark-green)' : '#374151') : '#9ca3af',
            cursor: generatedLetter ? 'pointer' : 'not-allowed',
          }}
        >
          {copied ? 'Copied!' : 'Copy to clipboard'}
          <img src="/icons/copy.svg" alt="copy icon" />
        </button>
      </div>
    </div>
  )
}
