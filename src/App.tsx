import About from './components/About'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import Education from './components/Education'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import Projects from './components/Projects'
import ScrollProgress from './components/ScrollProgress'
import Skills from './components/Skills'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return <ThemeProvider><Preloader /><CustomCursor /><div className="grain-overlay" aria-hidden="true" /><ScrollProgress /><Navbar /><main><Hero /><About /><Skills /><Projects /><Experience /><Education /><Contact /></main><Footer /></ThemeProvider>
}

export default App
