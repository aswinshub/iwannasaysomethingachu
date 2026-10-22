import { motion, AnimatePresence } from 'framer-motion'
import { Settings, X, CheckCircle } from 'lucide-react'
import ImageUploader from './ImageUploader'

interface SetupPanelProps {
  isOpen: boolean
  onToggle: () => void
  herPhotoUrl: string | null
  couplePhotoUrl: string | null
  onHerPhotoUpload: (url: string) => void
  onHerPhotoRemove: () => void
  onCouplePhotoUpload: (url: string) => void
  onCouplePhotoRemove: () => void
}

export default function SetupPanel({
  isOpen,
  onToggle,
  herPhotoUrl,
  couplePhotoUrl,
  onHerPhotoUpload,
  onHerPhotoRemove,
  onCouplePhotoUpload,
  onCouplePhotoRemove,
}: SetupPanelProps) {
  const bothUploaded = herPhotoUrl && couplePhotoUrl

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={onToggle}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all shadow-lg shadow-rose-200/60 cursor-pointer"
        style={{
          background: bothUploaded ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #f43f5e, #e11d48)',
          color: 'white',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle setup panel"
        aria-expanded={isOpen}
      >
        {bothUploaded ? (
          <>
            <CheckCircle size={14} />
            Photos Ready
          </>
        ) : (
          <>
            <Settings size={14} className={isOpen ? 'rotate-45' : ''} style={{ transition: 'transform 0.3s' }} />
            Setup Photos
          </>
        )}
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onToggle}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm overflow-y-auto"
            style={{
              background: 'linear-gradient(160deg, #fff5f7 0%, #fef9ee 100%)',
              boxShadow: '-4px 0 40px rgba(244, 63, 94, 0.15)',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo setup panel"
          >
            {/* Header */}
            <div
              className="sticky top-0 flex items-center justify-between p-5 border-b border-rose-100"
              style={{ background: 'rgba(255,245,247,0.95)', backdropFilter: 'blur(10px)' }}
            >
              <div>
                <h2
                  className="text-lg font-semibold text-rose-800"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  ✨ Setup Your Photos
                </h2>
                <p className="text-xs text-rose-400 mt-0.5">
                  These images stay on your device only
                </p>
              </div>
              <button
                onClick={onToggle}
                className="w-8 h-8 rounded-full flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                aria-label="Close setup panel"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-8">
              {/* Privacy notice */}
              <div
                className="flex gap-2.5 p-3 rounded-xl text-xs text-rose-600"
                style={{ background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.12)' }}
              >
                <span className="text-base flex-shrink-0 mt-0.5">🔒</span>
                <p>
                  Images are stored only in your browser memory and never uploaded to any server.
                  They will be cleared when you close the tab.
                </p>
              </div>

              {/* Her photo upload */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    1
                  </span>
                  <h3 className="text-sm font-semibold text-rose-700" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Her Portrait Photo
                  </h3>
                </div>
                <ImageUploader
                  label="Landing Page Photo"
                  description="A beautiful solo photo of her for the opening screen"
                  imageUrl={herPhotoUrl}
                  onUpload={onHerPhotoUpload}
                  onRemove={onHerPhotoRemove}
                  id="her-photo-input"
                />
              </div>

              {/* Divider */}
              <div className="border-t border-rose-100" />

              {/* Couple photo upload */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    2
                  </span>
                  <h3 className="text-sm font-semibold text-rose-700" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Our Couple Photo
                  </h3>
                </div>
                <ImageUploader
                  label="Surprise Screen Photo"
                  description="A cherished photo of both of you for the heartfelt message"
                  imageUrl={couplePhotoUrl}
                  onUpload={onCouplePhotoUpload}
                  onRemove={onCouplePhotoRemove}
                  id="couple-photo-input"
                />
              </div>

              {/* Status */}
              <motion.div
                animate={{ scale: bothUploaded ? [1, 1.02, 1] : 1 }}
                transition={{ duration: 0.4 }}
                className="p-4 rounded-2xl text-center"
                style={{
                  background: bothUploaded
                    ? 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(22,163,74,0.12))'
                    : 'rgba(244,63,94,0.05)',
                  border: `1px solid ${bothUploaded ? 'rgba(34,197,94,0.3)' : 'rgba(244,63,94,0.15)'}`,
                }}
              >
                {bothUploaded ? (
                  <div className="flex flex-col items-center gap-1.5">
                    <CheckCircle size={22} className="text-green-500" />
                    <p className="text-sm font-semibold text-green-700">
                      Both photos are ready!
                    </p>
                    <p className="text-xs text-green-600">
                      Close this panel and share the link with her 💌
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-sm font-medium text-rose-500">
                      {herPhotoUrl ? '1 of 2 uploaded ✓' : '0 of 2 photos uploaded'}
                    </p>
                    <p className="text-xs text-rose-300">Upload both photos to complete the experience</p>
                  </div>
                )}
              </motion.div>

              {/* Done button */}
              {bothUploaded && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={onToggle}
                  className="w-full py-3 rounded-2xl text-sm font-semibold text-white transition-all cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
                    boxShadow: '0 4px 20px rgba(244,63,94,0.35)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Done — Preview the Experience 💌
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
