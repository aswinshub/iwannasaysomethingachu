import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import LandingScreen from './components/LandingScreen'
import SurpriseScreen from './components/SurpriseScreen'
import FloatingParticles from './components/FloatingParticles'
import SetupPanel from './components/SetupPanel'
import BackgroundMusic from './components/BackgroundMusic'

type Screen = 'landing' | 'surprise'

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [herPhotoUrl, setHerPhotoUrl] = useState<string | null>(null)
  const [couplePhotoUrl, setCouplePhotoUrl] = useState<string | null>('/couple.jpg')
  const [setupOpen, setSetupOpen] = useState(false)
  const [burst, setBurst] = useState(false)

  const handleOpen = useCallback(() => {
    setBurst(true)
    setTimeout(() => {
      setScreen('surprise')
      setBurst(false)
    }, 600)
  }, [])

  const handleBack = useCallback(() => {
    setScreen('landing')
  }, [])

  const handleHerPhotoUpload = useCallback((url: string) => {
    setHerPhotoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return url
    })
  }, [])

  const handleHerPhotoRemove = useCallback(() => {
    setHerPhotoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
  }, [])

  const handleCouplePhotoUpload = useCallback((url: string) => {
    setCouplePhotoUrl((prev) => {
      if (prev && !prev.startsWith('/')) URL.revokeObjectURL(prev)
      return url
    })
  }, [])

  const handleCouplePhotoRemove = useCallback(() => {
    setCouplePhotoUrl((prev) => {
      if (prev && !prev.startsWith('/')) URL.revokeObjectURL(prev)
      return '/couple.jpg'
    })
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Background floating particles */}
      <FloatingParticles count={16} active={true} burst={burst} />

      {/* Screen transitions */}
      <AnimatePresence mode="wait">
        {screen === 'landing' ? (
          <LandingScreen
            key="landing"
            herPhotoUrl={herPhotoUrl}
            onOpen={handleOpen}
          />
        ) : (
          <SurpriseScreen
            key="surprise"
            couplePhotoUrl={couplePhotoUrl}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>

      <BackgroundMusic />

      {/* Setup Panel */}
      <SetupPanel
        isOpen={setupOpen}
        onToggle={() => setSetupOpen((o) => !o)}
        herPhotoUrl={herPhotoUrl}
        couplePhotoUrl={couplePhotoUrl}
        onHerPhotoUpload={handleHerPhotoUpload}
        onHerPhotoRemove={handleHerPhotoRemove}
        onCouplePhotoUpload={handleCouplePhotoUpload}
        onCouplePhotoRemove={handleCouplePhotoRemove}
      />
    </div>
  )
}
