import React, { Component } from 'react';
import { connect } from 'react-redux';
// import BusDropMenu from './BusDropMenu';


class BusRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: '',
        };
    };

    
    // this sends the function getBus to sagas to retrieve bus number
    // from metro transit API
    componentDidMount() {
        this.getBus();
    };

    // sends dispatch to FETCH_BUS sagas to return routes/descriptions
    getBus = (e) => {
        this.props.dispatch({ type: 'FETCH_BUS' });
    };

    // sends a dispatch to 'FETCH DIRECTION to show up in second select
    // the results will go to next component BusDirection
    handleChange = (event) => {
        this.setState({ route: event.target.value });
        event.preventDefault();
    };

    handleDirection = () => {
        const action = { type: 'FETCH_DIRECTION', payload: this.state};
        this.props.dispatch(action);
        this.saveToReducer();
        
    };

    saveToReducer = () => {
        const action = { type: 'SAVE_ROUTE', payload: this.state};
        this.props.dispatch(action);
    }

    render () {
        return (
            <div>
                {/* {JSON.stringify(this.state)} */}
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
                <button onClick={this.handleDirection}>Submit</button>
            </div>
        );
    }
};

const mapStoreToProps = reduxStore => ({
    showBuses: reduxStore.displayBuses
});


export default connect(mapStoreToProps)(BusRoute);