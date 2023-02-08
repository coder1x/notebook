import { useDispatch } from 'react-redux';
import { useState, FC, useEffect, useCallback, forwardRef, useImperativeHandle, Ref } from 'react';

import { captchaActions } from '@store/slices';

import { useTypedSelector } from '@hooks/index';

import { TextField } from '@components/index';

import { resetCode } from '@helpers/index';

type Props = {
  onStatus: (data: boolean) => void;
  ref: Ref<unknown> | undefined;
};

const Captcha: FC<Props> = forwardRef(({ onStatus }, ref) => {
  const dispatch = useDispatch();

  const [isReset, setIsReset] = useState(false);

  const [captchaText, setCaptchaText] = useState('');
  const [code, setCode] = useState(resetCode());

  const { isErrorCaptcha } = useTypedSelector((state) => state.captcha);

  const clearData = () => {
    setIsReset(true);
    setCode(resetCode());
    setCaptchaText('');
    dispatch(captchaActions.setReset());
    onStatus(false);
  };

  useImperativeHandle(ref, () => {
    return { clearData };
  });

  const handleButtonAnimationEnd = () => {
    setIsReset(false);
  };

  useEffect(() => {
    if (captchaText.length === 6 && !isErrorCaptcha) {
      onStatus(true);
    }
  }, [captchaText, isErrorCaptcha, onStatus]);

  const handleCaptchaChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value.trim();

      if (text.length === 6) {
        dispatch(captchaActions.fetchCheckCaptcha(text));
        setCaptchaText(text);
      }

      if (text.length > 6) {
        event.target.value = text.replace(/.$/g, '');
      }
    },
    [dispatch]
  );

  const handleResetCodeClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    clearData();
  };

  const urlParams = `?id=${code}&token=${localStorage.getItem('registrationToken')}`;

  return (
    <div className="captcha">
      <img
        className="captcha__images"
        src={`${process.env.URL_API}captcha/captcha.php${urlParams}`}
        width="120"
        height="20"
        alt="Капча"
      />
      <button
        className={`captcha__reset-button${isReset ? ' captcha__reset-button_animation' : ''}`}
        type="submit"
        onAnimationEnd={handleButtonAnimationEnd}
        onClick={handleResetCodeClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="captcha__reset-icon">
          <title>Обновить код</title>
          <path
            d={
              'M463.531 272.062C463.219 272.031 ' +
              '462.906 272 462.625 ' +
              '272C458.594 272 455.156 275 454.687 ' +
              '279.094C443.094 379.938 357.656 ' +
              '456 256 456C170.197 456 94.365 400.441 ' +
              '67.109 320H184C188.406 320 192 ' +
              '316.406 192 312S188.406 304 184 304H48C43.594 304 ' +
              '40 307.594 40 312V440C40 ' +
              '444.406 43.594 448 48 448S56 444.406 56 ' +
              '440V335.969C88.428 416.914 167.248 ' +
              '472 256 472C365.812 472 458.062 389.844 470.562 ' +
              '280.906C471.062 276.531 467.938 ' +
              '272.562 463.531 272.062ZM464 ' +
              '64C459.594 64 456 67.594 456 ' +
              '72V176.031C423.572 95.086 344.752 40 256 ' +
              '40C146.188 40 53.938 ' +
              '122.156 41.438 231.094C40.938 235.469 ' +
              '44.062 239.438 48.469 ' +
              '239.938C48.781 239.969 49.094 240 49.375 ' +
              '240C53.406 240 56.844 ' +
              '237 57.313 232.906C68.906 132.062 154.344 ' +
              '56 256 56C341.803 56 ' +
              '417.635 111.559 444.891 192H328C323.594 192 ' +
              '320 195.594 320 ' +
              '200S323.594 208 328 208H464C468.406 208 472 ' +
              '204.406 472 200V72C472 ' +
              '67.594 468.406 64 464 64Z'
            }
          />
        </svg>
      </button>
      <div className="captcha__input-wrapper">
        <TextField
          type="text"
          placeholder="Код с картинки"
          name="captcha"
          isError={isErrorCaptcha}
          message={isErrorCaptcha ? 'Неверный код' : ''}
          value={captchaText}
          onChange={handleCaptchaChange}
          ariaLabel="код капчи"
        />
      </div>
    </div>
  );
});

export default Captcha;
