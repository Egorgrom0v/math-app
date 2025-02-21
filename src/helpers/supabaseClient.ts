import { createClient } from '@supabase/supabase-js';

// ⚡️ Замените эти ключи на свои (из Supabase Dashboard)
const SUPABASE_URL = 'https://aubxfkkdldrjkjgkaqrf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1Ynhma2tkbGRyamtqZ2thcXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0Nzc2OTUsImV4cCI6MjA1NTA1MzY5NX0.0QlE4Npo09owf-Y8vtRqog20VZA4jsuzWh0KzV88kj4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function saveLessonProgress(userId: string, lessonId: string) {
    const { data, error } = await supabase
      .from('progress')
      .insert([{ user_id: userId, lesson_id: lessonId }]);
  
    if (error) {
      console.error('Ошибка сохранения прогресса:', error);
    } else {
      console.log('Прогресс сохранён:', data);
    }
  }