import SavedVideosContainer from './containers/SavedVideosContainer';

export default (store) => ({
  path : 'my_videos',
  /*  Async getComponent is only invoked when route matches   */

  component: SavedVideosContainer
})
