import { Code2, Layers, Sparkles, Mail, Github, Linkedin, Award, Coffee, Heart, Zap, Globe, Camera, Music, Star, Orbit, Rocket, Moon, Sun, Compass } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import profilePhoto from '../image/IMG_20240612_191519.jpg.jpeg'
// Memoized static data
const COLOR_STYLES = {
    cyan: {
        factWrapper: 'from-cyan-500/10 to-transparent',
        factInner: 'bg-cyan-500/20',
        factIcon: 'text-cyan-400',
        interestBorder: 'border-cyan-500/30',
        interestBg: 'from-cyan-500/10 to-transparent',
        interestIcon: 'text-cyan-400',
        interestBadge: 'bg-cyan-500/90',
        statWrapper: 'from-cyan-500/10 to-transparent',
        statOverlay: 'from-cyan-500/0 to-cyan-500/10',
        statText: 'from-cyan-400 to-cyan-200',
    },
    violet: {
        factWrapper: 'from-violet-500/10 to-transparent',
        factInner: 'bg-violet-500/20',
        factIcon: 'text-violet-400',
        interestBorder: 'border-violet-500/30',
        interestBg: 'from-violet-500/10 to-transparent',
        interestIcon: 'text-violet-400',
        interestBadge: 'bg-violet-500/90',
        statWrapper: 'from-violet-500/10 to-transparent',
        statOverlay: 'from-violet-500/0 to-violet-500/10',
        statText: 'from-violet-400 to-violet-200',
    },
    fuchsia: {
        factWrapper: 'from-fuchsia-500/10 to-transparent',
        factInner: 'bg-fuchsia-500/20',
        factIcon: 'text-fuchsia-400',
        interestBorder: 'border-fuchsia-500/30',
        interestBg: 'from-fuchsia-500/10 to-transparent',
        interestIcon: 'text-fuchsia-400',
        interestBadge: 'bg-fuchsia-500/90',
        statWrapper: 'from-fuchsia-500/10 to-transparent',
        statOverlay: 'from-fuchsia-500/0 to-fuchsia-500/10',
        statText: 'from-fuchsia-400 to-fuchsia-200',
    },
    amber: {
        factWrapper: 'from-amber-500/10 to-transparent',
        factInner: 'bg-amber-500/20',
        factIcon: 'text-amber-400',
        interestBorder: 'border-amber-500/30',
        interestBg: 'from-amber-500/10 to-transparent',
        interestIcon: 'text-amber-400',
        interestBadge: 'bg-amber-500/90',
        statWrapper: 'from-amber-500/10 to-transparent',
        statOverlay: 'from-amber-500/0 to-amber-500/10',
        statText: 'from-amber-400 to-amber-200',
    },
}

const FACT_STYLES = {
    cyan: { wrapper: 'from-cyan-500/10 to-transparent', inner: 'bg-cyan-500/20', icon: 'text-cyan-400' },
    violet: { wrapper: 'from-violet-500/10 to-transparent', inner: 'bg-violet-500/20', icon: 'text-violet-400' },
    fuchsia: { wrapper: 'from-fuchsia-500/10 to-transparent', inner: 'bg-fuchsia-500/20', icon: 'text-fuchsia-400' },
    amber: { wrapper: 'from-amber-500/10 to-transparent', inner: 'bg-amber-500/20', icon: 'text-amber-400' },
}

const INTEREST_STYLE_MAP = {
    cyan: { border: 'border-cyan-500/30', bg: 'from-cyan-500/10 to-transparent', icon: 'text-cyan-400', badge: 'bg-cyan-500/90' },
    violet: { border: 'border-violet-500/30', bg: 'from-violet-500/10 to-transparent', icon: 'text-violet-400', badge: 'bg-violet-500/90' },
    fuchsia: { border: 'border-fuchsia-500/30', bg: 'from-fuchsia-500/10 to-transparent', icon: 'text-fuchsia-400', badge: 'bg-fuchsia-500/90' },
    amber: { border: 'border-amber-500/30', bg: 'from-amber-500/10 to-transparent', icon: 'text-amber-400', badge: 'bg-amber-500/90' },
    blue: { border: 'border-blue-500/30', bg: 'from-blue-500/10 to-transparent', icon: 'text-blue-400', badge: 'bg-blue-500/90' },
    green: { border: 'border-emerald-500/30', bg: 'from-emerald-500/10 to-transparent', icon: 'text-emerald-400', badge: 'bg-emerald-500/90' },
}

