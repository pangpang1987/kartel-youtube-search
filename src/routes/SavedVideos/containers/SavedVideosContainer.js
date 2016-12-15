import connect from 'store/utils/connect';
import SavedVideoView from '../components/SavedVideoView';
import { INIT_SAVE_STATE } from 'store/saveVideo';

const mapStateToProps = (state) => {
  const { savedVideos } = state;
  const {
    savedVideoList
  } = savedVideos || INIT_SAVE_STATE;
  return {
    savedVideoList
  };
};

const mapActionCreators = {
  
};

export default connect(mapStateToProps, mapActionCreators)(SavedVideoView);
