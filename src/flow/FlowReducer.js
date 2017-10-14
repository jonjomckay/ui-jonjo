const defaultState = {
    invoke: {
        authorizationContext: {
            loginUrl: ''
        },
        mapElementInvokeResponses: [],
        navigationElementReferences: [],
        stateId: '',
        statusCode: ''
    }
};

const FlowReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_INVOKE':
            return {
                ...state,
                invoke: action.invoke
            };
        default:
            return state;
    }
};

export default FlowReducer;