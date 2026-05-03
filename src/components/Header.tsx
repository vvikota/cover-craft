import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes'
import { getApplications } from '../utils/storage'

interface HeaderProps {
  coverLettersGoal: number
}

export function Header({ coverLettersGoal }: HeaderProps) {
  const navigate = useNavigate()
  const [coverLettersGenerated, setCoverLettersGenerated] = useState(() => getApplications().length)

  useEffect(() => {
    function handleStorageChange() {
      setCoverLettersGenerated(getApplications().length)
    }

    window.addEventListener('storage-updated', handleStorageChange)
    return () => window.removeEventListener('storage-updated', handleStorageChange)
  }, [])

  return (
    <header className="flex items-center justify-between border-b border-gray-100 px-8 py-4">
      <div className="flex items-center">
        <img src="/icons/logo.svg" alt="logo" height={48} />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">
          {coverLettersGenerated}/{coverLettersGoal} applications generated
        </span>

        {coverLettersGenerated >= 5 ? (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
            <img src="/icons/check.svg" alt="check icon" className="h-4 w-4" />
          </div>
        ) : (
          <div className="flex items-center gap-1">
            {Array.from({ length: coverLettersGoal }).map((_, i) => (
              <span
                key={i}
                className={`block h-2.5 w-2.5 rounded-full ${i < coverLettersGenerated ? 'bg-gray-800' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        )}

        <button
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-50"
          aria-label="Home"
          onClick={() => navigate(ROUTES.APPLICATIONS)}
        >
          <img src="/icons/home.svg" alt="home icon" />
        </button>
      </div>
    </header>
  )
}
