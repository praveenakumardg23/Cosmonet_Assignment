import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import {createBrowserHistory} from 'history'

// Logger with default options
import logger from "redux-logger";

import reducer from "./reducer";

export const history = createBrowserHistory()

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  logger,
  routerMiddleware(history)
]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const rootReducer = combineReducers({
  reducer,
  router: connectRouter(history)
})

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers
)

export default store;