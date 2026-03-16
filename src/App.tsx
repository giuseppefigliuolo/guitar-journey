import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import LessonView from './pages/LessonView'
import ChordLibrary from './pages/ChordLibrary'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lezione/:day" element={<LessonView />} />
          <Route path="/accordi" element={<ChordLibrary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
