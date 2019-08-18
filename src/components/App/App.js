import React, { Component } from "react";
import "./App.css";
import BusRoute from "../BusRoute/BusRoute";
import BusDirection from "../BusDirection/BusDirection";
import BusStop from "../BusStop/BusStop";
import BusTime from "../BusTime/BusTime";

class App extends Component {

  render() {
    return (
      <div className="App">
        <p>Please Select Bus Number</p>
        <BusRoute />

        <p>Please Select Direction</p>
        <BusDirection />

        <p>Please Select Stop</p>
        <BusStop />

        <p>Time Displays Here:</p>
        <BusTime />

      </div>
    );
  };
};
export default App;
