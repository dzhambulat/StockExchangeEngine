import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import stockExchange from './reducers';
import * as serviceWorker from './serviceWorker';
import orderService from './services/orderService';
import App from './App';

const store = createStore(stockExchange,{},applyMiddleware(thunk));
orderService.init();
ReactDOM.render(
  <Provider store = {store}>
    <App /> 
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
