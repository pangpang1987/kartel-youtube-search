import React, {
  Component,
  PropTypes
} from 'react';

import './VideoListView.scss';
import VideoPreview from './VideoPreview';

class VideoListView extends Component {

  static propTypes = {
    videoList: PropTypes.array.isRequired,
    saveVideo: PropTypes.func.isRequired
  }

  render() {

    const {
     videoList,
     saveVideo
    } = this.props;

    return (
      <div className="video-list-wrapper">
        <ul className="video-list">
          {videoList.map((video, index) => <VideoPreview key={index} video={video} saveVideo={saveVideo} />)}
        </ul>
      </div>
    );
  }
}

export default VideoListView;
