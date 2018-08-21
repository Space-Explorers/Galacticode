import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import results from './results'
import challenge from './challenge'
import progress from './progress'
import solvedChallenges from './solvedChallenges'
import currChallenge from './currChallenge'
import planets from './planets'

const reducer = combineReducers({ user, results, challenge, progress, solvedChallenges, currChallenge, planets })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './results'
export * from './challenge'
export * from './progress'
export * from './solvedChallenges'
export * from './currChallenge'
export * from './planets'

