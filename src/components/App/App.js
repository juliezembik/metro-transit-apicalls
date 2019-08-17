import React from 'react';
import './App.css';
import BusRoute from '../BusRoute/BusRoute';
import BusDirection from '../BusDirection/BusDirection';


function App() {
  return (
    <div className="App">
      <p>Please Select Bus Number</p>
      <BusRoute />

      <p>Please Select Direction</p>
      <BusDirection />
    </div>
  );
}

export default App;
