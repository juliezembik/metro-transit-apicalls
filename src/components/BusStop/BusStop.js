import React, { Component } from 'react';
import { connect } from 'react-redux';
// import BusDropMenu from './BusDropMenu';


class BusRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: '',
            direction: '',
            stop: '',
        };
    };


    handleChange = event => {
        this.setState({
            route: this.props.inputs.route,
            direction: this.props.inputs.direction,
            stop: event.target.value,
        });
    };

    handleTime = () => {
        const action = { type: 'FETCH_TIME', payload: this.state };
        this.props.dispatch(action);
        this.saveToReducer();

    };

    saveToReducer = () => {
        const action = { type: 'SAVE_STOP', payload: this.state };
        this.props.dispatch(action);
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state)}
                <select onChange={this.handleChange}>
                    <option value="">Select</option>
                    {this.props.showStops.map((stops, i) => {
                        return (
                            <option value={stops.Value} key={i}>
                                {stops.Text}
                            </option>

                        )
                    })}
                </select>
                <button onClick={this.handleTime}>Submit</button>
            </div>
        );
    }
};

const mapStoreToProps = reduxStore => ({
    showStops: reduxStore.displayStop,
    inputs: reduxStore.saveAllInputs
});


export default connect(mapStoreToProps)(BusRoute);