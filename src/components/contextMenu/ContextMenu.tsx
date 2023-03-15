import { FC, useState, forwardRef, useImperativeHandle, useEffect, memo, useRef } from 'react';

import { Button } from '@components/index';
import Props from './contextMenuType';

const ContextMenu: FC<Props> = forwardRef(({ buttons }, ref) => {
  const [isActive, setIsActive] = useState(false);

  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = contextMenuRef.current;

    if (isActive && element) {
      element.focus();
    }
  }, [isActive]);

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
    <div
      className={`context-menu${isActive ? ' context-menu_visible' : ''}`}
      ref={contextMenuRef}
      tabIndex={1}>
      {buttons &&
        buttons.map((item, index) => {
          return (
            <Button
              key={index}
              text={item.name}
              options={{
                modifier: 'contextMenu',
                onClick: () => {
                  setIsActive(false);
                  item.handler();
                },
                tabIndex: index + 2,
              }}
            />
          );
        })}
    </div>
  );
});

export default memo(ContextMenu);
