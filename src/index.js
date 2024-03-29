import 'antd/dist/antd.css';
import './styles/global.scss';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

import { App } from 'containers/App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
