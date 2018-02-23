import App from './p1.page.jsx'

import '../comm-scss/short.scss'
import './p1.scss'
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import promise from 'redux-promise';


import stores from './store.js'
let store = createStore(combineReducers(stores), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(promise));
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
