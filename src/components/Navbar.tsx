import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { easeOutExpo } from '../lib/animations'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-25% 0px -65% 0px' },
    )
    navLinks.forEach(({ href }) => {
      const element = document.querySelector(href)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: easeOutExpo }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-x-0 border-t-0 shadow-lg shadow-black/5' : ''}`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <button onClick={() => handleNavClick('#hero')} className="group flex min-h-11 items-center gap-2" aria-label="Go to top">
          <span className="font-mono text-lg font-semibold accent-text">&lt;RTB /&gt;</span>
          <span className="hidden text-sm font-medium text-muted transition-colors group-hover:text-[var(--text)] sm:inline">Rahul Bainade</span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`relative min-h-11 rounded-md px-3 text-sm transition-colors hover:text-[var(--text)] ${activeSection === link.href.slice(1) ? 'accent-text' : 'text-muted'}`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <motion.span layoutId="active-nav" className="absolute bottom-1 left-3 right-3 h-0.5 accent-bg" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="relative flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={theme} initial={{ opacity: 0, rotate: -90, scale: 0.5 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.5 }} transition={{ duration: 0.25 }}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a href="/resume.pdf" download className="btn-primary hidden min-h-11 px-4 text-sm sm:inline-flex"><Download size={16} /> Resume</a>
          <button onClick={() => setMobileOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-lg text-muted lg:hidden" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
            <span className="relative flex h-5 w-5 items-center justify-center">
              <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 0 : -6 }} className="absolute h-0.5 w-5 accent-bg" />
              <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="absolute h-0.5 w-5 accent-bg" />
              <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? 0 : 6 }} className="absolute h-0.5 w-5 accent-bg" />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: '100vh' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: easeOutExpo }} className="glass overflow-hidden lg:hidden">
            <nav className="flex flex-col gap-2 px-6 pt-8" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <motion.button key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06, ease: easeOutExpo }} onClick={() => handleNavClick(link.href)} className="flex min-h-14 items-center border-b text-left text-2xl font-semibold">
                  <span className={activeSection === link.href.slice(1) ? 'accent-text' : ''}>{link.label}</span>
                </motion.button>
              ))}
              <a href="/resume.pdf" download onClick={() => setMobileOpen(false)} className="btn-primary mt-6 w-full"><Download size={18} /> Download Resume</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
