import connect from 'store/utils/connect';
import SearchView from '../components/SearchView';
import {
  INIT_SEARCH_STATE,
  setSearchKeyword
} from 'store/searchInput';
import { INIT_SAVE_STATE, saveVideo, unSaveVideo } from 'store/saveVideo';

const mapStateToProps = (state) => {
  const { search, savedVideos } = state;
  const {
    keyword,
    searchVideoList
  } = search || INIT_SEARCH_STATE;
  const { savedVideoIdList } = savedVideos || INIT_SAVE_STATE;
  return {
    keyword,
    searchVideoList,
    savedVideoIdList
  };
};

const mapActionCreators = {
  setSearchKeyword,
  saveVideo,
  unSaveVideo
};

export default connect(mapStateToProps, mapActionCreators)(SearchView);
