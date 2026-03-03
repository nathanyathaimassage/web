'use client'
import { useState, useRef } from 'react'

type Props = {
  currentUrl?: string
  folder?: string
  onUploaded: (url: string) => void
  label?: string
  className?: string
}

export default function ImageUpload({ currentUrl, folder = 'general', onUploaded, label = 'Image', className = '' }: Props) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentUrl || null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setUploading(true)

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Upload failed')
        setPreview(currentUrl || null)
        return
      }

      setPreview(data.url)
      onUploaded(data.url)
    } catch {
      setError('Upload failed. Please try again.')
      setPreview(currentUrl || null)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  function handleRemove() {
    setPreview(null)
    onUploaded('')
  }

  return (
    <div className={className}>
      <label className="text-xs font-semibold text-dark/50 mb-1 block">{label}</label>
      <div className="border border-gray-200 rounded-lg p-3 bg-white">
        {preview ? (
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center gap-2">
              <button
                onClick={() => inputRef.current?.click()}
                className="bg-white text-dark px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-100 transition"
                disabled={uploading}
              >
                Change
              </button>
              <button
                onClick={handleRemove}
                className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
            {uploading && (
              <div className="absolute inset-0 bg-white/70 rounded-lg flex items-center justify-center">
                <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition text-dark/40 disabled:opacity-50"
          >
            {uploading ? (
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
            ) : (
              <>
                <span className="text-2xl">📷</span>
                <span className="text-xs font-medium">Click to upload image</span>
                <span className="text-[10px]">JPEG, PNG, WebP, GIF (max 5MB)</span>
              </>
            )}
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={handleFile}
        />
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>
    </div>
  )
}
