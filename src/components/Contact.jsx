'use client'

import { Mail, MapPin, Github, Linkedin, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Contact() {
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(formData.subject || `Portfolio Contact - ${formData.email}`)
    const body = encodeURIComponent(`Name: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent from portfolio contact form`)
    window.location.href = `mailto:mandalim19@gmail.com?subject=${subject}&body=${body}`
    alert('Opening your email client! Please send the message to reach me.')
    setFormData({ email: '', subject: '', message: '' })
  }

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="relative rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-2xl lg:p-10 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-20 -right-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 -left-20 h-64 w-64 rounded-full bg-violet-500/20 blur-[100px] animate-pulse" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div variants={itemVariants} className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
              Let&apos;s build something <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">great</span> together.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
              I&apos;m available for freelance opportunities, internships, and collaborative development work.
            </p>
          </div>

          <div className="space-y-4">
            <div className="group relative rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/20 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:shadow-cyan-500/10">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-cyan-500/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500/20">
                  <Mail className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">Email</p>
                  <a href="mailto:mandalim19@gmail.com" className="text-sm font-medium text-slate-200 transition-colors hover:text-cyan-300">mandalim19@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="group relative rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/20 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:shadow-cyan-500/10">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-violet-500/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-500/20">
                  <MapPin className="h-5 w-5 text-violet-300" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">Location</p>
                  <p className="text-sm font-medium text-slate-200">Available worldwide</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl">
            <p className="mb-3 text-sm font-medium text-slate-300">Connect with me</p>
            <div className="flex flex-wrap gap-3">
              <a href="https://github.com/iman-mandal" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200">
                <Github size={16} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/iman-mandal-5945102b9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition-all duration-300 hover:scale-105 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-200">
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </motion.div>

        <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl lg:p-7">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Your Email <span className="text-cyan-400">*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition-all duration-200 focus:border-cyan-400/50 focus:bg-slate-900/90 focus:ring-1 focus:ring-cyan-400/30" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Subject <span className="text-cyan-400">*</span></label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition-all duration-200 focus:border-violet-400/50 focus:bg-slate-900/90 focus:ring-1 focus:ring-violet-400/30" placeholder="Let's collaborate" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Message <span className="text-cyan-400">*</span></label>
            <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition-all duration-200 focus:border-cyan-400/50 focus:bg-slate-900/90 focus:ring-1 focus:ring-cyan-400/30 resize-none" placeholder="Tell me about your project..." />
          </div>
          <button type="submit" className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-glow hover:shadow-cyan-500/25">
            <span className="relative z-10 flex items-center justify-center gap-2"><Send className="h-4 w-4" /> Send Message</span>
          </button>
          <p className="text-center text-xs text-slate-500">📧 Opens your email client • No backend required</p>
        </motion.form>
      </div>
    </motion.section>
  )
}