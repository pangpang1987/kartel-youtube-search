import connect from 'store/utils/connect';
import SearchView from '../components/SearchView';
import {
  INIT_SEARCH_STATE,
  setSearchKeyword,
  fetchCategories,
  setFilter,
  resetFilter
} from 'store/searchInput';
import {
  INIT_SAVE_STATE,
  saveVideo,
  unSaveVideo
} from 'store/saveVideo';

const mapStateToProps = (state) => {
  const { search, savedVideos } = state;
  const {
    keyword,
    searchVideoList,
    categoriesList,
    filter
  } = search || INIT_SEARCH_STATE;
  const { savedVideoIdList } = savedVideos || INIT_SAVE_STATE;
  return {
    keyword,
    searchVideoList,
    savedVideoIdList,
    categoriesList,
    filter
  };
};

const mapActionCreators = {
  fetchCategories,
  setSearchKeyword,
  saveVideo,
  unSaveVideo,
  setFilter,
  resetFilter
};

export default connect(mapStateToProps, mapActionCreators)(SearchView);
