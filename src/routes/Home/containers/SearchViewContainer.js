import connect from 'store/utils/connect';
import SearchView from '../components/SearchView';
import {
  INIT_SEARCH_STATE,
  setSearchKeyword
} from 'store/searchInput';

const mapStateToProps = (state) => {
  const { search } = state;
  const {
    keyword
  } = search || INIT_SEARCH_STATE;
  return {
    keyword
  };
};

const mapActionCreators = {
  setSearchKeyword
};

export default connect(mapStateToProps, mapActionCreators)(SearchView);
