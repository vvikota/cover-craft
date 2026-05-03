import { parseCoverLetter } from '../utils/parseCoverLetter'

interface ApplicationCardProps {
  id: string
  text: string
  onDelete: (id: string) => void
}

export function ApplicationCard({ id, text, onDelete }: ApplicationCardProps) {
  const { greeting, body } = parseCoverLetter(text)

  return (
    <div className="flex flex-col justify-between rounded-2xl bg-gray-100 p-5">
      <div className="relative mb-4 overflow-hidden">
        <p className="mb-2 text-sm font-semibold text-gray-800">{greeting}</p>
        <p className="line-clamp-4 text-sm leading-relaxed text-gray-600">{body}</p>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-100 to-transparent" />
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-3">
        <button
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700"
          onClick={() => onDelete(id)}
        >
          <img src="/icons/trash.svg" alt="trash icon" height={20} />
          Delete
        </button>

        <button className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700">
          Copy to clipboard
          <img src="/icons/copy.svg" alt="copy icon" height={20} />
        </button>
      </div>
    </div>
  )
}
