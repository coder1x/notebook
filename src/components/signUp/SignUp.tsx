import { useDispatch, useSelector } from 'react-redux';
import { useState, FC, useCallback, useEffect, useRef, MutableRefObject } from 'react';

import { signUpActions, nameValidatorActions } from '@store/slices';

import {
  errorNameState,
  isErrorCaptchaState,
  nameState,
  messageState,
  isRegistrationErrorState,
} from '@store/selectors';

import { Button, TextField, Captcha, MessageForm } from '@components/index';

const SignUp: FC = () => {
  const dispatch = useDispatch();

  document.title = 'Регистрация аккаунта';

  const [isValidCaptcha, setIsValidCaptcha] = useState(false);
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [isErrorPasswordOne, setIsErrorPasswordOne] = useState(false);
  const [isErrorPasswordTwo, setIsErrorPasswordTwo] = useState(false);
  const [isLockSubmit, setIsLockSubmit] = useState(true);

  const captchaRef: MutableRefObject<null | { clearData: () => void }> = useRef(null);

  const errorName = useSelector(errorNameState);
  const isErrorCaptcha = useSelector(isErrorCaptchaState);
  const name = useSelector(nameState);
  const message = useSelector(messageState);
  const isRegistrationError = useSelector(isRegistrationErrorState);

  let textMessageName = errorName;

  if (errorName === 'notOccupied') {
    textMessageName = '';
  } else if (errorName === 'busy') {
    textMessageName = 'Такой пользователь уже есть';
  }

  useEffect(() => {
    const formFields = [
      !textMessageName,
      !isErrorCaptcha,
      !isErrorPasswordOne,
      !isErrorPasswordTwo,
      name,
      passwordOne,
      passwordTwo,
      isValidCaptcha,
    ];

    const isValid = !formFields.every((elem) => elem);
    if (isLockSubmit !== isValid) {
      setIsLockSubmit(isValid);
    }
  }, [
    textMessageName,
    isErrorCaptcha,
    isErrorPasswordOne,
    isErrorPasswordTwo,
    isValidCaptcha,
    name,
    passwordOne,
    passwordTwo,
  ]);

  useEffect(() => {
    if (!isRegistrationError && message) {
      setPasswordOne('');
      setPasswordTwo('');
      dispatch(
        nameValidatorActions.setNameValidator({
          name: '',
          errorName: '',
        })
      );
      const ref = captchaRef.current;
      if (ref) {
        ref.clearData();
      }
    }
  }, [dispatch, isRegistrationError, message]);

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value.trim();

      if (!text) {
        return false;
      }

      if (text.length > 3) {
        dispatch(nameValidatorActions.fetchNameValidator(text));
      } else {
        dispatch(
          nameValidatorActions.setNameValidatorError({
            name: text,
            errorName: 'Имя должно быть длиннее 3 символов',
          })
        );
      }

      return true;
    },
    [dispatch]
  );

  const handleNameInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value.trim();

      if (text.length > 3) {
        handleNameChange(event);
      }
    },
    [handleNameChange]
  );

  const handlePasswordOneChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value.trim();

    if (!text) {
      return false;
    }

    setIsErrorPasswordOne(text.length < 6);
    setPasswordOne(text);

    return true;
  }, []);

  const handlePasswordTwoChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value.trim();

      setPasswordTwo(text);
      setIsErrorPasswordTwo(passwordOne !== text);
    },
    [passwordOne]
  );

  const handleRegistrationClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    dispatch(
      signUpActions.fetchSignUpSubmitForm({
        name,
        password: passwordOne,
      })
    );
  };

  const handleSignInClick = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(signUpActions.setSignUpRegistration(''));
  };

  const handleCaptchaStatus = useCallback(
    (status: boolean) => {
      if (isValidCaptcha !== status) {
        setIsValidCaptcha(status);
      }
    },
    [isValidCaptcha]
  );

  return (
    <article className="registration">
      <header className="registration__header-wrapper">
        <h1 className="registration__header">Регистрация аккаунта</h1>
      </header>
      <form className="registration__form" method="post">
        <fieldset className="registration__identification">
          <div className="registration__name-wrapper">
            <TextField
              type="text"
              placeholder="Имя"
              name="name"
              isError={Boolean(textMessageName)}
              message={textMessageName}
              value={name}
              onChange={handleNameInput}
              onChangeCustom={handleNameChange}
              ariaLabel="имя нового пользователя"
            />
          </div>
          <div className="registration__password-wrapper">
            <TextField
              type="password"
              placeholder="Пароль"
              name="password"
              isError={isErrorPasswordOne}
              message={isErrorPasswordOne ? 'Пароль должен быть не короче 6 символов' : ''}
              value={passwordOne}
              onChangeCustom={handlePasswordOneChange}
              ariaLabel="пароль"
            />
          </div>
          <div className="registration__password-wrapper">
            <TextField
              type="password"
              placeholder="Повторить пароль"
              name="passwordTwo"
              isError={isErrorPasswordTwo}
              message={isErrorPasswordTwo ? 'Пароли не совпадают' : ''}
              value={passwordTwo}
              onChangeCustom={handlePasswordTwoChange}
              ariaLabel="повторить пароль"
            />
          </div>
          <div className="registration__captcha-wrapper">
            <Captcha ref={captchaRef} onStatus={handleCaptchaStatus} />
          </div>
        </fieldset>
        <div className="registration__submit-wrapper">
          <Button
            options={{
              type: 'submit',
              disabled: isLockSubmit,
              modifier: 'submit',
              onClick: handleRegistrationClick,
            }}
            text="Зарегистрироваться"
          />
          <Button
            tag="Link"
            href="/"
            options={{
              modifier: 'submit',
              onClick: handleSignInClick,
            }}
            text="Войти"
          />
        </div>
      </form>
      {message && <MessageForm text={message} isError={isRegistrationError} />}
    </article>
  );
};

export default SignUp;
