import React from 'react'

export default function rootReducer(old, action) {

    if(old){
        if(action.type === 'reset'){
            return action.parameters.state;  
        }
        else if(action.type === 'select-user'){
            let re = Object.assign({}, old);
            re.data.selected = action.parameters.id;
            return re;
            // return Object.assign(
            //     {}, 
            //     old,
            //     {
            //         selected: action.parameters.id
            //     })
        }               // copy old to {}, a new object, then update {selected: ...}


        return old;
    }
    else{               // if old is null, then return empty object {}
        return {}   
    }
}
