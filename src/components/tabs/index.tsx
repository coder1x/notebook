// import TabItem from '@com/tab-item';
// import TabButton from '@com/tab-button';
import { useState, useCallback } from 'react';

function Tabs(props: any) {
  const [idTab, setIdTab] = useState(1);

  const buttonTabs: any = [];
  const content: any = [];

  const handleTabClick = useCallback((id: number) => {
    setIdTab(id);
  }, []);

  // props.tabs.forEach((item: any, index: number) => {
  //   buttonTabs.push(<TabButton
  //     key={item.index}
  //     index={item.index}
  //     name={item.name}
  //     onClick={handleTabClick}
  //     isActiveButton={!index}
  //     idTab={idTab}
  //   />);

  //   content.push(<TabItem
  //     key={item.index}
  //     index={item.index}
  //     content={item.content}
  //     isActiveTab={!index}
  //     idTab={idTab}
  //   />);
  // });

  return (
    <div className="tabs">
      <div className="navigation">{buttonTabs}</div>
      <div className="content">{content}</div>
    </div>
  );
}

export default Tabs;
