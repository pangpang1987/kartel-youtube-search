import React, {
  Component,
  PropTypes
} from 'react';
import SearchInput from 'components/SearchInput';
import './SearchView.scss';

import VideoListView from 'components/VideoListView';

export class SearchView extends Component {

  static propTypes = {
    keyword: PropTypes.string.isRequired,
    searchVideoList: PropTypes.array.isRequired,
    savedVideoIdList: PropTypes.array.isRequired,
    categoriesList: PropTypes.array,
    saveVideo: PropTypes.func.isRequired,
    unSaveVideo: PropTypes.func.isRequired,
    setSearchKeyword: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired
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
      categoriesList
    } = this.props;

    return (
      <div>
        <SearchInput
          keyword={keyword}
          setSearchKeyword={setSearchKeyword}
          categoriesList={categoriesList} />
        <VideoListView
          videoList={searchVideoList}
          saveVideo={saveVideo}
          unSaveVideo={unSaveVideo}
          savedVideoIdList={savedVideoIdList} />
      </div>
    );
  }
}

export default SearchView;
