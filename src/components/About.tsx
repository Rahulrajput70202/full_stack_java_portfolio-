import { useState, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { aboutText, personalData } from '../data/portfolioData'
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from '../lib/animations'

function ProfilePhoto() {
  const [isHovering, setIsHovering] = useState(false)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 260, damping: 28 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 260, damping: 28 })

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return
    const rect = event.currentTarget.getBoundingClientRect()
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 7)
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 7)
  }

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
    setIsHovering(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-sm lg:ml-auto"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={resetTilt}
        whileTap={{ scale: 0.98 }}
        className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[rgba(var(--accent-rgb),0.45)] bg-[var(--bg-secondary)] shadow-2xl shadow-emerald-500/10"
      >
        <motion.div animate={{ opacity: isHovering ? 0.85 : 0.45 }} className="pointer-events-none absolute -inset-8 z-0 bg-emerald-400/20 blur-3xl" />
        <img src="/WhatsApp_Image_2026-07-02_at_10.04.27_PM.jpeg" alt="Rahul Bainade — Full Stack Java Developer" width="720" height="900" className="relative z-10 h-full w-full object-cover object-top" />
        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5 pt-20"><p className="font-mono text-xs text-white/80">rahul-bainade / full-stack-java</p></div>
      </motion.div>
      <div className="pointer-events-none absolute -bottom-3 -right-3 -z-0 h-full w-full rounded-2xl border border-emerald-400/30" />
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="border-t" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeInUp}>
          <p className="mb-3 font-mono text-sm accent-text">01 / about</p>
          <h2 className="section-title">About Me</h2>
        </motion.div>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer} className="space-y-5">
            {aboutText.map((paragraph) => <motion.p key={paragraph} variants={staggerItem} className="text-base leading-relaxed text-muted sm:text-lg">{paragraph}</motion.p>)}
            <motion.a variants={staggerItem} href={`mailto:${personalData.email}`} className="inline-flex items-center gap-2 pt-3 font-medium accent-text hover:underline">Let's build something meaningful <ArrowUpRight size={17} /></motion.a>
          </motion.div>
          <ProfilePhoto />
        </div>
      </div>
    </section>
  )
}
