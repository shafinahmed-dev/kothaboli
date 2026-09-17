'use client'

import { useState } from 'react'
import { Share, Check } from 'lucide-react'

interface ShareButtonProps {
  threadId: string
  title?: string
  className?: string
}

export function ShareButton({ threadId, title, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (typeof window === 'undefined') return

    const url = `${window.location.origin}/thread/${threadId}`

    try {
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        await navigator.share({
          title: title || 'KothaBoli Thread',
          url,
        })
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      if ((err as Error)?.name !== 'AbortError' && navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch {
          // fallback ignore
        }
      }
    }
  }

  return (
    <button
      onClick={handleShare}
      className={className || "flex items-center gap-1.5 hover:text-white transition-colors duration-150 text-neutral-400 font-bold"}
      title="Share thread"
      type="button"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 font-bold">Copied!</span>
        </>
      ) : (
        <>
          <Share className="w-4 h-4" />
          <span>Share</span>
        </>
      )}
    </button>
  )
}
