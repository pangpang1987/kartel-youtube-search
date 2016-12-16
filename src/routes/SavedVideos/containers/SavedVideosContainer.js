import connect from 'store/utils/connect';
import SavedVideoView from '../components/SavedVideoView';
import { INIT_SAVE_STATE, unSaveVideo } from 'store/saveVideo';

const mapStateToProps = (state) => {
  const { savedVideos } = state;
  const {
    savedVideoList,
    savedVideoIdList
  } = savedVideos || INIT_SAVE_STATE;
  return {
    savedVideoList,
    savedVideoIdList
  };
};

const mapActionCreators = {
  unSaveVideo
};

export default connect(mapStateToProps, mapActionCreators)(SavedVideoView);
