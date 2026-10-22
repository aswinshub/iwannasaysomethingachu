import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, ImageIcon } from 'lucide-react'

interface ImageUploaderProps {
  label: string
  description: string
  imageUrl: string | null
  onUpload: (url: string) => void
  onRemove: () => void
  id: string
}

export default function ImageUploader({
  label,
  description,
  imageUrl,
  onUpload,
  onRemove,
  id,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const ACCEPTED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  function handleFile(file: File) {
    setError(null)
    if (!ACCEPTED.includes(file.type)) {
      setError('Please upload a JPG, PNG, or WebP image.')
      return
    }
    if (file.size > 15 * 1024 * 1024) {
      setError('Image must be under 15 MB.')
      return
    }
    const url = URL.createObjectURL(file)
    onUpload(url)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    // Reset input so same file can be re-uploaded
    e.target.value = ''
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-sm font-semibold text-rose-800" style={{ fontFamily: 'Lato, sans-serif' }}>
          {label}
        </p>
        <p className="text-xs text-rose-400 mt-0.5">{description}</p>
      </div>

      {imageUrl ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-2xl overflow-hidden shadow-md group"
          style={{ aspectRatio: '4/3' }}
        >
          <img
            src={imageUrl}
            alt="Uploaded preview"
            className="w-full h-full object-cover"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={() => inputRef.current?.click()}
              className="bg-white/90 hover:bg-white text-rose-700 text-xs font-semibold px-3 py-2 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label="Replace image"
            >
              <Upload size={12} />
              Replace
            </button>
            <button
              onClick={onRemove}
              className="bg-rose-500/90 hover:bg-rose-600 text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label="Remove image"
            >
              <X size={12} />
              Remove
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 py-8 px-4 ${
            dragging
              ? 'border-rose-400 bg-rose-50'
              : 'border-rose-200 bg-rose-50/50 hover:border-rose-300 hover:bg-rose-50'
          }`}
          style={{ aspectRatio: '4/3', minHeight: '120px' }}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          aria-label={`Upload ${label}`}
        >
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
            <ImageIcon size={18} className="text-rose-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-rose-500">
              {dragging ? 'Drop it here ✨' : 'Click or drag to upload'}
            </p>
            <p className="text-xs text-rose-300 mt-1">JPG, PNG, WebP · Max 15MB</p>
          </div>
          <div className="flex items-center gap-1.5 bg-rose-500 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-rose-600 transition-colors">
            <Upload size={12} />
            Choose Photo
          </div>
        </motion.div>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500 font-medium"
        >
          {error}
        </motion.p>
      )}

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleInputChange}
        aria-hidden="true"
      />
    </div>
  )
}
