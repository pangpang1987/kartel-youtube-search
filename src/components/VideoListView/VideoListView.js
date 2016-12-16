import React, {
  Component,
  PropTypes
} from 'react';

import './VideoListView.scss';
import VideoPreview from './VideoPreview';

class VideoListView extends Component {

  static propTypes = {
    savedVideoIdList: PropTypes.array.isRequired,
    videoList: PropTypes.array.isRequired,
    saveVideo: PropTypes.func,
    unSaveVideo: PropTypes.func
  }

  render() {

    const {
      savedVideoIdList,
      videoList,
      saveVideo,
      unSaveVideo
    } = this.props;

    return (
      <div className="video-list-wrapper">
        <ul className="video-list">
          {videoList.map((video, index) => (
            <VideoPreview
              isSaved={savedVideoIdList.indexOf(video.id.videoId) !== -1}
              key={index}
              video={video}
              saveVideo={saveVideo}
              unSaveVideo={unSaveVideo} />))}
        </ul>
      </div>
    );
  }
}

export default VideoListView;
