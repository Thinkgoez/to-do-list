import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { sagaWatcher } from '../sagas/rootSaga'
import { alertReducer } from '../reducers/alertReducer'
import { projectsReducer } from '../reducers/projectsReducer'
import { optionReducer } from '../reducers/optionReducer'
import { notesReducer } from '../reducers/notesReducer'
import { authReducer } from '../reducers/authReducer'
import { userReducer } from '../reducers/userReducer'

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
    alert: alertReducer,
    project: projectsReducer,
    note: notesReducer,
    option: optionReducer,
    auth: authReducer,
    user: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(sagaWatcher)

export default store