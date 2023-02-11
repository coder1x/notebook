import React from 'react';

import { Button } from '@components/index';

type Props = {
  buttons: {
    name: string;
    handler: () => void;
  }[];
};

function Menu(props: Props) {
  const Buttons = props.buttons.map((item, index) => {
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
  });

  return <div className="navigation">{Buttons}</div>;
}

export default Menu;
