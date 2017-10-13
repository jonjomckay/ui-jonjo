import axios from 'axios';

export default class RunClient {
    static initializeSimple = (id, version) => {
        return axios.post('https://staging.manywho.com/api/run/1/state', {
            id: id,
            versionId: version
        });
    };

    static initializeSimpleWithDeveloperName = (developerName) => {
        return axios.post('https://staging.manywho.com/api/run/1/state', {
            developerName: developerName
        });
    };
}