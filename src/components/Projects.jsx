'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'
import { useRef, useState, useMemo } from 'react'
import { Grid3x3, List } from 'lucide-react'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
}

export default function Projects() {
  const sectionRef = useRef(null)

  const [activeFilter, setActiveFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  // ✅ Categories
  const categories = ['all', ...new Set(projects.map(p => p.category || 'featured'))]

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects
    }
    return projects.filter(p => p.category === activeFilter)
  }, [activeFilter])

  return (
    <motion.section
      ref={sectionRef}
      id="projects"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      style={{ opacity }}
      className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-950/95 to-slate-900 p-6 shadow-2xl backdrop-blur-2xl lg:p-10 overflow-hidden"
    >

      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 -right-40 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-fuchsia-500/5 blur-[80px] animate-pulse delay-500" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cdefs%3E%3Cpattern id=%27grid%27 width=%2760%27 height=%2760%27 patternUnits=%27userSpaceOnUse%27%3E%3Cpath d=%27M60 0 L0 0 0 60%27 fill=%27none%27 stroke=%27rgba(6,182,212,0.03)%27 stroke-width=%271%27/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%27100%25%27 height=%27100%25%27 fill=%27url(%23grid)%27/%3E%3C/svg%3E')] bg-repeat" />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-8">
        <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          Projects Built
          <span className="block bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            For Scale & Polish
          </span>
        </h2>
      </div>
      {/* Filters */}
      

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setViewMode('grid')}>
          <Grid3x3 />
        </button>
        <button onClick={() => setViewMode('list')}>
          <List />
        </button>
      </div>

      {/* Projects */}
      <motion.div
        layout
        className={`gap-6 ${
          viewMode === 'grid'
            ? 'grid md:grid-cols-2'
            : 'flex flex-col'
        }`}
      >
        {filteredProjects.map((project, index) => (
          <motion.div key={project.title} layout>
            <ProjectCard project={project} index={index} />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-10">
          <p className="text-slate-400">No projects found</p>
          <button onClick={() => setActiveFilter('all')} className="mt-4 text-cyan-400">
            Reset
          </button>
        </div>
      )}

    </motion.section>
  )
}