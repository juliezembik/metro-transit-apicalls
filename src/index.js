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
    yield takeEvery('FETCH_STOP', thirdBus);
    yield takeEvery('FETCH_TIME', fourthBus);
};



function* firstBus() {

    // replaces the need for .then and .catch
    try {
        const response = yield axios.get('/api/busroutes');
        // same as dispatch
        console.log('in firstBus', response.data)
        const action = { type: 'SET_BUS_DISPLAY', payload: response.data };
        yield put(action); // trigger our reducer

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

        // console.log('response', response);
        
        const nextAction = { type: 'SET_BUS_DIRECTION', payload: response.data};
        yield put(nextAction);
        
    } catch (error) {
        console.log('Error in Bus Direction', error);
        
    }
};

function* thirdBus(action) {
    try {
        const route = action.payload.route;
        const direction = action.payload.direction;

        const response = yield axios.get(`/api/busstop/${route}/${direction}`);

        const nextAction = { type: 'SET_STOP', payload: response.data };
        yield put(nextAction);

    } catch (error) {
        console.log('Error in thirdBus', error);
        
    }
};

function* fourthBus(action) {
    try {
        const route = action.payload.route;
        const direction = action.payload.direction;
        const stop = action.payload.stop;

        const response = yield axios.get(`/api/time/${route}/${direction}/${stop}`);

        const nextAction = { type: 'SET_TIME', payload: response.data };
        yield put(nextAction);

    } catch (error) {
        console.log('Error in fourthBus', error);
        
    }
}






const sagaMiddleware = createSagaMiddleware();
// Sagas end here



// Reducers start here
const displayBuses = (state = [], action) => {
    switch (action.type) {
        case 'SET_BUS_DISPLAY':
            console.log('in SET_BUS_DISPLAY', action.payload);
            return action.payload;
        default:
            return state;
    }

};

const displayDirection = (state = [], action) => {
    switch (action.type) {
        case 'SET_BUS_DIRECTION':
            console.log('in SET_BUS_DIRECTION', action.payload);
            return action.payload;
        default:
            return state;
    }
};

const displayStop = ( state = [], action ) => {
    switch (action.type) {
        case 'SET_STOP':
            console.log('in SET_STOP', action.payload);
            return action.payload;
        
        default:
            return state;
    }
};

const displayTime = ( state = [], action ) => {
    switch (action.type) {
        case 'SET_TIME':
            console.log('in SET_TIME', action.payload);
            return action.payload;
        
        default:
            return state;
        
    }
}


const inputs = { route: null, direction: null, stop: null }
const saveAllInputs = (state = inputs, action) => {
    switch(action.type) {
        case 'SAVE_ROUTE': 
            console.log('in SAVE_ROUTE', action.payload);
                return  {...state , route: action.payload.route } ;
        case 'SAVE_DIRECTION': 
            console.log('in SAVE_DIRECTION', action.payload);
                return  {...state, direction: action.payload.direction } ;
        case 'SAVE_STOP': 
            console.log('in SAVE_STOP', action.payload);
                return  {...state, stop: action.payload.stop } ;
        case 'CLEAR_INPUTS':
            return inputs;
        default:
            return state;
    } 
}


const store = createStore(
    combineReducers({

        displayBuses,
        displayDirection,
        displayStop,
        displayTime,
        saveAllInputs

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
