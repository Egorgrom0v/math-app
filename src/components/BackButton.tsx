import { useEffect } from 'react';
import { initBackButton } from '@telegram-apps/sdk';

export const BackButton = () => {
  const [backButton] = initBackButton(); // ✅ Создаём кнопку

  useEffect(() => {
    backButton.show(); // Показываем кнопку "Назад"
    
    const handleBack = () => {
      window.history.back(); // Возвращаемся на предыдущую страницу
    };

    backButton.on('click', handleBack); // Добавляем обработчик клика

    return () => {
      backButton.hide(); // Скрываем кнопку при уходе со страницы
      backButton.off('click', handleBack); // Удаляем обработчик клика
    };
  }, []);

  return null;
};