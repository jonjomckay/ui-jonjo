import React, { Component } from 'react';
import Loading from 'react-loading-bar';
import { connect } from 'react-redux';
import axios from 'axios';

import AuthenticationPrompt from "./AuthenticationPrompt";
import Navigation from "./Navigation";
import RunClient from "../clients/RunClient";
import Page from "./Page";

class FlowContent extends Component {
    state = {
        isLoading: false
    };

    componentDidMount = () => {
        axios.defaults.headers.common['ManyWhoTenant'] = this.props.tenant;
        axios.interceptors.request.use(config => {
            // Only set the page's loading state if this isn't an ObjectDataRequest (LOL)
            if (config.url.endsWith('api/service/1/data') === false) {
                this.setState({
                    isLoading: true
                });
            }

            return config;
        });

        axios.interceptors.response.use((response) => {
            // Only set the page's loading state if this isn't an ObjectDataRequest (LOL)
            if (response.config.url.endsWith('api/service/1/data') === false) {
                this.setState({
                    isLoading: false
                });
            }

            return response;
        });

        this.initialize();
    };

    initialize = () => {
        let result;

        if (this.props.developerName) {
            result = RunClient.initializeSimpleWithDeveloperName(this.props.developerName);
        } else {
            result = RunClient.initializeSimple(this.props.id, this.props.version);
        }

        result.then(this.setInvokeResponse);
    };

    // Extract
    onClickOutcome = (outcome) => {
        RunClient.selectOutcome(this.props.invoke, outcome)
            .then(this.setInvokeResponse);
    };

    onClickNavigationItem = (navigation, item) => {
        RunClient.selectNavigationItem(this.props.invoke, navigation, item)
            .then(this.setInvokeResponse);
    };

    onSubmitAuthentication = (username, password) => {
        RunClient.authenticate(this.props.invoke, username, password)
            .then(response => axios.defaults.headers.common['Authorization'] = response)
            .then(response => this.initialize());
    };

    setInvokeResponse = (invoke) => {
        if (invoke.mapElementInvokeResponses) {
            this.props.setOutcomes(invoke.mapElementInvokeResponses[0].outcomeResponses || []);
        }

        this.props.setInvoke(invoke);
    };

    render() {
        let navigation;

        let page;
        if (this.props.invoke.statusCode === '401') {
            switch (this.props.invoke.authorizationContext.authenticationType) {
                case 'USERNAME_PASSWORD':
                    page = <AuthenticationPrompt onSubmit={ this.onSubmitAuthentication } />;
                    break;
                default:
                    page = 'An unknown authentication type was provided by the flow';
                    break;
            }
        } else {
            if (this.props.invoke.navigationElementReferences.length) {
                navigation = (
                    <Navigation onClickItem={ this.onClickNavigationItem }
                                reference={ this.props.invoke.navigationElementReferences[0] } />
                )
            }

            if (this.props.invoke.mapElementInvokeResponses.length) {
                page = (
                    <Page response={ this.props.invoke.mapElementInvokeResponses[0].pageResponse } />
                )
            }
        }

        return (
            <div className="flow">
                <Loading color="#2299dd" show={ this.state.isLoading } showSpinner={ false } />

                { navigation }

                { page }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        invoke: state.flow.invoke
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setInvoke: invoke => {
            dispatch({
                type: 'SET_INVOKE',
                invoke: invoke
            });
        },
        setOutcomes: outcomes => {
            dispatch({
                type: 'SET_OUTCOMES',
                outcomes: outcomes
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowContent);