import { DragEvent, memo, useCallback, useEffect, useRef } from 'react';
import { DropProps, TouchDropEvent } from './types';

const Drop = ({ onDragOver, onDrop, dropKey, className = 'drop', children }: DropProps) => {
  const dropRef = useRef<HTMLDivElement>(null);

  const handleOnDragOver = useCallback(() => {
    if (onDragOver) {
      onDragOver(dropKey);
    }
  }, [onDragOver, dropKey]);

  const handleOptimizedOver = useCallback(() => {
    requestAnimationFrame(handleOnDragOver);
  }, [handleOnDragOver]);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleOptimizedOver();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    const key = event.dataTransfer?.getData('key');
    if (key) {
      onDrop(key, dropKey);
    }
  };

  const handleTouchDrop = useCallback(
    (event: TouchDropEvent) => {
      if (event.detail && event.detail.key) {
        onDrop(event.detail.key, dropKey);
      }
    },
    [dropKey, onDrop]
  );

  useEffect(() => {
    const { current } = dropRef;

    if (!current) return;

    current.addEventListener('touchDragOver', handleOptimizedOver);
    current.addEventListener('touchDrop', handleTouchDrop);

    return () => {
      current.removeEventListener('touchDragOver', handleOptimizedOver);
      current.removeEventListener('touchDrop', handleTouchDrop);
    };
  }, [handleOptimizedOver, handleTouchDrop]);

  return (
    <div className={className} ref={dropRef} onDragOver={handleDragOver} onDrop={handleDrop}>
      {children}
    </div>
  );
};

export default memo(Drop);
