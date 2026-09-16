import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { getThreads } from '@/app/actions/threads'
import { BoardFilter } from '@/components/boards/BoardFilter'
import { ThreadCard } from '@/components/boards/ThreadCard'
import { CreateThreadModal } from '@/components/boards/CreateThreadModal'
import { Flame } from 'lucide-react'

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

      <div className="space-y-4">
        {threads.length > 0 ? (
          threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/40">
            <Flame className="w-12 h-12 text-neutral-700 mb-4" />
            <h3 className="text-lg font-bold text-slate-300">No active discussions</h3>
            <p className="text-slate-500 mt-2 max-w-sm text-sm font-medium">
              The void is quiet. There are currently no active self-destructing threads in this sector.
            </p>
          </div>
        )}
      </div>

      <CreateThreadModal isAuthenticated={!!user} />
    </div>
  )
}
