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
        // this will show the next bus if Actual within object is true.
        // this will display the bus in minutes and displays on the left side of DOM
        const nextBus = 
            this.props.showTime.map((time, i) => {
                if (time.Actual === true) {
                    return (
                        <div>
                            <HoldBus key={i} upcomingBus={time.DepartureText} />
                        </div>
                    )
                }

            });

        
        // futureBus will show the next busses if Actual within object is false
        // will be displayed in HH:MM format on right side of DOM
        const futureBus = 
            this.props.showTime.map((time, i) => {
                if (time.Actual === false) {
                    return (
                        <div>
                            <HoldNextBus key={i} nextBus={time.DepartureText} />
                        </div>
                    )
                }
            });
        
        

        return (
            <div>
                <div className="background-bus">
                    <div className="upcomingbus">
                        <h2>The Next Bus</h2>
                        <h3>will arrive in:</h3>
                        {/* conditionally renders if buses are available */}
                            {nextBus.length ? nextBus : <p>There is no bus at this time.</p>}
                    </div>

                        {/* conditionally renders if there is no future bus, typically for */}
                        {/* busses that are not running anymore */}
                    <div className="futurebus">
                        <h2>Future Bus Times</h2>
                            {futureBus.length ? futureBus : <p>No future bus.</p>}
                    </div>
                </div>
                

                {/* {JSON.stringify(this.props.showTime)} */}
            </div>
        )
    };
    
};

// redux store that displays the time from fourth API call
const mapStoreToProps = reduxStore => ({
    showTime: reduxStore.displayTime,
});

export default connect(mapStoreToProps)(BusTime);



