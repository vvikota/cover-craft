interface HeaderProps {
  totalSteps: number
  currentStep: number
}

export function Header({ totalSteps, currentStep }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 px-8 py-4">
      <div className="flex items-center">
        <img src="/icons/logo.svg" alt="Alt+Shift logo" height={48} />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">
          {currentStep}/{totalSteps} applications generated
        </span>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`block h-2.5 w-2.5 rounded-full ${i < currentStep ? 'bg-gray-800' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-50"
          aria-label="Home"
        >
          <img src="/icons/home.svg" alt="home icon" />
        </button>
      </div>
    </header>
  )
}
