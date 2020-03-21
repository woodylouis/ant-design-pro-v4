import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import reducer from './reducers/index';
import { Provider } from 'react-redux';


const store = createStore(reducer);

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