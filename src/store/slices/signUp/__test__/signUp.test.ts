import store from '@store/store';
import { signUpActions } from '@store/slices';

describe('signUp slice', () => {
  it('should return the initial state', () => {
    expect(store.getState().signUp).toEqual({
      message: '',
      isRegistrationError: false,
    });
  });

  it('action setSignUpRegistration', () => {
    store.dispatch(signUpActions.setSignUpRegistration('вы зарегистрированы'));

    expect(store.getState().signUp).toEqual({
      message: 'вы зарегистрированы',
      isRegistrationError: false,
    });
  });

  it('action setSignUpRegistrationError', () => {
    store.dispatch(signUpActions.setSignUpRegistrationError('ошибка регистрации'));

    expect(store.getState().signUp).toEqual({
      message: 'ошибка регистрации',
      isRegistrationError: true,
    });
  });

  it('action fetchSignUpSubmitForm', () => {
    store.dispatch(
      signUpActions.fetchSignUpSubmitForm({
        name: 'test',
        password: '123456',
      })
    );

    expect(store.getState().signUp).toEqual({
      message: '',
      isRegistrationError: true,
    });
  });
});
