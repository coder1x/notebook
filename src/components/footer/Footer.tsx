import { FC, useState } from 'react';

import Props from './footerType';

const Footer: FC<Props> = ({
  total = 0,
  totalTasks = 0,
  totalPerformed = 0,
  totalCompleted = 0,
  type = 'project',
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="footer">
      <button className="footer__informer" onClick={handleButtonClick}>
        Ⓘ
      </button>
      <ul className={`footer__list ${isActive ? ' footer__list_visible' : ''}`}>
        <li className="footer__item">
          <span className="footer__text-total">Всего:</span>
          <span className="footer__number-total">{total}</span>
        </li>

        {type !== 'project' && (
          <>
            <li className="footer__item">
              <span className="footer__text-total">Задач:</span>
              <span className="footer__number-total">{totalTasks}</span>
            </li>
            <li className="footer__item">
              <span className="footer__text-total">Выполняемых:</span>
              <span className="footer__number-total">{totalPerformed}</span>
            </li>
            <li className="footer__item">
              <span className="footer__text-total">Завершённых:</span>
              <span className="footer__number-total">{totalCompleted}</span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Footer;
