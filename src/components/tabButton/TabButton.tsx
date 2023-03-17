import { useState, useEffect, FC, CSSProperties } from 'react';

import { Throttle } from '@helpers/index';

import Props from './tabButtonType';

const TabButton: FC<Props> = ({
  index,
  name,
  onClick,
  isActiveButton,
  idTab,
  color = '#e1e1e1',
}) => {
  const [isActive, setIsActive] = useState(isActiveButton);

  const [style, setStyle] = useState<CSSProperties>();

  useEffect(() => {
    if (idTab) {
      setIsActive(Boolean(idTab === index));
    }
  }, [index, idTab]);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth <= 612) {
        setStyle({ borderLeft: `2px solid ${color}`, borderRight: `2px solid ${color}` });
      } else {
        setStyle({ borderBottom: `2px solid ${color}` });
      }
    };

    new Throttle(resize);

    resize();
  }, []);

  const handleButtonClick = () => {
    onClick(index);
  };

  return (
    <button
      className={`tab-button${isActive ? ` ${'tab-button_current'}` : ''}`}
      onClick={handleButtonClick}
      style={style}>
      {name}
    </button>
  );
};

export default TabButton;
