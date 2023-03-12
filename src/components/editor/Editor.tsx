import { FC, useState, forwardRef, useImperativeHandle, useCallback } from 'react';

import { Button, ChangeCustom } from '@components/index';
import Props from './editorType';

const Editor: FC<Props> = forwardRef(({ onUpdate, onAddData }, ref) => {
  const [textData, setTextData] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [editorType, setEditorType] = useState<'addData' | 'editData' | 'viewData'>('addData');

  let headerText = '';

  useImperativeHandle(ref, () => {
    return { setIsActive, setTextData, setEditorType };
  });

  const handleTextareaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;

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
      setIsActive(false);
    }
  };

  let buttonComponent = <></>;

  switch (editorType) {
    case 'addData':
      buttonComponent = (
        <Button
          text={'Добавить'}
          options={{
            onClick: handleButtonAddClick,
          }}
        />
      );
      headerText = 'Добавить запись';
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
      headerText = 'Редактирование записи';
      break;
    case 'viewData':
      headerText = 'Просмотр записи';
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
