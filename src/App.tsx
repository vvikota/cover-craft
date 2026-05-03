import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Applications } from './pages/Applications'

const TOTAL_STEPS = 5
const CURRENT_STEP = 3

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header totalSteps={TOTAL_STEPS} currentStep={CURRENT_STEP} />
        <Routes>
          <Route
            path="/applications"
            element={<Applications totalSteps={TOTAL_STEPS} currentStep={CURRENT_STEP} />}
          />
          <Route path="*" element={<Navigate to="/applications" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
