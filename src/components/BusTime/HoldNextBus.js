import React, { Component } from 'react';
import { connect } from 'react-redux';


class HoldBus extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <div>
                {this.props.nextBus}

            </div>
        )
    }
}

export default connect()(HoldBus);