import React from 'react'

export default function rootReducer(old, action) {

    if(old){
        if(action.type === 'reset'){
            return action.parameters.state;  // parameters.state  ?? 
        }
        else if(action.type === 'select-user'){
            return Object.assign(
                {}, 
                old,
                {
                    selected: action.parameters.id
                })
        }

        return old;
    }
    else{
        return {}
    }
}
