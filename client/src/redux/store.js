import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { sagaWatcher } from './rootSaga'
import { alertReducer } from './alertHandler/alertReducer'
import { projectsReducer } from './projectsHandler/projectsReducer'
import { optionReducer } from './optionHandler/optionReducer'
import { notesReducer } from './notesHandler/notesReducer'
import { authReducer } from './authHandler/authReducer'

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
    alert: alertReducer,
    project: projectsReducer,
    note: notesReducer,
    option: optionReducer,
    auth: authReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(sagaWatcher)

export default store