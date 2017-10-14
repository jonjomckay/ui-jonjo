const defaultState = {
    outcomes: []
};

const OutcomeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SELECT_OUTCOME':
            return {
                ...state,
                outcome: action.outcome
            };
        case 'SET_OUTCOMES':
            return {
                ...state,
                outcomes: action.outcomes
            };
        default:
            return state;
    }
};

export default OutcomeReducer;