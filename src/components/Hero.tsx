import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { personalData } from '../data/portfolioData'
import { staggerContainer, staggerItem } from '../lib/animations'

function scrollToProjects() {
  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: { current: null as HTMLElement | null }, offset: ['start start', 'end start'] })
  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 120])
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -80])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 60])
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div style={{ y: blobY1 }} animate={reduceMotion ? undefined : { x: [0, 60, -20, 0], y: [0, -30, 40, 0], scale: [1, 1.1, 0.95, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <motion.div style={{ y: blobY2 }} animate={reduceMotion ? undefined : { x: [0, -40, 20, 0], y: [0, 40, -20, 0], scale: [1, 0.9, 1.1, 1] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_55%)]" />
      </div>

      <motion.div style={{ y: contentY }} className="section-container relative flex flex-col justify-center">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-4xl">
          <motion.p variants={staggerItem} className="mb-5 font-mono text-sm tracking-wide accent-text sm:text-base">// hello, world</motion.p>
          <motion.h1 variants={staggerItem} className="max-w-4xl text-[clamp(2.8rem,8vw,6.5rem)] font-bold leading-[1.02] tracking-[-0.04em]">
            Rahul Tekchand<br /><span className="text-gradient">Bainade.</span>
          </motion.h1>
          <motion.div variants={staggerItem} className="mt-6 flex items-center gap-3">
            <span className="h-px w-10 accent-bg sm:w-16" />
            <p className="text-xl font-medium text-muted sm:text-2xl">{personalData.title}</p>
          </motion.div>
          <motion.p variants={staggerItem} className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">Building secure, intelligent web applications with Java, Spring Boot, and the power of AI.</motion.p>
          <motion.div variants={staggerItem} className="mt-9 flex flex-wrap gap-4">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={scrollToProjects} className="btn-primary">View Projects <ArrowRight size={18} /></motion.button>
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href="/resume.pdf" download className="btn-secondary">Download Resume</motion.a>
          </motion.div>
          <motion.div variants={staggerItem} className="mt-10 flex items-center gap-2">
            {[{ label: 'GH', name: 'GitHub', href: personalData.github }, { label: 'in', name: 'LinkedIn', href: personalData.linkedin }, { icon: Mail, label: 'mail', name: 'Email', href: `mailto:${personalData.email}` }].map((link) => (
              <motion.a key={link.name} whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.95 }} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} aria-label={link.name} className="flex h-11 w-11 items-center justify-center rounded-lg border text-muted transition-colors hover:border-[rgba(var(--accent-rgb),0.5)] hover:text-[var(--accent)]">{link.icon ? <link.icon size={18} /> : <span className="font-mono text-xs font-semibold">{link.label}</span>}</motion.a>
            ))}
          </motion.div>
        </motion.div>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }} onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })} className="absolute bottom-10 left-6 hidden items-center gap-3 text-xs font-mono text-muted sm:flex" aria-label="Scroll to about section"><span className="flex h-8 w-5 items-start justify-center rounded-full border p-1"><motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full accent-bg" /></span> scroll to explore</motion.button>
      </motion.div>
    </section>
  )
}
