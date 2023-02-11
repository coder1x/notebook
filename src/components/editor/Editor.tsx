import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ChangeCustom } from '@components/index';

function Editor(propsData: any) {
  // const dispatch = useDispatch();
  // const props = useSelector((state: any) => ({
  //   header: state.editor.header,
  //   text: state.editor.text,
  // }));

  const setValueEditor = (event: React.ChangeEvent<HTMLInputElement>) => {
    // dispatch({
    //   type: 'SET_VALUE_EDITOR',
    //   text: event.target.value,
    // });
  };

  const handleButtonAddClick = () => {
    // const text = props.text.trim();
    // if (text !== '') {
    //   propsData.addData(text);
    // }
  };

  const handleTextareaBlur = (event: any) => {
    //
  };

  const handleButtonCloseClick = () => {
    // dispatch({
    //   type: 'CLOSE_EDITOR',
    // });
  };

  // разные кнопки и разные хендлеры можно добиться через свич
  // в котором мы будем возвращять массив объектов, название, хендлер.

  return (
    <article className="editor">
      <div className="editor__header-wrapper">
        <p className="editor__header-text">{'props.header'}</p>
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
            onKeyPress: handleTextareaBlur,
          }}
          value={'props.text'}
          onChangeCustom={setValueEditor}
        />
      </div>
      <div className="editor__bottom-wrapper">
        <Button
          text={'Добавить'}
          options={{
            onClick: handleButtonAddClick,
          }}
        />
        <Button
          text={'Отмена'}
          options={{
            onClick: handleButtonCloseClick,
          }}
        />
      </div>
    </article>
  );
}

export default Editor;
