'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { bp } from '@/lib/bp'
import { useTheme } from './ThemeProvider'

const navLinks = ['Services', 'Portfolio', 'About', 'Process', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.toLowerCase())).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled || menuOpen
            ? 'backdrop-blur-2xl bg-[#F2EDE6]/85 dark:bg-[#0F0D0B]/85 border-b border-[#8C857C]/15 dark:border-white/10 shadow-sm shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>

          <a href="/" className="group">
            <span className="inline-flex items-center bg-[#F2EDE6] rounded-sm">
              <img src={bp('/logo.png.jpeg')} alt="Criador" className="h-8 w-auto" style={{ mixBlendMode: 'multiply' }} />
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full hover:bg-[#2E2A26]/5 dark:hover:bg-white/5 ${
                  activeSection === item.toLowerCase()
                    ? 'text-[#B5552A] font-semibold'
                    : 'text-[#8C857C] hover:text-[#2E2A26] dark:hover:text-[#F2EDE6]'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Light / Dark toggle */}
            <motion.button
              onClick={toggle}
              whileTap={{ scale: 0.88 }}
              aria-label="Toggle theme"
              className="relative w-14 h-7 rounded-full border border-[#8C857C]/30 dark:border-white/15 bg-[#E8E3DC] dark:bg-[#1A1714] transition-colors duration-300 flex items-center px-1"
            >
              {/* Track icons */}
              <span className="absolute left-1.5 text-[10px]">☀️</span>
              <span className="absolute right-1.5 text-[10px]">🌙</span>
              {/* Thumb */}
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="relative z-10 w-5 h-5 rounded-full bg-white dark:bg-[#B5552A] shadow-sm flex items-center justify-center"
                style={{ marginLeft: theme === 'dark' ? 'auto' : '0' }}
              />
            </motion.button>

            <motion.a
              href="#contact"
              whileTap={{ scale: 0.94 }}
              className="hidden md:inline-block px-5 py-2.5 rounded-full bg-[#B5552A] text-white text-sm font-semibold transition-all duration-200 hover:bg-[#9E4822] hover:scale-105 active:scale-95 relative"
            >
              {scrolled && (
                <span className="absolute inset-0 rounded-full animate-ping bg-[#B5552A]/30 pointer-events-none" style={{ animationDuration: '2s' }} />
              )}
              Book Consultation
            </motion.a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-[#2E2A26] dark:bg-[#F2EDE6] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[#2E2A26] dark:bg-[#F2EDE6] transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[#2E2A26] dark:bg-[#F2EDE6] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[64px] inset-x-0 z-40 bg-[#F2EDE6]/96 dark:bg-[#0F0D0B]/96 backdrop-blur-2xl border-b border-[#8C857C]/15 dark:border-white/10 md:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-1" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
              {navLinks.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-base font-medium text-[#8C857C] hover:text-[#2E2A26] dark:hover:text-[#F2EDE6] transition-colors py-3 px-2 border-b border-[#8C857C]/10 dark:border-white/8 last:border-0"
                >
                  {item}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 w-full py-3.5 rounded-full bg-[#B5552A] hover:bg-[#9E4822] text-white text-sm font-semibold transition-all text-center block"
              >
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
