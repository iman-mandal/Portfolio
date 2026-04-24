import { motion, useScroll, useTransform } from 'framer-motion'
import { skills } from '../data/skills'
import { useRef, useState, useEffect, useMemo } from 'react'
import {
    Code2, Database, Cloud, Terminal, Sparkles,
    Star, TrendingUp, Award, Zap
} from 'lucide-react'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
}

// Pre-defined color mappings for Tailwind
const colorMap = {
    cyan: {
        primary: 'cyan',
        secondary: 'blue',
        glow: 'from-cyan-500 to-blue-500',
        bg: 'from-cyan-500/5 to-blue-500/5',
        border: 'border-cyan-500/30',
        text: 'text-cyan-400',
        stat: 'from-cyan-400 to-cyan-200',
        badge: 'bg-cyan-500/10',
    },
    violet: {
        primary: 'violet',
        secondary: 'purple',
        glow: 'from-violet-500 to-purple-500',
        bg: 'from-violet-500/5 to-purple-500/5',
        border: 'border-violet-500/30',
        text: 'text-violet-400',
        stat: 'from-violet-400 to-violet-200',
        badge: 'bg-violet-500/10',
    },
    fuchsia: {
        primary: 'fuchsia',
        secondary: 'pink',
        glow: 'from-fuchsia-500 to-pink-500',
        bg: 'from-fuchsia-500/5 to-pink-500/5',
        border: 'border-fuchsia-500/30',
        text: 'text-fuchsia-400',
        stat: 'from-fuchsia-400 to-fuchsia-200',
        badge: 'bg-fuchsia-500/10',
    },
    amber: {
        primary: 'amber',
        secondary: 'orange',
        glow: 'from-amber-500 to-orange-500',
        bg: 'from-amber-500/5 to-orange-500/5',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        stat: 'from-amber-400 to-amber-200',
        badge: 'bg-amber-500/10',
    },
    blue: {
        primary: 'blue',
        secondary: 'cyan',
        glow: 'from-blue-500 to-cyan-500',
        bg: 'from-blue-500/5 to-cyan-500/5',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        stat: 'from-blue-400 to-blue-200',
        badge: 'bg-blue-500/10',
    },
}

// Skill Card Component
const SkillCard = ({ category, icon, items }) => {
    const [hoveredSkill, setHoveredSkill] = useState(null)
    const cardRef = useRef(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const randomProgress = useMemo(() => `${80 + Math.floor(Math.random() * 15)}%`, [])

    const categoryMapping = {
        Frontend: colorMap.cyan,
        Backend: colorMap.violet,
        Database: colorMap.fuchsia,
        Tools: colorMap.amber,
    }

    const colors = categoryMapping[category] || colorMap.cyan
    const { glow, bg, border, text, stat, badge } = colors

    const handleMouseMove = (e) => {
        const rect = cardRef.current?.getBoundingClientRect()
        if (rect) {
            setMousePosition({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100,
            })
        }
    }

    return (
        <motion.div
            ref={cardRef}
            variants={itemVariants}
            onMouseMove={handleMouseMove}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`group relative rounded-2xl border border-white/10 bg-gradient-to-br ${bg} backdrop-blur-xl overflow-hidden`}
        >
            {/* Animated gradient background on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(6, 182, 212, 0.15) 0%, transparent 70%)`
                }}
            />

            {/* Glow effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${glow} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none`} />

            <div className="relative p-6 z-10">
                {/* Header with icon and category */}
                <div className="flex items-start justify-between mb-4">
                    <div className={`rounded-xl bg-gradient-to-br ${glow} p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {icon}
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-400 animate-pulse" />
                            <span className="text-xs text-slate-500">Proficiency</span>
                        </div>
                        <div className={`text-sm font-bold bg-gradient-to-r ${stat} bg-clip-text text-transparent`}>
                            {items.length} Skills
                        </div>
                    </div>
                </div>

                {/* Category Title */}
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${stat} bg-clip-text text-transparent mb-4`}>
                    {category}
                </h3>

                {/* Skills Grid */}
                <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                        <motion.div
                            key={skill}
                            onHoverStart={() => setHoveredSkill(i)}
                            onHoverEnd={() => setHoveredSkill(null)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="relative"
                        >
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${glow} opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 pointer-events-none`} />
                            <span className={`relative inline-block rounded-full border ${border} bg-gradient-to-r ${badge} to-transparent px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}>
                                {skill}
                            </span>
                            {hoveredSkill === i && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: -10 }}
                                    className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-[10px] text-white shadow-lg z-20"
                                >
                                    {skill}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Progress indicator */}
                <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${glow}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: randomProgress }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                        />
                    </div>
                    <Zap className={`h-3 w-3 ${text}`} />
                </div>
            </div>
        </motion.div>
    )
}

