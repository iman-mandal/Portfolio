import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Github, Linkedin, Mail, Menu, X, Sparkles, Home, User,FileText, Briefcase, Code2, Clock, MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

const navLinks = [
    { label: 'Home', href: '#home', icon: Home },
    { label: 'About', href: '#about', icon: User },
    { label: 'Projects', href: '#projects', icon: Briefcase },
    { label: 'Skills', href: '#skills', icon: Code2 },
    { label: 'Education', href: '#experience', icon: Clock },
    { label: 'Contact', href: '#contact', icon: MessageCircle },
]

export default function Navbar({ activeSection }) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50)
    })

    const handleNavClick = (href) => {
        setIsMobileMenuOpen(false)
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={`fixed inset-x-0 top-0 z-50 mx-auto w-full transition-all duration-500 ${isScrolled
                    ? 'border-b border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-2xl'
                    : 'bg-slate-950/30 backdrop-blur-md'
                    }`}
            >
                <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 lg:px-8 lg:py-4">
                    <motion.a
                        href="#home"
                        className="group relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.preventDefault()
                            handleNavClick('#home')
                        }}
                    >
                        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 opacity-0 blur transition duration-300 group-hover:opacity-50" />
                        <div className="relative flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-cyan-400 transition-transform duration-300 group-hover:rotate-12" />
                            <span className="text-sm font-semibold tracking-[0.24em] text-slate-100 opacity-90 transition group-hover:opacity-100 lg:text-base">
                                IMAN MANDAL
                            </span>
                        </div>
                    </motion.a>

                    <nav className="hidden items-center gap-1 rounded-full bg-slate-900/50 px-3 py-2 shadow-glow backdrop-blur-sm lg:flex">
                        {navLinks.map((item, index) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleNavClick(item.href)
                                }}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${activeSection === item.href.slice(1)
                                    ? 'text-violet-200'
                                    : 'text-slate-300 hover:text-slate-100'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {activeSection === item.href.slice(1) && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/30 to-cyan-500/30 shadow-lg shadow-cyan-500/20"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <item.icon className="h-3.5 w-3.5" />
                                    {item.label}
                                </span>
                            </motion.a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className="hidden items-center gap-2 sm:flex">
                            <motion.a
                                href="https://github.com/iman-mandal"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition-all duration-300 hover:scale-110 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Github size={18} />
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/in/iman-mandal-5945102b9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition-all duration-300 hover:scale-110 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-300"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Linkedin size={18} />
                            </motion.a>
                            <motion.a
                                href="https://leetcode.com/u/iman6406/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition-all duration-300 hover:scale-110 hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-amber-300"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Code2 size={18} />
                            </motion.a>
                            <motion.a
                                href="https://drive.google.com/file/d/1FPmZLkn2fmxub--cw2ok9nmtEO2-6PL5/view?usp=drivesdk"  
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition-all duration-300 hover:scale-110 hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FileText size={18} />
                            </motion.a>
                        </div>

                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="relative z-50 rounded-full border border-white/10 bg-white/5 p-2 text-slate-100 transition-all duration-300 hover:border-cyan-400/50 lg:hidden"
                            whileTap={{ scale: 0.95 }}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.button>
                    </div>
                </div>

                <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500"
                    style={{ scaleX: scrollY.get() / (document.body.scrollHeight - window.innerHeight) }}
                />
            </motion.header>

            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="absolute right-0 top-0 h-full w-full max-w-sm border-l border-white/10 bg-slate-900/95 p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex h-full flex-col">
                            <div className="mb-8 flex items-center gap-2 border-b border-white/10 pb-4">
                                <Sparkles className="h-5 w-5 text-cyan-400" />
                                <span className="text-sm font-semibold tracking-[0.24em] text-slate-100">
                                    IMAN MANDAL
                                </span>
                            </div>

                            <nav className="flex flex-col gap-2">
                                {navLinks.map((item, index) => (
                                    <motion.a
                                        key={item.href}
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleNavClick(item.href)
                                        }}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all duration-300 ${activeSection === item.href.slice(1)
                                            ? 'bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-200 shadow-lg'
                                            : 'text-slate-300 hover:bg-white/5 hover:text-slate-100'
                                            }`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </motion.a>
                                ))}
                            </nav>

                            <div className="mt-auto pt-8">
                                <div className="border-t border-white/10 pt-6">
                                    <p className="mb-4 text-center text-xs uppercase tracking-wider text-slate-400">
                                        Connect with me
                                    </p>
                                    <div className="flex justify-center gap-4">
                                        <a href="https://github.com/iman-mandal" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition-all hover:scale-110 hover:border-cyan-400/50 hover:text-cyan-300">
                                            <Github size={20} />
                                        </a>
                                        <a href="https://www.linkedin.com/in/iman-mandal-5945102b9" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition-all hover:scale-110 hover:border-violet-400/50 hover:text-violet-300">
                                            <Linkedin size={20} />
                                        </a>
                                        <a
                                            href="https://leetcode.com/your-username"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition-all hover:scale-110 hover:border-yellow-400/50 hover:text-yellow-300"
                                        >
                                            <Code2 size={20} />
                                        </a>
                                        <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }} className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition-all hover:scale-110 hover:border-fuchsia-400/50 hover:text-fuchsia-300">
                                            <Mail size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    )
}