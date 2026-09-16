import { Cpu, Flame, Search, Sword, Rocket, FlaskConical, Ghost, Megaphone, MessageSquare, Box, Eye, User, Pen, Smile, LucideIcon } from 'lucide-react';

export interface Persona {
  id: string;
  name: string;
  icon: LucideIcon;
  adjectives: string[];
  nouns: string[];
}

export const PERSONAS: Persona[] = [
  { id: 'netrunner', name: 'Netrunner', icon: Cpu, adjectives: ['Neon', 'Cyber', 'Wired'], nouns: ['Deck', 'Grid', 'Synth'] },
  { id: 'cultist', name: 'Cultist', icon: Flame, adjectives: ['Dark', 'Ominous', 'Zealous'], nouns: ['Ritual', 'Altar', 'Chant'] },
  { id: 'detective', name: 'Detective', icon: Search, adjectives: ['Sleuth', 'Grim', 'Sharp'], nouns: ['Shadow', 'Lens', 'Trench'] },
  { id: 'knight', name: 'Knight', icon: Sword, adjectives: ['Brave', 'Loyal', 'Valiant'], nouns: ['Shield', 'Blade', 'Armor'] },
  { id: 'cosmic', name: 'Cosmic', icon: Rocket, adjectives: ['Astral', 'Stellar', 'Void'], nouns: ['Nebula', 'Orbit', 'Nova'] },
  { id: 'alchemist', name: 'Alchemist', icon: FlaskConical, adjectives: ['Mystic', 'Liquid', 'Arcane'], nouns: ['Potion', 'Flask', 'Elixir'] },
  { id: 'phantom', name: 'Phantom', icon: Ghost, adjectives: ['Ethereal', 'Silent', 'Faded'], nouns: ['Echo', 'Mist', 'Spirit'] },
  { id: 'politician', name: 'Politician', icon: Megaphone, adjectives: ['Silver', 'Sly', 'Vocal'], nouns: ['Podium', 'Suit', 'Smile'] },
  { id: 'yapper', name: 'Yapper', icon: MessageSquare, adjectives: ['Loud', 'Chatty', 'Quick'], nouns: ['Mouth', 'Word', 'Echo'] },
  { id: 'scavenger', name: 'Scavenger', icon: Box, adjectives: ['Rusty', 'Dusty', 'Clever'], nouns: ['Scrap', 'Nails', 'Gear'] },
  { id: 'spy', name: 'Spy', icon: Eye, adjectives: ['Hidden', 'Silent', 'Sly'], nouns: ['Dagger', 'Cloak', 'Code'] },
  { id: 'loner', name: 'Loner', icon: User, adjectives: ['Quiet', 'Solo', 'Far'], nouns: ['Path', 'Wolf', 'Drifter'] },
  { id: 'scribe', name: 'Scribe', icon: Pen, adjectives: ['Wise', 'Ancient', 'Inked'], nouns: ['Scroll', 'Quill', 'Tome'] },
  { id: 'jester', name: 'Jester', icon: Smile, adjectives: ['Funny', 'Wild', 'Crazy'], nouns: ['Joke', 'Fool', 'Hat'] }
];

export function generatePersonaHandle(personaId: string): string {
  const arc = PERSONAS.find(a => a.id === personaId);
  if (!arc) return `Anon${Math.floor(Math.random() * 999)}`;
  const adj = arc.adjectives[Math.floor(Math.random() * arc.adjectives.length)];
  const noun = arc.nouns[Math.floor(Math.random() * arc.nouns.length)];
  const num = Math.floor(Math.random() * 100);
  return `${adj}${noun}${num}`;
}

export const generateArchetypeHandle = generatePersonaHandle

