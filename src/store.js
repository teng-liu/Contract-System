import React, { Component } from 'react'
import * as Redux from 'redux'
import rootReducer from './store/reducers/rootReducer'
import apiMiddleware from './store/middlewares/api'

// redux ? local? | initState as parameter, why not ?

let redux;

class Store {
    constructor() {
        this.redux = Redux.createStore(
            rootReducer,
            Redux.compose(
                Redux.applyMiddleware(apiMiddleware),
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            )
        )
    }

}

export default Store;
