'use client'

import { Github, Linkedin, Mail, Heart, Code2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 text-slate-300 shadow-glow backdrop-blur-2xl sm:p-8"
        >
            <div className="mx-auto flex max-w-[1200px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Stay Connected</p>
                    <p className="mt-2 text-sm text-slate-400">Premium portfolio experience with thoughtful motion and UI depth.</p>
                </div>
                <div className="flex items-center gap-3">
                    <a href="mailto:mandalim19@gmail.com" className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 transition-all duration-300 hover:scale-110 hover:border-cyan-400/50 hover:text-cyan-300">
                        <Mail size={18} />
                    </a>
                    <a href="https://github.com/iman-mandal" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 transition-all duration-300 hover:scale-110 hover:border-gray-400/50 hover:text-gray-300">
                        <Github size={18} />
                    </a>
                    <a href="https://www.linkedin.com/in/iman-mandal-5945102b9" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 transition-all duration-300 hover:scale-110 hover:border-violet-400/50 hover:text-violet-300">
                        <Linkedin size={18} />
                    </a>
                    <a
                        href="https://leetcode.com/u/iman6406/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition-all hover:scale-110 hover:border-yellow-400/50 hover:text-yellow-300"
                    >
                        <Code2 size={20} />
                    </a>
                </div>
            </div>
            <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-center sm:flex-row">
                <p className="text-xs text-slate-500">© {currentYear} Iman Mandal. All rights reserved.</p>
                <div className="flex items-center gap-1 text-xs text-slate-600">
                    <span>Built with</span>
                    <Code2 className="h-3 w-3 text-cyan-400" />
                    <span>and</span>
                    <Heart className="h-3 w-3 text-red-400" />
                    <span>by Iman</span>
                </div>
            </div>
        </motion.footer>
    )
}