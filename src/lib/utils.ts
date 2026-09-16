import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatInteractions(count: number): string {
  if (count < 1000) return count.toString()
  return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
}

export function getTimeRemaining(expiresAt: string) {
  const diff = new Date(expiresAt).getTime() - new Date().getTime()
  if (diff <= 0) return 'Expired'
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / 1000 / 60) % 60)
  
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

export function getTimeAgo(createdAt: string) {
  const diff = new Date().getTime() - new Date(createdAt).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))
  
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return `just now`
}

export function getTimerUrgencyStyle(expiresAt: string) {
  const diff = new Date(expiresAt).getTime() - new Date().getTime()
  if (diff <= 0) {
    return 'border-neutral-800 text-neutral-500 bg-neutral-900/50'
  }
  const hoursLeft = diff / (1000 * 60 * 60)
  if (hoursLeft > 72) {
    return 'border-sky-500/30 text-sky-400 bg-sky-950/20'
  }
  if (hoursLeft >= 24) {
    return 'border-amber-500/40 text-amber-300 bg-amber-950/25'
  }
  return 'border-rose-500/60 text-rose-400 bg-rose-950/30 animate-pulse'
}
