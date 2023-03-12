import { FC, createElement, KeyboardEvent, useEffect, useRef } from 'react';

import Props from './changeCustomType';

const ChangeCustom: FC<Props> = ({ type, value, attributes, onChangeCustom }) => {
  const prevValue = useRef('');
  const nativeElement = useRef(null);

  useEffect(() => {
    const input: unknown = nativeElement.current;
    const valueField = String(value);
    const isNewValue = prevValue.current !== valueField;
    const typeElement = input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement;

    if (!typeElement) {
      return;
    }

    if (isNewValue || valueField !== input.value) {
      input.value = valueField;
    }

    prevValue.current = valueField;
  }, [value]);

  const checkChange = (event: FocusEvent | KeyboardEvent) => {
    const element = event.target;
    const valueField = String(value);

    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
      return;
    }

    if (onChangeCustom instanceof Function) {
      if (valueField !== element.value) {
        onChangeCustom(event);
      }
    }
  };

  const handleElementBlur = (event: FocusEvent) => {
    checkChange(event);
  };

  const handleElementKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      checkChange(event);
    }
  };

  return createElement(type, {
    ...{
      defaultValue: value,
      onBlur: handleElementBlur,
      onKeyUp: handleElementKeyUp,
    },
    ref: nativeElement,
    ...(attributes ?? {}),
  });
};

export default ChangeCustom;
