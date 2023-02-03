import { useDispatch, useSelector } from 'react-redux';

import Button from '@components/button/button';
import ResetCode from '@components/resetCode/ResetCode';
import InputCustom from '@components/changeCustom/ChangeCustom';
import './signUp.scss';

export default function SignUp() {
  const dispatch = useDispatch();
  const props = useSelector((state: any) => ({
    token: state.signUp.token,
    name: state.signUp.name,
    isName: state.signUp.isName,
    isCaptcha: state.signUp.isCaptcha,
    isPassword: state.signUp.isPassword,
    passwordOne: state.signUp.passwordOne,
    passwordTwo: state.signUp.passwordTwo,
    captcha: state.signUp.captcha,
    modifierName: state.signUp.modifierName,
    modifierPassword: state.signUp.modifierPassword,
    modifierCaptcha: state.signUp.modifierCaptcha,
    message: state.signUp.message,
    code: state.signUp.code,
  }));

  const formFields = [props.isName, props.isCaptcha, props.isPassword];
  let isLockSubmit = true;
  if (formFields.every((elem) => elem)) {
    isLockSubmit = false;
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // dispatch({
    //   type: 'CHECK_USER',
    //   name: event.target.value,
    // });
  };

  const handlePasswordOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;

    // dispatch({
    //   type: password ? 'REG_PASSWORD_1' : 'REG_PASSWORD_1_ERROR',
    //   passwordOne: password,
    // });
  };

  const handlePasswordTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordTwo = event.target.value;
    const status = props.passwordOne === passwordTwo ? 'REG_PASSWORD_2' : 'REG_PASSWORD_2_ERROR';

    // dispatch({
    //   type: status,
    //   passwordTwo,
    // });
  };

  const handleCaptchaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // dispatch({
    //   type: 'CHECK_CAPTCHA',
    //   captcha: event.target.value,
    //   token: props.token,
    // });
  };

  const handleRegistrationClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (props.passwordOne === props.passwordTwo) {
      // dispatch({
      //   type: 'REGISTRATION_FETCH_REQUESTED',
      //   name: props.name,
      //   password: props.passwordOne,
      //   tokenRegistration: props.token,
      // });
    } else {
      // dispatch({
      //   type: 'REG_PASSWORD_1_ERROR',
      //   passwordOne: props.passwordOne,
      // });
    }
  };

  const handleResetCodeClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const buttonReset = event.currentTarget;

    if (buttonReset instanceof HTMLButtonElement) {
      const svgElement = buttonReset.firstElementChild;
      // svgElement.classList.add(Style.resetCodeAnimation);

      // svgElement.addEventListener('animationend', () => {
      //   svgElement.classList.remove(Style.resetCodeAnimation);
      // });
    }

    dispatch({
      type: 'REG_CODE',
      code: Math.floor(Math.random() * 99999) + 10000,
    });
  };

  const handleSignInClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    dispatch({
      type: 'REG_REGISTRATION_YES',
      message: '',
    });

    // Router.push('/');
  };

  // const selectorName = props.modifierName ? `${Style.name} ${Style.nameError}` : Style.name;
  // const selectorCaptcha = props.modifierCaptcha
  //   ? `${Style.inputCaptcha} ${Style.inputCaptchaError}`
  //   : Style.inputCaptcha;
  // const selectorPasswordOne = props.modifierPassword
  //   ? `${Style.passwordOne} ${Style.passwordOneError}`
  //   : Style.passwordOne;
  // const selectorPasswordTwo = props.modifierPassword
  //   ? `${Style.passwordTwo} ${Style.passwordTwoError}`
  //   : Style.passwordTwo;

  return (
    <article className={'Style.registration'}>
      <header className={'Style.headerWrapper'}>
        <h1 className={'Style.header'}>Регистрация аккаунта</h1>
      </header>
      <form className={'Style.form'} method="post">
        <fieldset className={'Style.identification'}>
          <div className={'Style.nameWrapper'}>
            <label className={'Style.label'}>
              <InputCustom
                type={'input'}
                props={{
                  type: 'text',
                  placeholder: 'Имя',
                  name: 'name',
                  // className: selectorName,
                }}
                value={props.name}
                onChangeCustom={handleNameChange}
              />
            </label>
          </div>
          <div className={'Style.passwordWrapper'}>
            <label className={'Style.label'}>
              <InputCustom
                type={'input'}
                props={{
                  type: 'password',
                  placeholder: 'Пароль',
                  name: 'password',
                  // className: selectorPasswordOne,
                  autoComplete: 'on',
                }}
                value={props.passwordOne}
                onChangeCustom={handlePasswordOneChange}
              />
            </label>
          </div>
          <div className={'Style.passwordWrapper'}>
            <label className={'Style.label'}>
              <InputCustom
                type={'input'}
                props={{
                  type: 'password',
                  placeholder: 'Повторить пароль',
                  name: 'passwordTwo',
                  // className: selectorPasswordTwo,
                  autoComplete: 'on',
                }}
                value={props.passwordTwo}
                onChangeCustom={handlePasswordTwoChange}
              />
            </label>
          </div>
          <div className={'Style.captchaWrapper'}>
            <img
              className={'Style.captcha'}
              src={`https://thylacine.ru/todo/captcha/captcha.php?id=${props.code}&token=${props.token}`}
              width={'120'}
              height={'20'}
              alt={'Капча'}
            />
            <button className={'Style.resetCode'} type="submit" onClick={handleResetCodeClick}>
              <ResetCode />
            </button>
            <label className={'Style.labelCaptcha'}>
              <InputCustom
                type={'input'}
                props={{
                  type: 'text',
                  placeholder: 'Код с картинки',
                  name: 'captcha',
                  // className: selectorCaptcha,
                }}
                value={props.captcha}
                onChangeCustom={handleCaptchaChange}
              />
            </label>
          </div>
        </fieldset>
        <div className={'Style.submitWrapper'}>
          <Button
            options={{
              type: 'submit',
              disabled: isLockSubmit,
              modifier: 'submit',
              onClick: handleRegistrationClick,
            }}
            text={'Зарегистрироваться'}
          />
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
      <div className={'Style.messageWrapper'}>
        <p className={'Style.messageText'}>{props.message}</p>
      </div>
    </article>
  );
}
