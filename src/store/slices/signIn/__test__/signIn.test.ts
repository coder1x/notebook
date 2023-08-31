import store from '@store/store';
import { signInActions } from '@store/slices';

describe('signIn slice', () => {
  it('should return the initial state', () => {
    expect(store.getState().signIn).toEqual({
      token: '',
      isSignInError: false,
      isAuthorized: false,
    });
  });

  it('action setSignInToken', () => {
    store.dispatch(signInActions.setSignInToken('43434ERT'));

    expect(store.getState().signIn).toEqual({
      token: '43434ERT',
      isSignInError: false,
      isAuthorized: true,
    });
  });

  it('action setAuthorized', () => {
    store.dispatch(signInActions.setAuthorized(false));

    expect(store.getState().signIn).toEqual({
      token: '43434ERT',
      isSignInError: false,
      isAuthorized: false,
    });
  });

  it('action removeSignInToken', () => {
    store.dispatch(signInActions.removeSignInToken());

    expect(store.getState().signIn).toEqual({
      token: '',
      isSignInError: false,
      isAuthorized: false,
    });
  });

  it('action setSignInError', () => {
    store.dispatch(signInActions.setSignInError());

    expect(store.getState().signIn).toEqual({
      token: '',
      isSignInError: true,
      isAuthorized: false,
    });
  });

  it('action fetchSignInAuthorization', () => {
    store.dispatch(
      signInActions.fetchSignInAuthorization({
        name: 'test',
        password: '123456',
      })
    );

    expect(store.getState().signIn).toEqual({
      token: '',
      isSignInError: false,
      isAuthorized: false,
    });
  });
});
