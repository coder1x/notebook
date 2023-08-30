import store from '@store/store';
import { nameValidatorActions } from '@store/slices';

describe('Name validator slice', () => {
  it('should return the initial state', () => {
    expect(store.getState().nameValidator).toEqual({
      errorName: '',
      name: '',
    });
  });

  it('action setNameValidator', () => {
    store.dispatch(
      nameValidatorActions.setNameValidator({
        errorName: 'notOccupied',
        name: 'test',
      })
    );
    expect(store.getState().nameValidator).toEqual({
      errorName: 'notOccupied',
      name: 'test',
    });
  });

  it('action setNameValidatorError', () => {
    store.dispatch(
      nameValidatorActions.setNameValidatorError({
        errorName: 'busy',
        name: 'test1',
      })
    );
    expect(store.getState().nameValidator).toEqual({
      errorName: 'busy',
      name: 'test1',
    });
  });

  it('action fetchNameValidator', () => {
    store.dispatch(nameValidatorActions.fetchNameValidator('test1'));
    expect(store.getState().nameValidator).toEqual({
      errorName: '',
      name: 'test1',
    });
  });
});
