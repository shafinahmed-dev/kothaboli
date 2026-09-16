'use client'

import { useEffect, useState } from 'react'
import { Bell, CheckSquare } from 'lucide-react'
import { getNotifications, markNotificationsAsRead } from '@/app/actions/notifications'
import { getTimeAgo } from '@/lib/utils'
import Link from 'next/link'

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const fetchNotes = async () => {
    try {
      const data = await getNotifications()
      if (Array.isArray(data)) {
        setNotifications(data)
        const unread = data.filter((n) => !n.is_read).length
        setUnreadCount(unread)
      }
    } catch {
      // lightweight polling without bubbling error
    }
  }

  useEffect(() => {
    fetchNotes()
    const interval = setInterval(fetchNotes, 20000)
    return () => clearInterval(interval)
  }, [])

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleMarkRead = async () => {
    try {
      await markNotificationsAsRead()
      setUnreadCount(0)
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="relative">
      <button 
        onClick={handleOpen}
        className="relative flex items-center justify-center p-2 text-neutral-400 hover:text-white transition rounded-full hover:bg-neutral-800"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border border-slate-950">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl z-50 overflow-hidden transform opacity-100 scale-100 transition-all origin-top-right">
          <div className="p-3 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80 backdrop-blur">
            <h4 className="text-[11px] uppercase tracking-widest font-extrabold text-neutral-400">Notifications</h4>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkRead}
                className="text-[11px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest flex items-center gap-1 transition"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                Mark as read
              </button>
            )}
          </div>
          
          <div className="max-h-80 overflow-y-auto custom-scrollbar">
            {notifications.length > 0 ? (
              notifications.map((note) => (
                <Link 
                  key={note.id} 
                  href={`/thread/${note.thread_id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block p-4 border-b border-neutral-800/30 hover:bg-neutral-800 transition group ${
                    !note.is_read ? 'bg-neutral-800/20' : ''
                  }`}
                >
                  <p className="text-sm text-neutral-300 font-medium group-hover:text-white transition leading-snug">
                    <span className="font-bold text-white">{note.actor_handle}</span> 
                    {note.type === 'comment_reply' ? ' replied to your comment.' : ' infiltrated your thread.'}
                  </p>
                  <span className="text-xs text-neutral-500 mt-1.5 block font-bold">
                    {getTimeAgo(note.created_at)}
                  </span>
                </Link>
              ))
            ) : (
              <div className="p-6 text-center text-[13px] text-neutral-500 font-bold uppercase tracking-wider">
                The frequency is clear.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

