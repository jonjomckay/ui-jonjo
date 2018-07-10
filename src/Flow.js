import React, { Component } from 'react';
import { connect } from "react-redux";
import Loading from 'react-loading-bar';
import { initializeFlow } from "./core/flow/FlowActions";
import Navigations from "./bootstrap/navigation/Navigations";

import 'bootstrap/dist/css/bootstrap.css';
import 'react-loading-bar/dist/index.css';
import './Flow.css';
import Page from "./bootstrap/page/Page";

class Flow extends Component {
    componentDidMount = () => {
        initializeFlow(this.props.dispatch, this.props.tenant, this.props.id, this.props.version);
    };

    render() {
        return (
            <div className="flow">
                <Loading color="#2299dd" show={ this.props.isLoading } showSpinner={ false } />

                <Navigations />

                <Page />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.flow.isLoadingInvoke || state.flow.isLoadingNavigation
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Flow);
