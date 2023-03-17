import {
  FC,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  memo,
  useRef,
  useEffect,
} from 'react';

import { Button, ChangeCustom } from '@components/index';
import { Props, Config } from './editorType';

const Editor: FC<Props> = forwardRef(({ onUpdate, onAddData }, ref) => {
  const [config, setConfig] = useState<Config>({
    title: 'Текстовый редактор',
    text: '',
    isActive: false,
    type: 'addData',
  });

  const [isDisclosed, setIsDisclosed] = useState(false);

  const editorRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const button = editorRef.current;

    if (config.isActive && button) {
      button.focus();
    }
  }, [config.isActive]);

  useImperativeHandle(ref, () => {
    return { config, setConfig };
  });

  const handleTextareaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;

    if (!text) {
      return false;
    }

    setConfig({
      ...config,
      text,
    });

    return true;
  };

  const handleButtonAddClick = () => {
    const { text } = config;

    if (text && onAddData instanceof Function) {
      onAddData(text);

      setConfig({
        ...config,
        text: '',
      });
    }
  };

  const handleButtonUpdateClick = () => {
    const { text } = config;

    if (text && onUpdate instanceof Function) {
      onUpdate(text);

      setConfig({
        ...config,
        text: '',
        isActive: false,
      });
    }
  };

  let buttonComponent = <></>;

  switch (config.type) {
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
    setConfig({
      ...config,
      text: '',
      isActive: false,
    });
  }, [config]);

  const handleButtonDisclosedClick = () => {
    setIsDisclosed(!isDisclosed);
  };

  const visible = config.isActive ? ' editor_visible' : '';
  const disclosed = isDisclosed ? ' editor_disclosed' : '';

  return (
    <article className={`editor${visible}${disclosed}`}>
      <div className="editor__header-wrapper">
        <h2 className="editor__header-text">{config.title}</h2>
        <button className="editor__close" onClick={handleButtonDisclosedClick}>
          [-]
        </button>
        <button className="editor__close" onClick={handleButtonCloseClick} ref={editorRef}>
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
          value={config.text}
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

export default memo(Editor);
