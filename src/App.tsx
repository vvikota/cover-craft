import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Header } from './components/Header'
import { Applications } from './pages/Applications'
import { CreateApplication } from './pages/CreateApplication'
import { ROUTES } from './routes'

const COVER_LETTERS_GOAL = 5

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen min-w-0 bg-white">
          <Header coverLettersGoal={COVER_LETTERS_GOAL} />
          <Routes>
            <Route
              path={ROUTES.APPLICATIONS}
              element={<Applications coverLettersGoal={COVER_LETTERS_GOAL} />}
            />
            <Route path={ROUTES.CREATE_APPLICATION} element={<CreateApplication />} />
            <Route path="*" element={<Navigate to={ROUTES.APPLICATIONS} replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
