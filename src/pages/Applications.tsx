import { useEffect, useState } from 'react'
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

  useEffect(() => {
    function handleStorageUpdated() {
      setApplications(getApplications())
    }

    window.addEventListener('storage-updated', handleStorageUpdated)
    return () => window.removeEventListener('storage-updated', handleStorageUpdated)
  }, [])

  function handleDelete(id: string) {
    const shouldDelete = window.confirm('Delete this application? This action cannot be undone.')
    if (!shouldDelete) return

    deleteApplication(id)
    setApplications(getApplications())
  }

  return (
    <main
      className="mx-auto px-4 py-6 sm:px-8 sm:py-8"
      style={{ maxWidth: 'var(--content-width)' }}
    >
      <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
        <h1 className="text-3xl font-semibold text-gray-900 sm:text-5xl">Applications</h1>
        <Button
          text="Create New"
          size="medium"
          icon="/icons/plus.svg"
          iconAlt="plus icon"
          onClick={() => navigate(ROUTES.CREATE_APPLICATION)}
        />
      </div>

      {applications.length > 0 && (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {applications.map((app) => (
            <ApplicationCard key={app.id} id={app.id} text={app.text} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {applications.length < coverLettersGoal && (
        <GoalBanner
          coverLettersGoal={coverLettersGoal}
          coverLettersGenerated={applications.length}
        />
      )}
    </main>
  )
}
