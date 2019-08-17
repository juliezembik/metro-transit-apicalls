import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios';


function* rootSaga() {
    yield takeEvery('FETCH_BUS', firstBus);
}


const displayBus = (state = [], action) => {
    switch (action.type) {
        case 'SET_BUS_DISPLAY':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }

};


function* firstBus(action) {

    // replaces the need for .then and .catch
    try {
        const response = yield axios.get('/api/busroutes');
        // same as dispatch
        console.log(response.data)
        const nextAction = { type: 'SET_BUS_DISPLAY', payload: response.data };

        yield put(nextAction); // trigger our reducer
    } catch (error) {
        console.log('Error making GET request', error);
        alert('there was a problem');
    }
}


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({

        displayBus

    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
