import { Page } from '@/components/Page.tsx';
import { Section, Cell, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

export const TiktokLessonsPage: FC = () => {
  return (
    <Page back={true}>
      <List>
        <Section header="TikTok Уроки">
          <Cell subtitle="Занятие 1">Математические трюки</Cell>
          <Cell subtitle="Занятие 2">Лайфхаки для экзамена</Cell>
          <Cell subtitle="Занятие 3">Быстрый счёт</Cell>
        </Section>
      </List>
    </Page>
  );
};