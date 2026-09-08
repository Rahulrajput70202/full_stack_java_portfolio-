import { useState, type ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Mail, Phone, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { personalData } from '../data/portfolioData'
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from '../lib/animations'
import { supabase } from '../lib/supabase'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.string().trim().email('Please enter a valid email'),
  message: z.string().trim().min(10, 'Please write at least 10 characters'),
})
type ContactForm = z.infer<typeof contactSchema>

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) })
  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    setSubmitError(null)
    const { error } = await supabase.from('contact_submissions').insert({
      name: data.name,
      email: data.email,
      message: data.message,
    })
    if (error) {
      setSubmitError('Your message could not be saved. Please email me directly instead.')
      setIsSubmitting(false)
      return
    }
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.name}`)
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)
    window.location.href = `mailto:${personalData.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
    setIsSubmitting(false)
    reset()
  }
  return <section id="contact" className="border-t"><div className="section-container"><motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeInUp}><p className="mb-3 font-mono text-sm accent-text">06 / contact</p><h2 className="section-title">Let's connect</h2><p className="mt-4 max-w-xl text-muted">Have an idea, an opportunity, or just want to talk about building with Java and AI? My inbox is open.</p></motion.div><div className="mt-12 grid gap-12 lg:grid-cols-[0.75fr_1fr] lg:gap-20"><motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer} className="space-y-6"><motion.a variants={staggerItem} href={`mailto:${personalData.email}`} className="group flex items-center gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(var(--accent-rgb),0.1)] accent-text"><Mail size={20} /></span><span><span className="block text-xs text-muted">Email</span><span className="text-sm font-medium transition-colors group-hover:accent-text sm:text-base">{personalData.email}</span></span></motion.a><motion.a variants={staggerItem} href={`tel:${personalData.phone.replace(/\s/g, '')}`} className="group flex items-center gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(var(--accent-rgb),0.1)] accent-text"><Phone size={20} /></span><span><span className="block text-xs text-muted">Phone</span><span className="text-sm font-medium transition-colors group-hover:accent-text sm:text-base">{personalData.phone}</span></span></motion.a><motion.div variants={staggerItem} className="flex gap-2 pt-3"><a href={personalData.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="flex h-11 w-11 items-center justify-center rounded-lg border text-muted transition-all hover:-translate-y-1 hover:border-[rgba(var(--accent-rgb),0.5)] hover:accent-text"><span className="font-mono text-xs font-semibold">GH</span></a><a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="flex h-11 w-11 items-center justify-center rounded-lg border text-muted transition-all hover:-translate-y-1 hover:border-[rgba(var(--accent-rgb),0.5)] hover:accent-text"><span className="font-mono text-xs font-semibold">in</span></a></motion.div></motion.div><motion.form onSubmit={handleSubmit(onSubmit)} initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer} className="space-y-5"><Field label="Name" error={errors.name?.message}><input {...register('name')} placeholder="Your name" className="field-input" /></Field><Field label="Email" error={errors.email?.message}><input {...register('email')} type="email" placeholder="you@example.com" className="field-input" /></Field><Field label="Message" error={errors.message?.message}><textarea {...register('message')} rows={5} placeholder="Tell me about your project or idea..." className="field-input resize-none" /></Field><button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto disabled:cursor-wait disabled:opacity-70"><Send size={17} /> {isSubmitting ? 'Saving message…' : 'Open email draft'}</button><AnimatePresence>{submitError && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-red-500">{submitError} <a className="underline" href={`mailto:${personalData.email}`}>Email directly</a>.</motion.p>}{submitted && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-emerald-500"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white"><Check size={13} /></span>Your email draft is ready to send.</motion.div>}</AnimatePresence></motion.form></div></div></section>
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <motion.div variants={staggerItem}><label className="mb-2 block text-sm font-medium">{label}</label>{children}<AnimatePresence>{error && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-xs text-red-500">{error}</motion.p>}</AnimatePresence></motion.div>
}
