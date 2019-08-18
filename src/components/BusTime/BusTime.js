import React, { Component } from 'react';
import { connect } from 'react-redux';

const moment = require ('moment');


class BusTime extends Component {

    render () {
        return (
            <div>
                {JSON.stringify(this.props.showTime)}
                {this.props.showTime.map((time, i) => {
                    if (time.Actual === true ) {
                        return (
                        <p key={i}>Next time in: ${time.DepartureText}</p>
                        )
                    } else if 
                        (time.Actual === false) {
                            return (
                                <p key={i}>Next bus time in :${time.DepartureText}</p>
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



