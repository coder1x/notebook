import { FC, useState } from 'react';

import { Button, MenuButton } from '@components/index';

type Props = {
  buttons: {
    name: string;
    handler: () => void;
  }[];
};

const Menu: FC<Props> = ({ buttons }) => {
  const [isActive, setIsActive] = useState(false);

  const handleMenuButtonClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="menu">
      <MenuButton onClick={handleMenuButtonClick} />
      <div className={`menu__wrapper${isActive ? ' menu__wrapper_active' : ''}`}>
        {buttons &&
          buttons.map((item, index) => {
            return (
              <Button
                key={index}
                text={item.name}
                options={{
                  modifier: 'interface',
                  onClick: item.handler,
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Menu;
