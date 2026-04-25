import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Rocket, ChevronDown, FileText, Star, Orbit } from 'lucide-react'
import { useRef, useState, useEffect, lazy, Suspense } from 'react'
import useTypingText from '../hooks/useTypingText'

const ThreeScene = lazy(() => import('./ThreeScene'))

const roles = [
  'CSE Student',
  'MERN Stack Developer',
  'React Developer',
  'Data Structures & Algorithms Enthusiast',
  'Problem Solver',
  'Competitive Programming Learner',
  'Space Explorer'
]

export default function Hero() {
  const typed = useTypingText(roles, 110, 2000)
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-glow backdrop-blur-2xl lg:flex lg:items-center lg:justify-between lg:p-10 min-h-[600px] lg:min-h-[700px]"
    >
      {/* 3D Solar System Scene */}
      {!isMobile && (
        <Suspense fallback={
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-cyan-400 animate-spin">
                <Orbit size={48} />
              </div>
            </div>
          </div>
        }>
          <ThreeScene />
        </Suspense>
      )}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 opacity-60" />
        <div className="absolute top-0 -left-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-20 h-96 w-96 rounded-full bg-violet-500/20 blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-[100px]" />
      </div>

      {/* Parallax effect layer */}
      <div style={{ y, opacity }} className="absolute inset-0" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl space-y-6 lg:w-1/2"
      >
        <motion.div variants={itemVariants} className="inline-flex">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            <span className="text-xs uppercase tracking-wider text-cyan-300/80">Premium Portfolio</span>
          </div>
        </motion.div>

        <motion.p variants={itemVariants} className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">
          Exploring the universe of code & design
        </motion.p>

        <motion.h1 variants={itemVariants} className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient">
            Iman Mandal
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="max-w-xl text-slate-300 sm:text-lg leading-relaxed">
          CSE Student & MERN Stack Developer building immersive applications with elegant interactions,
          beautiful visuals, and cosmic creativity.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 text-lg text-slate-200">
          <span className="font-medium bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent flex items-center gap-1">
            <Star className="h-4 w-4" /> Role:
          </span>
          <div className="group relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-xl transition-all duration-300 group-hover:blur-2xl" />
            <span className="relative inline-flex rounded-full border border-slate-600/80 bg-slate-900/70 px-5 py-2.5 text-cyan-200 shadow-lg shadow-cyan-500/10 backdrop-blur-sm">
              {typed}
              <span className="ml-0.5 animate-pulse">|</span>
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">

          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <Rocket size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            Explore Projects
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>

          {/* 📄 Resume CTA (VERY IMPORTANT FOR RECRUITERS) */}
          <motion.a
            href="https://drive.google.com/file/d/1FPmZLkn2fmxub--cw2ok9nmtEO2-6PL5/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            download
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-emerald-500/50"
          >
            <FileText size={18} className="transition-transform duration-300 group-hover:-translate-y-1" />
            Download Resume
          </motion.a>

          {/* 📬 Contact */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200 hover:shadow-lg"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <Orbit size={18} className="mr-2" />
            Contact Me
          </motion.a>

        </motion.div>

        <motion.div
          variants={itemVariants}
          className="absolute -bottom-16 left-1/2 hidden -translate-x-1/2 cursor-pointer lg:block"
          onClick={scrollToNext}
        >
          <div className="flex flex-col items-center gap-1 text-xs text-slate-400">
            <span>Explore the cosmos</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-6 right-6 hidden rounded-2xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-xl lg:block"
      >
        <div className="space-y-2 text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Fresher
          </div>
          <p className="text-xs text-slate-400">
            Experience Level
          </p>
        </div>
      </motion.div>
    </div>
  )
}