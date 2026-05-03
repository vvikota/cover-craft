import { ApplicationCard } from '../components/ApplicationCard'
import { GoalBanner } from '../components/GoalBanner'

const COVER_LETTER_TEXT =
  'I am a highly skilled product designer with a passion for creating intuitive, user-centered designs. I have a strong background in design systems and am excited about the opportunity to join the Stripe product design team and wor...'

const applications = [
  { id: 1, text: COVER_LETTER_TEXT },
  { id: 2, text: COVER_LETTER_TEXT },
  { id: 3, text: COVER_LETTER_TEXT },
]

interface ApplicationsProps {
  totalSteps: number
  currentStep: number
}

export function Applications({ totalSteps, currentStep }: ApplicationsProps) {
  return (
    <main className="mx-auto px-8 py-8" style={{ maxWidth: 'var(--content-width)' }}>
      <div className="mb-6 flex items-center justify-between">
        <h1
          className="font-semibold text-gray-900"
          style={{ fontFamily: "'Fixel Display', sans-serif", fontSize: '48px' }}
        >
          Applications
        </h1>
        <button
          className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: 'var(--dark-green)' }}
        >
          <img src="/icons/plus.svg" alt="home icon" height={48} />
          Create New
        </button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        {applications.map((app) => (
          <ApplicationCard key={app.id} text={app.text} />
        ))}
      </div>

      <GoalBanner totalSteps={totalSteps} currentStep={currentStep} />
    </main>
  )
}
