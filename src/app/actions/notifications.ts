'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getNotifications() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('notifications')
    .select('*')
    .eq('recipient_id', user.id)
    .eq('is_read', false)
    .order('created_at', { ascending: false })
    .limit(20)

  return data || []
}

export async function markNotificationsAsRead() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('recipient_id', user.id)

  revalidatePath('/', 'layout')
}
