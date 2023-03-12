type FetchData = {
  error: boolean;
  messageError: string;
};

interface Data extends FetchData {
  value?: boolean;
}

export { FetchData, Data };
