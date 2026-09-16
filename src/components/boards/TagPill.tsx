import { BoardIcon } from './BoardIcon'
import { BOARDS } from '@/lib/constants/boards'
import Link from 'next/link'

export function TagPill({ tag, className, nonInteractive = false }: { tag: string; className?: string, nonInteractive?: boolean }) {
  const board = BOARDS.find((b) => b.id === tag)
  const label = board?.name || tag
  const color = board?.color || 'blue'

  const content = (
    <>
      <BoardIcon tag={tag} className="w-4 h-4 shrink-0" />
      <span className="truncate">{label}</span>
    </>
  )

  const classes = `inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full transition-all border shadow-sm ${
    className || `bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-${color}-500/50 hover:bg-${color}-500/10 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]`
  }`

  if (nonInteractive) {
    return <span className={classes}>{content}</span>
  }

  return (
    <Link href={`/?tag=${tag}`} className={classes}>
      {content}
    </Link>
  )
}


