import React, {
  Component,
  PropTypes
} from 'react';
import SearchInput from 'components/SearchInput';
import './SearchView.scss';

import VideoListView from 'components/VideoListView';
import Pagination from './Pagination';

export class SearchView extends Component {

  static propTypes = {
    keyword: PropTypes.string.isRequired,
    searchVideoList: PropTypes.array.isRequired,
    savedVideoIdList: PropTypes.array.isRequired,
    categoriesList: PropTypes.array,
    saveVideo: PropTypes.func.isRequired,
    unSaveVideo: PropTypes.func.isRequired,
    setSearchKeyword: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    filter: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
    pageToken: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {

    const {
      keyword,
      searchVideoList,
      savedVideoIdList,
      saveVideo,
      unSaveVideo,
      setSearchKeyword,
      categoriesList,
      filter,
      setFilter,
      resetFilter,
      pageToken,
      goToPage
    } = this.props;

    return (
      <div>
        <SearchInput
          filter={filter}
          setFilter={setFilter}
          resetFilter={resetFilter}
          keyword={keyword}
          setSearchKeyword={setSearchKeyword}
          categoriesList={categoriesList} />
        <section className="video-content">
          <VideoListView
            videoList={searchVideoList}
            saveVideo={saveVideo}
            unSaveVideo={unSaveVideo}
            savedVideoIdList={savedVideoIdList} />
          <div className="pagination-wrapper">
            {
              keyword.trim().length ? <Pagination pageToken={pageToken} goToPage={goToPage} /> : null
            }
          </div>
        </section>
      </div>
    );
  }
}

export default SearchView;
