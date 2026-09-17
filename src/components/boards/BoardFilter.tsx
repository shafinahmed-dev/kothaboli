'use client'

import { BOARDS, BOARD_NEON_HOVER_STYLES, BOARD_NEON_ACTIVE_STYLES } from '@/lib/constants/boards'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Layers } from 'lucide-react'

export function BoardFilter() {
  const searchParams = useSearchParams()
  const currentTag = searchParams.get('tag') || 'all'

  return (
    <div className="w-full mb-6">
      <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-neutral-900/80 border border-neutral-800/80 rounded-2xl backdrop-blur-md shadow-xl">
        <Link 
          href="/" 
          className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all border ${
            currentTag === 'all' 
              ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105' 
              : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-800/80'
          }`}
        >
          <Layers className="w-4 h-4 shrink-0" />
          All Boards
        </Link>
        {BOARDS.map(board => {
          const isActive = currentTag === board.id
          const Icon = board.icon
          const neonHover = BOARD_NEON_HOVER_STYLES[board.id] || 'hover:border-blue-400 hover:text-blue-400'
          const neonActive = BOARD_NEON_ACTIVE_STYLES[board.id] || 'border-blue-400 text-blue-400 bg-blue-950/50'

          return (
            <Link 
              key={board.id}
              href={`/?tag=${board.id}`} 
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all border ${
                isActive 
                  ? `${neonActive} scale-105 font-extrabold` 
                  : `bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white ${neonHover}`
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{board.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

