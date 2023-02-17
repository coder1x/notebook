import { FC, useState, forwardRef, Ref, useImperativeHandle, useCallback } from 'react';

import { Button, ChangeCustom } from '@components/index';

type Props = {
  type: 'addData' | 'editData' | 'viewData';
  headerText: string;
  onAddData?: (data: string) => void;
  onUpdate?: (data: string) => void;
  ref: Ref<unknown> | undefined;
};

const Editor: FC<Props> = forwardRef(({ type, onUpdate, onAddData, headerText }, ref) => {
  const [textData, setTextData] = useState('');
  const [isActive, setIsActive] = useState(false);

  useImperativeHandle(ref, () => {
    return { setIsActive };
  });

  const handleTextareaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value.trim();

    if (!text) {
      return false;
    }

    setTextData(text);

    return true;
  };

  const handleButtonAddClick = () => {
    if (textData && onAddData instanceof Function) {
      onAddData(textData);
      setTextData('');
    }
  };

  const handleButtonUpdateClick = () => {
    if (textData && onUpdate instanceof Function) {
      onUpdate(textData);
      setTextData('');
    }
  };

  let buttonComponent = <></>;

  switch (type) {
    case 'addData':
      buttonComponent = (
        <Button
          text={'Добавить'}
          options={{
            onClick: handleButtonAddClick,
          }}
        />
      );
      break;
    case 'editData':
      buttonComponent = (
        <Button
          text={'Применить'}
          options={{
            onClick: handleButtonUpdateClick,
          }}
        />
      );
      break;
    case 'viewData':
      break;
  }

  const handleButtonCloseClick = useCallback(() => {
    setTextData('');
    setIsActive(false);
  }, []);

  return (
    <article className={`editor${isActive ? ' editor_visible' : ''}`}>
      <div className="editor__header-wrapper">
        <h2 className="editor__header-text">{headerText}</h2>
        <button className="editor__close" onClick={handleButtonCloseClick}>
          X
        </button>
      </div>
      <div className="editor__text">
        <ChangeCustom
          type={'textarea'}
          attributes={{
            type: 'text',
            className: 'editor__textarea',
            onChange: handleTextareaChange,
            'aria-label': 'Редактор текста',
          }}
          value={textData}
        />
      </div>
      <div className="editor__bottom-wrapper">
        {buttonComponent}
        <Button
          text={'Отмена'}
          options={{
            onClick: handleButtonCloseClick,
          }}
        />
      </div>
    </article>
  );
});

export default Editor;
