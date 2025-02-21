import { Section, Cell, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

export const TopicsPage: FC = () => {
  const topics = [
    { title: 'Математические трюки', path: '/lesson/math-tricks' },
    { title: 'Геометрия', path: '/lesson/geometry' },
    { title: 'Алгебра', path: '/lesson/algebra' },
  ];

  return (
    <List>
      <Section header="Выберите тему">
        {topics.map((topic) => (
          <Link key={topic.path} to={topic.path}>
            <Cell>{topic.title}</Cell>
          </Link>
        ))}
      </Section>
    </List>
  );
};

export default TopicsPage;