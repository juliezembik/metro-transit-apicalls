import React, { Component } from "react";
import { connect } from "react-redux";



class BusDirection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: '',
      direction: '',
    };
    // this.handleChange = this.handleChange.bind(this);
  }


  handleChange = event => {
    this.setState({ 
        route: this.props.inputs.route,
        direction: event.target.value });
  };

  handleStop = () => {
    const action = { type: "FETCH_STOP", payload: this.state };
    this.props.dispatch(action);
    this.saveToReducer();
  };

  saveToReducer = () => {
    const action = { type: "SAVE_DIRECTION", payload: this.state };
    this.props.dispatch(action);
  };



  render() {
    return (
      <div>
            {/* {JSON.stringify(this.props.showDirection)}
            {JSON.stringify(this.state.direction)} */}
        <select onChange={this.handleChange}>
          <option value="">Select</option>
          {this.props.showDirection.map((cardinal, i) => {
            return (
              <option value={cardinal.Value} key={i}>
                {cardinal.Text}
              </option>
            );
          })}
        </select>
        <button onClick={this.handleStop}>Submit</button>

      </div>
    );
  }
}

const mapStoreToProps = reduxStore => ({
  showDirection: reduxStore.displayDirection,
  inputs: reduxStore.saveAllInputs
});

export default connect(mapStoreToProps)(BusDirection);
