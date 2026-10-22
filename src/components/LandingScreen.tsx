import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface LandingScreenProps {
  herPhotoUrl: string | null
  onOpen: () => void
}

function HeartbeatIcon() {
  return (
    <motion.div
      animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
      transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
      className="inline-flex"
    >
      <Heart size={16} fill="#f43f5e" className="text-rose-500" />
    </motion.div>
  )
}


// ─── Love Animation placeholder ────────────────────────────────────────────
const ORBIT_HEARTS = [
  { angle: 0,   size: 14, delay: 0,    color: '#f43f5e', r: 62 },
  { angle: 60,  size: 10, delay: 0.3,  color: '#fda4af', r: 68 },
  { angle: 120, size: 16, delay: 0.6,  color: '#be123c', r: 58 },
  { angle: 180, size: 11, delay: 0.9,  color: '#f43f5e', r: 65 },
  { angle: 240, size: 13, delay: 1.2,  color: '#fda4af', r: 60 },
  { angle: 300, size: 9,  delay: 1.5,  color: '#be123c', r: 70 },
]

const SPARKLES = [
  { x: 30,  y: 20,  delay: 0 },
  { x: 70,  y: 15,  delay: 0.4 },
  { x: 80,  y: 70,  delay: 0.8 },
  { x: 20,  y: 75,  delay: 1.1 },
  { x: 50,  y: 85,  delay: 0.2 },
  { x: 15,  y: 45,  delay: 0.6 },
  { x: 85,  y: 40,  delay: 1.3 },
  { x: 50,  y: 10,  delay: 1.6 },
]

function LoveAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" aria-hidden="true">

      {/* Soft radial shimmer background */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.18) 0%, rgba(253,164,175,0.10) 50%, transparent 75%)',
        }}
      />

      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0"
        animate={{ x: ['-120%', '120%'] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)',
        }}
      />

      {/* Sparkle dots */}
      {SPARKLES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          animate={{
            opacity: [0, 1, 0],
            scale:   [0.4, 1.2, 0.4],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        >
          <svg width="8" height="8" viewBox="0 0 24 24" fill="#f43f5e">
            <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z"/>
          </svg>
        </motion.div>
      ))}

      {/* Ripple rings around centre */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            border: `1.5px solid rgba(244,63,94,${0.35 - i * 0.08})`,
            width:  `${48 + i * 22}px`,
            height: `${48 + i * 22}px`,
          }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: i * 0.45,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Orbiting mini-hearts */}
      {ORBIT_HEARTS.map((h, i) => {
        const rad = (h.angle * Math.PI) / 180
        const cx = Math.cos(rad) * h.r
        const cy = Math.sin(rad) * h.r
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: '50%', top: '50%' }}
            animate={{
              x: [cx - h.size / 2, cx - h.size / 2 + 4, cx - h.size / 2],
              y: [cy - h.size / 2, cy - h.size / 2 - 6, cy - h.size / 2],
              opacity: [0.6, 1, 0.6],
              scale:   [0.85, 1.15, 0.85],
            }}
            transition={{
              duration: 2.2 + i * 0.2,
              repeat: Infinity,
              delay: h.delay,
              ease: 'easeInOut',
            }}
          >
            <Heart size={h.size} fill={h.color} style={{ color: h.color }} />
          </motion.div>
        )
      })}

      {/* Central big heart — double beat */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        animate={{ scale: [1, 1.22, 1, 1.14, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 4px 14px rgba(244,63,94,0.55))' }}
      >
        <Heart size={52} fill="#f43f5e" style={{ color: '#f43f5e' }} />
      </motion.div>

    </div>
  )
}
// ────────────────────────────────────────────────────────────────────────────

function PhotoFrame({ herPhotoUrl }: { herPhotoUrl: string | null }) {

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.04, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(244,63,94,0.25) 0%, transparent 70%)',
          filter: 'blur(8px)',
          width: '110%',
          height: '110%',
          left: '-5%',
          top: '-5%',
        }}
      />

      {/* Animated border ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0%, #fda4af 25%, transparent 50%, #f43f5e 75%, transparent 100%)',
          padding: '3px',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: 'linear-gradient(135deg, #fff5f7, #fef9ee)' }}
        />
      </motion.div>

      {/* Photo or placeholder */}
      <div
        className="relative rounded-full overflow-hidden flex items-center justify-center"
        style={{
          width: 'clamp(180px, 45vw, 260px)',
          height: 'clamp(180px, 45vw, 260px)',
          boxShadow: '0 8px 40px rgba(244, 63, 94, 0.25), 0 2px 12px rgba(0,0,0,0.08)',
          border: '4px solid rgba(255,255,255,0.9)',
          background: 'linear-gradient(135deg, #ffe4ea, #fef9ee)',
        }}
      >
        {herPhotoUrl ? (
          <img
            src={herPhotoUrl}
            alt="Her portrait"
            className="w-full h-full object-cover"
          />
        ) : (
          <LoveAnimation />
        )}
      </div>

      {/* Small floating hearts around the frame */}
      {[...Array(4)].map((_, i) => {
        const angle = (i * 90) - 45
        const rad = (angle * Math.PI) / 180
        const r = 52
        const tx = Math.cos(rad) * r
        const ty = Math.sin(rad) * r
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(calc(-50% + ${tx}%), calc(-50% + ${ty}%))`,
            }}
            animate={{
              y: [0, -6, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          >
            <Heart
              size={10 + (i % 2) * 4}
              fill={i % 2 === 0 ? '#f43f5e' : '#fda4af'}
              className={i % 2 === 0 ? 'text-rose-500' : 'text-rose-300'}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

export default function LandingScreen({ herPhotoUrl, onOpen }: LandingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-x-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 30% 20%, #ffe4ea 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, #fecdd3 0%, transparent 50%), linear-gradient(160deg, #fff5f7 0%, #fef9ee 50%, #fff1f2 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        aria-hidden="true"
        style={{
          width: 'clamp(200px, 40vw, 400px)',
          height: 'clamp(200px, 40vw, 400px)',
          background: 'radial-gradient(circle, rgba(253,164,175,0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'translate(-30%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{
          width: 'clamp(150px, 30vw, 300px)',
          height: 'clamp(150px, 30vw, 300px)',
          background: 'radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)',
          filter: 'blur(30px)',
          transform: 'translate(30%, 30%)',
        }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center gap-8 max-w-sm w-full text-center"
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-2.5"
        >
          <div
            className="h-px flex-1 max-w-12"
            style={{ background: 'linear-gradient(to right, transparent, #fda4af)' }}
          />
          <span
            className="text-xs tracking-[0.25em] uppercase font-medium"
            style={{ color: '#e56384', fontFamily: 'Lato, sans-serif' }}
          >
            just for you
          </span>
          <div
            className="h-px flex-1 max-w-12"
            style={{ background: 'linear-gradient(to left, transparent, #fda4af)' }}
          />
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <h1
            className="text-3xl sm:text-4xl font-medium leading-tight"
            style={{
              fontFamily: 'Playfair Display, serif',
              color: '#881337',
              letterSpacing: '-0.01em',
            }}
          >
            Hey, my favorite
            <br />
            <span className="italic" style={{ color: '#e11d48' }}>
              kundimani
            </span>{' '}
            <HeartbeatIcon />
          </h1>
        </motion.div>

        {/* Photo frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 120 }}
          style={{
            width: 'clamp(200px, 50vw, 280px)',
            height: 'clamp(200px, 50vw, 280px)',
          }}
        >
          <PhotoFrame herPhotoUrl={herPhotoUrl} />
        </motion.div>

        {/* Sub-heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <p
            className="text-xl sm:text-2xl font-medium"
            style={{
              fontFamily: 'Playfair Display, serif',
              color: '#9f1239',
            }}
          >
            I have a little something
            <br />
            <span className="italic">for you...</span>
          </p>
        </motion.div>

        {/* Handwritten decoration */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-base"
          style={{
            fontFamily: 'Dancing Script, cursive',
            color: '#d63d63',
            fontSize: '1.15rem',
          }}
        >
          Open it whenever you miss me.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          onClick={onOpen}
          whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(244, 63, 94, 0.45)' }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 px-8 py-4 rounded-full text-white font-semibold text-base cursor-pointer transition-shadow"
          style={{
            background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
            boxShadow: '0 8px 30px rgba(244, 63, 94, 0.35), 0 2px 8px rgba(0,0,0,0.1)',
            fontFamily: 'Lato, sans-serif',
            letterSpacing: '0.01em',
          }}
          aria-label="Open my heart"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 1.2 }}
          >
            <Heart size={18} fill="white" className="text-white" />
          </motion.div>
          Open My Heart ❤️
        </motion.button>

        {/* Decorative bottom element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="flex items-center gap-3"
          aria-hidden="true"
        >
          <Heart size={8} fill="#fda4af" className="text-rose-300" />
          <Heart size={12} fill="#f43f5e" className="text-rose-500" />
          <Heart size={8} fill="#fda4af" className="text-rose-300" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
