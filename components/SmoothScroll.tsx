'use client'

import { useEffect } from 'react'
import { animate, motion, useMotionValue, useScroll } from 'framer-motion'
import { ReactNode } from 'react'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll()
  const smoothY = useMotionValue(0)

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      animate(smoothY, latest, {
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1]
      })
    })

    return () => unsubscribe()
  }, [scrollY, smoothY])

  return (
    <motion.div
      style={{
      translateY: -smoothY.get(),
      position: 'relative' as const,
      }}
    >
      {children}
    </motion.div>
  )
}