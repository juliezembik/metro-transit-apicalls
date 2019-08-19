import React, { Component } from 'react';
import { connect } from 'react-redux';
import HoldBus from './HoldBus.js';
import HoldNextBus from './HoldNextBus.js';

// BusTime component does not make any API calls, it holds only information
// from the last API call to metro transit and displays the time for the
// next bus or trains ETA

class BusTime extends Component {


    // showTime will show information based on actual variable in object
    // if actual is true, it will display the next bus in minutes
    // if actual is false, it will display the next buses ETA
    render () {
        return (
            <div>
                <div className="upcomingbus">
                    <h2>The Next Bus</h2>
                    <h3>will arrive in:</h3>
                {this.props.showTime.map((time, i) => {
                    if (time.Actual === true ) {
                        return (
                        <div>
                            <HoldBus key={i} upcomingBus={time.DepartureText}/>
                        </div>
                        )
                    }})}
                </div>
                
                <div className="futurebus">
                    <h2>Future Bus Times</h2>
                {this.props.showTime.map((time, i) => {
                    if (time.Actual === false) {
                        return (
                        <div>
                            <HoldNextBus key={i} nextBus={time.DepartureText} />
                        </div>
                                )
                            }  
                        })}
                </div>

                {/* {JSON.stringify(this.props.showTime)} */}
            </div>
        )
    };
    
};

const mapStoreToProps = reduxStore => ({
    showTime: reduxStore.displayTime,
});

export default connect(mapStoreToProps)(BusTime);



