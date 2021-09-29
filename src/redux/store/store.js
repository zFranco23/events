import { createStore , compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { globalReducer } from '../reducers/globalReducer'


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    globalReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)