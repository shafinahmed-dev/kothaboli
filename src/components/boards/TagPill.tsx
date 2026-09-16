import { BoardIcon } from './BoardIcon'
import { BOARDS } from '@/lib/constants/boards'
import Link from 'next/link'

export function TagPill({ tag, className }: { tag: string; className?: string }) {
  const board = BOARDS.find((b) => b.id === tag)
  const label = board?.name || tag

  return (
    <Link 
      href={`/boards/${tag}`} 
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-sm font-medium rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors ${className || ''}`}
    >
      <BoardIcon tag={tag} className="w-4 h-4" />
      {label}
    </Link>
  )
}
