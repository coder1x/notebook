import { FC, useState, useEffect } from 'react';

import { Throttle } from '@helpers/index';
import Props from './footerType';

const Footer: FC<Props> = ({
  total = 0,
  totalTasks = 0,
  totalPerformed = 0,
  totalCompleted = 0,
  type = 'project',
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const resize = () => {
      setIsActive(false);
    };

    new Throttle(resize);

    resize();
  }, []);

  useEffect(() => {
    const handleDocumentEvent = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      if (!element.closest('.footer__informer')) {
        setIsActive(false);
      }
    };

    document.addEventListener('pointerdown', handleDocumentEvent);
    return () => document.removeEventListener('pointerdown', handleDocumentEvent);
  }, []);

  const handleButtonClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="footer">
      <button
        className={`footer__informer${isActive ? ' footer__informer_active' : ''}`}
        onClick={handleButtonClick}
        aria-label="Информация о записях">
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
