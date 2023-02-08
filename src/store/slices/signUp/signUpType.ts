type State = {
  message: string;
  isRegistrationError: boolean;
};

type Data = {
  name: string;
  password: string;
};

// eslint-disable-next-line import/prefer-default-export
export type { State, Data };
