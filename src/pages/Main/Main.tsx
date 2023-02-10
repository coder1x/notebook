import Layout from '@pages/layout/Layout';
import { SignIn, SignUp } from '@components/index';

// Регистрация пользователя в TODO
// Вход в приложение TODO

function Main() {
  return (
    <Layout>
      <SignIn />
      <SignUp />
    </Layout>
  );
}

export default Main;
