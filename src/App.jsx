import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import FiliTV from './pages/FiliTV'
import Coding from './pages/Coding'
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects/fili-tv" element={<FiliTV />} />
        <Route path="/projects/coding" element={<Coding />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}
