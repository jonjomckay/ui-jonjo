import RunClient from '../clients/RunClient';

export const SELECT_OUTCOME = 'SELECT_OUTCOME';

export const selectOutcome = (outcome) => {
    return (dispatch, getState) => {
        return RunClient.selectOutcome(getState().flow.invoke, outcome)
            .then(response => dispatch({
                type: 'SET_INVOKE',
                invoke: response
            }));
    };
};