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


// firstBus is the first API call to return the routes needed for
// first dropdown, this will run when the application starts up/renders
function* firstBus() {

    // replaces the need for .then and .catch
    try {

        // creates response to express to make call via provided URL
        const response = yield axios.get('/api/busroutes');
        // same as dispatch
        console.log('in firstBus', response.data)

        // once response returns from server side, action will trigger with
        // payload should contain the bus routes and then sent to the reducer
        const action = { type: 'SET_BUS_DISPLAY', payload: response.data };
        yield put(action); // trigger our reducer

    } catch (error) {
        console.log('Error making GET request', error);
        alert('there was a problem');
    }
};


// secondBus is our second API call once user choose their route
// it will take in the bus route from DOM and sent to make API call
function* secondBus(action) {

    try {

        // busNumber takes in the action.payload.route that is sent from the first
        // select option on the DOM
        const busNumber = action.payload.route;

        // this logs to make sure busNumber is sent properly
        console.log('action.payload in secondBus', busNumber);

        // response contains the busNumber and will be taken in via req.params.busNumber
        const response = yield axios.get(`/api/busdirection/${busNumber}`);

        // console.log('response', response);
        
        //once response returns from server side, it will trigger next action
        // with the payload received from making the API call
        // payload should contain the bus directions and sent to its reducer at type 'SET_BUS_DIRECTION'
        const nextAction = { type: 'SET_BUS_DIRECTION', payload: response.data};
        yield put(nextAction); // triggers reducer
        
    } catch (error) {
        console.log('Error in Bus Direction', error);
        
    }
};


// thirdBus is our third API call to metro transit, this will take in
// two variables - route and direction and used within the URL to make
// the proper API call

function* thirdBus(action) {
    try {

        // route and direction is sent from BusDirection component which will play
        // a part in grabbing the proper stops
        const route = action.payload.route;
        const direction = action.payload.direction;

        // route and direction used here just like in secondBus
        const response = yield axios.get(`/api/busstop/${route}/${direction}`);

        // once received response from server side, it will trigger nextAction with 
        // the response.data
        const nextAction = { type: 'SET_STOP', payload: response.data };
        yield put(nextAction); // trigger reducer to store data

    } catch (error) {
        console.log('Error in thirdBus', error);
        
    }
};


// fourthBus is our final API call that will return the ETA for the route, direction, and stop
// it will take in all the variables from the DOM side and will grab the information for that
// specific stop, on that specific route, on the specific direction
function* fourthBus(action) {
    try {

        // variables needed for final call just like the other functions
        const route = action.payload.route;
        const direction = action.payload.direction;
        const stop = action.payload.stop;

        // response will send route, direction, and stop to server side to make API call
        const response = yield axios.get(`/api/bustime/${route}/${direction}/${stop}`);

        // nextAction will be triggered by response from server side and send data to its reducer
        const nextAction = { type: 'SET_TIME', payload: response.data };

        yield put(nextAction); // trigger and store data into reducer

    } catch (error) {
        console.log('Error in fourthBus', error);
        
    }
}






const sagaMiddleware = createSagaMiddleware();
// Sagas end here



// Reducers start here

// displayBuses is our first reducer that stores the first API call of bus routes
const displayBuses = (state = [], action) => {
    switch (action.type) {
        case 'SET_BUS_DISPLAY':
            console.log('in SET_BUS_DISPLAY', action.payload);
            return action.payload;
        default:
            return state;
    }

};

// displayDirection is our second reducer that stores the second API call for directions
const displayDirection = (state = [], action) => {
    switch (action.type) {
        case 'SET_BUS_DIRECTION':
            console.log('in SET_BUS_DIRECTION', action.payload);
            return action.payload;
        default:
            return state;
    }
};

// displayStop is our third reducer that stores the third API call for stops
const displayStop = ( state = [], action ) => {
    switch (action.type) {
        case 'SET_STOP':
            console.log('in SET_STOP', action.payload);
            return action.payload;
        
        default:
            return state;
    }
};

// displayTime is our fourth reducer that stores the fourth API call
const displayTime = ( state = [], action ) => {
    switch (action.type) {
        case 'SET_TIME':
            console.log('in SET_TIME', action.payload);
            return action.payload;
        
        default:
            return state;
        
    }
}


// input object stores our three variables needed to make API calls with,
// this prevents confusion and stores only needed information
// this also helps simplify grabing stored information for the DOM
const inputs = { route: null, direction: null, stop: null }
const saveAllInputs = (state = inputs, action) => {
    switch(action.type) {
        // saves the route number
        case 'SAVE_ROUTE': 
            console.log('in SAVE_ROUTE', action.payload);
                return  {...state , route: action.payload.route } ;

        // saves the direction
        case 'SAVE_DIRECTION': 
            console.log('in SAVE_DIRECTION', action.payload);
                return  {...state, direction: action.payload.direction } ;

        // saves the stop
        case 'SAVE_STOP': 
            console.log('in SAVE_STOP', action.payload);
                return  {...state, stop: action.payload.stop } ;
        case 'CLEAR_INPUTS':
            return inputs;
        default:
            return state;
    } 
}

// store holds all the reducers for ease of calling information
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
