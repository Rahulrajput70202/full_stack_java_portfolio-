import { motion, useReducedMotion } from 'framer-motion'
import { Check, type LucideIcon } from 'lucide-react'
import { coreStrengths, skillCategories } from '../data/portfolioData'
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from '../lib/animations'

function SkillGroup({ title, icon: Icon, skills }: { title: string; icon: LucideIcon; skills: string[] }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div variants={staggerItem} className="glass rounded-xl p-5 transition-shadow duration-300 hover:glow-border">
      <div className="mb-4 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(var(--accent-rgb),0.1)] accent-text"><Icon size={18} /></span><h3 className="font-semibold">{title}</h3></div>
      <motion.div variants={staggerContainer} className="flex flex-wrap gap-2">
        {skills.map((skill, index) => <motion.span key={skill} variants={staggerItem} animate={reduceMotion ? undefined : { y: [0, -3, 0] }} transition={{ duration: 3 + (index % 3), repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }} whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }} className="rounded-md border bg-[var(--bg-secondary)] px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-[rgba(var(--accent-rgb),0.5)] hover:text-[var(--accent)]">{skill}</motion.span>)}
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="border-t">
      <div className="section-container">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeInUp}><p className="mb-3 font-mono text-sm accent-text">02 / toolkit</p><h2 className="section-title">Skills &amp; Technologies</h2><p className="mt-4 max-w-2xl text-muted">The tools and concepts I use to turn ideas into reliable, production-ready software.</p></motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => <SkillGroup key={category.title} {...category} />)}
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeInUp} className="mt-14">
          <h3 className="mb-6 font-mono text-sm text-muted">core strengths</h3>
          <div className="grid gap-5 sm:grid-cols-3">
            {coreStrengths.map((strength) => <div key={strength.name}><div className="mb-2 flex justify-between text-sm"><span className="font-medium">{strength.name}</span><span className="font-mono text-xs accent-text">{strength.level}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-secondary)]"><motion.div initial={{ width: 0 }} whileInView={{ width: `${strength.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="h-full rounded-full accent-bg" /></div><div className="mt-2 flex items-center gap-1.5 text-xs text-muted"><Check size={12} className="accent-text" /> confident in production</div></div>)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
