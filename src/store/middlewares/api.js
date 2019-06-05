import React from 'react';
import * as Redux from 'redux'
import axios from 'axios';

async function callApi(method, url, body) {
    let res;
    if(method === 'patch'){
        res = await axios.patch(url, body);
    }
    else if(method === 'put'){
        res = await axios.put(url, body);
    }
    else{
        res = await axios({
            method,
            url
        })
    }

    return res;
}

async function processSyncFunction(action, state) {
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
        // state -> currentContract -> namekey, content
        let key = state.localdb.currentContract.nameKey;
        let content = {'content': state.localdb.currentContract.content};
        // JSON.stringify(state.localdb.currentContract.content);

        // let content = {
        //     data: {
        //         tamitest: 'tamitestData'
        //     }
        // };
        
        console.log(content);
        return await callApi('put', `http://localhost:9000/api/contracts/${key}`, content);
    }
    else if(action.type === 'GetCodeValue'){
        let code = action.parameters.codeName;
        return await callApi('get', `http://localhost:9000/api/codetables/${code}`, null);
    }
    else {
        throw 'no such action type';
    }
}

let apiMiddleware = (api) => (next) => (action) => {
    if(action.kind === 'api' 
        && action.status === 'new') {
            // call api as promise
            processSyncFunction(action, api.getState())
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
