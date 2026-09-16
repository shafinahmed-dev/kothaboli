import { Briefcase, Coins, GraduationCap, PlaneTakeoff, CloudRain, Compass, HeartHandshake, Home, Feather, MoonStar, Palette, Zap, Landmark, Newspaper, LucideIcon } from 'lucide-react';

export interface Board {
  id: string;
  name: string;
  icon: LucideIcon;
}

export const BOARDS: Board[] = [
  { id: 'kb_corporate', name: 'Corporate', icon: Briefcase },
  { id: 'kb_money', name: 'Money', icon: Coins },
  { id: 'kb_academia', name: 'Academia', icon: GraduationCap },
  { id: 'kb_abroad', name: 'Abroad', icon: PlaneTakeoff },
  { id: 'kb_vent', name: 'Vent', icon: CloudRain },
  { id: 'kb_advice', name: 'Advice', icon: Compass },
  { id: 'kb_relationship', name: 'Relationship', icon: HeartHandshake },
  { id: 'kb_family', name: 'Family', icon: Home },
  { id: 'kb_stories', name: 'Stories', icon: Feather },
  { id: 'kb_horror', name: 'Horror', icon: MoonStar },
  { id: 'kb_culture', name: 'Culture', icon: Palette },
  { id: 'kb_humor', name: 'Humor', icon: Zap },
  { id: 'kb_politics', name: 'Politics', icon: Landmark },
  { id: 'kb_news', name: 'News', icon: Newspaper }
];
