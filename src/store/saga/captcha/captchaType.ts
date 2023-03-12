type FetchData = {
  error: boolean;
  messageError: string;
};

interface Captcha extends FetchData {
  value?: boolean;
}

export { FetchData, Captcha };
