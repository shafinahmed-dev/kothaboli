import { BOARDS } from '@/lib/constants/boards'
import { HelpCircle } from 'lucide-react'

export function BoardIcon({ tag, className }: { tag: string; className?: string }) {
  const board = BOARDS.find((b) => b.id === tag)
  const Icon = board?.icon || HelpCircle
  return <Icon className={className} />
}
