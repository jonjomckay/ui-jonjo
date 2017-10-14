import axios from 'axios';

const BASE_URL = 'https://staging.manywho.com';

export default class RunClient {
    static authenticate = (invoke, username, password) => {
        const body = {
            username: username,
            password: password,
            loginUrl: invoke.authorizationContext.loginUrl
        };

        return axios.post(BASE_URL + '/api/run/1/authentication/' + invoke.stateId, body)
            .then(response => response.data);
    };

    static initializeSimple = (id, version) => {
        const body = {
            id: id,
            versionId: version
        };

        return axios.post(BASE_URL + '/api/run/1/state', body)
            .then(response => response.data);
    };

    static initializeSimpleWithDeveloperName = (developerName) => {
        const body = {
            developerName: developerName
        };

        return axios.post(BASE_URL + '/api/run/1/state', body)
            .then(response => response.data);
    };

    static selectNavigationItem = (invoke, navigation, item) => {
        const body = {
            stateId: invoke.stateId,
            stateToken: invoke.stateToken,
            currentMapElementId: invoke.currentMapElementId,
            invokeType: 'NAVIGATE',
            mapElementInvokeRequest: {},
            navigationElementId: navigation,
            selectedNavigationItemId: item.id
        };

        return axios.post(BASE_URL + '/api/run/1/state/' + invoke.stateId, body)
            .then(response => response.data);
    };

    static selectOutcome = (invoke, outcome) => {
        const body = {
            stateId: invoke.stateId,
            stateToken: invoke.stateToken,
            currentMapElementId: invoke.currentMapElementId,
            invokeType: 'FORWARD',
            mapElementInvokeRequest: {
                selectedOutcomeId: outcome.id
            }
        };

        return axios.post(BASE_URL + '/api/run/1/state/' + invoke.stateId, body)
            .then(response => response.data);
    };
}