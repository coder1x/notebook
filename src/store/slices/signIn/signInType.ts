type State = {
  token: string;
  isSignInError: boolean;
  isAuthorized: boolean;
};

type Data = {
  name: string;
  password: string;
};

export type { State, Data };
