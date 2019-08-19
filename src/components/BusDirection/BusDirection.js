import React, { Component } from "react";
import { connect } from "react-redux";


// component BusDirection will be the second to be used within this app
// it will take in the information sent from BusRoute and utilized
// within this component to determine cardinal directions for bus routes

class BusDirection extends Component {

  // this constructor will bring in props and store needed states to be
  // sent for the second API call needed for routes cardinal directions
  constructor(props) {
    super(props);
    this.state = {
      route: '',
      direction: '',
    };
  }

  // handleChange will update state
  // route will be brought in from reducer that is saved from busRoute
  handleChange = event => {
    this.setState({ 
        route: this.props.inputs.route,
        direction: event.target.value });
  };


  // handleStop will cause a 'FETCH_STOP' call to sagas with payload of this
  // components local state and then trigger saveToReducer to save state.direction to reducer
  // to be used in the next component BusStop
  handleStop = () => {
    const action = { type: "FETCH_STOP", payload: this.state };
    this.props.dispatch(action);
    this.saveToReducer();
  };

  // saveToReducer will trigger in handleStop to be saved within a reducer
  // for the next component BusStop
  saveToReducer = () => {
    const action = { type: "SAVE_DIRECTION", payload: this.state };
    this.props.dispatch(action);
  };


  // this is another drop down menu for users to choose their cardinal directions for
  // specified bus, this will be pulled from the metro transit API and will show only
  // the directions for its specific bus to minimize user error
  render() {

    const direction =
      this.props.showDirection.map((cardinal, i) => {
        return (
          // Should only display proper directions for specified bus routes
          <option value={cardinal.Value} key={i}>
            {cardinal.Text}
          </option>
        );
      })

    return (
      <div className="buses">

            {/* onChange will trigger once user selects their direction to update state */}

        <select onChange={this.handleChange}>
          <option>Select</option> 
          {direction.length ? 
            direction : <option>Please Select Route</option>}
        </select>

        {/* onClick will trigger handleStop on submit */}
        <button onClick={this.handleStop}>Submit</button>

      </div>
    );
  }
}

// reduxStore to bring in saved input Route from BusRoute and be used again
// to be sent to server to make proper API calls
const mapStoreToProps = reduxStore => ({
  showDirection: reduxStore.displayDirection,
  inputs: reduxStore.saveAllInputs
});

// connect() to utilize reducer and export to be used on App
export default connect(mapStoreToProps)(BusDirection);
