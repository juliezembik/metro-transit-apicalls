//required imports

import React, { Component } from "react";
import "./App.css";
import BusRoute from "../BusRoute/BusRoute";
import BusDirection from "../BusDirection/BusDirection";
import BusStop from "../BusStop/BusStop";
import BusTime from "../BusTime/BusTime";

class App extends Component {

  render() {
    return (

      //App Component holds and displays other components
      <div className="App">

        {/* BusRoute will display the list of bus routes to choose from. */}
        <p>Please Select Bus Route</p>
        <BusRoute />

        {/* BusDirection will pull only the needed list of directions for the specific route chosen */}
        <p>Please Select Direction</p>
        <BusDirection />

        {/* Bus Stop will display the list of bus stops along specified route */}
        <p>Please Select Stop</p>
        <BusStop />


        {/* BusTime will display the list of bus times for specified bus stop */}
        <p>Time Displays Here:</p>
        <BusTime />

      </div>
    );
  };
};
export default App;
