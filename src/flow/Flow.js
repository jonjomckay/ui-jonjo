import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { combineReducers, createStore } from 'redux';
import FlowContent from "./FlowContent";
import OutcomeReducer from './OutcomeReducer';

import 'bootstrap/dist/css/bootstrap.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import 'react-loading-bar/dist/index.css';
import './Flow.css';

const store = createStore(combineReducers({
    outcomes: OutcomeReducer
}));

const Flow = (props) => (
    <Provider store={ store }>
        <FlowContent { ...props } />
    </Provider>
);

Flow.propTypes = {
    developerName: PropTypes.string,
    id: PropTypes.string,
    tenant: PropTypes.string.isRequired,
    version: PropTypes.string
};

export default Flow;

