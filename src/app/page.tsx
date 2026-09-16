import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { getThreads } from '@/app/actions/threads'
import { BoardFilter } from '@/components/boards/BoardFilter'
import { ThreadCard } from '@/components/boards/ThreadCard'
import { CreateThreadModal } from '@/components/boards/CreateThreadModal'
import { Flame } from 'lucide-react'
import { AdBanner } from '@/components/ads/AdBanner'
import React from 'react'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  const tag = typeof resolvedParams?.tag === 'string' ? resolvedParams.tag : 'all'

  const threads = await getThreads(tag)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="max-w-3xl mx-auto w-full pb-20">
      <Suspense fallback={<div className="h-10 bg-neutral-800 animate-pulse rounded-full w-full mb-4"></div>}>
        <BoardFilter />
      </Suspense>

      <CreateThreadModal isAuthenticated={!!user} />

      <div className="space-y-4">
        {threads.length > 0 ? (
          threads.map((thread, index) => (
            <React.Fragment key={thread.id}>
              <ThreadCard thread={thread} />
              {(index + 1) % 5 === 0 && index !== threads.length - 1 && (
                <AdBanner />
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/40">
            <Flame className="w-12 h-12 text-neutral-700 mb-4" />
            <h3 className="text-lg font-bold text-slate-300">No active discussions</h3>
            <p className="text-slate-500 mt-2 max-w-sm text-sm font-medium">
              No active discussions on this board yet. Be the first to start one!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

