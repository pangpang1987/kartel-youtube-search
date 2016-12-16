import { injectReducer } from 'store/reducers';
import SearchView from './components/SearchView';

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const SearchView = require('./containers/SearchViewContainer').default
      const reducer = require('store/searchInput').default
      
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'search', reducer })
      /*  Return getComponent   */
      cb(null, SearchView)

    /* Webpack named bundle   */
    }, 'searchView')
  }
})



