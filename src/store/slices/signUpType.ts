type Data = {
  sheetId: string;
  nameList: string;
};

type State = {
  isName: boolean;
  isCaptcha: boolean;
  isPassword: boolean;
  modifierName: string;
  modifierPassword: string;
  modifierCaptcha: string;
  message: string;
  name: string;
  passwordOne: string;
  passwordTwo: string;
  captcha: string;
  code: number;
  token: string;
};

export type { State, Data };
