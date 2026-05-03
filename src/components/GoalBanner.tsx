interface GoalBannerProps {
  totalSteps: number
  currentStep: number
}

export function GoalBanner({ totalSteps, currentStep }: GoalBannerProps) {
  return (
    <div className="rounded-2xl p-8" style={{ backgroundColor: 'var(--light-green)' }}>
      <div className="mx-auto max-w-sm rounded-xl px-8 py-6 text-center">
        <h2
          className="mb-2 font-semibold text-gray-900"
          style={{ fontFamily: "'Fixel Display', sans-serif", fontSize: '36px' }}
        >
          Hit your goal
        </h2>
        <p className="mb-5 text-lg text-gray-500">
          Generate and send out couple more job applications today to get hired faster
        </p>

        <button
          className="mb-5 inline-flex items-center gap-2 rounded-md p-[16px] px-5 text-lg font-semibold text-white transition-colors"
          style={{ backgroundColor: 'var(--dark-green)' }}
        >
          <img src="/icons/plus.svg" alt="plus icon" width={16} height={16} />
          Create New
        </button>

        <div className="flex items-center justify-center gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`block h-1.5 rounded-full ${i < currentStep ? 'w-8 bg-gray-800' : 'w-8 bg-gray-300'}`}
            />
          ))}
        </div>
        <p className="mt-2 text-lg text-gray-500">
          {currentStep} out of {totalSteps}
        </p>
      </div>
    </div>
  )
}
