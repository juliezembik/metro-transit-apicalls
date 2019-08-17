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


// Sagas start here

function* rootSaga() {
    yield takeEvery('FETCH_BUS', firstBus);
    yield takeEvery('FETCH_DIRECTION', secondBus);
}



function* firstBus() {

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
};

function* secondBus(action) {

    try {
        const busNumber = action.payload.route;

        console.log('action.payload in secondBus', busNumber);
        const response = yield axios.get(`/api/busdirection/${busNumber}`, busNumber);

        console.log('response', response);
        

        // console.log('return from direction get', response.data);
        
        
    } catch (error) {
        console.log('Error in Bus Direction', error);
        
    }
};



const sagaMiddleware = createSagaMiddleware();
// Sagas end here



// Reducers start here
const displayBus = (state = [], action) => {
    switch (action.type) {
        case 'SET_BUS_DISPLAY':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }

};

const displayDirection = (state = [], action) => {
    switch (action.type) {
        case 'SET_BUS_DIRECTION':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
};

const store = createStore(
    combineReducers({

        displayBus,
        displayDirection

    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);


// Reducers end here

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
