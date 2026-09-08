import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const x = useSpring(useMotionValue(-20), { stiffness: 500, damping: 35, mass: 0.2 })
  const y = useSpring(useMotionValue(-20), { stiffness: 500, damping: 35, mass: 0.2 })

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      x.set(event.clientX - 4)
      y.set(event.clientY - 4)
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [x, y])

  return <motion.span aria-hidden="true" style={{ x, y }} className="custom-cursor pointer-events-none fixed left-0 top-0 z-[190] h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.65)]" />
}
