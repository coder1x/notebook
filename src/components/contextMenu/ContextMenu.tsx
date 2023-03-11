import { FC, useState, forwardRef, Ref, useImperativeHandle, useEffect } from 'react';

import { Button } from '@components/index';

type Props = {
  buttons: {
    name: string;
    handler: () => void;
  }[];
  ref: Ref<unknown> | undefined;
};

const ContextMenu: FC<Props> = forwardRef(({ buttons }, ref) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleDocumentEvent = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      if (!element.closest('.context-menu')) {
        setIsActive(false);
      }
    };

    document.addEventListener('pointerdown', handleDocumentEvent);
    return () => document.removeEventListener('pointerdown', handleDocumentEvent);
  }, []);

  useImperativeHandle(ref, () => {
    return { setIsActive };
  });

  return (
    <div className={`context-menu${isActive ? ' context-menu_visible' : ''}`}>
      {buttons &&
        buttons.map((item, index) => {
          return (
            <Button
              key={index}
              text={item.name}
              options={{
                modifier: 'interface',
                onClick: () => {
                  setIsActive(false);
                  item.handler();
                },
              }}
            />
          );
        })}
    </div>
  );
});

export default ContextMenu;
