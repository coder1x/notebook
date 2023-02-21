import { TabButton, TabItem } from '@components/index';
import { useState, useCallback, FC } from 'react';

const Tabs: FC<any> = ({ tabs }) => {
  const [idTab, setIdTab] = useState(1);

  const buttonTabs: any = [];
  const content: any = [];

  const handleTabClick = useCallback((id: number) => {
    setIdTab(id);
  }, []);

  tabs.forEach((item: any, index: number) => {
    buttonTabs.push(
      <TabButton
        key={item.index}
        index={item.index}
        name={item.name}
        onClick={handleTabClick}
        isActiveButton={!index}
        idTab={idTab}
      />
    );

    content.push(
      <TabItem
        key={item.index}
        index={item.index}
        content={item.content}
        isActiveTab={!index}
        idTab={idTab}
      />
    );
  });

  return (
    <div className="tabs">
      <div className="tabs__navigation">{buttonTabs}</div>
      <div className="tabs__content">{content}</div>
    </div>
  );
};

export default Tabs;
