import React, { Component } from 'react';
import { connect } from 'react-redux';


// BusStop will be the third component and input to this App
// BusStop will take in information from BusRoute & BusDirection to be used here
// to make the last API call to grab the time for the users chosen route

class BusStop extends Component {
    constructor(props) {
        super(props);
        // this.state will utilize route, direction, stop to make last API call
        this.state = {
            route: '',
            direction: '',
            stop: '',
        };
    };


    // handleChange will trigger to update state
    // route & direction will take in the saved previous states from its reducer
    handleChange = event => {
        this.setState({
            route: this.props.inputs.route,
            direction: this.props.inputs.direction,
            stop: event.target.value,
        });
    };

    // handleTime will trigger to make last API call to metro transit to grab
    // the bus times
    // saveToReducer will trigger to save information to the DOM.
    handleTime = () => {
        const action = { type: 'FETCH_TIME', payload: this.state };
        this.props.dispatch(action);
        this.saveToReducer();

    };

    // saveToReducer function will save state to reducer
    saveToReducer = () => {
        const action = { type: 'SAVE_STOP', payload: this.state };
        this.props.dispatch(action);
    }


    // this is our third and final drop down menu to select from
    // this will map over the proper stops for the selected route and directions
    render() {

        // stop will contain the map function for showStops reducer
        // it will display all the information into an option tag
        // within the select menu
        const stop =
            this.props.showStops.map((stops, i) => {
                return (
                    <option value={stops.Value} key={i}>
                        {stops.Text}
                    </option>

                )
            })

        return (
            <div className="buses">
                {/* {JSON.stringify(this.state)} */}

                {/* onChange will change the state for stops */}

                <select onChange={this.handleChange}>
                    <option>Select</option> 
                    {stop.length ? stop : <option>Please Select Direction</option>}
                </select>

                    {/* onClick will trigger to make the last API call to display the time */}

                <button onClick={this.handleTime}>Submit</button>
            </div>
        );
    }
};


// redux store to bring in needed values from previous saved states
// and to map over stops
const mapStoreToProps = reduxStore => ({
    showStops: reduxStore.displayStop,
    inputs: reduxStore.saveAllInputs
});

// connect() for redux store and the export component to App
export default connect(mapStoreToProps)(BusStop);