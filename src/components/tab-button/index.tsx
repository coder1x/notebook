import { useState, useEffect, memo } from 'react';

function TabButton(props: any) {
  const { index, name, onClick, isActiveButton, idTab } = props;
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
      className={`${'tabButton'}${isActive ? ` ${'tabButtonCurrent'}` : ''}`}
      data-index={index}
      onClick={handleButtonClick}>
      {name}
    </button>
  );
}

export default memo(TabButton);
