import { useEffect, useRef } from 'react'
import { CopyToClipboardButton } from './CopyToClipboardButton'
import { EllipseLoader } from './EllipseLoader'

const MIN_LETTER_FIELD_WIDTH = 20
const AVG_CHAR_WIDTH_RATIO = 0.55

interface CoverLetterPreviewProps {
  generatedLetter: string
  copied: boolean
  isLoading?: boolean
  onCopy: () => void
  onFieldWidthChange?: (width: number) => void
}

export function CoverLetterPreview({
  generatedLetter,
  copied,
  isLoading,
  onCopy,
  onFieldWidthChange,
}: CoverLetterPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!onFieldWidthChange || !containerRef.current) return

    const container = containerRef.current
    const updateWidth = () => {
      const computedStyles = window.getComputedStyle(container)
      const paddingLeft = Number.parseFloat(computedStyles.paddingLeft) || 0
      const paddingRight = Number.parseFloat(computedStyles.paddingRight) || 0
      const contentWidth = container.clientWidth - paddingLeft - paddingRight
      const fontSize = Number.parseFloat(computedStyles.fontSize) || 14

      const dynamicWidth = Math.max(
        MIN_LETTER_FIELD_WIDTH,
        Math.floor(contentWidth / (fontSize * AVG_CHAR_WIDTH_RATIO))
      )

      onFieldWidthChange(dynamicWidth)
    }

    updateWidth()

    const observer = new ResizeObserver(updateWidth)
    observer.observe(container)

    return () => observer.disconnect()
  }, [onFieldWidthChange])

  return (
    <div
      ref={containerRef}
      className="flex h-full min-w-0 w-full flex-1 flex-col justify-between rounded-xl p-6"
      style={{ backgroundColor: 'var(--color-gray-100)', minHeight: 'clamp(240px, 50vw, 480px)' }}
    >
      {isLoading ? (
        <EllipseLoader />
      ) : generatedLetter ? (
        <p className="min-w-0 whitespace-pre-wrap break-words text-sm text-gray-900 [overflow-wrap:anywhere]">
          {generatedLetter}
        </p>
      ) : (
        <p className="text-sm text-gray-400">
          Your personalized job application will appear here...
        </p>
      )}

      {!isLoading && (
        <div className="flex justify-end">
          <CopyToClipboardButton
            onClick={onCopy}
            copied={copied}
            disabled={!generatedLetter}
            className="gap-2 cursor-pointer disabled:cursor-not-allowed"
          />
        </div>
      )}
    </div>
  )
}
