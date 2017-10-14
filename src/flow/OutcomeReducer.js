const defaultState = {
    outcome: {

    }
};

const OutcomeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SELECT_OUTCOME':
            return {
                ...state,
                outcome: action.outcome
            };
        default:
            return state;
    }
};

export default OutcomeReducer;