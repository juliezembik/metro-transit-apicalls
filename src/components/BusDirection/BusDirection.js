import React, { Component } from 'react';
import { connect } from 'react-redux';


class BusDirection extends Component {
    constructor(props) {
    super(props);
    this.state = {
        direction: '',
    }
    // this.handleChange = this.handleChange.bind(this);
};

handleChange = (e) => {
    this.setState( {direction: e.target.value} );
    
};

handleStop = () => {

};

    render () {
        return (
            <div>
            {JSON.stringify(this.state)}
            <select onChange={this.handleChange}>
                <option value="">Select</option>
                {JSON.stringify(this.props.showDirection.text)}
                {this.props.showDirection.map((northSouth, i) => {
                    return (
                        <option value={northSouth.Value} key={i}>
                            {northSouth.Text}
                        </option>
                    )
                })}

            </select>
            <button onClick={this.handleStop}>Submit</button>
            </div>
        );

    };

};


const mapStoreToProps = reduxStore => ({
    showDirection: reduxStore.displayDirection
});

export default connect(mapStoreToProps)(BusDirection);