const FUN_FACTS = [
    { emoji: "📊", text: "Strong in Data Structures & Algorithms", color: "violet", icon: Layers },
    { emoji: "💻", text: "500+ hours of coding", color: "cyan", icon: Code2 },
    { emoji: "🚀", text: "5+ projects shipped", color: "violet", icon: Rocket },
    { emoji: "🎨", text: "Pixel perfect designer", color: "fuchsia", icon: Sparkles },
]

const INTERESTS = [
    { icon: Camera, name: "Photography", color: "cyan", description: "Capturing moments" },
    { icon: Music, name: "Music", color: "violet", description: "Creating vibes" },
    { icon: Globe, name: "Travel", color: "fuchsia", description: "Exploring world" },
    { icon: Coffee, name: "Coffee", color: "amber", description: "Fueling code" },
    { icon: Star, name: "Astronomy", color: "cyan", description: "Stargazing" },
    { icon: Compass, name: "Adventure", color: "violet", description: "Seeking thrill" },
]

const SOCIAL_LINKS = [
    { icon: Github, href: "https://github.com/iman-mandal", label: "GitHub", bg: "from-cyan-500/20 to-blue-500/20", borderHover: 'group-hover:border-cyan-400/50', textHover: 'group-hover:text-cyan-300' },
    { icon: Linkedin, href: "https://www.linkedin.com/in/iman-mandal-5945102b9", label: "LinkedIn", bg: "from-violet-500/20 to-purple-500/20", borderHover: 'group-hover:border-violet-400/50', textHover: 'group-hover:text-violet-300' },
    { icon: Mail, href: "mailto:mandalim19@gmail.com", label: "Email", bg: "from-fuchsia-500/20 to-pink-500/20", borderHover: 'group-hover:border-fuchsia-400/50', textHover: 'group-hover:text-fuchsia-300' },
    { icon: Code2, href: "https://leetcode.com/u/iman6406/", label: "LeetCode", bg: "from-amber-500/20 to-yellow-500/20", borderHover: 'group-hover:border-amber-400/50', textHover: 'group-hover:text-amber-300' },
]
const STATS_DATA = [
    { value: "1+", label: "Years Experience", color: "cyan" },
    { value: "5+", label: "Projects", color: "violet" },
    { value: "30+", label: "DSA questions solved", color: "amber" },
    { value: "3+", label: "Technologies Learned", color: "fuchsia" },
]

const SKILLS_DATA = [
    {
        icon: Code2,
        title: 'Clean Architecture',
        description: 'Modular, scalable, and maintainable code structure.',
        gradient: 'from-cyan-500/20 to-blue-500/20',
        iconColor: 'cyan',
        stat: '95%',
        statLabel: 'Efficiency',
        features: ['SOLID Principles', 'Design Patterns', 'TypeScript']
    },
    {
        icon: Layers,
        title: 'Design Systems',
        description: 'Consistent, accessible, and beautiful UI components.',
        gradient: 'from-violet-500/20 to-purple-500/20',
        iconColor: 'violet',
        stat: '98%',
        statLabel: 'Satisfaction',
        features: ['Atomic Design', 'Responsive', 'Animations']
    },
    {
        icon: Sparkles,
        title: 'Performance',
        description: 'Lightning fast, optimized, and smooth experiences.',
        gradient: 'from-amber-500/20 to-orange-500/20',
        iconColor: 'amber',
        stat: '100%',
        statLabel: 'Optimization',
        features: ['Code Splitting', 'Lazy Loading', 'Caching']
    },

]


// Photo Orbit Component
const PhotoOrbit = () => {
    const [rotation, setRotation] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(prev => (prev + 1) % 360)
        }, 50)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative">
            {/* Orbiting planets */}
            <div
                className="absolute inset-0"
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                <div className="absolute -top-8 -right-8">
                    <div className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50" />
                </div>
                <div className="absolute -bottom-6 -left-6">
                    <div className="h-2 w-2 rounded-full bg-violet-400 animate-pulse shadow-lg shadow-violet-400/50" />
                </div>
                <div className="absolute top-1/2 -right-12">
                    <div className="h-2.5 w-2.5 rounded-full bg-fuchsia-400 animate-pulse shadow-lg shadow-fuchsia-400/50" />
                </div>
                <div className="absolute bottom-1/3 -left-10">
                    <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse shadow-lg shadow-amber-400/50" />
                </div>
            </div>

            {/* Rotating rings */}
            <div
                className="absolute inset-0 rounded-full border border-cyan-500/20"
                style={{ transform: `rotate(${rotation * 0.5}deg)` }}
            />
            <div
                className="absolute inset-2 rounded-full border border-violet-500/15"
                style={{ transform: `rotate(${-rotation * 0.3}deg)` }}
            />
            <div
                className="absolute inset-4 rounded-full border border-fuchsia-500/10"
                style={{ transform: `rotate(${rotation * 0.7}deg)` }}
            />
        </div>
    )
}

