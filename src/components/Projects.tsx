import { useState, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { projects, type Project } from '../data/portfolioData'
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from '../lib/animations'

function ProjectCard({ project }: { project: Project }) {
  const [isHovering, setIsHovering] = useState(false)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return
    const rect = event.currentTarget.getBoundingClientRect()
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 8)
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 8)
  }
  const resetTilt = () => { rotateX.set(0); rotateY.set(0); setIsHovering(false) }
  const shadow = useTransform([rotateX, rotateY], ([x, y]) => `${x}px ${y}px 35px rgba(var(--accent-rgb), ${isHovering ? 0.15 : 0.05})`)
  return (
    <motion.article style={{ rotateX, rotateY, boxShadow: shadow, transformStyle: 'preserve-3d' }} onMouseMove={handleMove} onMouseEnter={() => setIsHovering(true)} onMouseLeave={resetTilt} onClick={() => window.open(project.github, '_blank', 'noopener,noreferrer')} variants={staggerItem} className="glass group cursor-pointer overflow-hidden rounded-2xl transition-colors hover:border-[rgba(var(--accent-rgb),0.45)]">
      <div className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient}`}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative flex flex-col items-center gap-2 text-center text-muted"><span className="font-mono text-3xl font-semibold">GH</span><span className="font-mono text-xs">// replace with project screenshot</span></div>
        <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/20 px-2 py-1 font-mono text-[10px] text-white/60">project_{projects.indexOf(project) + 1}</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold leading-snug transition-colors group-hover:accent-text">{project.title}</h3>
        <div className="mt-4 flex flex-wrap gap-1.5">{project.tech.map((tech) => <span key={tech} className="tech-tag">{tech}</span>)}</div>
        <ul className="mt-5 space-y-3">{project.highlights.map((highlight) => <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full accent-bg" />{highlight}</li>)}</ul>
        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold accent-text hover:underline">View on GitHub <ExternalLink size={16} /></a>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return <section id="projects" className="border-t" style={{ background: 'var(--bg-secondary)' }}><div className="section-container"><motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeInUp}><p className="mb-3 font-mono text-sm accent-text">03 / selected work</p><h2 className="section-title">Projects</h2><p className="mt-4 max-w-2xl text-muted">A selection of applications where backend engineering meets thoughtful product design.</p></motion.div><motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer} className="perspective mt-10 grid gap-7 lg:grid-cols-2">{projects.map((project) => <ProjectCard key={project.title} project={project} />)}</motion.div></div></section>
}
