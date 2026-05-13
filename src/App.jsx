import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FiliTV from './pages/FiliTV'
import Coding from './pages/Coding'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/fili-tv" element={<FiliTV />} />
        <Route path="/projects/coding" element={<Coding />} />
      </Routes>
    </>
  )
}
