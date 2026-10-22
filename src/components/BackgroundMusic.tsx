import { useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const SRC = '/innum-konjam-neram.mp3'

let shared: HTMLAudioElement | null = null

function getAudio() {
  if (!shared) {
    shared = new Audio(SRC)
    shared.loop = true
    shared.preload = 'auto'
    shared.volume = 0.7
  }
  return shared
}

export default function BackgroundMusic() {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = getAudio()

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    setPlaying(!audio.paused)

    const start = (event?: Event) => {
      const target = event?.target
      if (target instanceof Element && target.closest('[data-bgm-toggle]')) return
      if (!audio.paused) return
      audio.play().catch(() => {})
    }

    start()
    window.addEventListener('pointerdown', start)
    window.addEventListener('keydown', start)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
    }
  }, [])

  const toggle = () => {
    const audio = getAudio()
    if (audio.paused) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }

  return (
    <button
      type="button"
      data-bgm-toggle
      onClick={toggle}
      aria-label={playing ? 'Pause background music' : 'Play background music'}
      aria-pressed={playing}
      className="fixed bottom-5 left-5 z-50 flex items-center justify-center rounded-full cursor-pointer"
      style={{
        width: 44,
        height: 44,
        color: 'white',
        background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
        boxShadow: '0 8px 24px rgba(244,63,94,0.35)',
      }}
    >
      {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  )
}
