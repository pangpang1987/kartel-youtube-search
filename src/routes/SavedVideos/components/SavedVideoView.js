import React, {
  Component,
  PropTypes
} from 'react';

import './SavedVideoView.scss';

import VideoListView from 'components/VideoListView';

export class SavedVideoView extends Component {

  static propTypes = {
    savedVideoIdList: PropTypes.array,
    searchVideoList: PropTypes.array,
    unSaveVideo: PropTypes.func
  };
  static defaultProps = {
    savedVideoIdList: []
  };

  render() {

    const {
      savedVideoIdList,
      savedVideoList,
      unSaveVideo
    } = this.props;

    return (
      <div>
        <VideoListView
          savedVideoIdList={savedVideoIdList}
          videoList={savedVideoList}
          unSaveVideo={unSaveVideo} />
      </div>
    );
  }
}

export default SavedVideoView;
