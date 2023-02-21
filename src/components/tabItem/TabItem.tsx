import { useState, useEffect, FC } from 'react';

const TabItem: FC<any> = ({ index, content, isActiveTab, idTab }) => {
  const [isActive, setIsActive] = useState(isActiveTab);

  useEffect(() => {
    if (idTab) {
      setIsActive(Boolean(idTab === index));
    }
  }, [index, idTab]);

  return (
    <div className={`content-item${isActive ? ` ${'content-item_current'}` : ''}`}>{content}</div>
  );
};

export default TabItem;
