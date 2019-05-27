import React from 'react'

export default function rootReducer(old, action) {

    if(old){
        if(action.type === 'reset'){
            return action.parameters.state;  
        }
        else if(action.type === 'select-user'){
            // let re = Object.assign({}, old);
            // re.data.selected = action.parameters.id;
            // return re;

            return {
                ...old,
                data: action.response.data.content.users
            }
        }
        else if (action.type === 'GetControlSheet') {
            if (action.status === 'succeeded') {
                // console.log(action.response.data.content);
                return {
                    ...old,
                    data: action.response.data.content
                }
            }
        }

        return old;
    }
    else{               // if old is null, then return empty object {}
        return {}   
    }
}
