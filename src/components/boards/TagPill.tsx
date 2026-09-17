import { BoardIcon } from './BoardIcon'
import { BOARDS, BOARD_NEON_STYLES } from '@/lib/constants/boards'
import Link from 'next/link'

export function TagPill({ tag, className, nonInteractive = false }: { tag: string; className?: string, nonInteractive?: boolean }) {
  const board = BOARDS.find((b) => b.id === tag)
  const label = board?.name || tag
  const neonStyle = BOARD_NEON_STYLES[tag] || 'border-blue-400 text-blue-400 hover:bg-blue-950/40 hover:shadow-[0_0_12px_rgba(96,165,250,0.3)]'

  const content = (
    <>
      <BoardIcon tag={tag} className="w-4 h-4 shrink-0" />
      <span className="truncate">{label}</span>
    </>
  )

  const classes = `inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full transition-all border shadow-sm ${
    className || `bg-neutral-900 ${neonStyle}`
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


