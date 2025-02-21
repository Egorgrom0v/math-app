import { Page } from '@/components/Page.tsx';
import { Section, Cell, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

export const OgePrepPage: FC = () => {
  return (
    <Page back={true}>
      <List>
        <Section header="Подготовка к ОГЭ">
          <Cell subtitle="Тема 1">Алгебра</Cell>
          <Cell subtitle="Тема 2">Геометрия</Cell>
          <Cell subtitle="Тема 3">Функции и графики</Cell>
        </Section>
      </List>
    </Page>
  );
};