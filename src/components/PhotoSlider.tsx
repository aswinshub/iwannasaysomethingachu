import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { DEFAULT_SLIDES } from '../slides'

const swipeVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.94,
  }),
}

interface PhotoSliderProps {
  /** Override the default slides with a custom list */
  slides?: { src: string; caption: string }[]
  /** Auto-advance interval in ms (0 = disabled) */
  autoPlayMs?: number
}

export default function PhotoSlider({
  slides = DEFAULT_SLIDES,
  autoPlayMs = 4500,
}: PhotoSliderProps) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const go = useCallback(
    (delta: number) => {
      setDir(delta)
      setIndex((prev) => (prev + delta + slides.length) % slides.length)
    },
    [slides.length],
  )

  // Auto-advance
  useEffect(() => {
    if (!autoPlayMs || paused) return
    timerRef.current = setTimeout(() => go(1), autoPlayMs)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [index, paused, autoPlayMs, go])

  const current = slides[index]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 90 }}
      className="relative mx-auto select-none"
      style={{ width: '100%', maxWidth: 380 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* ── Polaroid card ── */}
      <div
        className="rounded-2xl overflow-hidden w-full"
        style={{
          background: '#fff',
          padding: '12px 12px 48px 12px',
          boxShadow:
            '0 20px 60px rgba(0,0,0,0.14), 0 4px 20px rgba(244,63,94,0.18), 0 0 0 1px rgba(0,0,0,0.04)',
          position: 'relative',
        }}
      >
        {/* Photo viewport — clips the sliding images */}
        <div
          className="rounded-xl overflow-hidden w-full relative"
          style={{ aspectRatio: '3/4', background: '#fde8ed' }}
        >
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.img
              key={index}
              src={current.src}
              alt={current.caption}
              custom={dir}
              variants={swipeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.32, 0, 0.67, 0] }}
              className="absolute inset-0 w-full h-full object-contain"
              draggable={false}
            />
          </AnimatePresence>

          {/* Slide counter pill */}
          <div
            className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-white z-10"
            style={{
              background: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(6px)',
              fontSize: '0.65rem',
              fontFamily: 'Lato, sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            {index + 1} / {slides.length}
          </div>
        </div>

        {/* Polaroid caption */}
        <div className="pt-3 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: 'Dancing Script, cursive',
                color: '#9f1239',
                fontSize: '1.05rem',
              }}
            >
              {current.caption}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Nav arrows ── */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous photo"
        className="absolute top-1/2 -left-5 z-20 flex items-center justify-center rounded-full cursor-pointer transition-all"
        style={{
          transform: 'translateY(-60%)',
          width: 38,
          height: 38,
          background: 'linear-gradient(135deg, #fff5f7, #ffe4ea)',
          boxShadow: '0 4px 16px rgba(244,63,94,0.25), 0 1px 4px rgba(0,0,0,0.08)',
          border: '1.5px solid rgba(244,63,94,0.2)',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = 'linear-gradient(135deg, #f43f5e, #be123c)')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = 'linear-gradient(135deg, #fff5f7, #ffe4ea)')
        }
      >
        <ChevronLeft size={18} style={{ color: '#be123c' }} />
      </button>

      <button
        onClick={() => go(1)}
        aria-label="Next photo"
        className="absolute top-1/2 -right-5 z-20 flex items-center justify-center rounded-full cursor-pointer transition-all"
        style={{
          transform: 'translateY(-60%)',
          width: 38,
          height: 38,
          background: 'linear-gradient(135deg, #fff5f7, #ffe4ea)',
          boxShadow: '0 4px 16px rgba(244,63,94,0.25), 0 1px 4px rgba(0,0,0,0.08)',
          border: '1.5px solid rgba(244,63,94,0.2)',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = 'linear-gradient(135deg, #f43f5e, #be123c)')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = 'linear-gradient(135deg, #fff5f7, #ffe4ea)')
        }
      >
        <ChevronRight size={18} style={{ color: '#be123c' }} />
      </button>

      {/* ── Dot indicators ── */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDir(i > index ? 1 : -1); setIndex(i) }}
            aria-label={`Go to photo ${i + 1}`}
            className="rounded-full transition-all cursor-pointer"
            style={{
              width: i === index ? 20 : 7,
              height: 7,
              background: i === index
                ? 'linear-gradient(90deg, #f43f5e, #be123c)'
                : 'rgba(244,63,94,0.25)',
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Corner heart stickers */}
      <motion.div
        className="absolute -top-2.5 -right-2.5 z-10 pointer-events-none"
        animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart size={22} fill="#f43f5e" style={{ color: '#f43f5e' }} />
      </motion.div>
      <motion.div
        className="absolute -bottom-1 -left-2 z-10 pointer-events-none"
        animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      >
        <Heart size={15} fill="#fda4af" style={{ color: '#fda4af' }} />
      </motion.div>
    </motion.div>
  )
}
