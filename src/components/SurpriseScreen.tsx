import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, RefreshCw, ArrowLeft } from 'lucide-react'
import PhotoSlider from './PhotoSlider'
import { DEFAULT_SLIDES } from '../slides'

interface SurpriseScreenProps {
  couplePhotoUrl: string | null
  onBack: () => void
}

const MESSAGE_LINES = [
  'If I could be anywhere right now, I would choose to be right beside you.',
  "I miss your smile, your voice, your hugs, and all those little moments that feel ordinary until you're not here.",
  'Even when we\'re apart, you are still my favorite part of every day.',
  'If I could ask for just one thing right now, it would be a little more time with you.',
  'Until I can hold you again, just remember that someone is thinking about you, smiling because of you, and missing you more than words can say.',
  'That someone is me. ❤️',
]

function HeartbeatPulse() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ width: 80, height: 80 }}
      aria-hidden="true"
    >
      <div className="relative w-14 h-14 flex items-center justify-center">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full"
            style={{ background: 'rgba(244,63,94,0.15)' }}
            animate={{ scale: [1, 2.5 + i * 0.5], opacity: [0.5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.35,
              ease: 'easeOut',
            }}
          />
        ))}
        <motion.div
          animate={{ scale: [1, 1.18, 1, 1.12, 1] }}
          transition={{ duration: 1.0, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' }}
          className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #fff5f7, #ffe4ea)',
            boxShadow: '0 4px 20px rgba(244,63,94,0.25)',
          }}
        >
          <Heart size={24} fill="#f43f5e" className="text-rose-500" />
        </motion.div>
      </div>
    </div>
  )
}

function slidesFor(couplePhotoUrl: string | null) {
  if (!couplePhotoUrl || couplePhotoUrl === '/couple.jpg') return DEFAULT_SLIDES
  return [
    { src: couplePhotoUrl, caption: 'us, always & forever' },
    ...DEFAULT_SLIDES.filter((slide) => slide.src !== '/couple.jpg'),
  ]
}

