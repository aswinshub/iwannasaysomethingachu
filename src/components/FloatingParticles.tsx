import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
  type: 'heart' | 'sparkle' | 'dot'
}

function HeartSVG({ size, color = '#f43f5e' }: { size: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
    </svg>
  )
}

function SparkleSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L13.09 8.26L19 6L14.74 10.74L21 12L14.74 13.26L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.26L3 12L9.26 10.74L5 6L10.91 8.26L12 2Z"
        fill="#f9a8d4"
        opacity="0.8"
      />
    </svg>
  )
}

function generateParticles(count: number): Particle[] {
  const types: Particle['type'][] = ['heart', 'heart', 'sparkle', 'dot']
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 16 + 8,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.15,
    type: types[Math.floor(Math.random() * types.length)],
  }))
}

interface FloatingParticlesProps {
  count?: number
  active?: boolean
  burst?: boolean
}

export default function FloatingParticles({
  count = 18,
  active = true,
  burst = false,
}: FloatingParticlesProps) {
  const particlesRef = useRef<Particle[]>(generateParticles(count))

  if (!active) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {particlesRef.current.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: burst ? `${50 + (Math.random() * 40 - 20)}%` : `${p.y}%`,
            opacity: 0,
          }}
          animate={
            burst
              ? {
                  y: [0, -(Math.random() * 300 + 100)],
                  x: [0, (Math.random() - 0.5) * 200],
                  opacity: [0, p.opacity * 1.5, 0],
                  scale: [0.5, 1.2, 0.3],
                }
              : {
                  y: [0, -(Math.random() * 80 + 40)],
                  opacity: [0, p.opacity, p.opacity * 0.5, 0],
                  scale: [0.8, 1, 0.9],
                }
          }
          transition={{
            duration: burst ? p.duration * 0.6 : p.duration,
            delay: burst ? p.delay * 0.3 : p.delay,
            repeat: burst ? 0 : Infinity,
            ease: 'easeOut',
          }}
        >
          {p.type === 'heart' && (
            <HeartSVG
              size={p.size}
              color={p.id % 3 === 0 ? '#f43f5e' : p.id % 3 === 1 ? '#fb7185' : '#fda4af'}
            />
          )}
          {p.type === 'sparkle' && <SparkleSVG size={p.size * 0.8} />}
          {p.type === 'dot' && (
            <div
              style={{
                width: p.size * 0.4,
                height: p.size * 0.4,
                borderRadius: '50%',
                background: '#fda4af',
                opacity: 0.6,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
