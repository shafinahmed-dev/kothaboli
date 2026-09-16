import { BoardIcon } from './BoardIcon'
import { BOARDS } from '@/lib/constants/boards'
import Link from 'next/link'

export function TagPill({ tag, className, nonInteractive = false }: { tag: string; className?: string, nonInteractive?: boolean }) {
  const board = BOARDS.find((b) => b.id === tag)
  const label = board?.name || tag

  const content = (
    <>
      <BoardIcon tag={tag} className="w-4 h-4 shrink-0" />
      <span className="truncate">{label}</span>
    </>
  )

  const classes = `inline-flex items-center gap-1.5 px-2.5 py-1 text-sm font-medium rounded-full transition-colors ${className || 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`

  if (nonInteractive) {
    return <span className={classes}>{content}</span>
  }

  return (
    <Link href={`/?tag=${tag}`} className={classes}>
      {content}
    </Link>
  )
}

