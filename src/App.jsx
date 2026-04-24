import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [showScroll, setShowScroll] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 850)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.4 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 640)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05060d] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),transparent_25%),radial-gradient(circle_at_70%_20%,rgba(139,92,246,0.16),transparent_18%),radial-gradient(circle_at_90%_90%,rgba(14,165,233,0.12),transparent_18%)] opacity-80" />
      <Navbar activeSection={activeSection} />

      <main className="relative mx-auto flex max-w-[1200px] flex-col gap-10 px-5 pb-24 pt-28 lg:px-8">
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <Projects />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
      </main>

      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 rounded-full bg-slate-900/90 px-4 py-3 text-sm font-semibold text-white shadow-glow backdrop-blur-xl transition hover:bg-cyan-500/90 hover:text-slate-950"
          >
            Back to top
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center gap-4 rounded-[2rem] border border-white/10 bg-slate-900/90 px-8 py-8 text-center shadow-xl shadow-slate-950/40">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-cyan-400/80 border-t-transparent" />
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/90">Loading portfolio</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
