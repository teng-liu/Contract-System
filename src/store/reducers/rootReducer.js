import React from 'react'

export default function rootReducer(old, action) {

    if(old){
        if(action.type === 'reset'){
            return action.parameters.state;  
        }
        else if(action.type === 'select-user'){

            if (action.status === 'succeeded') {

                // shallow copy of every level:
                // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
                return {
                    ...old,
                    data: {
                        ...old.data,
                        data: {
                            ...old.data.data,
                            selected: action.response.data.selected
                        }
                    }
                }
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
