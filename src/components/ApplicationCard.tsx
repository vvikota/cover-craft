import { useState } from 'react'
import { parseCoverLetter } from '../utils/parseCoverLetter'
import { CopyToClipboardButton } from './CopyToClipboardButton'

interface ApplicationCardProps {
  id: string
  text: string
  onDelete: (id: string) => void
}

export function ApplicationCard({ id, text, onDelete }: ApplicationCardProps) {
  const { greeting, body } = parseCoverLetter(text)
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col justify-between rounded-[12px] bg-gray-100 p-5">
      <div className="relative mb-4 overflow-hidden">
        <p className="mb-2 break-words text-[18px] font-normal text-[var(--color-gray-500)]">
          {greeting}
        </p>
        <p className="line-clamp-4 break-words text-[18px] font-normal leading-relaxed text-[var(--color-gray-500)]">
          {body}
        </p>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-100 to-transparent" />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[var(--color-gray-600)] transition-colors hover:text-gray-700"
          onClick={() => onDelete(id)}
        >
          <img src="/icons/trash.svg" alt="trash icon" height={20} />
          Delete
        </button>

        <CopyToClipboardButton
          onClick={handleCopy}
          copied={copied}
          className="cursor-pointer text-[var(--color-gray-600)] hover:text-gray-700"
        />
      </div>
    </div>
  )
}
