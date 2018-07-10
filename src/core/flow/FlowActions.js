import axios from 'axios';

const BASE_URL = 'https://development.manywho.net';

// TODO: It feels like I shouldn't be passing "dispatch" here
export const initializeFlow = (dispatch, tenant, id, version) => {
    const timer = setTimeout(() => dispatch({
        type: 'FLOW_INVOKE_LOADING'
    }), 300);

    const body = {
        id: id,
        versionId: version
    };

    return axios.post(BASE_URL + '/api/run/1/state', body, createOptions(tenant))
        .then(response => handleInvoke(dispatch, tenant, response, timer));
};

export const initializeNavigation = (dispatch, tenant, id, state, stateToken) => {
    const timer = setTimeout(() => dispatch({
        type: 'FLOW_NAVIGATE_LOADING'
    }), 300);

    const body = {
        navigationElementId: id,
        stateId: state,
        stateToken: stateToken
    };

    return axios.post(BASE_URL + '/api/run/1/navigation/' + state, body, createOptions(tenant))
        .then(response => dispatch({
            type: 'FLOW_NAVIGATED',
            id: id,
            data: response.data
        }))
        .then(() => clearTimeout(timer));
};

export const selectNavigation = (dispatch, tenant, navigation, id, invoke) => {
    dispatch({
        type: 'FLOW_NAVIGATE'
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

const handleInvoke = (dispatch, tenant, response, timer) => {
    dispatch({
        type: 'FLOW_INVOKED',
        data: response.data,
        tenant: tenant
    });

    response.data.navigationElementReferences.forEach(navigation => {
        initializeNavigation(dispatch, tenant, navigation.id, response.data.stateId, response.data.stateToken);
    });

    clearTimeout(timer);
};
