import React, { Component } from 'react';
import { connect } from 'react-redux';
import HoldBus from './HoldBus.js';
import HoldNextBus from './HoldNextBus.js';


class BusTime extends Component {

    render () {
        return (
            <div>
                {/* {JSON.stringify(this.props.showTime)} */}
                {this.props.showTime.map((time, i) => {
                    if (time.Actual === true ) {
                        return (
                        <HoldBus key={i} upcomingBus={time.DepartureText}/>
                        )
                    } else if 
                        (time.Actual === false) {
                            return (
                                <HoldNextBus key={i} nextBus={time.DepartureText} />
                            );
                        };
                    }
                    
                )}

            </div>
        )
    };
    
};

const mapStoreToProps = reduxStore => ({
    showTime: reduxStore.displayTime,
});

export default connect(mapStoreToProps)(BusTime);



