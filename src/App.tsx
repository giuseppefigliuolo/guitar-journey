import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import LessonView from './pages/LessonView'
import ChordLibrary from './pages/ChordLibrary'
import TrainerPage from './pages/TrainerPage'
import { useVersionCheck } from './hooks/useVersionCheck'

export default function App() {
  useVersionCheck()

  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lezione/:day" element={<LessonView />} />
          <Route path="/trainer" element={<TrainerPage />} />
          <Route path="/accordi" element={<ChordLibrary />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
