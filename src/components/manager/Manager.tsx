import { FC } from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const Manager: FC<Props> = ({ children, title }) => {
  return (
    <article className="manager">
      <h1 className="manager__title">{title}</h1>
      {children}
    </article>
  );
};

export default Manager;
