import { useState, useEffect, memo, FC } from 'react';

import Props from './tabButtonType';

const TabButton: FC<Props> = ({ index, name, onClick, isActiveButton, idTab }) => {
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
      data-index={index}
      onClick={handleButtonClick}>
      {name}
    </button>
  );
};

export default memo(TabButton);
