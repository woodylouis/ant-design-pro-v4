import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(logger, thunk));

// store.subscribe(() => console.log("State updated!", store.getState()));

const render = () => {
  ReactDOM.render(
    <Provider store={ store }>
      <App store={ store }/>
    </Provider>, 
    document.getElementById('root'));
};

render();

store.subscribe(render);

// serviceWorker();