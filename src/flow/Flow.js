import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import FlowContent from "./FlowContent";
import FlowReducer from "./FlowReducer";
import OutcomeReducer from './OutcomeReducer';

import 'bootstrap/dist/css/bootstrap.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import 'react-loading-bar/dist/index.css';
import './Flow.css';

const store = createStore(combineReducers({
    flow: FlowReducer,
    outcomes: OutcomeReducer
}), applyMiddleware(thunkMiddleware));

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

