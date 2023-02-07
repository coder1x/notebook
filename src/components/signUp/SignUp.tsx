import { useDispatch } from 'react-redux';
import { useState, FC, useCallback } from 'react';

import { signUpActions } from '@store/slices';

import { useTypedSelector } from '@hooks/index';

import { Button, TextField, Captcha } from '@components/index';

function SignUp() {
  const dispatch = useDispatch();

  const [isValidCaptcha, setIsValidCaptcha] = useState(false);

  const {
    token,
    name,
    errorName,
    passwordOne,
    passwordTwo,
    isErrorPasswordOne,
    isErrorPasswordTwo,
    message,
  } = useTypedSelector((state) => state.signUp);

  const { isErrorCaptcha } = useTypedSelector((state) => state.captcha);

  const formFields = [
    !errorName,
    !isErrorCaptcha,
    !isErrorPasswordOne,
    !isErrorPasswordTwo,
    name,
    passwordOne,
    passwordTwo,
    isValidCaptcha,
  ];
  let isLockSubmit = true;
  if (formFields.every((elem) => elem)) {
    isLockSubmit = false;
  }

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value.trim();

      if (!text) {
        return false;
      }

      if (text.length > 3) {
        dispatch(signUpActions.fetchSignUpCheckName(text));
      } else {
        dispatch(
          signUpActions.setRegNameError({
            name: text,
            errorName: 'Имя должено быть длинее 3 символов',
          })
        );
      }

      return true;
    },
    [dispatch]
  );

  const handlePasswordOneChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value.trim();

      if (!text) {
        return false;
      }

      if (text.length > 5) {
        dispatch(signUpActions.setRegPasswordOne(text));
      } else {
        dispatch(signUpActions.setRegPasswordOneError(text));
      }

      return true;
    },
    [dispatch]
  );

  const handlePasswordTwoChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value.trim();

      if (passwordOne === text) {
        dispatch(signUpActions.setRegPasswordTwo(text));
      } else {
        dispatch(signUpActions.setRegPasswordTwoError(text));
      }
    },
    [dispatch, passwordOne]
  );

  const handleRegistrationClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (passwordOne === passwordTwo) {
      dispatch(
        signUpActions.fetchSignUpSubmitForm({
          name,
          password: passwordOne,
          tokenRegistration: token,
        })
      );
    } else {
      dispatch(signUpActions.setRegPasswordOneError(passwordOne));
    }
  };

  const handleSignInClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    dispatch(signUpActions.setRegRegistrationYes(''));

    // Router.push('/');
  };

  const handleCaptchaStatus = (status: boolean) => {
    setIsValidCaptcha(status);
  };

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
              isError={Boolean(errorName)}
              message={errorName}
              value={name}
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
            <Captcha onStatus={handleCaptchaStatus} />
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
            options={{
              type: 'submit',
              modifier: 'submit',
              onClick: handleSignInClick,
            }}
            text="Войти"
          />
        </div>
      </form>
      <div className="registration__message-wrapper">
        <p className="registration__message-text">{message}</p>
      </div>
    </article>
  );
}

export default SignUp;
