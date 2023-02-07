import './layout.scss';

const Layout = (components: any) => {
  return (
    <main className={'home-content'}>
      <section className={'todo'}>{components.children}</section>
    </main>
  );
};

export default Layout;
