import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Header } from './components/Header'
import { Applications } from './pages/Applications'
import { EditApplication } from './pages/EditApplication'
import { ROUTES } from './routes'

const COVER_LETTERS_GOAL = 5

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Header coverLettersGoal={COVER_LETTERS_GOAL} />
          <Routes>
            <Route
              path={ROUTES.APPLICATIONS}
              element={<Applications coverLettersGoal={COVER_LETTERS_GOAL} />}
            />
            <Route path={ROUTES.EDIT_APPLICATION} element={<EditApplication />} />
            <Route path="*" element={<Navigate to={ROUTES.APPLICATIONS} replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
