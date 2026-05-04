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
    <header className="flex items-center justify-between px-4 py-3 sm:px-8 sm:py-4">
      <div className="flex items-center">
        <img src="/icons/logo.svg" alt="logo" height={40} className="sm:h-12" />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <span className="hidden text-sm text-gray-500 sm:inline">
          {coverLettersGenerated}/{coverLettersGoal} applications generated
        </span>

        {coverLettersGenerated >= coverLettersGoal ? (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
            <img src="/icons/check.svg" alt="check icon" className="h-4 w-4" />
          </div>
        ) : (
          <div className="flex items-center gap-1">
            {Array.from({ length: coverLettersGoal }).map((_, i) => (
              <span
                key={i}
                className={`block h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5 ${i < coverLettersGenerated ? 'bg-gray-800' : 'bg-gray-300'}`}
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
