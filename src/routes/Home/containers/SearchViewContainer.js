import connect from 'store/utils/connect';
import SearchView from '../components/SearchView';
import {
  INIT_SEARCH_STATE,
  setSearchKeyword,
  fetchCategories,
  setFilter,
  resetFilter,
  goToPage
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
    filter,
    pageToken
  } = search || INIT_SEARCH_STATE;
  const { savedVideoIdList } = savedVideos || INIT_SAVE_STATE;
  return {
    keyword,
    searchVideoList,
    savedVideoIdList,
    categoriesList,
    filter,
    pageToken
  };
};

const mapActionCreators = {
  fetchCategories,
  setSearchKeyword,
  saveVideo,
  unSaveVideo,
  setFilter,
  resetFilter,
  goToPage
};

export default connect(mapStateToProps, mapActionCreators)(SearchView);
