import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { alertReducer } from './AlertHandler/alertReducer'
import { projectsReducer } from './projectsHandler/projectsReducer'
import { sagaWatcher } from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
    alert: alertReducer,
    projects: projectsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(sagaWatcher)

export default store