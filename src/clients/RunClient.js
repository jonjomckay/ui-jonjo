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
    };

    static initializeSimple = (id, version) => {
        return axios.post(BASE_URL + '/api/run/1/state', {
            id: id,
            versionId: version
        });
    };

    static initializeSimpleWithDeveloperName = (developerName) => {
        return axios.post(BASE_URL + '/api/run/1/state', {
            developerName: developerName
        });
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

        return axios.post(BASE_URL + '/api/run/1/state/' + invoke.stateId, body);
    };

    static selectOutcome = (invoke, outcome) => {
        const body = {
            stateId: invoke.stateId,
            stateToken: invoke.stateToken,
            currentMapElementId: invoke.currentMapElementId,
            invokeType: 'FORWARD',
            mapElementInvokeRequest: {
                selectedOutcomeId: outcome
            }
        };

        return axios.post(BASE_URL + '/api/run/1/state/' + invoke.stateId, body);
    };
}