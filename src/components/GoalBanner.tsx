import { useNavigate } from 'react-router-dom'
import { Button } from './Button'
import { ROUTES } from '../routes'

interface GoalBannerProps {
  coverLettersGoal: number
  coverLettersGenerated: number
}

export function GoalBanner({ coverLettersGoal, coverLettersGenerated }: GoalBannerProps) {
  const navigate = useNavigate()

  return (
    <div className="rounded-2xl p-8" style={{ backgroundColor: 'var(--light-green)' }}>
      <div className="mx-auto max-w-sm rounded-xl px-8 py-6 text-center">
        <h2 className="mb-2 font-semibold text-gray-900" style={{ fontSize: '36px' }}>
          Hit your goal
        </h2>
        <p className="mb-5 text-lg text-gray-500">
          Generate and send out couple more job applications today to get hired faster
        </p>

        <div className="mb-5">
          <Button
            text="Create New"
            size="large"
            icon="/icons/plus.svg"
            iconAlt="plus icon"
            onClick={() => navigate(ROUTES.EDIT_APPLICATION)}
          />
        </div>

        <div className="flex items-center justify-center gap-1.5">
          {Array.from({ length: coverLettersGoal }).map((_, i) => (
            <span
              key={i}
              className={`block h-1.5 rounded-full ${i < coverLettersGenerated ? 'w-8 bg-gray-800' : 'w-8 bg-gray-300'}`}
            />
          ))}
        </div>
        <p className="mt-2 text-lg text-gray-500">
          {coverLettersGenerated} out of {coverLettersGoal}
        </p>
      </div>
    </div>
  )
}
