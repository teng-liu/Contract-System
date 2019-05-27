import React from 'react';
import * as Redux from 'redux'
import axios from 'axios';

async function callApi(method, url, body) {
    let res = await axios({
        method,
        url
    })
    return res
}

async function processSyncFunction(action) {
    if (action.type === 'GetControlSheet') {
        // return await callApi('get', 'http://localhost:5000/api/controlsheet', null);
        return await callApi('get', 'http://localhost:9000/api/contract', null);
        //  http://localhost:9000/api/contract
    }
    else if(action.type === 'saveContractI'){
        return await callApi('post', 'http://localhost:5000/api/controlsheet/', null);
    }
    else if(action.type === 'select-user'){
        // update 
        return await callApi('put', 'http://localhost:9000/api/contract', null);
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
