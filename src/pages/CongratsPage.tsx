import { List, Section, Cell, Button } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router-dom';

export const CongratsPage = () => {
  const navigate = useNavigate();

  return (
    <List>
      <Section header="Поздравляем!">
        <Cell subtitle="Вы успешно завершили все задания.">
          🎉 Отличная работа!
        </Cell>
        <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
      </Section>
    </List>
  );
};

export default CongratsPage;