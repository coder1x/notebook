import store from '@store/store';
import { captchaActions } from '@store/slices';

describe('Captcha slice', () => {
  it('should return the initial state', () => {
    expect(store.getState().captcha).toEqual({
      isErrorCaptcha: false,
    });
  });

  it('action setCaptchaError', () => {
    store.dispatch(captchaActions.setCaptchaError());
    expect(store.getState().captcha).toEqual({
      isErrorCaptcha: true,
    });
  });

  it('action setReset', () => {
    store.dispatch(captchaActions.setReset());
    expect(store.getState().captcha).toEqual({
      isErrorCaptcha: false,
    });
  });

  it('action fetchCheckCaptcha', () => {
    store.dispatch(captchaActions.fetchCheckCaptcha('text'));
    expect(store.getState().captcha).toEqual({
      isErrorCaptcha: false,
    });
  });
});
