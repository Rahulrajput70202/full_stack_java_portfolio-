import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const INTRO_DURATION = 2200
const FALLBACK_DURATION = 4000

export default function Preloader() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [motionPreference, setMotionPreference] = useState<boolean | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setMotionPreference(prefersReduced)
    if (prefersReduced) {
      setVisible(false)
    }
  }, [])

  useEffect(() => {
    if (!visible || motionPreference === true) return

    const startedAt = performance.now()
    const progressTimer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt
      setProgress(Math.min(100, Math.round((elapsed / INTRO_DURATION) * 100)))
    }, 20)

    const startExit = window.setTimeout(() => {
      setExiting(true)
    }, INTRO_DURATION)

    const finishTimer = window.setTimeout(() => {
      setVisible(false)
    }, INTRO_DURATION + 600)

    const fallbackTimer = window.setTimeout(() => {
      setExiting(true)
      setVisible(false)
    }, FALLBACK_DURATION)

    return () => {
      window.clearInterval(progressTimer)
      window.clearTimeout(startExit)
      window.clearTimeout(finishTimer)
      window.clearTimeout(fallbackTimer)
    }
  }, [motionPreference, visible])

  const shouldReducedMotion = reduceMotion || motionPreference === true

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          aria-label="Loading Rahul Bainade portfolio"
          role="status"
        >
          {shouldReducedMotion ? (
            <div className="flex items-center justify-center bg-[#0a0a0f]" style={{ position: 'absolute', inset: 0 }}>
              <p className="font-mono text-sm text-slate-400">Loading…</p>
            </div>
          ) : (
            <>
              {/* Left curtain panel */}
              <motion.div
                animate={exiting ? { x: '-100%' } : { x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 h-full w-1/2 bg-[#0a0a0f]"
              >
                <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent" />
              </motion.div>

              {/* Right curtain panel */}
              <motion.div
                animate={exiting ? { x: '100%' } : { x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-0 h-full w-1/2 bg-[#0a0a0f]"
              >
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent" />
              </motion.div>

              {/* Center content — sits above panels, fades out as curtains split */}
              <motion.div
                animate={exiting ? { opacity: 0, scale: 0.92 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-[min(340px,80vw)] text-center"
              >
                <div className="flex justify-center overflow-hidden font-mono text-5xl font-semibold tracking-tight text-slate-100 sm:text-6xl">
                  {'RB'.split('').map((letter, index) => (
                    <motion.span
                      key={`${letter}-${index}`}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.14, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-4 text-xs uppercase tracking-[0.3em] text-emerald-400"
                >
                  developer profile
                </motion.p>
                <div className="mt-8 h-px overflow-hidden bg-white/10">
                  <motion.div
                    className="h-full bg-emerald-400"
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'linear', duration: 0.02 }}
                  />
                </div>
                <div className="mt-3 flex justify-between font-mono text-[11px] text-slate-500">
                  <span>initializing</span>
                  <span>{progress}%</span>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
