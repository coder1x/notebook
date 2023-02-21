import { FC } from 'react';

import { Button } from '@components/index';

type Props = {
  buttons: {
    name: string;
    handler: () => void;
  }[];
};

const Menu: FC<Props> = ({ buttons }) => {
  return (
    <div className="menu">
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
  );
};

export default Menu;
