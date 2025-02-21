import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { TopicsPage } from '@/pages/TopicsPage.tsx';
import { LessonPage } from '@/pages/LessonPage.tsx';
import { CongratsPage } from '@/pages/CongratsPage.tsx';
import { useEffect, useState } from 'react';
import { isTMA } from '@telegram-apps/bridge';

function App() {
  const [isTelegramEnv, setIsTelegramEnv] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkTelegram() {
      const result = await isTMA();
      setIsTelegramEnv(result);
    }
    checkTelegram();
  }, []);

  if (isTelegramEnv === null) {
    return <p>Проверка окружения...</p>;
  }

  if (!isTelegramEnv) {
    return <p>Откройте приложение через Telegram Mini App</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/lesson/:topic" element={<LessonPage />} />
        <Route path="/congrats" element={<CongratsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;