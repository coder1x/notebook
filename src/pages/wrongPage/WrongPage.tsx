import { FC } from 'react';
import { Button } from '@components/index';

const WrongPage: FC = () => {
  document.title = 'Ошибка 404';

  return (
    <section className="wrong-page">
      <h1 className="wrong-page__header">Такой страници не существует</h1>
      <p className="wrong-page__text">Описание</p>
      <div className="wrong-page__button-wrapper">
        <Button
          tag="Link"
          href="/"
          options={{
            modifier: 'submit',
          }}
          text="на главную"
        />
      </div>
    </section>
  );
};

export default WrongPage;
