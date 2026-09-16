import './globals.css'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ArchetypeModal } from '@/components/layout/ArchetypeModal'

export const metadata: Metadata = {
  title: 'KothaBoli | কথাবলি',
  description: 'Anonymous tech community',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let profile = null
  const isAuthenticated = !!user
  
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <html lang="en">
      <body 
        className="bg-neutral-950 text-slate-200 antialiased flex flex-col min-h-screen"
        style={{ fontFamily: "'Inter', 'Noto Sans Bengali', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
      >
        <Navbar profile={profile} />
        {isAuthenticated && !profile && <ArchetypeModal hasProfile={false} />}
        <main className="container mx-auto px-4 mt-6 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

