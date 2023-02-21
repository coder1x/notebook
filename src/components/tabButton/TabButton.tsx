import { useState, useEffect, memo, FC } from 'react';

const TabButton: FC<any> = ({ index, name, onClick, isActiveButton, idTab }) => {
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
