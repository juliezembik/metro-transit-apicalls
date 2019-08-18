import React, { Component } from "react";
import "./App.css";
import BusRoute from "../BusRoute/BusRoute";
import BusDirection from "../BusDirection/BusDirection";
import BusStop from "../BusStop/BusStop";

class App extends Component {

  constructor(){
    super();
    this.state = {
      route: '',
      direction: '',
      stop: ''

    }
  }


  render() {
    return (
      <div className="App">
        <p>Please Select Bus Number</p>
        <BusRoute />

        <p>Please Select Direction</p>
        <BusDirection />

        <p>Please Select Stop</p>
        <BusStop />
      </div>
    );
  };
};
export default App;
