import { NavigationArea } from '@frontend/layout';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
} from 'lucide-react';

export const areas: NavigationArea[] = [
  {
    name: 'Aeronautics',
    logo: GalleryVerticalEnd,
  },
  {
    name: 'Missiles and Fire Control',
    logo: AudioWaveform,
  },
  {
    name: 'Space',
    logo: Command,
  },
  {
    name: 'Rotary and Mission Systems',
    logo: Bot,
  },
  {
    name: 'Enterprise Operations',
    logo: Settings2,
  },
  {
    name: 'Corporate',
    logo: BookOpen,
  },
];
