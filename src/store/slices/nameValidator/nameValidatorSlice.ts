import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Type from './nameValidatorType';

const initialState: Type.State = {
  errorName: '',
  name: '',
};

const nameValidator = createSlice({
  name: 'nameValidator',
  initialState,
  reducers: {
    setNameValidator(state, action: PayloadAction<string>) {
      state.errorName = '';
      state.name = action.payload;
    },
    setNameValidatorError(state, action: PayloadAction<Type.DateError>) {
      const { name, errorName } = action.payload;

      state.errorName = errorName;
      state.name = name;
    },
    fetchNameValidator(state, action: PayloadAction<string>) {
      state.errorName = '';
    },
  },
});

const nameValidatorReducer = nameValidator.reducer;
const nameValidatorActions = nameValidator.actions;

export { nameValidatorActions, nameValidatorReducer };
