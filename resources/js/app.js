
require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Bootstrap from 'bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import history from './history';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

