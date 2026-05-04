import type { CSSProperties } from 'react'

interface CopyToClipboardButtonProps {
  onClick: () => void
  copied?: boolean
  disabled?: boolean
  className?: string
  style?: CSSProperties
  iconSize?: number
}

export function CopyToClipboardButton({
  onClick,
  copied = false,
  disabled = false,
  className = '',
  style,
  iconSize = 20,
}: CopyToClipboardButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${className}`}
      style={style}
    >
      {copied ? 'Copied!' : 'Copy to clipboard'}
      <img src="/icons/copy.svg" alt="copy icon" width={iconSize} height={iconSize} />
    </button>
  )
}
