'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="de">
      <body className="bg-[#FDF6EE] text-[#333] font-sans min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl mb-4">⚠️</h1>
          <h2 className="text-2xl font-semibold text-[#8B5E3C] mb-2">Something went wrong</h2>
          <p className="text-sm text-gray-500 mb-6">An unexpected error occurred.</p>
          <button
            onClick={reset}
            className="bg-[#8B5E3C] text-white px-6 py-2 rounded-full hover:opacity-90 transition"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
