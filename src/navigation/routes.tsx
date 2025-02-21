import { HomePage } from '@/pages/HomePage.tsx';
import { LessonPage } from '@/pages/LessonPage.tsx';
import { CongratsPage } from '@/pages/CongratsPage.tsx';
import { LeaderboardPage } from '@/pages/LeaderboardPage.tsx';

export const routes = [
  { path: '/', Component: HomePage },
  { path: '/lesson/:topic', Component: LessonPage },
  { path: '/congrats', Component: CongratsPage },
  { path: '/leaderboard', Component: LeaderboardPage },
];