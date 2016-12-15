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
    searchVideoList: PropTypes.array,
    saveVideo: PropTypes.func.isRequired,
    setSearchKeyword: PropTypes.func.isRequired
  }

  render() {

    const {
      keyword,
      searchVideoList,
      saveVideo,
      setSearchKeyword
    } = this.props;

    return (
      <div>
        <SearchInput keyword={keyword} setSearchKeyword={setSearchKeyword} />
        <VideoListView videoList={searchVideoList} saveVideo={saveVideo} />
      </div>
    );
  }
}

export default SearchView;
