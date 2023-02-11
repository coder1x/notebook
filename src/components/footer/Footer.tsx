import { FC } from 'react';

type Props = {
  total: number;
  totalTasks?: number;
  totalPerformed?: number;
  totalCompleted?: number;
  type?: 'project' | 'tasks';
};

const Footer: FC<Props> = ({
  total = 0,
  totalTasks = 0,
  totalPerformed = 0,
  totalCompleted = 0,
  type = 'project',
}) => {
  return (
    <ul className="footer">
      <li className="footer__item">
        <span className="footer_text-total">Всего:</span>
        <span className="footer_number_total">{total}</span>
      </li>

      {type !== 'project' && (
        <>
          <li className="footer_item">
            <span className="footer_text-total">Задач:</span>
            <span className="footer_number_total">{totalTasks}</span>
          </li>
          <li className="footer_item">
            <span className="footer_text-total">Выполняемых:</span>
            <span className="footer_number_total">{totalPerformed}</span>
          </li>
          <li className="footer_item">
            <span className="footer_text-total">Завершённых:</span>
            <span className="footer_number_total">{totalCompleted}</span>
          </li>
        </>
      )}
    </ul>
  );
};

export default Footer;
