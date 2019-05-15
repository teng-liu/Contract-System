import React from 'react';
import * as Redux from 'redux'
import axios from 'axios';

async function callApi(parameters) {
    let res = await axios({
        method: 'get',
        url: 'some-api'
    })
    return res
}

let apiMiddleware = (api) => (next) => (action) => {
    if(action.kind === 'api' 
        && action.status === 'new') {
            // call api as promise
            callApi(action.parameters)
                .then(
                    response => {
                        // re-dispatch succeeded action
                        api.dispatch(Object.assign({}, action, {
                            status: 'succeeded',
                            response: response
                        }))})
                .catch(
                    error => {
                        // re-dispatch the failed action
                        api.dispatch(Object.assign({}, action, {
                            status: 'failed',
                            error: error
                        }))
                });
            // forward the pending action
            return next(Object.assign({}, action, {status: 'pending'}));     
        }
        else {
            // forward the action
            return next(action);        
        }
}


export default apiMiddleware;
