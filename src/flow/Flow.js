import React, { Component } from 'react';
import Loading from 'react-loading-bar';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navigation from "./Navigation";
import Page from "./Page";

import 'bootstrap/dist/css/bootstrap.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import 'react-loading-bar/dist/index.css';
import './Flow.css';
import RunClient from "../clients/RunClient";
import AuthenticationPrompt from "./AuthenticationPrompt";

class Flow extends Component {
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

        result.then(response => this.setState({
            invoke: response.data
        }));
    };

    // Extract
    onClickOutcome = (id) => {
        const body = {
            stateId: this.state.invoke.stateId,
            stateToken: this.state.invoke.stateToken,
            currentMapElementId: this.state.invoke.currentMapElementId,
            invokeType: 'FORWARD',
            mapElementInvokeRequest: {
                selectedOutcomeId: id
            }
        };

        axios.post('https://staging.manywho.com/api/run/1/state/' + this.state.invoke.stateId, body)
            .then(response => this.setState({
                invoke: response.data
            }));
    };

    onClickNavigationItem = (id, item) => {
        const body = {
            stateId: this.state.invoke.stateId,
            stateToken: this.state.invoke.stateToken,
            currentMapElementId: this.state.invoke.currentMapElementId,
            invokeType: 'NAVIGATE',
            mapElementInvokeRequest: {},
            navigationElementId: id,
            selectedNavigationItemId: item.id
        };

        axios.post('https://staging.manywho.com/api/run/1/state/' + this.state.invoke.stateId, body)
            .then(response => this.setState({
                invoke: response.data
            }));
    };

    onSubmitAuthentication = (username, password) => {
        const body = {
            username: username,
            password: password,
            loginUrl: this.state.invoke.authorizationContext.loginUrl
        };

        axios.post('https://staging.manywho.com/api/run/1/authentication/' + this.state.invoke.stateId, body)
            .then(response => {
                axios.defaults.headers.common['Authorization'] = response.data;

                this.setState({
                    token: response.data
                })
            })
            .then(response => this.initialize());
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
                          outcomes={ this.state.invoke.mapElementInvokeResponses[0].outcomeResponses || [] }
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

Flow.propTypes = {
    developerName: PropTypes.string,
    id: PropTypes.string,
    tenant: PropTypes.string.isRequired,
    version: PropTypes.string
};

export default Flow;