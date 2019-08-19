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
        <div className="menu-nav">
          <h1>Check Your Bus Time</h1>
        {/* BusRoute will display the list of bus routes to choose from. */}
        <p>Select Bus Route</p>
        <BusRoute />

        {/* BusDirection will pull only the needed list of directions for the specific route chosen */}
        <p>Select Direction</p>
        <BusDirection />

        {/* Bus Stop will display the list of bus stops along specified route */}
        <p>Select Stop</p>
        <BusStop />
        </div>

        {/* BusTime will display the list of bus times for specified bus stop */}
        <BusTime />

      </div>
    );
  };
};
export default App;
