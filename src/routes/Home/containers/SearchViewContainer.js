import connect from 'store/utils/connect';
import SearchView from '../components/SearchView';
import {
  INIT_SEARCH_STATE,
  setSearchKeyword
} from 'store/searchInput';
import { saveVideo } from 'store/saveVideo';

const mapStateToProps = (state) => {
  const { search } = state;
  const {
    keyword,
    searchVideoList
  } = search || INIT_SEARCH_STATE;
  return {
    keyword,
    searchVideoList
  };
};

const mapActionCreators = {
  setSearchKeyword,
  saveVideo
};

export default connect(mapStateToProps, mapActionCreators)(SearchView);
