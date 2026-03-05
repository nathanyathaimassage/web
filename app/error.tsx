'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl mb-4">⚠️</h1>
        <h2 className="font-serif text-2xl text-primary mb-2">Something went wrong</h2>
        <p className="text-dark/60 text-sm mb-6">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button
          onClick={reset}
          className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition"
        >
          Try Again
        </button>
      </div>
    </section>
  )
}
