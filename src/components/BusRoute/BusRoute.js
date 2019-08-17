import React, { Component } from 'react';
import { connect } from 'react-redux';
// import BusDropMenu from './BusDropMenu';


class BusRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: '',
        }
        // this.handleChange = this.handleChange.bind(this);
    };

    
    // this sends the function getBus to sagas to retrieve bus number
    // from metro transit API
    componentDidMount() {
        this.getBus();
    };

    // sends dispatch to FETCH_BUS sagas to return routes/descriptions
    getBus = () => {
        this.props.dispatch({ type: 'FETCH_BUS' });
    };

    // sends a dispatch to 'FETCH DIRECTION to show up in second select
    // the results will go to next component BusDirection
    handleChange = (e) => {
        this.setState({ route: e.target.value });

    };

    handleDirection = () => {
        const action = this.props.dispatch({ type: 'FETCH_DIRECTION', payload: this.state});
        this.props.dispatch(action);
        
    }

    render () {
        return (
            <div>
                {JSON.stringify(this.state)}
                <select onChange={this.handleChange}>
                    <option value="">Select</option>
                {this.props.showBus.map((bus,i) => {
                    return(
                        <option value={bus.Route} key={i}>
                            {bus.Description} - {bus.Route}
                        </option>
                        
                    )
                })}
                </select>
            </div>
        );
    }
};

const mapStoreToProps = reduxStore => ({
    showBus: reduxStore.displayBus
});

export default connect(mapStoreToProps)(BusRoute);