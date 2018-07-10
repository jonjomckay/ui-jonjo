import React, { Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import Flow from './Flow';
import { flowReducer } from './core/flow/FlowReducer';

const store = createStore(combineReducers({
    flow: flowReducer
}), applyMiddleware(logger));

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <Flow id="b7e2a056-35dd-4973-b279-c85aeafb299c" tenant="4dc56bec-b68c-47ac-8998-7ba961734c18" />
                {/*<Flow id="c6b211f0-b342-4f67-b7b1-b8b62868b2a4" tenant="07f799a4-af7c-449b-ba7c-f1f526f7000a" />*/}
            </Provider>
        );
    }
}

export default App;
