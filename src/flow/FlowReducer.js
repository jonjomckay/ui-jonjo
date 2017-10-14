const defaultState = {
    invoke: {
        authorizationContext: {
            loginUrl: ''
        },
        mapElementInvokeResponses: [],
        navigationElementReferences: [],
        stateId: '',
        statusCode: ''
    },
    outcomes: []
};

const FlowReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_INVOKE':
            let outcomes;
            if (action.invoke.mapElementInvokeResponses.length) {
                outcomes = action.invoke.mapElementInvokeResponses[0].outcomeResponses || []
            }

            return {
                ...state,
                invoke: action.invoke,
                outcomes: outcomes
            };
        default:
            return state;
    }
};

export default FlowReducer;