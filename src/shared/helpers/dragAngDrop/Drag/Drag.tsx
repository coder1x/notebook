import { DragEvent, memo, TouchEvent, useCallback, useEffect, useRef, useState } from 'react';
import { DragProps } from './types';

const Drag = ({ data, className = 'drag', children }: DragProps) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const [previewElement, setPreviewElement] = useState<HTMLElement | null>(null);
  const [overDragElement, setOverDragElement] = useState<Element | null>(null);
  const [touchDragOverEvent, setTouchDragOverEvent] = useState<Event | null>(null);
  const [touchDropEvent, setTouchDropEvent] = useState<Event | null>(null);

  const handleTouchDragStart = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (!previewElement) return;

      event.preventDefault();
      previewElement.style.position = 'absolute';
      previewElement.style.left = '-1000px';
      previewElement.style.pointerEvents = 'none';
      previewElement.style.opacity = '0.8';
      document.body.append(previewElement);
    },
    [previewElement]
  );

  const handleTouchDragMove = useCallback(
    (event: TouchEvent) => {
      if (!previewElement) return;

      const centerElement = previewElement.clientWidth / 2;

      previewElement.style.left = `${event.changedTouches[0].clientX - centerElement}px`;
      previewElement.style.top = `${event.changedTouches[0].clientY - centerElement}px`;

      const nodeElement = document.elementFromPoint(
        event.changedTouches[0].clientX,
        event.changedTouches[0].clientY
      );

      const dispatchTouchDragOver = () => {
        if (!overDragElement || !touchDragOverEvent) return;

        overDragElement.dispatchEvent(touchDragOverEvent);
      };

      if (nodeElement instanceof Element && overDragElement !== nodeElement) {
        setOverDragElement(nodeElement);
        requestAnimationFrame(dispatchTouchDragOver);
      }
    },
    [previewElement, overDragElement, touchDragOverEvent]
  );

  const handleTouchDragEnd = useCallback(
    (event: TouchEvent) => {
      const nodeElement = document.elementFromPoint(
        event.changedTouches[0].clientX,
        event.changedTouches[0].clientY
      );

      if (previewElement) {
        previewElement.remove();
      }

      if (!(nodeElement instanceof HTMLElement) || !touchDropEvent) return;
      const dispatchTouchDrop = () => {
        nodeElement.dispatchEvent(touchDropEvent);
      };

      requestAnimationFrame(dispatchTouchDrop);
    },
    [previewElement, touchDropEvent]
  );

  const handleDragStart = useCallback(
    (event: DragEvent) => {
      if (!data.key) return;

      event.dataTransfer.setData('key', data.key);

      if (!(previewElement instanceof HTMLImageElement)) return;

      const { width, height } = previewElement;
      const HALF_ELEMENT = 2;

      event.dataTransfer.setDragImage(previewElement, width / HALF_ELEMENT, height / HALF_ELEMENT);
    },
    [data.key, previewElement]
  );

  useEffect(() => {
    if (!data.key) return;

    setTouchDropEvent(
      new CustomEvent('touchDrop', {
        bubbles: true,
        detail: {
          key: data.key,
        },
      })
    );
  }, [data.key]);

  useEffect(() => {
    setTouchDragOverEvent(new Event('touchDragOver', { bubbles: true }));

    if (!data.image) return;

    setPreviewElement(document.createElement(data.image ? 'img' : 'div'));
  }, [data.image]);

  useEffect(() => {
    const { current } = dragRef;

    if (!previewElement || !current) return;

    if (!data.image && !previewElement.children.length) {
      previewElement.append(current.cloneNode(true));
    }

    if (!data.image) return;

    previewElement.setAttribute('src', data.image);
  }, [data.image, previewElement]);

  return (
    <div
      className={className}
      draggable
      ref={dragRef}
      onDragStart={handleDragStart}
      onTouchStart={handleTouchDragStart}
      onTouchMove={handleTouchDragMove}
      onTouchEnd={handleTouchDragEnd}>
      {children}
    </div>
  );
};

export default memo(Drag);
