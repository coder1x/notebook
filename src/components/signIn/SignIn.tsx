import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import { Button, TextField } from '@components/index';

function SignIn() {
  let name: string; // лучше эти данные получить по рефе - и проверить в момент сабмита
  let password: string;

  // const dispatch = useDispatch();
  // const token = useSelector((state: any) => state.manager.token);

  // useEffect(() => {
  //   if (token && token !== '404') {
  //     // Router.push('/projects');
  //   }
  // });

  const handleRegistrationClick = () => {
    // Router.push('/auth/sign-up');
  };

  const handleSignInClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (name && password) {
      // dispatch({
      //   type: 'AUTHORIZATION_FETCH_REQUESTED',
      //   name,
      //   password,
      // });
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value) {
      name = value;
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value) {
      password = value;
    }
  };

  const handleSignInOnKeyUp = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (name && password) {
      // dispatch({
      //   type: 'AUTHORIZATION_FETCH_REQUESTED',
      //   name,
      //   password,
      // });
    }
  };

  return (
    <article onKeyUp={handleSignInOnKeyUp} className="authorization">
      <header className="authorization__header-wrapper">
        <h1 className="authorization__header">Войти</h1>
      </header>
      <form className="authorization__form" method="post">
        <fieldset className="authorization__identification">
          <legend className="authorization__data-text">данные для входа в сервис</legend>
          <div className="authorization__name-wrapper">
            <TextField
              type="text"
              placeholder="Имя"
              name="name"
              // isError={Boolean(errorName)}
              // message={errorName}
              value={''}
              onChangeCustom={handleNameChange}
              ariaLabel="имя пользователя"
            />
          </div>
          <div className="authorization__password-wrapper">
            <TextField
              type="password"
              placeholder="Пароль"
              name="password"
              // isError={Boolean(errorName)}
              // message={errorName}
              value={''}
              // autoComplete: 'on',
              onChangeCustom={handlePasswordChange}
              ariaLabel="пароль"
            />
          </div>
        </fieldset>
        <div className="authorization__submit-wrapper">
          <Button
            options={{
              type: 'submit',
              modifier: 'submit',
              onClick: handleSignInClick,
            }}
            text={'Войти'}
          />
        </div>
      </form>
      <div className="authorization__registration-wrapper">
        <Button
          options={{
            type: 'submit',
            modifier: 'submit',
            onClick: handleRegistrationClick,
          }}
          text={'Зарегистрироваться'}
        />
      </div>
    </article>
  );
}

export default SignIn;