// Stat Card Component
const statColorStyles = {
    cyan: {
        wrapper: 'from-cyan-500/5 to-transparent border-cyan-500/30',
        overlay: 'from-cyan-500/0 to-cyan-500/10',
        icon: 'text-cyan-400',
        heading: 'from-cyan-400 to-cyan-200',
    },
    violet: {
        wrapper: 'from-violet-500/5 to-transparent border-violet-500/30',
        overlay: 'from-violet-500/0 to-violet-500/10',
        icon: 'text-violet-400',
        heading: 'from-violet-400 to-violet-200',
    },
    fuchsia: {
        wrapper: 'from-fuchsia-500/5 to-transparent border-fuchsia-500/30',
        overlay: 'from-fuchsia-500/0 to-fuchsia-500/10',
        icon: 'text-fuchsia-400',
        heading: 'from-fuchsia-400 to-fuchsia-200',
    },
    amber: {
        wrapper: 'from-amber-500/5 to-transparent border-amber-500/30',
        overlay: 'from-amber-500/0 to-amber-500/10',
        icon: 'text-amber-400',
        heading: 'from-amber-400 to-amber-200',
    },
}

const StatCard = ({ stat, value, label, icon: Icon, color }) => {
    const styles = statColorStyles[color] || statColorStyles.cyan

    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className={`relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${styles.wrapper} p-4 text-center group cursor-pointer`}
        >
            <div className={`absolute inset-0 bg-gradient-to-r ${styles.overlay} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <Icon className={`h-6 w-6 ${styles.icon} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
            <div className={`text-2xl font-bold bg-gradient-to-r ${styles.heading} bg-clip-text text-transparent`}>
                {value}
            </div>
            <div className="text-xs text-slate-500">{label}</div>
        </motion.div>
    )
}

// Main Skills Component
export default function Skills() {
    const sectionRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

    // Enhanced skills data with icons
    const enhancedSkills = skills.map(skill => {
        const icons = {
            Frontend: <Code2 className="h-6 w-6 text-cyan-400" />,
            Backend: <Terminal className="h-6 w-6 text-violet-400" />,
            Database: <Database className="h-6 w-6 text-fuchsia-400" />,
            Tools: <Cloud className="h-6 w-6 text-amber-400" />,
        }
        return {
            ...skill,
            icon: icons[skill.category] || <Sparkles className="h-6 w-6 text-cyan-400" />,
        }
    })

    // Stats data
    const stats = [
        { value: "5+", label: "Technologies", icon: Code2, color: "cyan" },
        { value: "100%", label: "Dedication", icon: Award, color: "violet" },
        { value: "24/7", label: "Learning", icon: TrendingUp, color: "fuchsia" },
        { value: "∞", label: "Creativity", icon: Sparkles, color: "amber" },
    ]

    return (
        <motion.section
            ref={sectionRef}
            id="skills"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            style={{ opacity }}
            className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-950/95 to-slate-900 p-6 shadow-2xl backdrop-blur-2xl lg:p-10 overflow-hidden"
        >

            {/* ✅ BACKGROUND ONLY */}
            <div className="absolute inset-0 -z-10 overflow-hidden">

                {/* Glow blobs */}
                <div className="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 -right-40 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-fuchsia-500/5 blur-[100px] animate-pulse delay-500" />

                {/* Grid (safe version) */}
                <div className="absolute inset-0 opacity-20">
                    <div className="h-full w-full 
          bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),
               linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]
          bg-[size:40px_40px]"
                    />
                </div>

            </div>

            {/* ✅ MAIN CONTENT (OUTSIDE background) */}
            <div className="relative z-10">

                {/* Header */}
                <div className="flex flex-col gap-2 mb-8">
                    <div className="flex items-center gap-2">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400" />
                        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                            /skills-matrix
                        </span>
                        <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400" />
                    </div>

                    <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                        Tech Arsenal
                        <span className="block bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent text-2xl sm:text-3xl mt-2">
                            Tools I Master
                        </span>
                    </h2>

                    <p className="max-w-2xl text-slate-400 mt-2">
                        Equipped with modern technologies and best practices to build exceptional digital experiences.
                    </p>
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
                >
                    {stats.map((stat, i) => (
                        <StatCard key={i} {...stat} />
                    ))}
                </motion.div>

                {/* Skills */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {enhancedSkills.map((skillCategory) => (
                        <SkillCard
                            key={skillCategory.category}
                            category={skillCategory.category}
                            icon={skillCategory.icon}
                            items={skillCategory.items}
                        />
                    ))}
                </motion.div>

                {/* Bottom Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                    {/* content same as yours */}
                </motion.div>

            </div>

            {/* Decorative */}
            <div className="absolute bottom-4 right-4 opacity-5 pointer-events-none">
                <Code2 className="h-32 w-32" />
            </div>

        </motion.section>
    )
}