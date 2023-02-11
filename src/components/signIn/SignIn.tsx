import { FC, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { tokenState, isSignInErrorState, errorNameState, nameState } from '@store/selectors';
import { signInActions, nameValidatorActions } from '@store/slices';

import { Button, TextField, MessageForm } from '@components/index';

const SignIn: FC = () => {
  const [password, setPassword] = useState('');
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  document.title = 'Авторизация';

  const dispatch = useDispatch();

  const token = useSelector(tokenState);
  const isSignInError = useSelector(isSignInErrorState);
  const errorName = useSelector(errorNameState);
  const name = useSelector(nameState);

  const navigate = useNavigate();

  let textMessageName = errorName;

  if (errorName === 'notOccupied') {
    textMessageName = 'Такого пользователя нет';
  } else if (errorName === 'busy') {
    textMessageName = '';
  }

  useEffect(() => {
    if (token) {
      navigate('projects');
    }
  }, [navigate, token]);

  const authorization = () => {
    if (name && password) {
      dispatch(
        signInActions.fetchSignInAuthorization({
          name,
          password,
        })
      );
    }
  };

  const handleSignInClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (!textMessageName && !isErrorPassword) {
      authorization();
    }
  };

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

  const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value.trim();

    if (!text) {
      return false;
    }
    setIsErrorPassword(text.length < 6);
    setPassword(text);
    return true;
  }, []);

  return (
    <article className="authorization">
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
              isError={Boolean(textMessageName)}
              message={textMessageName}
              value={name}
              onChangeCustom={handleNameChange}
              ariaLabel="имя пользователя"
            />
          </div>
          <div className="authorization__password-wrapper">
            <TextField
              type="password"
              placeholder="Пароль"
              name="password"
              isError={isErrorPassword}
              message={isErrorPassword ? 'Пароль должен быть не короче 6 символов' : ''}
              value={''}
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
          tag="Link"
          href="registration"
          options={{
            modifier: 'submit',
          }}
          text="Зарегистрироваться"
        />
      </div>
      {isSignInError && <MessageForm text={'Ошибка авторизации'} isError={isSignInError} />}
    </article>
  );
};

export default SignIn;
