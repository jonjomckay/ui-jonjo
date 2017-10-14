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
        invoke: {
            authorizationContext: {
                loginUrl: ''
            },
            mapElementInvokeResponses: [],
            navigationElementReferences: [],
            stateId: '',
            statusCode: ''
        },
        isLoading: false,
        token: ''
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
    onClickOutcome = (id) => {
        RunClient.selectOutcome(this.state.invoke, id)
            .then(this.setInvokeResponse);
    };

    onClickNavigationItem = (navigation, item) => {
        RunClient.selectNavigationItem(this.state.invoke, navigation, item)
            .then(this.setInvokeResponse);
    };

    onSubmitAuthentication = (username, password) => {
        RunClient.authenticate(this.state.invoke, username, password)
            .then(response => {
                axios.defaults.headers.common['Authorization'] = response.data;

                this.setState({
                    token: response.data
                })
            })
            .then(response => this.initialize());
    };

    setInvokeResponse = (response) => {
        if (response.data.mapElementInvokeResponses) {
            this.props.setOutcomes(response.data.mapElementInvokeResponses[0].outcomeResponses || []);
        }

        this.setState({
            invoke: response.data
        });
    };

    render() {
        let navigation;

        let page;
        if (this.state.invoke.statusCode === '401') {
            switch (this.state.invoke.authorizationContext.authenticationType) {
                case 'USERNAME_PASSWORD':
                    page = <AuthenticationPrompt onSubmit={ this.onSubmitAuthentication } />;
                    break;
                default:
                    page = 'An unknown authentication type was provided by the flow';
                    break;
            }
        } else {
            if (this.state.invoke.navigationElementReferences.length) {
                navigation = (
                    <Navigation onClickItem={ this.onClickNavigationItem }
                                reference={ this.state.invoke.navigationElementReferences[0] }
                                state={ this.state.invoke.stateId }
                                stateToken={ this.state.invoke.stateToken }
                                tenant={ this.props.tenant } />
                )
            }

            if (this.state.invoke.mapElementInvokeResponses.length) {
                page = (
                    <Page onClickOutcome={ this.onClickOutcome }
                          response={ this.state.invoke.mapElementInvokeResponses[0].pageResponse } />
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

const mapDispatchToProps = dispatch => {
    return {
        setOutcomes: outcomes => {
            dispatch({
                type: 'SET_OUTCOMES',
                outcomes: outcomes
            });
        }
    }
};

export default connect(null, mapDispatchToProps)(FlowContent);