import { Briefcase, Coins, GraduationCap, PlaneTakeoff, CloudRain, Compass, HeartHandshake, Home, Feather, MoonStar, Palette, Zap, Landmark, Newspaper, LucideIcon } from 'lucide-react';

export interface Board {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string; // e.g. emerald, blue, etc.
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

