import './layout.scss';

const Layout = (components: any) => {
  return (
    <main className={'content'}>
      <div className={'todo'}>{components.children}</div>
    </main>
  );
};

export default Layout;
