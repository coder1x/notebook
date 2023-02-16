import { FC, ReactNode } from 'react';
import './layout.scss';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <main className={'content'}>
      <div className={'todo'}>{children}</div>
    </main>
  );
};

export default Layout;
