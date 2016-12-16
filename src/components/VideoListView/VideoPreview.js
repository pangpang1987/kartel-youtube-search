import React, {
  Component,
  PropTypes
} from 'react';

import './VideoPreview.scss';
import { YOUTUBE_API_KEY } from 'config';
import JSONP from 'jsonp';

class VideoPreview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playTimes: 0,
      upvotes: 0
    };
  }

  componentDidMount() {
    const videoID = this.props.video.id.videoId;
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoID}&key=${YOUTUBE_API_KEY}`;
    const _this = this;
    JSONP(apiUrl, function(error, data) {
      if (error) {
        console.log(error);
      } else {
        const detail = data.items[0].statistics;
        _this.setState({
          playTimes: parseInt(detail.viewCount),
          upvotes: parseInt(detail.likeCount)
        });
      }
    });
  }

  static propTypes = {
    isSaved: PropTypes.bool,
    video: PropTypes.object.isRequired,
    saveVideo: PropTypes.func,
    unSaveVideo: PropTypes.func
  }

  handleSaveVideo = () => {
    const { isSaved, saveVideo, unSaveVideo, video } = this.props;
    if (isSaved) {
      unSaveVideo(video);
    } else {
      saveVideo(video);
    }    
  }

  render() {
    const { video: { snippet }, isSaved } = this.props;
    const { playTimes, upvotes } = this.state;
    return (
      <li className="video-preview">
        <div className="wrapper">
          <div className="thumbnail-wrapper">
            <img className="video-thumbnail" src={snippet.thumbnails.medium.url} />
            <div className="video-details">
              <span className="video-playtimes">
                <span className="glyphicon glyphicon-play"></span>
                {playTimes.toLocaleString()}
              </span>
              <span className="video-upvotes">
                <span className="glyphicon glyphicon-thumbs-up"></span>
                {upvotes.toLocaleString()}
              </span>
            </div>
            <div className="save-wrapper" onClick={this.handleSaveVideo}>
              <div className="save-indicator">
                { isSaved ? <span className={'glyphicon glyphicon-heart save'}></span> : null }
              </div>
              { isSaved ?
                <div className="save-button">
                  <div><span className={'glyphicon glyphicon-heart unsave'}></span></div>
                  <span className="save-instruction">UnSave</span>
                </div> :
                <div className="save-button">
                  <div>
                    <span className={'glyphicon glyphicon-heart save'}></span>
                  </div>
                  <span className="save-instruction">
                    Save
                  </span>
                </div>
              }              
            </div>
          </div>
          <div className="video-title">{snippet.title}</div>
          <div className="video-channel">{snippet.channelTitle}</div>
        </div>
      </li>
    );
  }
}

export default VideoPreview;
