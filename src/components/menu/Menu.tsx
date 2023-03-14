import { FC, useState, forwardRef, useEffect, useImperativeHandle } from 'react';

import { Button, MenuButton } from '@components/index';
import { Throttle } from '@helpers/index';

import { Props, Config } from './menuType';

const Menu: FC<Props> = forwardRef(({ buttons }, ref) => {
  const [config, setConfig] = useState<Config>({
    isActive: false,
    type: 'desktop',
  });

  useEffect(() => {
    const resize = () => {
      setConfig({
        isActive: false,
        type: window.innerWidth <= 1098 ? 'mobile' : 'desktop',
      });
    };

    new Throttle(resize);

    resize();
  }, []);

  useImperativeHandle(ref, () => {
    return { config, setConfig };
  });

  const handleMenuButtonClick = () => {
    setConfig({
      ...config,
      isActive: !config.isActive,
    });
  };

  return (
    <nav className="menu">
      <MenuButton onClick={handleMenuButtonClick} isActive={config.isActive} />
      <div className={`menu__wrapper${config.isActive ? ' menu__wrapper_active' : ''}`}>
        {buttons &&
          buttons.map((item, index) => {
            return (
              <Button
                key={index}
                text={item.name}
                options={{
                  modifier: config.type === 'desktop' ? 'interface' : 'contextMenu',
                  onClick: item.handler,
                }}
              />
            );
          })}
      </div>
    </nav>
  );
});

export default Menu;
