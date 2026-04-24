'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, GraduationCap, Calendar, MapPin, Award } from 'lucide-react'
import { experience } from '../data/experience'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Experience() {
  const sectionRef = useRef(null)

  return (
    <motion.section
      ref={sectionRef}
      id="experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="relative rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-2xl lg:p-10 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-20 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.32em] text-cyan-300/80 backdrop-blur-sm">
            <Award className="h-3 w-3" />
            Timeline
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
        </div>
      </div>

      <div className="mt-12 space-y-6">
        {experience.map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            whileHover="hover"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-500/10 lg:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-violet-500/0 opacity-0 transition-opacity duration-500 group-hover:from-cyan-500/5 group-hover:via-cyan-500/5 group-hover:to-violet-500/5 group-hover:opacity-100" />

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 p-2.5 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-cyan-500/20">
                  {item.type === 'work' ? (
                    <Briefcase className="h-5 w-5 text-cyan-300" />
                  ) : (
                    <GraduationCap className="h-5 w-5 text-violet-300" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-cyan-100 lg:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-cyan-200/80">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-200 backdrop-blur-sm">
                  <Calendar className="h-3 w-3" />
                  {item.period}
                </span>

                {item.location && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-700/30 px-3 py-1.5 text-xs text-slate-300 backdrop-blur-sm">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </span>
                )}

                {/* ✅ SCORE ADDED HERE */}
                {item.score && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-200 backdrop-blur-sm">
                    🎓 {item.score}
                  </span>
                )}
              </div>
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 lg:text-base">
              {item.description}
            </p>

            {item.skills && item.skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-300 transition-all duration-200 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}