// Main Component
export default function About() {
    const sectionRef = useRef(null)
    const [isMobile, setIsMobile] = useState(false)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
            },
        },
    }), [])

    const itemVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: 'easeOut' },
        },
    }), [])

    const shouldAnimate = !isMobile

    return (
        <motion.section
            ref={sectionRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-50px" }}
            variants={containerVariants}
            style={shouldAnimate ? { opacity, scale } : {}}
            className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-950/95 to-slate-900 p-6 shadow-2xl backdrop-blur-2xl lg:p-12 overflow-hidden"
        >
            {/* Cosmic Background */}
            <div className="absolute inset-0 -z-10">
                {/* Stars background */}
                <div className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='stars' width='100' 
                    height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='10' cy='10' r='1' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='50' cy='30' r='0.5' fill='rgba(255,255,255,0.08)'/%3E%3Ccircle 
                    cx='80' cy='70' r='1.5' fill='rgba(255,255,255,0.06)'/%3E%3Ccircle cx='30' cy='80' r='0.8' fill='rgba(255,255,255,0.12)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' 
                    fill='url(%23stars)'/%3E%3C/svg%3E")] bg-repeat opacity-30`} />
                {/* Animated nebulas */}
                <div className="absolute top-0 -left-40 h-[600px] w-[600px] rounded-full bg-cyan-500/15 blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 -right-40 h-[600px] w-[600px] rounded-full bg-violet-500/15 blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-fuchsia-500/10 blur-[100px] animate-pulse delay-500" />
            </div>

            {/* Main Content */}
            <div className="grid gap-12 lg:grid-cols-2">
                {/* Left Column - Content */}
                <div className="space-y-8">
                    {/* Header Badge */}
                    <motion.div variants={itemVariants} className="relative">
                        <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 px-5 py-2 backdrop-blur-sm border border-white/10">
                            <Orbit className="h-4 w-4 text-cyan-300 animate-spin-slow" />
                            <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                                Cosmic Developer
                            </span>
                            <Star className="h-3 w-3 text-amber-400 animate-pulse" />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.div variants={itemVariants} className="space-y-3">
                        <h2 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl leading-tight">
                            Iman Mandal
                        </h2>
                        <div className="flex items-center gap-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
                            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Full-Stack Developer</p>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
                        </div>
                    </motion.div>

                    {/* Description */}
                    <motion.p variants={itemVariants} className="text-slate-300 leading-relaxed text-lg">
                        I craft thoughtful digital products with depth and polish — blending
                        modern design patterns with robust engineering to create seamless user experiences
                        that leave lasting impressions across the digital universe.
                    </motion.p>

                    {/* Fun Facts Grid */}
                    <motion.div variants={itemVariants}>
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="h-4 w-4 text-red-400" />
                            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Cosmic Facts</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {FUN_FACTS.map((fact, i) => {
                                const factStyle = FACT_STYLES[fact.color] || FACT_STYLES.cyan
                                return (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.05, x: 5 }}
                                        className={`flex items-center gap-3 rounded-xl border border-white/10 bg-gradient-to-r ${factStyle.wrapper} p-3 backdrop-blur-sm group cursor-pointer`}
                                    >
                                        <div className={`${factStyle.inner} rounded-lg p-2 group-hover:scale-110 transition-transform`}>
                                            <fact.icon className={`h-4 w-4 ${factStyle.icon}`} />
                                        </div>
                                        <span className="text-xs text-slate-300">{fact.text}</span>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Interests */}
                    <motion.div variants={itemVariants}>
                        <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">When I'm not coding</p>
                        <div className="flex flex-wrap gap-2">
                            {INTERESTS.map((interest, i) => {
                                const interestStyle = INTEREST_STYLE_MAP[interest.color] || INTEREST_STYLE_MAP.cyan
                                return (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className={`group relative rounded-full ${interestStyle.border} bg-gradient-to-r ${interestStyle.bg} px-4 py-2 backdrop-blur-sm cursor-pointer`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <interest.icon className={`h-3.5 w-3.5 ${interestStyle.icon}`} />
                                            <span className="text-xs text-slate-300">{interest.name}</span>
                                            <div className={`${interestStyle.badge} absolute -top-8 left-1/2 -translate-x-1/2 rounded-md px-2 py-1 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
                                                {interest.description}
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div variants={itemVariants} className="flex gap-4 pt-4">
                        {SOCIAL_LINKS.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={shouldAnimate ? { y: -5, scale: 1.1 } : {}}
                                whileTap={{ scale: 0.95 }}
                                className="group relative"
                            >
                                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${social.bg} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                <div className={`relative rounded-full border border-white/20 bg-gradient-to-r ${social.bg} p-3 text-slate-300 transition-all duration-300 ${social.borderHover} ${social.textHover}`}>
                                    <social.icon className="h-5 w-5" />
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* Right Column - Photo & Stats */}
                <div className="space-y-8">
                    {/* Profile Photo with Cosmic Effects */}
                    <motion.div
                        variants={itemVariants}
                        className="relative group flex justify-center"
                        whileHover={shouldAnimate ? { scale: 1.03 } : {}}
                    >
                        {/* Outer Glow */}
                        <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 blur-3xl opacity-20 group-hover:opacity-40 transition duration-500" />

                        {/* Orbit Effect */}
                        <PhotoOrbit />

                        {/* Minimal Rotating Rings */}
                        <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin-slow" />
                        <div className="absolute inset-4 rounded-full border border-violet-500/10 animate-spin-reverse" />

                        {/* Main Profile Frame */}
                        <div className="relative rounded-full p-[3px] bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 shadow-xl">
                            <div className="rounded-full bg-slate-950 p-2 backdrop-blur-xl">
                                <div className="relative overflow-hidden rounded-full">
                                    <img
                                        src={profilePhoto}
                                        alt="Iman Mandal"
                                        loading="lazy"
                                        className="h-72 w-72 object-cover transition-transform duration-500 group-hover:scale-110 lg:h-80 lg:w-80"
                                    />

                                    {/* Soft Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                                </div>
                            </div>
                        </div>

                        {/* Floating Badges (Cleaner Positioning) */}
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-2 shadow-lg"
                        >
                            <Camera className="h-4 w-4 text-white" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}
                            className="absolute -bottom-2 left-6 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 p-2 shadow-lg"
                        >
                            <Star className="h-4 w-4 text-white" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -14, 0] }}
                            transition={{ repeat: Infinity, duration: 4.5, delay: 0.5 }}
                            className="absolute top-1/2 -right-4 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 p-2 shadow-lg"
                        >
                            <Rocket className="h-4 w-4 text-white" />
                        </motion.div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {STATS_DATA.map((stat, i) => {
                            const statStyle = COLOR_STYLES[stat.color] || COLOR_STYLES.cyan
                            return (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${statStyle.statWrapper} p-4 backdrop-blur-sm group cursor-pointer`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${statStyle.statOverlay} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                    <div className="relative z-10">
                                        <div className={`text-3xl font-bold bg-gradient-to-r ${statStyle.statText} bg-clip-text text-transparent`}>
                                            {stat.value}
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Quote Card */}
                    <motion.div
                        variants={itemVariants}
                        className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm overflow-hidden"
                    >
                        <div className="absolute -top-4 -left-4 text-8xl text-cyan-500/10 font-serif">"</div>
                        <div className="absolute -bottom-4 -right-4 text-8xl text-violet-500/10 font-serif rotate-180">"</div>
                        <p className="relative z-10 text-sm italic text-slate-300 leading-relaxed text-center">
                            "Code is poetry written in logic. Every line tells a story,
                            every function solves a puzzle, and every project is a new adventure in the cosmos of creativity."
                        </p>
                        <div className="flex justify-center gap-1 mt-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-1 w-1 rounded-full bg-cyan-400" />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Availability Banner */}
            <motion.div
                variants={itemVariants}
                className="mt-12 flex justify-center"
            >
                <div className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 px-6 py-3 backdrop-blur-sm">
                    <div className="flex gap-1.5">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={shouldAnimate ? { y: [0, -5, 0] } : {}}
                                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                                className="h-2 w-2 rounded-full bg-cyan-400"
                            />
                        ))}
                    </div>
                    <div className="h-6 w-px bg-white/20" />
                    <Sun className="h-4 w-4 text-amber-400 animate-pulse" />
                    <span className="text-xs text-slate-300">Available for internship opportunities</span>
                    <Moon className="h-4 w-4 text-slate-400" />
                    <div className="h-6 w-px bg-white/20" />
                    <span className="text-xs text-cyan-400 font-mono">seeking.internship()</span>
                </div>
            </motion.div>

            {/* Cosmic Decorative Elements */}
            <div className="absolute top-10 right-10 opacity-5">
                <Orbit className="h-32 w-32" />
            </div>
            <div className="absolute bottom-10 left-10 opacity-5">
                <Rocket className="h-24 w-24" />
            </div>
        </motion.section>
    )
}