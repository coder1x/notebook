import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '@store/store';
import Main from './main/Main';

const rootElement = document.getElementById('root');

if (rootElement instanceof HTMLElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <StrictMode>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </StrictMode>
    </Provider>
  );
}
