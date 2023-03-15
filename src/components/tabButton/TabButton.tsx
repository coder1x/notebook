import { useState, useEffect, FC } from 'react';

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

  useEffect(() => {
    if (idTab) {
      setIsActive(Boolean(idTab === index));
    }
  }, [index, idTab]);

  const handleButtonClick = () => {
    onClick(index);
  };

  return (
    <button
      className={`tab-button${isActive ? ` ${'tab-button_current'}` : ''}`}
      onClick={handleButtonClick}
      style={{ borderBottom: `2px solid ${color}` }}>
      {name}
    </button>
  );
};

export default TabButton;
