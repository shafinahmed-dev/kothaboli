import { getUserProfile } from '@/app/actions/profile'
import { PersonaAvatar } from '@/components/boards/PersonaAvatar'
import { TagPill } from '@/components/boards/TagPill'
import { Lock, ArrowLeft, TerminalSquare } from 'lucide-react'
import Link from 'next/link'
import { ThreadCard } from '@/components/boards/ThreadCard'
import { formatInteractions } from "@/lib/utils"
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  const resolved = await params
  return { title: `${resolved.handle} | KothaBoli` }
}

export default async function PublicProfilePage({ params }: { params: Promise<{ handle: string }> }) {
  const resolved = await params
  let userProfileData
  try {
    userProfileData = await getUserProfile(resolved.handle)
  } catch (err) {
    notFound()
  }

  if (!userProfileData) {
    notFound()
  }

  const { profile, ageString, ongoing, past } = userProfileData

  return (
    <div className="max-w-3xl mx-auto w-full pb-20 pt-2 lg:pt-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-500 hover:text-white transition mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Feed
      </Link>

      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-10 mb-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
          <div className="relative">
            <div className="absolute inset-0 bg-white/5 rounded-full blur-xl animate-pulse"></div>
            <PersonaAvatar archetypeId={profile.persona || profile.archetype} className="w-24 h-24 md:w-28 md:h-28 text-5xl relative z-10 border-2 border-neutral-800" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">{profile.handle}</h1>
            <div className="inline-block px-3 py-1.5 bg-neutral-950 rounded-lg text-xs font-bold text-neutral-400 uppercase tracking-widest border border-neutral-800">
              {ageString}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-2 mb-6">
            <TerminalSquare className="w-5 h-5 text-neutral-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">Ongoing Threads</h2>
          </div>
          
          <div className="space-y-4">
            {ongoing.length > 0 ? (
              ongoing.map(thread => (
                <ThreadCard key={thread.id} thread={thread} />
              ))
            ) : (
              <div className="p-8 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800">
                <p className="text-neutral-500 font-bold uppercase tracking-wider text-sm">No active discussions right now.</p>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-neutral-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">Past Threads</h2>
          </div>
          
          <div className="space-y-4">
            {past.length > 0 ? (
              past.map(thread => {
                const commentCount = thread.comment_count ?? (Array.isArray(thread.comments) ? (thread.comments[0]?.count || 0) : (thread.comments?.count || 0))
                const viewsCount = thread.views || 0

                return (
                  <div key={thread.id} className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-sm">
                    <div className="flex flex-col gap-2 min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <TagPill tag={thread.tag} nonInteractive />
                        <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-red-400 bg-red-950/40 px-2.5 py-1 rounded-lg border border-red-500/30 uppercase tracking-wider">
                          <Lock className="w-3 h-3" />
                          Purged & Locked
                        </div>
                      </div>
                      <div className="text-base font-bold text-neutral-400 truncate line-through decoration-neutral-600 decoration-2">
                        {thread.title}
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-3 bg-neutral-950/90 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs font-bold text-neutral-300 shadow-inner">
                      <span>🔥 {viewsCount} views</span>
                      <span className="text-neutral-600">•</span>
                      <span>💬 {commentCount} comments</span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="p-8 text-center rounded-2xl bg-neutral-900/20 border border-neutral-800 border-dashed">
                <p className="text-neutral-600 font-bold uppercase tracking-wider text-sm">No archived discussions yet.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
