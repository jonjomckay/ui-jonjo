import React, { Component } from 'react';
import { connect } from "react-redux";
import Loading from 'react-loading-bar';
import { simpleInitializeFlow } from "./core/flow/FlowActions";
import Navigations from "./bootstrap/navigation/Navigations";

import 'bootstrap/dist/css/bootstrap.css';
import 'react-loading-bar/dist/index.css';
import './Flow.css';
import Page from "./bootstrap/page/Page";
import Error from "./bootstrap/errors/Error";

class Flow extends Component {
    componentDidMount = () => {
        this.props.simpleInitializeFlow(this.props.tenant, this.props.id, this.props.version);
    };

    render() {
        return (
            <div className="flow">
                <Loading color="#2299dd" show={ this.props.isLoading } showSpinner={ false } />

                <Navigations />

                <div className="container">
                    <Error error={ this.props.error } />

                    <Page />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.flow.error,
        isLoading: state.flow.isLoadingInvoke || state.flow.isLoadingNavigation
    }
};

const mapDispatchToProps = {
    simpleInitializeFlow,
};

export default connect(mapStateToProps, mapDispatchToProps)(Flow);
