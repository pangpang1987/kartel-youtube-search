import React, {
  Component,
  PropTypes
} from 'react';

import './SavedVideoView.scss';

import VideoListView from 'components/VideoListView';

export class SavedVideoView extends Component {

  static propTypes = {
    searchVideoList: PropTypes.array,
    saveVideo: PropTypes.func,
    setSearchKeyword: PropTypes.func
  }

  render() {

    const {
      savedVideoList
    } = this.props;

    return (
      <div>
        <VideoListView videoList={savedVideoList} />
      </div>
    );
  }
}

export default SavedVideoView;
