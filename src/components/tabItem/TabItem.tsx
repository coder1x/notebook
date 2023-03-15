import { useState, useEffect, FC, memo } from 'react';

import Props from './tabItemType';

const TabItem: FC<Props> = ({ index, content, isActiveTab, idTab }) => {
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

export default memo(TabItem);
