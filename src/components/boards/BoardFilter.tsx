'use client'

import { BOARDS } from '@/lib/constants/boards'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Layers } from 'lucide-react'

export function BoardFilter() {
  const searchParams = useSearchParams()
  const currentTag = searchParams.get('tag') || 'all'

  return (
    <div className="w-full overflow-x-auto pb-4 mb-4" style={{scrollbarWidth: 'none'}}>
      <div className="flex items-center gap-2 px-1">
        <Link 
          href="/" 
          className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${currentTag === 'all' ? 'bg-white text-black' : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800'}`}
        >
          <Layers className="w-4 h-4" />
          All Boards
        </Link>
        {BOARDS.map(board => {
          const isActive = currentTag === board.id
          const Icon = board.icon
          return (
            <Link 
              key={board.id}
              href={`/?tag=${board.id}`} 
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${isActive ? 'bg-white text-black' : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800'}`}
            >
              <Icon className="w-4 h-4" />
              {board.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
