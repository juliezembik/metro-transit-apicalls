import React, { Component } from 'react';
import { connect } from 'react-redux';


class BusDom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bus: '',
        }
    }
    
    componentDidMount() {
        this.getBus();
    };

    getBus = () => {
        this.props.dispatch({ type: 'FETCH_BUS' });
    };



    render () {
        return (
            <div>
                {this.bus}
            </div>
        );
    }
};

export default connect()(BusDom);