import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import UnderConstruction from './pages/UnderConstruction.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Menu from './components/Menu.jsx'
import CursorFollower from './components/CursorFollower.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-dark text-fg">
        <header className="sticky top-0 z-40 border-b backdrop-blur border-border/60 bg-bg-dark/70">
          <nav className="flex items-center justify-between h-16 container-max">
            <NavLink to="/preview" className="flex items-center gap-2 text-base font-display">
              <span className="inline-flex w-2 h-2 rounded-full bg-accent"></span>
              <span className="tracking-wide">ALAIN IREBE</span>
            </NavLink>
            {/* <Menu /> */}
          </nav>
        </header>

        <main className="py-12 container-max">
          <Routes>
            <Route path="/" element={<UnderConstruction />} />
            <Route path="/preview" element={<Home />} />
            <Route path="/preview/about" element={<About />} />
            <Route path="/preview/projects" element={<Projects />} />
          </Routes>
        </main>

        <footer className="border-t border-border/60 bg-bg-dark/70">
          <div className="flex flex-col gap-6 py-10 text-sm container-max md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-lg font-display">Let’s build something great</div>
              <p className="subtle">© {new Date().getFullYear()} Alain IREBE GASHUMBA</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a className="px-3 py-2 transition border rounded-full border-border hover:border-accent" href="#" data-cursor-link>GitHub</a>
              <a className="px-3 py-2 transition border rounded-full border-border hover:border-accent" href="#" data-cursor-link>LinkedIn</a>
              <a className="px-3 py-2 transition border rounded-full border-border hover:border-accent" href="#" data-cursor-link>X</a>
            </div>
          </div>
        </footer>
      </div>
      <CursorFollower />
    </BrowserRouter>
  )
}

export default App
