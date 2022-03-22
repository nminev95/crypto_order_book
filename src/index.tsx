import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import allReducers from './redux/reducers/index';
import App from './App';

const store = createStore(
  allReducers,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider {... { store }}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
