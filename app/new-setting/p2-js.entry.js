import App from './p2-js.page.jsx'

import '../comm-scss/short.scss'
import './p1.scss'
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import promise from 'redux-promise';


import stores from './store.js'
let store = createStore(combineReducers(stores), applyMiddleware(promise));
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
