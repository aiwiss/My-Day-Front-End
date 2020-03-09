import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Router } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store, persistor } from './redux/store';
import history from './misc/history';
import App from './App/App';

render(
<Provider store={store}>
  <PersistGate persistor={persistor}>
    <Router history={history}>
      <App />
    </Router>
  </PersistGate>
</Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
