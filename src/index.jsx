import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import getStore from './getStore';
import {Provider} from 'react-redux';

const render = (_App) => {
    ReactDOM.render(
        <Provider store={store}>
            <_App />
        </Provider>,
         document.getElementById('AppContainer')
    );
    //registerServiceWorker();
}

render(App);
