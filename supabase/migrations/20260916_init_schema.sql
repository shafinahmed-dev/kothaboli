CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_cron";

DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.comments CASCADE;
DROP TABLE IF EXISTS public.threads CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    handle TEXT UNIQUE NOT NULL,
    archetype TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.threads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    tag TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    total_interactions INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
    is_expired BOOLEAN DEFAULT FALSE
);

CREATE TABLE public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    thread_id UUID NOT NULL REFERENCES public.threads(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    actor_handle TEXT NOT NULL,
    thread_id UUID NOT NULL REFERENCES public.threads(id) ON DELETE CASCADE,
    comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    type TEXT NOT NULL DEFAULT 'reply',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days')
);

CREATE INDEX idx_threads_tag_expired_created ON public.threads(tag, is_expired, created_at DESC);
CREATE INDEX idx_comments_thread_created ON public.comments(thread_id, created_at ASC);
CREATE INDEX idx_notifications_recipient_read_created ON public.notifications(recipient_id, is_read, created_at DESC);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated profiles" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable read access for active threads" ON public.threads FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated threads" ON public.threads FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Enable read access for all comments" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Enable read access for own notifications" ON public.notifications FOR SELECT USING (auth.uid() = recipient_id);
CREATE POLICY "Enable insert for authenticated users" ON public.notifications FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

SELECT cron.schedule('hourly-7day-cleanup', '0 * * * *', $$
    UPDATE public.threads SET body = NULL, is_expired = TRUE WHERE expires_at <= NOW() AND is_expired = FALSE;
    DELETE FROM public.comments WHERE thread_id IN (SELECT id FROM public.threads WHERE is_expired = TRUE);
    DELETE FROM public.notifications WHERE expires_at <= NOW();
$$);
