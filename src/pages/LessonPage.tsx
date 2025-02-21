import { BackButton } from '@/components/BackButton'; // ✅ Убедись, что путь верный
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { AppRoot, Section, Cell, List, Button } from '@telegram-apps/telegram-ui';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { isTMA } from '@telegram-apps/bridge';

if (!isTMA('simple')) {
  alert('Приложение запущено вне Telegram. Открой в Telegram Mini Apps!');
}
// Подключение Supabase
const supabaseUrl = 'https://aubxfkkdldrjkjgkaqrf.supabase.co'; // Заменить на свой URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1Ynhma2tkbGRyamtqZ2thcXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0Nzc2OTUsImV4cCI6MjA1NTA1MzY5NX0.0QlE4Npo09owf-Y8vtRqog20VZA4jsuzWh0KzV88kj4';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const LessonPage = () => {
  const { topic } = useParams<{ topic: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<any>(null);
  const [tasks, setTasks] = useState<string[]>([]);
  const [currentTask, setCurrentTask] = useState(0);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 📌 Получаем данные пользователя из Telegram Mini Apps
  const { initData } = retrieveLaunchParams();
  const user = initData?.user;

  if (!user) {
    console.error('Ошибка: не удалось получить данные пользователя из Telegram.');
  }

  const userId = user?.id.toString() || ''; // ID пользователя (строка)
  const firstName = user?.firstName || 'Неизвестно';
  const lastName = user?.lastName || null;
  const username = user?.username || null;
  const authDate = new Date(initData?.authDate || Date.now()).toISOString(); // Время входа в формат SQL

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      try {
        let { data, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('title', topic)
          .single(); // Загружаем один урок

        if (error) throw error;
        if (!data) throw new Error('Урок не найден');

        setLesson(data);
        setTasks(data.tasks || []);

        // 📌 Сохраняем пользователя в Supabase (если его нет)
        await saveUserData(userId, firstName, lastName, username, authDate);
      } catch (error: any) {
        console.error('Ошибка загрузки урока:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [topic]);

  if (loading) return <p>Загрузка урока...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  const handleAnswer = async (answer: string) => {
    if (answer === lesson.correct_answers[currentTask]) {
      if (currentTask === tasks.length - 1) {
        await saveLessonProgress(userId, lesson.id); // Сохранение прогресса

        // 📌 Обновление баллов в Supabase (+10 баллов за урок)
        const { data, error } = await supabase
          .from('user_scores')
          .upsert({ user_id: userId, score: 10 }) // Обновление или добавление записи
          .select();

        if (error) {
          console.error('Ошибка обновления баллов:', error);
        } else {
          console.log('Баллы обновлены:', data);
        }

        navigate('/congrats'); // Переход на страницу поздравления
      } else {
        setCurrentTask((prev) => prev + 1);
      }
    } else {
      alert('Неправильный ответ, попробуйте ещё раз!');
    }
  };

  return (
    <>
      <BackButton /> 
      <AppRoot>
        <List>
          <Section header={`Урок: ${lesson.title}`}>
            {/* Видео */}
            <Cell subtitle="Видео">
              <iframe
                src={lesson.video_url}
                title="Урок"
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                }}
                allowFullScreen
              />
            </Cell>

            {/* Конспект */}
            <Cell subtitle="Конспект">
              <Button onClick={() => setIsNoteOpen(!isNoteOpen)}>
                {isNoteOpen ? 'Скрыть конспект' : 'Открыть конспект'}
              </Button>
              {isNoteOpen && (
                <div style={{ padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                  📚 {lesson.description}
                </div>
              )}
            </Cell>

            
            
            {/* Задания */}
            <Section header="Задания">
              <Cell>{tasks[currentTask]}</Cell>
              <input
                type="text"
                placeholder="Введите ответ"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAnswer(e.currentTarget.value);
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '15px',
                  border: '2px solid #58CC02',
                  fontSize: '16px',
                  textAlign: 'center',
                }}
              />
            </Section>
          </Section>
        </List>
      </AppRoot>
    </>
  );
};

// ✅ **Функция для сохранения данных пользователя в Supabase**
async function saveUserData(userId: string, firstName: string, lastName: string | null, username: string | null, authDate: string) {
  const { data, error } = await supabase
    .from('users')
    .upsert(
      [{ user_id: userId, first_name: firstName, last_name: lastName, username: username, auth_date: authDate }]
    );

  if (error) {
    console.error('Ошибка сохранения данных пользователя:', error);
  } else {
    console.log('Данные пользователя сохранены:', data);
  }
}

// ✅ **Функция для сохранения прогресса в Supabase**
async function saveLessonProgress(userId: string, lessonId: number) {
  const { data, error } = await supabase
    .from('progress')
    .insert([{ user_id: userId, lesson_id: lessonId, completed_at: new Date().toISOString() }]);

  if (error) {
    console.error('Ошибка сохранения прогресса:', error);
  } else {
    console.log('Прогресс сохранён:', data);
  }
}

export default LessonPage;