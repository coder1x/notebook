type FetchData = {
  error: boolean;
  messageError: string;
};

interface Data extends FetchData {
  value?: string | null;
}

export { FetchData, Data };
