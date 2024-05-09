type Props = {
  tabs: {
    name: string;
    content: JSX.Element;
    index: number;
    color?: string;
  }[];
  isLoading: boolean;
};

export default Props;
