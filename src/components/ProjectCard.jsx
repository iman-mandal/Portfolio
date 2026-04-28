'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, Code2, Linkedin, Calendar, Sparkles, Rocket } from 'lucide-react'

const hoverVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

// Category configurations for better maintainability
const categoryConfig = {
  web: {
    name: 'Web App',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    border: 'hover:border-cyan-500/30',
    badge: 'bg-cyan-500/20 text-cyan-300',
    badgeHover: 'hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200',
    icon: <Code2 className="h-3 w-3" />,
    glow: 'from-cyan-500 to-blue-500'
  },
  mobile: {
    name: 'Mobile App',
    gradient: 'from-violet-500/20 to-purple-500/20',
    border: 'hover:border-violet-500/30',
    badge: 'bg-violet-500/20 text-violet-300',
    badgeHover: 'hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-200',
    icon: <Sparkles className="h-3 w-3" />,
    glow: 'from-violet-500 to-purple-500'
  },
  ai: {
    name: 'AI/ML',
    gradient: 'from-fuchsia-500/20 to-pink-500/20',
    border: 'hover:border-fuchsia-500/30',
    badge: 'bg-fuchsia-500/20 text-fuchsia-300',
    badgeHover: 'hover:border-fuchsia-400/50 hover:bg-fuchsia-500/10 hover:text-fuchsia-200',
    icon: <Rocket className="h-3 w-3" />,
    glow: 'from-fuchsia-500 to-pink-500'
  },
  default: {
    name: 'Project',
    gradient: 'from-cyan-500/20 to-violet-500/20',
    border: 'hover:border-cyan-500/30',
    badge: 'bg-cyan-500/20 text-cyan-300',
    badgeHover: 'hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200',
    icon: <Code2 className="h-3 w-3" />,
    glow: 'from-cyan-500 to-violet-500'
  }
}

export default function ProjectCard({ project, index = 0 }) {
  // Determine category based on project tags or title
  const determineCategory = () => {
    if (project.tags?.some(tag => ['react', 'next', 'vue', 'angular'].includes(tag.toLowerCase()))) {
      return 'web'
    }
    if (project.tags?.some(tag => ['react native', 'flutter', 'mobile'].includes(tag.toLowerCase()))) {
      return 'mobile'
    }
    if (project.tags?.some(tag => ['ai', 'ml', 'openai', 'tensorflow'].includes(tag.toLowerCase()))) {
      return 'ai'
    }
    return 'default'
  }

  const config = categoryConfig[project.category] || categoryConfig[determineCategory()]

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover="hover"
      variants={hoverVariants}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${config.gradient} bg-slate-950/90 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 ${config.border} hover:shadow-2xl lg:p-8`}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-500/20 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-violet-500/20 blur-[100px]" />
      </div>

      {/* Project Image Background (if available) */}
      {project.image && (
        <div className="absolute top-0 right-0 h-32 w-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <img src={project.image} alt="" className="h-full w-full object-cover" />
        </div>
      )}

      {/* Category Badge */}
      <div className="absolute top-4 right-4 z-20">
        <div className={`inline-flex items-center gap-1.5 rounded-full ${config.badge} px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm`}>
          {config.icon}
          <span>{config.name}</span>
        </div>
      </div>

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-2 left-4 z-20">
          <div className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-1 backdrop-blur-sm">
            <Star className="h-3 w-3 text-amber-400 animate-pulse" />
            <span className="text-[10px] font-medium text-amber-300">Featured</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4">
        {/* Title Section */}
        <div className="pr-20">
          <div className="flex items-center gap-2 mb-3">
            <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${config.glow}`} />
            <span className="text-xs text-slate-500 font-mono">
              {project.stats?.date || project.year || `Project ${String(index + 1).padStart(2, '0')}`}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-violet-400 group-hover:bg-clip-text lg:text-3xl">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-300 line-clamp-3 lg:text-base">
          {project.description}
        </p>

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <div className={`h-px w-4 bg-gradient-to-r ${config.glow}`} />
              Key Features
            </div>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {project.features?.slice(0, 4).map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-2 text-xs text-slate-400 group-hover:text-slate-300 transition-colors"
                >
                  <span className="mt-0.5 text-cyan-400">▹</span>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          {project.tags?.slice(0, 5).map((tag, i) => (
            <motion.span
              key={`${tag}-${i}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.03 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 ${config.badgeHover} cursor-default`}
            >
              {tag}
            </motion.span>
          ))}
          {project.tags?.length > 5 && (
            <span className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-xs text-slate-500">
              +{project.tags.length - 5} more
            </span>
          )}
        </div>

        {/* Project Stats */}
        <div className="flex flex-wrap gap-4 pt-1 border-t border-white/5 mt-1">
          {project.stats?.githubStars > 0 && (
            <div className="flex items-center gap-1.5 group/stat">
              <Star className="h-3 w-3 text-amber-400" />
              <span className="text-xs text-slate-500 group-hover/stat:text-slate-400 transition-colors">
                {project.stats.githubStars} stars
              </span>
            </div>
          )}
          {project.stats?.forks > 0 && (
            <div className="flex items-center gap-1.5 group/stat">
              <Code2 className="h-3 w-3 text-cyan-400" />
              <span className="text-xs text-slate-500 group-hover/stat:text-slate-400 transition-colors">
                {project.stats.forks} forks
              </span>
            </div>
          )}
          {project.stats?.date && (
            <div className="flex items-center gap-1.5 group/stat">
              <Calendar className="h-3 w-3 text-violet-400" />
              <span className="text-xs text-slate-500 group-hover/stat:text-slate-400 transition-colors">
                {project.stats.date}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-3 mt-auto">
          {project.github && project.github !== "" && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200 hover:shadow-lg"
            >
              <Github size={15} />
              Source Code
            </motion.a>
          )}
          
          {project.linkedin && project.linkedin !== "" && (
            <motion.a
              href={project.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition-all duration-300 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-200 hover:shadow-lg"
            >
              <Linkedin size={15} />
              LinkedIn
            </motion.a>
          )}
          
          {project.live && project.live !== "" && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40"
            >
              Live Demo
              <ExternalLink size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Animated corner accent */}
      <div className={`absolute -bottom-2 -right-2 h-20 w-20 bg-gradient-to-r ${config.glow} opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-20`} />

      {/* Hover gradient footer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Subtle border animation on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-cyan-500/20" />
    </motion.article>
  )
}