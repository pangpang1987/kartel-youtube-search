import { combineReducers } from 'redux'
import locationReducer from './location'
import saveVideoReducer from 'store/saveVideo'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    location: locationReducer,
    savedVideos: saveVideoReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
