import React from 'react';
import './App.scss';
import OrderBook from './containers/OrderBook/OrderBook';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <div className="App">
      <OrderBook />
    </div>
  );
}

export default App;
