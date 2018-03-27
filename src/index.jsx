import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import getStore from './getStore';
import {Provider} from 'react-redux';

const store = getStore();

const fetchDataForLocation = () => {
    store.dispatch({type:'REQUEST_FETCH_BOARDGAMES'});
}

const render = (_App) => {
    ReactDOM.render(
        <Provider store={store}>
            <_App/>
        </Provider>,
         document.getElementById('AppContainer')
    );
    //registerServiceWorker();
}

render(App);

fetchDataForLocation();