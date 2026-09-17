import { Briefcase, Coins, GraduationCap, PlaneTakeoff, CloudRain, Compass, HeartHandshake, Home, Feather, MoonStar, Palette, Zap, Landmark, Newspaper, LucideIcon } from 'lucide-react';

export interface Board {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

export const BOARDS: Board[] = [
  { id: 'kb_corporate', name: 'Corporate', icon: Briefcase, color: 'blue' },
  { id: 'kb_money', name: 'Money', icon: Coins, color: 'emerald' },
  { id: 'kb_academia', name: 'Academia', icon: GraduationCap, color: 'indigo' },
  { id: 'kb_abroad', name: 'Abroad', icon: PlaneTakeoff, color: 'sky' },
  { id: 'kb_vent', name: 'Vent', icon: CloudRain, color: 'purple' },
  { id: 'kb_advice', name: 'Advice', icon: Compass, color: 'amber' },
  { id: 'kb_relationship', name: 'Relationship', icon: HeartHandshake, color: 'rose' },
  { id: 'kb_family', name: 'Family', icon: Home, color: 'teal' },
  { id: 'kb_stories', name: 'Stories', icon: Feather, color: 'fuchsia' },
  { id: 'kb_horror', name: 'Horror', icon: MoonStar, color: 'violet' },
  { id: 'kb_culture', name: 'Culture', icon: Palette, color: 'pink' },
  { id: 'kb_humor', name: 'Humor', icon: Zap, color: 'yellow' },
  { id: 'kb_politics', name: 'Politics', icon: Landmark, color: 'orange' },
  { id: 'kb_news', name: 'News', icon: Newspaper, color: 'cyan' }
];

export const BOARD_NEON_STYLES: Record<string, string> = {
  kb_corporate: 'border-blue-400 text-blue-400 hover:bg-blue-950/40 hover:shadow-[0_0_12px_rgba(96,165,250,0.3)]',
  kb_money: 'border-emerald-400 text-emerald-400 hover:bg-emerald-950/40 hover:shadow-[0_0_12px_rgba(52,211,153,0.3)]',
  kb_academia: 'border-indigo-400 text-indigo-400 hover:bg-indigo-950/40 hover:shadow-[0_0_12px_rgba(129,140,248,0.3)]',
  kb_abroad: 'border-sky-400 text-sky-400 hover:bg-sky-950/40 hover:shadow-[0_0_12px_rgba(56,189,248,0.3)]',
  kb_vent: 'border-purple-400 text-purple-400 hover:bg-purple-950/40 hover:shadow-[0_0_12px_rgba(192,132,252,0.3)]',
  kb_advice: 'border-amber-400 text-amber-400 hover:bg-amber-950/40 hover:shadow-[0_0_12px_rgba(251,191,36,0.3)]',
  kb_relationship: 'border-rose-400 text-rose-400 hover:bg-rose-950/40 hover:shadow-[0_0_12px_rgba(251,113,133,0.3)]',
  kb_family: 'border-teal-400 text-teal-400 hover:bg-teal-950/40 hover:shadow-[0_0_12px_rgba(45,212,191,0.3)]',
  kb_stories: 'border-fuchsia-400 text-fuchsia-400 hover:bg-fuchsia-950/40 hover:shadow-[0_0_12px_rgba(232,121,249,0.3)]',
  kb_horror: 'border-violet-400 text-violet-400 hover:bg-violet-950/40 hover:shadow-[0_0_12px_rgba(167,139,250,0.3)]',
  kb_culture: 'border-pink-400 text-pink-400 hover:bg-pink-950/40 hover:shadow-[0_0_12px_rgba(244,114,182,0.3)]',
  kb_humor: 'border-yellow-400 text-yellow-400 hover:bg-yellow-950/40 hover:shadow-[0_0_12px_rgba(250,204,21,0.3)]',
  kb_politics: 'border-orange-400 text-orange-400 hover:bg-orange-950/40 hover:shadow-[0_0_12px_rgba(251,146,60,0.3)]',
  kb_news: 'border-cyan-400 text-cyan-400 hover:bg-cyan-950/40 hover:shadow-[0_0_12px_rgba(34,211,238,0.3)]',
}


