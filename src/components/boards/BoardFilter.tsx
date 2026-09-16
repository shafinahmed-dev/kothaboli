'use client'

import { BOARDS } from '@/lib/constants/boards'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Layers } from 'lucide-react'

export function BoardFilter() {
  const searchParams = useSearchParams()
  const currentTag = searchParams.get('tag') || 'all'

  return (
    <div className="w-full mb-6">
      <div className="flex flex-wrap items-center gap-2 p-2 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl backdrop-blur-md">
        <Link 
          href="/" 
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all ${
            currentTag === 'all' 
              ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
              : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          All Boards
        </Link>
        {BOARDS.map(board => {
          const isActive = currentTag === board.id
          const Icon = board.icon
          return (
            <Link 
              key={board.id}
              href={`/?tag=${board.id}`} 
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                isActive 
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {board.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

