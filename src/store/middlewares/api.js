import React from 'react';
import * as Redux from 'redux'
import axios from 'axios';

async function callApi(method, url, body) {
    let res;
    if(method === 'patch'){
        res = await axios.patch(url, body);
    }
    else{
        res = await axios({
            method,
            url
        })
    }
    return res;
}

async function processSyncFunction(action) {
    if (action.type === 'GetContractList') {
        return await callApi('get', 'http://localhost:9000/api/contracts', null);
    }
    else if(action.type === 'GetTemplateList'){
        return await callApi('get', 'http://localhost:9000/api/contract-templates', null);
    }
    else if(action.type === 'GetContractBykey'){
        let key = action.parameters.id;
        return await callApi('get', `http://localhost:9000/api/contracts/${key}`, null);
    }
    else if(action.type === 'UpsertContractByKey'){
         let key = action.parameters.id;
        // state -> currentContract -> namekey, content

        // return await callApi('put', `http://localhost:9000/api/contracts/${key}`, action.parameters.content);
    }
    else if(action.type === 'select-user'){
        // update 
        let name = 'itss-control-approval-sheet';
        let param = {
            data: {
                selected: action.parameters.id
            }
        };
        return await callApi('patch', `http://localhost:9000/api/contracts/${name}`, param);
    }
    else {
        throw 'no such action type'
    }
}

let apiMiddleware = (api) => (next) => (action) => {
    if(action.kind === 'api' 
        && action.status === 'new') {
            // call api as promise
            processSyncFunction(action)
                .then(
                    response => {
                        // re-dispatch succeeded action
                        api.dispatch(
                            {
                                ...action,
                                status: 'succeeded',
                                response: response
                            }
                        )
                    })
                .catch(
                    error => {
                        // re-dispatch the failed action
                        api.dispatch(
                            {
                                ...action,
                                status: 'failed',
                                error: error
                            })
                    }
                );
            // forward the pending action
            return next({...action, status: 'pending'});     
        }
        else {
            // forward the action
            return next(action);        
        }
}


export default apiMiddleware;
