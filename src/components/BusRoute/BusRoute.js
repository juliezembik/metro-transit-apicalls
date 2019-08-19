
// required imports for base
import React, { Component } from 'react';
import { connect } from 'react-redux';


// BusRoute will be the first to make HTTPS API call to metro transit
// this will happen in the componentDidMount life-cycle function

class BusRoute extends Component {
    constructor(props) {
        super(props);

        //this.state will hold the users input from the drop down menu
        //this is vital as this will be used as a variable for our API required call
        this.state = {
            route: '',
        };
    };

    
    // when page renders with componentDidMount the function getBus to sagas to retrieve bus number
    // from metro transit API
    componentDidMount() {
        this.getBus();
    };

    // sends dispatch to FETCH_BUS sagas to return routes/descriptions
    getBus = (e) => {
        this.props.dispatch({ type: 'FETCH_BUS' });
    };

    //handleChange will run as an onChange in select
    //this will update the local state.route
    handleChange = (event) => {
        this.setState({ route: event.target.value });
        event.preventDefault();
    };

    // sends a dispatch to 'FETCH DIRECTION' to show up in second select
    // the results will go to next component BusDirection
    // this.saveToReducer will run once action has been dispatched
    handleDirection = () => {
        const action = { type: 'FETCH_DIRECTION', payload: this.state};
        this.props.dispatch(action);
        this.saveToReducer();
        
    };

    // saveToReducer is another save state to bring back needed variables
    // in the other components
    saveToReducer = () => {
        const action = { type: 'SAVE_ROUTE', payload: this.state};
        this.props.dispatch(action);
    }


    // this renders and maps over the bus route objects, to display
    // in a dropdown menu for the user to choose from.
    render () {
        return (
            <div>
                {/* {JSON.stringify(this.state)} */}

                {/* Once a user selects their bus route onChange triggers to save */}
                {/* route to state */}
                <select onChange={this.handleChange}>
                    <option value="">Select</option>
                {this.props.showBuses.map((bus,i) => {
                    return(
                        <option value={bus.Route} key={i}>
                            {bus.Description}
                        </option>
                        
                    )
                })}
                </select>
                {/* onClick triggers handleDirection function to send state */}
                <button onClick={this.handleDirection}>Submit</button>
            </div>
        );
    }
};

// mapStoreToProps brings in needed routes within a reducer to be
//used on the DOM in the drop down menu
const mapStoreToProps = reduxStore => ({
    showBuses: reduxStore.displayBuses
});

// connect() attaches the redux store to this component
// export sends this component to be used within App
export default connect(mapStoreToProps)(BusRoute);