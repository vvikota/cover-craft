import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApplicationCard } from '../components/ApplicationCard'
import { Button } from '../components/Button'
import { GoalBanner } from '../components/GoalBanner'
import { ROUTES } from '../routes'
import { deleteApplication, getApplications } from '../utils/storage'

interface ApplicationsProps {
  coverLettersGoal: number
}

export function Applications({ coverLettersGoal }: ApplicationsProps) {
  const navigate = useNavigate()
  const [applications, setApplications] = useState(getApplications)

  function handleDelete(id: string) {
    deleteApplication(id)
    setApplications(getApplications())
  }

  return (
    <main className="mx-auto px-8 py-8" style={{ maxWidth: 'var(--content-width)' }}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-semibold text-gray-900" style={{ fontSize: '48px' }}>
          Applications
        </h1>
        <Button
          text="Create New"
          size="medium"
          icon="/icons/plus.svg"
          iconAlt="plus icon"
          onClick={() => navigate(ROUTES.EDIT_APPLICATION)}
        />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        {applications.map((app) => (
          <ApplicationCard key={app.id} id={app.id} text={app.text} onDelete={handleDelete} />
        ))}
      </div>

      {applications.length < 5 && (
        <GoalBanner
          coverLettersGoal={coverLettersGoal}
          coverLettersGenerated={applications.length}
        />
      )}
    </main>
  )
}
