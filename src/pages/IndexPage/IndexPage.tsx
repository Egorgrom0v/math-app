import { Section, Cell, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

export const IndexPage: FC = () => {
  return (
    <List>
      <Section header="Выберите раздел">
        <Link to="/topics">
          <Cell subtitle="Выберите тему и начните обучение">📚 Начать уроки</Cell>
        </Link>
        <Link to="/tiktok-lessons">
          <Cell subtitle="Изучай математику в видеоформате">Уроки из TikTok</Cell>
        </Link>
        <Link to="/oge-prep">
          <Cell subtitle="Готовься к экзамену с удобными заданиями">Подготовка к ОГЭ</Cell>
        </Link>
      </Section>
    </List>
  );
};

export default IndexPage;