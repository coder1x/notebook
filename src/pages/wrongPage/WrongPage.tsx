import { FC, useState, useEffect } from 'react';
import { Button } from '@components/index';

type Props = {
  delay?: number;
};

const WrongPage: FC<Props> = ({ delay = 100 }) => {
  document.title = 'Ошибка 404';

  const [num, setNum] = useState(400);

  const calc = (currentNum: number, newNum: number) => {
    if (currentNum < newNum) {
      return currentNum + 1;
    }
    if (currentNum > newNum) {
      return currentNum - 1;
    }

    return currentNum;
  };

  useEffect(() => {
    setTimeout(() => {
      setNum(calc(num, 404));
    }, delay);
  }, [delay, num]);

  const modifier = num === 404 ? ' wrong-page__icon-wrapper_visible' : '';

  return (
    <section className="wrong-page">
      <h1 className="wrong-page__header">Такой страницы не существует</h1>
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
      <p className="wrong-page__text">{num}</p>
      <div className={`wrong-page__icon-wrapper${modifier}`}>
        <svg className="wrong-page__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 50">
          <g>
            <path
              d={
                'M43.927,21.850 C43.927,20.230 42.761,18.501 ' +
                '41.322,17.993 C39.882,17.483 38.487,16.235 38.081,15.251 ' +
                'C37.675,14.269 37.781,12.396 38.436,11.017 ' +
                'C39.092,9.638 38.695,7.591 37.550,6.443 C36.404,5.297 ' +
                '34.357,4.902 32.977,5.558 C31.597,6.214 29.727,6.322 ' +
                '28.746,5.915 C27.765,5.510 26.517,4.112 26.005,2.673 ' +
                'C25.493,1.234 23.764,0.067 22.144,0.067 C20.523,0.067 ' +
                '18.794,1.234 18.282,2.673 C17.770,4.112 16.522,5.509 ' +
                '15.541,5.915 C14.560,6.322 12.690,6.214 11.310,5.558 ' +
                'C9.932,4.902 7.883,5.297 6.737,6.443 C5.592,7.591 ' +
                '5.195,9.638 5.851,11.017 C6.507,12.397 6.611,14.266 ' +
                '6.204,15.250 C5.796,16.232 4.405,17.483 2.966,17.993 ' +
                'C1.526,18.501 0.360,20.230 0.360,21.850 C0.360,23.471 ' +
                '1.526,25.199 2.966,25.711 C4.405,26.223 5.798,27.474 ' +
                '6.206,28.454 C6.614,29.434 6.507,31.304 5.851,32.683 ' +
                'C5.195,34.062 5.592,36.110 6.737,37.255 C7.883,38.402 ' +
                '9.930,38.799 11.310,38.142 C12.690,37.486 14.560,37.381 ' +
                '15.541,37.789 C16.523,38.196 17.770,39.594 18.282,41.032 ' +
                'C18.794,42.468 20.523,43.633 22.144,43.633 C23.764,43.633 ' +
                '25.493,42.468 26.005,41.032 C26.517,39.594 27.763,38.196 ' +
                '28.744,37.786 C29.725,37.378 31.597,37.486 32.977,38.142 ' +
                'C34.356,38.799 36.404,38.402 37.550,37.255 C38.695,36.110 ' +
                '39.092,34.062 38.436,32.683 C37.781,31.304 37.673,29.433 ' +
                '38.079,28.453 C38.485,27.472 39.882,26.223 41.322,25.711 ' +
                'C42.761,25.199 43.927,23.471 43.927,21.850 ZM22.144,29.842 ' +
                'C17.724,29.842 14.150,26.270 14.150,21.859 C14.150,17.440 ' +
                '17.724,13.865 22.144,13.865 C26.554,13.865 30.128,17.440 ' +
                '30.128,21.859 C30.128,26.270 26.554,29.842 22.144,29.842 Z'
              }
            />
          </g>
        </svg>
      </div>
    </section>
  );
};

export default WrongPage;
