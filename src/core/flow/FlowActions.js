import axios from 'axios';

const BASE_URL = 'https://development.manywho.net';

export const FLOW_INVOKE_ERRORED = 'FLOW_INVOKE_ERRORED';
export const FLOW_INVOKE_FINISHED = 'FLOW_INVOKE_FINISHED';
export const FLOW_INVOKE_LOADING = 'FLOW_INVOKE_LOADING';
export const FLOW_NAVIGATE = 'FLOW_NAVIGATE';
export const FLOW_NAVIGATE_LOADING = 'FLOW_NAVIGATE_LOADING';
export const FLOW_NAVIGATE_FINISHED = 'FLOW_NAVIGATE_FINISHED';

export const simpleInitializeFlow = (tenant, id, version) => async (dispatch) => {
    const timer = setTimeout(() => dispatch({
        type: FLOW_INVOKE_LOADING
    }), 300);

    const body = {
        id: id,
        versionId: version
    };

    return axios.post(BASE_URL + '/api/run/1/state', body, createOptions(tenant))
        .then(response => handleSimpleInvoke(dispatch, tenant, id, version, response, timer));
};

export const initializeNavigation = (dispatch, tenant, id, state, stateToken) => {
    const timer = setTimeout(() => dispatch({
        type: FLOW_NAVIGATE_LOADING
    }), 300);

    const body = {
        navigationElementId: id,
        stateId: state,
        stateToken: stateToken
    };

    return axios.post(BASE_URL + '/api/run/1/navigation/' + state, body, createOptions(tenant))
        .then(response => dispatch({
            type: FLOW_NAVIGATE_FINISHED,
            id: id,
            data: response.data
        }))
        .then(() => clearTimeout(timer));
};

export const selectNavigation = (dispatch, tenant, navigation, id, invoke) => {
    dispatch({
        type: FLOW_NAVIGATE
    });

    const body = {
        currentMapElementId: invoke.currentMapElementId,
        stateId: invoke.stateId,
        stateToken: invoke.stateToken,
        invokeType: 'NAVIGATE',
        mapElementInvokeRequest: {},
        navigationElementId: navigation,
        selectedNavigationItemId: id
    };

    return axios.post(BASE_URL + '/api/run/1/state/' + invoke.stateId, body, createOptions(tenant))
        .then(response => handleInvoke(dispatch, tenant, response));
};

export const selectOutcome = (dispatch, tenant, outcome, invoke) => {
    const body = {
        stateId: invoke.stateId,
        stateToken: invoke.stateToken,
        currentMapElementId: invoke.currentMapElementId,
        invokeType: 'FORWARD',
        mapElementInvokeRequest: {
            selectedOutcomeId: outcome.id
        }
    };

    return axios.post(BASE_URL + '/api/run/1/state/' + invoke.stateId, body, createOptions(tenant))
        .then(response => handleInvoke(dispatch, tenant, response));
};

const createOptions = (tenant) => {
    return {
        headers: {
            'ManyWhoTenant': tenant
        }
    };
};

const handleSimpleInvoke = (dispatch, tenant, id, version, response, timer) => {
    if (response.data.statusCode === '401') {
        // Initialize normally
        const body = {
            flowId: {
                id: id,
                versionId: version
            }
        };

        return axios.post(BASE_URL + '/api/run/1', body, createOptions(tenant))
            .then(response => handleInvoke(dispatch, tenant, response, timer));
    } else {
        handleInvoke(dispatch, tenant, response, timer);
    }
};

const handleInvoke = (dispatch, tenant, response, timer) => {
    if (response.data.statusCode === '401') {

        if (response.data.invokeType === 'NOT_ALLOWED') {

        } else {
            dispatch({
                type: FLOW_INVOKE_ERRORED,
                error: 'You are not authorized to access this flow'
            });
        }
    } else {
        dispatch({
            type: FLOW_INVOKE_FINISHED,
            data: response.data,
            tenant: tenant
        });
    }

    response.data.navigationElementReferences.forEach(navigation => {
        initializeNavigation(dispatch, tenant, navigation.id, response.data.stateId, response.data.stateToken);
    });

    clearTimeout(timer);
};
