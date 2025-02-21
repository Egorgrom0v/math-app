import { useNavigate } from 'react-router-dom';
import { List, Section, Cell, Button } from '@telegram-apps/telegram-ui';

export const HomePage = () => {
  const navigate = useNavigate();

  const topics = [
    { id: 'math-tricks', title: '🧠 Математические трюки', isCompleted: false },
    { id: 'puzzles', title: '🧩 Головоломки', isCompleted: true },
    { id: 'progressions', title: '📈 Прогрессии', isCompleted: false },
  ];

  return (
    <List>
      <Section header="Выберите тему">
        {topics.map((topic) => (
          <Cell
            key={topic.id}
            onClick={() => navigate(`/lesson/${topic.id}`)}
            subtitle={topic.isCompleted ? '✅ Пройдено' : '🔥 Новый урок'}
            style={{
              backgroundColor: topic.isCompleted ? '#E0FFE0' : '#FFF9C4',
              borderRadius: '15px',
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            {topic.title}
          </Cell>
        ))}
      </Section>

      {/* Кнопка рейтинга */}
      <Button
        onClick={() => navigate('/leaderboard')}
        style={{
          marginTop: '20px',
          backgroundColor: '#58CC02',
          color: 'white',
          fontSize: '18px',
          padding: '12px',
          borderRadius: '20px',
        }}
      >
        🏆 Таблица лидеров
      </Button>
    </List>
  );
};

export default HomePage;