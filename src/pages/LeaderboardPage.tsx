import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { AppRoot, Section, Cell, List, Button } from '@telegram-apps/telegram-ui';

// Подключение Supabase
const supabaseUrl = 'https://aubxfkkdldrjkjgkaqrf.supabase.co'; // Заменить на свой URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1Ynhma2tkbGRyamtqZ2thcXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0Nzc2OTUsImV4cCI6MjA1NTA1MzY5NX0.0QlE4Npo09owf-Y8vtRqog20VZA4jsuzWh0KzV88kj4';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const LeaderboardPage = () => {
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const { data, error } = await supabase
        .from('user_scores')
        .select('*')
        .order('score', { ascending: false });

      if (error) console.error('Ошибка загрузки рейтинга:', error);
      else setScores(data);
    };

    fetchScores();
  }, []);

  return (
    <AppRoot>
      <List>
        <Section header="🏆 Таблица лидеров">
          {scores.map((user, index) => (
            <Cell key={user.user_id} subtitle={`Очки: ${user.score}`}>
              {index + 1}. {user.user_id}
            </Cell>
          ))}
        </Section>
      </List>
    </AppRoot>
  );
};

export default LeaderboardPage;