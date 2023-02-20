import { useState, useEffect } from 'react';

function TabItem(props: any) {
  const { index, content, isActiveTab, idTab } = props;
  const [isActive, setIsActive] = useState(isActiveTab);

  useEffect(() => {
    if (idTab) {
      setIsActive(Boolean(idTab === index));
    }
  }, [index, idTab]);

  return (
    <div className={`${'contentItem'}${isActive ? ` ${'contentItemCurrent'}` : ''}`}>{content}</div>
  );
}

export default TabItem;