function AnimatedMessage({ replay }: { replay: number }) {
  return (
    <div className="flex flex-col gap-5 w-full text-center">
      {MESSAGE_LINES.map((line, i) => (
        <motion.p
          key={`${replay}-${i}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.8 + i * 0.55,
            ease: 'easeOut',
          }}
          style={{
            fontFamily:
              i === MESSAGE_LINES.length - 1 ? 'Playfair Display, serif' : 'Lato, sans-serif',
            fontSize: i === MESSAGE_LINES.length - 1 ? '1.05rem' : '0.95rem',
            fontWeight: i === MESSAGE_LINES.length - 1 ? 600 : 400,
            color: i === MESSAGE_LINES.length - 1 ? '#be123c' : '#6b2d47',
            fontStyle: i === MESSAGE_LINES.length - 1 ? 'italic' : 'normal',
            lineHeight: 1.8,
          }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  )
}

export default function SurpriseScreen({ couplePhotoUrl, onBack }: SurpriseScreenProps) {
  const [replay, setReplay] = useState(0)
  const [showReplayBtn, setShowReplayBtn] = useState(false)

  const totalDelay = 0.8 + MESSAGE_LINES.length * 0.55 + 0.8

  useEffect(() => {
    setShowReplayBtn(false)
    const timer = setTimeout(() => setShowReplayBtn(true), totalDelay * 1000)
    return () => clearTimeout(timer)
  }, [replay])

  const handleReplay = useCallback(() => {
    setShowReplayBtn(false)
    setReplay((r) => r + 1)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 20% 10%, #ffe4ea 0%, transparent 45%), radial-gradient(ellipse at 80% 90%, #fecdd3 0%, transparent 45%), linear-gradient(180deg, #fff5f7 0%, #fef9ee 40%, #fff1f2 100%)',
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #fda4af, #f43f5e, #be123c, #f43f5e, #fda4af)',
        }}
        aria-hidden="true"
      />

      {/* ── Centered content column ── */}
      <div
        className="relative z-10 w-full flex flex-col items-center"
        style={{ padding: '48px 20px 60px' }}
      >
        {/* Inner width constraint — truly centered */}
        <div className="w-full" style={{ maxWidth: 600 }}>

          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium cursor-pointer mb-8"
            style={{ color: '#d63d63', fontFamily: 'Lato, sans-serif' }}
            whileHover={{ x: -3 }}
            aria-label="Back to landing page"
          >
            <ArrowLeft size={16} />
            Back to You
          </motion.button>

          {/* Main heading — centred */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full text-center mb-10"
          >
            <motion.h1
              className="font-bold leading-tight"
              style={{
                fontFamily: 'Playfair Display, serif',
                color: '#be123c',
                letterSpacing: '-0.01em',
                fontSize: 'clamp(2rem, 6vw, 3.2rem)',
              }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(244,63,94,0)',
                  '0 0 20px rgba(244,63,94,0.3)',
                  '0 0 20px rgba(244,63,94,0)',
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              I MISS YOU
              <br />
              <span className="italic font-medium" style={{ color: '#e11d48' }}>
                SO MUCH
              </span>{' '}
              ❤️
            </motion.h1>
          </motion.div>

          {/* Photo slides — centred */}
          <div className="w-full flex justify-center mb-10 px-7">
            <PhotoSlider slides={slidesFor(couplePhotoUrl)} />
          </div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-10"
            aria-hidden="true"
          >
            <div
              className="h-px flex-1"
              style={{ background: 'linear-gradient(to right, transparent, #fda4af)' }}
            />
            <Heart size={10} fill="#fda4af" className="text-rose-300" />
            <Heart size={14} fill="#f43f5e" className="text-rose-500" />
            <Heart size={10} fill="#fda4af" className="text-rose-300" />
            <div
              className="h-px flex-1"
              style={{ background: 'linear-gradient(to left, transparent, #fda4af)' }}
            />
          </motion.div>

          {/* Letter card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full rounded-3xl mb-8"
            style={{
              padding: 'clamp(24px, 5vw, 40px)',
              background: 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,200,213,0.5)',
              boxShadow: '0 8px 40px rgba(244,63,94,0.08), 0 2px 12px rgba(0,0,0,0.04)',
            }}
          >
            <AnimatedMessage replay={replay} />
          </motion.div>

          {/* Sub-caption */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: totalDelay - 0.4, duration: 0.8 }}
            className="w-full text-center text-sm mb-8"
            style={{
              fontFamily: 'Lato, sans-serif',
              color: '#9f1239',
              letterSpacing: '0.02em',
            }}
          >
            No matter how far apart we are, you have a special place in my heart.
          </motion.p>

          {/* Heartbeat */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: totalDelay - 0.2, duration: 0.6, type: 'spring' }}
            className="w-full flex justify-center mb-8"
          >
            <HeartbeatPulse />
          </motion.div>

          {/* Final handwritten line */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: totalDelay, duration: 0.8 }}
            className="w-full text-center mb-10"
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: 'clamp(1rem, 3.5vw, 1.2rem)',
              color: '#be123c',
            }}
          >
            Missing you today, tomorrow, and all the days in between. ❤️
          </motion.p>

          {/* Action buttons */}
          <AnimatePresence>
            {showReplayBtn && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.button
                  onClick={handleReplay}
                  whileHover={{ scale: 1.04, boxShadow: '0 10px 35px rgba(244,63,94,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-semibold text-sm cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
                    boxShadow: '0 6px 24px rgba(244,63,94,0.3)',
                    fontFamily: 'Lato, sans-serif',
                  }}
                  aria-label="Replay the message animation"
                >
                  <RefreshCw size={15} />
                  Read My Message Again 💌
                </motion.button>

                <motion.button
                  onClick={onBack}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium cursor-pointer"
                  style={{
                    color: '#d63d63',
                    background: 'rgba(244,63,94,0.07)',
                    border: '1px solid rgba(244,63,94,0.2)',
                    fontFamily: 'Lato, sans-serif',
                  }}
                  aria-label="Back to landing page"
                >
                  <ArrowLeft size={14} />
                  Back to You
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom hearts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: totalDelay + 0.3, duration: 1 }}
            className="w-full flex items-center justify-center gap-2 mt-12"
            aria-hidden="true"
          >
            <Heart size={7} fill="#fda4af" className="text-rose-300" />
            <Heart size={10} fill="#f43f5e" className="text-rose-500" />
            <Heart size={7} fill="#fda4af" className="text-rose-300" />
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}
